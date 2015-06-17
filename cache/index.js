// # Cache Module
var nano = require('nano'),
    crypto = require('crypto'),
    request = require('request'),
    _ = require('underscore'),
    async = require('async'),
    urls = require('./urls'),
    designDoc = require('./design/usgin-cache');

// ## Contructor
// You should pass whether or not you want to refresh the cache and also a config obj.
module.exports = function (forceRefresh, config) {
  config = typeof forceRefresh === 'object' ? forceRefresh : config;
  forceRefresh = typeof forceRefresh === 'boolean' ? forceRefresh : false;

  config = config || {};
  config.dbName = config.dbName || 'usgin-cache';
  config.dbUrl = config.dbUrl || 'http://localhost:5984';
  
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

    // Build the cache document
    var cacheDoc = {
      _id: id,
      requestType: requestType.toLowerCase(),
      endpoint: urls.base(url)
    };

    // Need to capture featuretype for GetFeature requests
    if (requestType === 'getfeature') cacheDoc.featuretype = decodeURIComponent(/typename=(.+?)(&|$)/i.exec(url)[1]);

    // Add the revision if a doc was passed in (if we're refreshing the cache)
    if (rev) cacheDoc['_rev'] = rev;

    // **Strange Distinction Here**
    // - If it is a GetFeature request, we'll be piping the response into an attachment.
    // - If it is any other request, we'll attach the response as a big string in the CouchDB doc.
    if (requestType === 'getfeature') {
      // First insert the document.
      db.insert(cacheDoc, id, function (err, dbResponse) {
        // if the insert failed, send back the Error
        if (err) { callback(err); return; }
        // Now, request the doc and pipe it into an attachment
        request(url)
          .on('error', callback)
          .pipe(db.attachment.insert(id, 'response.xml', null, 'application/xml', {rev: dbResponse.rev}))
          .on('end', function () {
            callback(null, cacheDoc);
          });
      });
    }

    else {
      // Now, request the URL
      request(url, function (err, response) {      
        if (err && err.code !== 'ETIMEDOUT') {
          // If the request failed for any reason other than a timeout, send back the error
          return callback(err);
        } else if (err) {
          // If the request timed out, make a fake response doc that will be added to CouchDB.
          // This will allow code to continue to execute when timeouts happen (and they will).
          response = {body: 'Request for ' + url + ' timed out'};
        }
        
        cacheDoc.response = response.body;
        
        // Insert the document
        db.insert(cacheDoc, id, function (err, dbResponse) {
          // If the insert failed, send back the error
          if (err) { callback(err); return; }
          callback(null, cacheDoc);
        });
      });
    }
  }
  
  // ### Return a document from the cache, adding or updating as neccessary
  function fetch(requestType, url, refresh, callback) {
    // Valid requestTypes
    var validRequests = ['getrecords', 'getrecordbyid', 'getfeature', 'getcapabilities'];
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
      
      // If we got a doc back, and we aren't being forced to refresh...
      if (doc && !forceRefresh) {
        // Anything other than a GetFeature doc is fine to return
        if (doc.requestType !== 'getfeature') return callback(null, doc);
        // Successful GetFeature requests will have an attachment and can be returned
        else if (doc.hasOwnProperty('_attachments')) return callback(null, doc);  
      }

      // Either the doc has not been cached, we're being forced to refresh the cache, or the doc is bad
      refreshDoc(requestType, url, doc, callback);
    });
  }
  
  // ## Public API
  return {
    // ### Access to the cache database
    db: db,
    
    // ### CSW GetRecords request
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
    
    // ### Return all Metadata IDs from a particular CSW
    idsFromCsw: function (cswBaseUrl, callback) {
      var url = urls.base(cswBaseUrl);
      db.view_with_list('usgin-cache', 'metadataIds', 'values', {key: url}, callback);
    },

    // ### CSW GetRecordByID request
    getRecordById: function (cswBaseUrl, id, callback) {
      var requestType = 'getrecordbyid',
          url = urls.request(requestType, cswBaseUrl, {id: id});
      
      callback = callback || function () {};
      
      fetch(requestType, url, forceRefresh, callback);
    },
    
    // ### Get all WFS Urls available in the cache
    wfsUrls: function (callback) {
      db.view_with_list('usgin-cache', 'wfsUrls', 'threshold', {min:4}, function (err, urls) {
        callback(err, _.uniq(urls));
      });
    },

    wfsUrlsByType: function (featuretype, callback) {
      db.view('usgin-cache', 'wfsFeatureTypes', {key: featuretype}, function (err, response) {
        if (err) return callback(err);
        callback(null, response.rows.map(function (row) {
          return row.value;
        }));
      });
    },

    // ### WFS GetCapabilities request
    getCapabilities: function (wfsBaseUrl, callback) {
      var requestType = 'getcapabilities',
          url = urls.request(requestType, wfsBaseUrl);

      fetch(requestType, url, forceRefresh, callback);
    },

    // ### WFS GetFeature request
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
    
    // ### List WFS GetFeature responses by type
    wfsFeaturesByType: function (featuretype, callback) {
      callback = typeof featuretype === 'function' ? featuretype : callback;
      var params = typeof featuretype === 'string' ? {key: featuretype} : {};

      db.view('usgin-cache', 'wfsFeaturesByType', params, function (err, response) {
        if (err) return callback(err);
        callback(null, response.rows.map(function (row) {
          return {id: row.id, key: row.key};
        }));
      });
    },

    // ### List failed WFS GetFeature requests
    failedGetFeature: function (callback) {
      callback = callback || function () {};
      db.view_with_list('usgin-cache', 'getFeatureAttachments', 'values', {key: null}, callback);
    },

    // ### Clear everything except design documents from the database
    clear: function (callback) {
      callback = callback || function () {};
      
      db.list({include_docs: true}, function (err, result) {
        if (err) { callback(err); return; }
        
        var docs = _.reject(result.rows, function (doc) {
          return doc.id.indexOf('_design') === 0;
        });
        /*
        docs = _.map(docs, function (row) {
          return _.extend({ _deleted: true }, row.doc);
        });
        */
        db.bulk({docs: docs}, callback);
      });
    },
    
    // ### Setup the database
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