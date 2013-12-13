var solr = require('solr-client'),
    _ = require('underscore');

module.exports = function (featureConfig) {
  var feature = require('../features')(featureConfig),
      client = solr.createClient();

  client.autoCommit = true;

  return {
    addToIndex: function (mappingName, callback) {
      callback = callback || function () {};
      feature.db.view('usgin-features', mappingName, function (err, response) {
        if (err) return callback(err);
        
        var docs = response.rows.map(function (row) {
          return row.value;
        });

        client.add(docs, callback);
      });
    },

    purgeIndex: function (callback) {
      callback = callback || function () {};
      client.delete('id', '*', callback);
    },

    countRecords: function (callback) {
      var q = client.createQuery().q('*.*').rows(0);
      client.search(q, function (err, result) {
        if (err) return callback(err);
        callback(null, result.response.numFound);
      });
    },

    getAll: function (callback) {
      var q = client.createQuery().q('*.*').rows(100000000);
      client.search(q, function (err, result) {
        if (err) return callback(err);
        callback(null, result.response.docs.map(function (doc) {
          var geo = doc.geo[0].split(' ');
          return {
            type: "Feature",
            properties: doc,
            geometry: {
              type: "Point",
              coordinates: [Number(geo[0]), Number(geo[1])]
            }
          };
        }));
      });
    }
  };
};