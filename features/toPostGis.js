var spawn = require('child_process').spawn;

module.exports = function toPostGis(callback) {
  var params = [
      '-f', 'PostGIS', 
      '-skipfailures', '-append',
      'PG:dbname=ngds',
      '/vsistdin/'
    ],
    ogr = spawn('ogr2ogr', params);

  var err = '';
  ogr.stderr.on('data', function (data) {
    err += data;
  });
  
  ogr.on('close', function (code) {
    callback(err === '' ? null : err);
  });
  
  return ogr.stdin;
};