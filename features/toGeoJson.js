var spawn = require('child_process').spawn;

module.exports = function toGeoJson(callback) {
  var geojson = '',
    params = ["-f", "GeoJSON", "-preserve_fid", "-skipfailures", "/vsistdout/", "/vsistdin/"],
    ogr = spawn("ogr2ogr", params);
  
  ogr.stdout.on('data', function (chunk) { 
    geojson += chunk; 
  });
  ogr.stdout.on('error', callback);
  ogr.stdout.on('end', function () {
    var err, result = [];
    
    if (geojson.length > 16) {
      try { result = JSON.parse(geojson).features || []; }
      catch (oops) { console.log('error parsing this: ' + geojson); }
    }

    callback(err, result);
  });
  
  return ogr.stdin;
};