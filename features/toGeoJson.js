var spawn = require('child_process').spawn;

module.exports = function toGeoJson(wfsFeaturesString, callback) {
  var geojson = '',
    params = ["-f", "GeoJSON", "-preserve_fid", "-skipfailures", "/vsistdout/", "/vsistdin/"],
    ogr = spawn("ogr2ogr", params);
  
  ogr.stdout.on('data', function (chunk) { geojson += chunk; });
  ogr.stdout.on('error', callback);
  ogr.stdout.on('end', function () {
    var err, result;
    
    try { result = JSON.parse(geojson).features || []; }
    catch (oops) { err = oops; }
    
    callback(err, result);
  });
  
  ogr.stdin.write(wfsFeaturesString.toString());
  ogr.stdin.end();
};