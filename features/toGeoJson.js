var spawn = require('child_process').spawn,
fs = require('fs');
module.exports = function toGeoJson() {
  var geojson = '',
    params = ["-f", "GeoJSON","-preserve_fid","-gt","-progress", "-skipfailures", "/vsistdout/", "/vsistdin/"],
      //params = ["-f", "GeoJSON","-preserve_fid","-gt","-progress", "-skipfailures",  "output.txt", "/vsistdin/"],
      //params = ["-f", "GeoJSON","-skipfailures",  "output.txt", "/vsistdin/"],
     //params = ["-f", "GeoJSON", "-preserve_fid", "-skipfailures", "sss.geoJSON", "/vsistdin/"],
    ogr = spawn("ogr2ogr", params);
    //ogrOutput = ogr.stdout.on("data", function (chunk) { if (chunk) console.log(chunk) });
    //console.log("OGR Inside");
  return {
    input: ogr.stdin,
    output: ogr.stdout,
    err: ogr.stderr

  };
};