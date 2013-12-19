var nano = require('nano'),
    _ = require('underscore'),
    stream = require('stream'),
    jsonStream = require('JSONStream'),
    async = require('async'),
    cache = require('../cache'),
    toGeoJson = require('./toGeoJson'),
    toPostGis = require('./toPostGis'),
    cluster = require('../cluster'),
    designDoc = require('./design/usgin-features');

// ## Contructor
// You should pass a config obj.
module.exports = function (config) {
  config = config || {};
  config.dbName = config.dbName || 'usgin-features';
  config.cacheName = config.cacheName || 'usgin-cache';
  config.dbUrl = config.dbUrl || 'http://localhost:5984';
  config.solr = config.solr || 'solr://host:port/core/solr';
  
  var connection = nano(config.dbUrl),
      db = connection.use(config.dbName),
      thisCache = cache({dbName: config.cacheName, dbUrl: config.dbUrl});

  // ## Private functions
  // ### Insert features into the feature table
  function insertFeatures(cacheId, featuretype, features, callback) {
    // Build the CouchDB documents
    var docs = features.map(function (f) {
      return {
        cacheId: cacheId,
        featureType: featuretype,
        feature: f
      };
    });

    // Insert the docs
    db.bulk({docs: docs}, function (err) {
      callback(err);
    });
  }

  // ### Removes features from a particular GetFeature doc
  function clearFeatures(cacheId, callback) {
    // Lookup features of the given cacheId
    db.view_with_list('usgin-features', 'deleteHelper', 'bulk', {key: cacheId})
      .pipe(db.bulk())
      .on('error', callback)
      .on('end', function () {
        callback(null);
      });
  }

  // ### Streaming conversion from WFS to GeoJSON in CouchDB
  function convert(cacheId, featureType, callback) {
    var ogr = toGeoJson(),
        insert = db.bulk(),
        wfsData = thisCache.db.attachment.get(cacheId, 'response.xml'),
        bulkWriter = jsonStream.stringify('{"docs":[', ',', ']}'),
        geoJsonParser = jsonStream.parse('features.*')
          .on('data', function (feature) {
            bulkWriter.write({
              cacheId: cacheId,
              featuretype: featureType,
              feature: feature
            });
          })
          .on('end', bulkWriter.end);

    console.time('\t- ' + cacheId);
    ogr.output.pipe(geoJsonParser);
    bulkWriter.pipe(insert);
    wfsData.pipe(ogr.input);
    insert.on('end', function () {
        console.timeEnd('\t- ' + cacheId);
        callback();
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
        console.log('Clearing existing features...');
        async.eachSeries(response, function (row, cb) {
          clearFeatures(row.id, cb);
        }, function (err) {
          if (err) return callback(err);
          console.log('Converting WFS features to GeoJSON...');
          async.eachLimit(response, 4, function (row, cb) {
            convert(row.id, row.key, cb);
          }, callback);
        });
      }
    },

    // ### Convert a single WFS from the cache to GeoJSON
    convertWfs: function (cacheId, callback) {
      callback = callback || function () {};
      thisCache.db.get(cacheId, function (err, doc) {
        if (err) return callback(err);
        clearFeatures(cacheId, function (err) {
          if (err) return callback(err);
          convert(cacheId, doc.featuretype, callback);
        });
      });
    },

    // ### Send indexed features to PostGIS
    toPostGis: function (mapping, connection, callback) {
      var url = db.view_with_list('usgin-features', mapping, 'solrToFeatureCollection').uri.href,
          converter = toPostGis(mapping, url, connection, callback);
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
    buildClusters: function (mapping, connection, callback) {
      callback = callback || function () {};

      function insertClusters(err, result) {
        if (err) return callback(err);

        async.each(_.keys(result), function (zoom, cb) {
          insertFeatures(zoom, 'cluster', result[zoom], cb)
        }, callback);
      }

      var zoomRange = _.range(9); // [0,1,2,3,4,5,6,7,8]
      cluster.pgClusterRange(mapping, zoomRange, connection, insertClusters);
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