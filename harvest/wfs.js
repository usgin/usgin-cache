var _ = require('underscore');

module.exports = function (cache) {

  return {
    // Gather the responses to WFS GetCapabilities requests
    gatherCapabilities: function (callback) {
        cache.wfsUrls(function (err, urls) {
            if (err) return callback(err);
            cache.getCapabilities(urls[0], function(err, capabilities) {
                if (err) return callback(err);
                callback(null, capabilities);
            })
        });
    },

    // Find WFS Services that contain a particular featuretype
    listWfsProviders: function (featuretype, callback) {

    },

    // Get all the features from a set of WFS urls
    getFeatures: function (urls, callback) {

    }
  };
};