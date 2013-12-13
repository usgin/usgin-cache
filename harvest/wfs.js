var async = require('async'),
    _ = require('underscore');

module.exports = function (cache) {

  return {
    // Gather the responses to WFS GetCapabilities requests
    gatherCapabilities: function (callback) {
        cache.wfsUrls(function (err, urls) {
            if (err) return callback(err);

            var remaining = urls.length;
            console.log('\t- There are ' + remaining + ' WFS GetCapabilities left to harvest.');
            async.eachLimit(urls, 10, function (url, cb) {
                cache.getCapabilities(url, function (err) {
                    var msg = err ? '\t- ERROR: ' + url + ' -- ' + err : '\t- HARVESTED: ' + url;
                    console.log(msg);
                    remaining--;
                    console.log('\t- There are ' + remaining + ' WFS GetCapabilities left to harvest.');
                    cb(err);
                });
            }, callback);
        });
    },

    // Get all the features from a set of WFS urls
    getFeatures: function (urls, featuretype, maxfeatures, callback) {
        var limit = null;
        if (typeof maxfeatures === 'function') callback = maxfeatures;
        if (!isNaN(maxfeatures)) limit = maxfeatures;

        var remaining = urls.length;
        console.log('\t- There are ' + remaining + ' WFS Services left to harvest.');
        async.eachLimit(urls, 10, function (url, callback) {
            cache.getFeature(url, featuretype, limit, function (err) {
                var msg = err ? '\t- ERROR: ' + url + ' -- ' + err : '\t- HARVESTED: ' + url;
                console.log(msg);
                remaining--;
                console.log('\t- There are ' + remaining + ' WFS Services left to harvest.');
                callback(err);
            });
        }, callback);
    }
  };
};