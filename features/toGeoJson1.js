var spawn = require('child_process').spawn;

module.exports = function toGeoJson() {
    var geojson = '', error = '',
        params = ["-f", "GeoJSON", "-preserve_fid", "-skipfailures", "/vsistdout/", "/vsistdin/"];//,
    ogr = spawn("ogr2ogr", params);

     ogr.stdout.on('data', function (chunk) {
        geojson += chunk;
    });
      /*

    var geojson = '',
    params = ["-f", "GeoJSON", "-preserve_fid", "-skipfailures", "/vsistdout/", "/vsistdin/"];//,
     ogr = spawn("ogr2ogr", params);

  return {
    input: ogr.stdin,
    output: ogr.stdout
  };*/
};