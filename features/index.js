var nano = require('nano'),
    _ = require('underscore'),
    async = require('async'),
    cache = require('../cache'),
    toGeoJson = require('./toGeoJson'),
    designDoc = require('./design/usgin-features');

// ## Contructor
// You should pass a config obj.
module.exports = function (config) {
  config = config || {};
  config.dbName = config.dbName || 'usgin-features';
  config.cacheName = config.cacheName || 'usgin-cache';
  config.dbUrl = config.dbUrl || 'http://localhost:5984';
  
  var connection = nano(config.dbUrl),
      db = connection.use(config.dbName),
      thisCache = cache({dbName: config.cacheName, dbUrl: config.dbUrl});

  // ## Private functions
  // ### Insert features into the feature table
  function insertFeatures(cacheId, featuretype, features, callback) {
    // First clear existing features
    clearFeatures(cacheId, function (err) {
      if (err) return callback(err);

      // Now build the features and insert them
      async.eachLimit(features, 10, function (f, cb) {
        var feature = {
          cacheId: cacheId,
          featuretype: featuretype,
          feature: f
        };
        db.insert(feature, cb);
      }, callback);
    });
  }

  // ### Removes features from a particular GetFeature doc
  function clearFeatures(cacheId, callback) {
    // Lookup features of the given cacheId
    db.view('usgin-features', 'cacheId', {key: cacheId, include_docs: true}, function (err, response) {
      if (err) return callback(err);

      // Mark each as deleted and move on
      async.eachLimit(response.rows, 10, function (row, cb) {
        _.extend(row.doc, {_deleted: true});
        db.insert(row.doc, row.id, cb);
      }, callback);
    });
  }

  // ## Public API
  return {
    // ### Direct database access
    db: db,

    // ### Convert Cache WFS Responses to features
    // Optionally, specify a featuretype to only convert those kinds of things
    getFeatures: function (featuretype, callback) {
      callback = typeof featuretype === 'function' ? featuretype : callback;
      callback = callback || function () {};
      if (typeof featuretype === 'string') {
        thisCache.wfsFeaturesByType(featuretype, createGeoJson);
      } else {
        thisCache.wfsFeaturesByType(createGeoJson);
      }

      function createGeoJson(err, response) {
        if (err) return callback(err);
        async.eachLimit(response, 4, convert, callback);
      }

      function convert(row, callback) {
        // Convert the WFS GetFeature doc to an array of GeoJSON features
        var converter = toGeoJson(function (err, result) {
          if (err) return callback(err);
          // Insert those features into the database
          insertFeatures(row.id, row.key, result, callback);
        });

        thisCache.db.attachment.get(row.id, 'response.xml').pipe(converter);
      }
    },

    // ### Gets features as a GeoJSON FeatureCollection
    getGeoJson: function (featuretype, callback) {
      var params = typeof featuretype === 'string' ? {key: featuretype} : {};
      callback = typeof featuretype === 'function' ? featuretype : callback;
      callback = callback || function () {};

      db.view_with_list('usgin-features', 'featureType', 'featureCollection', callback);
    },

    // ### Clear everything except design documents from the database
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

    // ### Builds clustered features into the cache
    buildClusters: function (callback) {
      callback = callback || function () {};

      require('../solr')(config).getAll(function (err, response) {
        if (err) return callback(err);

        require('../cluster').clusterRange(response, [0,1,2,3,4,5,6,7,8,9,10], function (err, result) {
          if (err) return callback(err);

          async.each(_.keys(result), function (zoom, cb) {
            insertFeatures(zoom, 'cluster', result[zoom], cb)
          }, callback);
        });
      });
    },

    // ### Get cluster features
    getClusters: function (zoom, callback) {
      callback = callback || function () {};
      db.view_with_list('usgin-features', 'cacheId', 'featureCollection', {include_docs: true, key: zoom.toString()}, callback);
    },
    
    // ### Setup the database
    setup: function (callback) {
      callback = callback || function () {};
      
      function designDocs() {
        var id = '_design/usgin-features';
        
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