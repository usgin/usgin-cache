var spawn = require('child_process').spawn,
    _ = require('underscore');

module.exports = function toPostGis(mapping, uri, connection, callback) {
  callback = callback || function () {};
  connection = connection || {};
  connection.dbname = connection.dbname || '';
  connection.host = connection.host || 'localhost';
  connection.port = connection.port || '5432';
  connection.user = connection.user || '';
  connection.password = connection.password || '';

  var connectionString = _.pairs(connection).map(function (param) {
    return param.join('=');
  }).join(' ');

  var params = [
      '-t_srs', 'epsg:4326',
      '-skipfailures', '-overwrite',
      '-f', 'PostGIS',
      '-lco', 'GEOMETRY_NAME=geom',
      '-nln', mapping.toLowerCase(),
      'PG:' + connectionString,
      uri
    ],
    ogr = spawn('ogr2ogr', params);
  
  var err = '';
  ogr.stderr.on('data', function (data) {
    err += data;
  });
  
  ogr.on('close', function (code) {
    callback(err === '' ? null : err);
  });

  ogr.stdin.on('error', function (err) {});
  
  return ogr.stdin;
};