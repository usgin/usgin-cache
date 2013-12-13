var getCache = require('../cache');

// Both arguments optional
module.exports = function (forceRefresh, config) {
  forceRefresh = typeof forceRefresh === 'boolean' ? forceRefresh : false;
  var cache = config ? getCache(forceRefresh, config) : getCache(forceRefresh);

  return {
    // Populate the cache with metadata from a particular CSW
    harvestCsw: function (cswBaseUrl, callback) {
      var csw = require('./csw')(cache, cswBaseUrl);
      csw.getAllRecords(function (err) {
        if (err) return callback(err);
        csw.getRecordsByIds(callback);
      });
    },

    // Populate the cace with GetCapabilities docs from WFS servers
    gatherCapabilities: function (callback) {
      var wfs = require('./wfs')(cache);
      wfs.gatherCapabilities(callback);
    },

    // Populate the cache with features of the specified type
    gatherFeatures: function (featuretype, maxfeatures, callback) {
      var limit = null;
      if (typeof maxfeatures === 'function') callback = maxfeatures;
      if (!isNaN(maxfeatures)) limit = maxfeatures;

      var wfs = require('./wfs')(cache);
      cache.wfsUrlsByType(featuretype, function (err, urls) {
        if (err) return callback(err);
        wfs.getFeatures(urls, featuretype, limit, callback);
      });
    }
  };
};