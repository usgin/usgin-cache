var fs = require('fs'),
    path = require('path'),
    async = require('async');

module.exports = function (featureConfig, callback) {
  var dataFolder = path.dirname(__filename),
      finalCallback = callback,
      features = require('../../features')(featureConfig);

  fs.readdir(dataFolder, function (err, filenames) {
    if (err) return finalCallback(err);

    features.setup(function (err) {
      if (err) return finalCallback(err);
      features.clear(function (err) {
        if (err) return finalCallback(err);

        async.each(filenames, function (filename, callback) {
          if (filename === 'index.js') return callback();
          fs.readFile(path.join(dataFolder, filename), function (err, data) {
            if (err) return callback(err);

            features.db.insert(JSON.parse(data), function (err, response) {
              callback(err, response);
            });
          });
        }, finalCallback);
      });
    });
  });
};