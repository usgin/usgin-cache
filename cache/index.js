// # Cache Module
var nano = require('nano'),
    crypto = require('crypto'),
    request = require('request'),
    _ = require('underscore'),
    urls = require('./urls'),
    designDoc = require('./design/usgin-cache');

// ## Contructor
// You should pass whether or not you want to refresh the cache and also a config obj.
module.exports = function (forceRefresh, config) {
  forceRefresh = typeof forceRefresh === 'boolean' ? forceRefresh : false;
  config = config || { dbUrl: 'http://localhost:5984', dbName: 'usgin-cache' };
  
  var connection = nano(config.dbUrl),
      db = connection.use(config.dbName);
  
  // ## Private functions
  
  // ### Control how we identify requests in the cache
  function getIdFor(requestType, url) {
    var hash = crypto.createHash('sha256');
    hash.update(decodeURIComponent(url).toUpperCase());
    return hash.digest('hex');
  }
  
  // ### Add or update a document in the cache
  function refreshDoc(requestType, url, doc, callback) {
    // Get the cache ID for this request
    var id = getIdFor(requestType, url),
    
    // If a CouchDB doc was passed in, get its revision
    rev = null;
    if (typeof doc === 'object') rev = doc._rev || null;
    
    // If a doc was not passed, then we've got to get our function straight
    if (typeof doc === 'function') callback = doc;
    
    // Now, request the URL
    request(url, function (err, response) {
      // If the request failed, send back the error
      if (err) { callback(err); return; }
      
      // If the request did not fail, build the cache document
      var cacheDoc = {
        _id: id,
        requestType: requestType.toLowerCase(),
        response: response.body,
        endpoint: urls.base(url)
      }
      
      // Add the revision if a doc was passed in (if we're refreshing the cache)
      if (rev) cacheDoc['_rev'] = rev;
      
      // Insert the document
      db.insert(cacheDoc, id, function (err, dbResponse) {
        // If the insert failed, send back the error
        if (err) { callback(err); return; }
        
        // Otherwise, send back the doc that's now cached
        callback(null, cacheDoc);
      });
    });
  }
  
  // ### Return a document from the cache, adding or updating as neccessary
  function fetch(requestType, url, refresh, callback) {
    // Valid requestTypes
    var validRequests = ['getrecords', 'getrecordbyid', 'getfeature'];
    if (!_.contains(validRequests, requestType.toLowerCase())) {
      callback(new Error('System will only cache ' + validRequests.join(', ') + ' requests'));
    }
    
    // Get the cache ID for this request
    var id = getIdFor(requestType, url),
    
    // Get our arguments straight
    forceRefresh = false;
    if (typeof refresh === 'function') callback = refresh;
    if (typeof refresh === 'boolean') forceRefresh = refresh;
    
    db.get(id, function (err, doc) {
      // Throw error if there was one, and it was not a 404
      if (err && err.status_code !== 404) { callback(err); return; }
      
      // If we got a doc back, then return that
      if (doc && !forceRefresh) { callback(null, doc); return; }
      
      // Either the doc has not been cached or we're being forced to refresh the cache
      refreshDoc(requestType, url, doc, callback);
    });
  }
  
  // ## Public API
  return {
    // Access to the cache database
    db: db,
    
    // CSW GetRecords request
    getRecords: function (cswBaseUrl, start, limit, callback) {
      var requestType = 'getrecords',
          params = {};
      
      if (!isNaN(start)) params.start = start;
      if (typeof start === 'function') callback = start;
      if (!isNaN(limit)) params.limit = limit;
      if (typeof limit === 'function ') callback = limit;
      callback = callback || function () {};
      
      var url = urls.request(requestType, cswBaseUrl, params);
      
      fetch(requestType, url, forceRefresh, callback);
    },
    
    // CSW GetRecordByID request
    getRecordById: function (cswBaseUrl, id, callback) {
      var requestType = 'getrecordbyid',
          url = urls.request(requestType, cswBaseUrl, {id: id});
      
      callback = callback || function () {};
      
      fetch(requestType, url, forceRefresh, callback);
    },
    
    // WFS GetFeature request
    getFeature: function (wfsBaseUrl, featureType, maxFeatures, callback) {
      var requestType = 'getfeature',
          params = {};
      
      if (typeof featureType === 'string') params.featureType = featureType;
      if (typeof featureType === 'function') callback = featureType;
      if (!isNaN(maxFeatures)) params.maxFeatures = maxFeatures;
      if (typeof maxFeatures === 'function') callback = maxFeatures;
      callback = callback || function () {};
      
      var url = urls.request(requestType, wfsBaseUrl, params);
      
      fetch(requestType, url, forceRefresh, callback);
    },
    
    // Clear everything except design documents from the database
    clear: function (callback) {
      callback = callback || function () {};
      
      db.list({include_docs: true}, function (err, result) {
        if (err) { callback(err); return; }
        
        var docs = _.reject(result.rows, function (doc) {
          return doc.id.indexOf('_design') === 0;    
        });
        
        docs = _.map(docs, function (row) {
          return _.extend({ _deleted: true }, row.doc);  
        });
        
        db.bulk({docs: docs}, callback);
      });
    },
    
    // Setup the database
    setup: function (callback) {
      callback = callback || function () {};
      
      function designDocs() {
        var id = '_design/usgin-cache';
        
        db.get(id, function (err, doc) {
          if (err && err.status_code !== 404) { callback(err); return; }
          
          if (doc) {
            db.insert(_.extend(designDoc, {_rev: doc._rev}), id, callback);
          } else {
            db.insert(designDoc, callback);  
          }
        });
      }
      
      connection.db.list(function (err, dbNames) {
        if (!_.contains(dbNames, config.dbName)) {
          connection.db.create(config.dbName, designDocs);
        } else {
          designDocs();
        }
      });
    }
  };
};