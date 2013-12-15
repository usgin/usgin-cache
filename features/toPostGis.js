var spawn = require('child_process').spawn;

module.exports = function toPostGis(callback) {
  var params = [
      "-f", "PostGIS", 
      "-skipfailures", "-append",
      'PG:dbname=ngds',
      "/vsistdin/"
    ],
    ogr = spawn("ogr2ogr", params);

  ogr.on('close', function (code) {
    callback(null);
  });

  ogr.stderr.on('data', function (data) {
    // This is usually the result of bad data fed into the converter.
    callback(data);
  });
  
  return ogr.stdin;
};