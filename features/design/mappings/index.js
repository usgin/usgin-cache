var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),

    here = path.dirname(__filename),
    files = fs.readdirSync(here);

var pairs = _.chain(files)
  .filter(function (filename) {
    return filename !== 'index.js';
  })
  .map(function (filename) {
    return [
      filename.replace('.js', ''),
      {map: require('./' + filename).toString()}
    ];
  })
  .value();

module.exports = _.object(pairs);