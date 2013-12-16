var pg = require('pg'),
    fs = require('fs'),
    _ = require('underscore'); 

module.exports = function (mapping, bbox, callback) {
  var conString = "postgres://localhost/ngds";
    client = new pg.Client(conString),
    numberOfPoints = 30;

  client.connect(function(err) {
    if (err) return callback(err);

    console.time('query');

    var qs = 'SELECT kmeans, count(*), ';
    qs += 'st_asgeojson(st_centroid(st_collect(geom))) AS centroid ';
    // qs += 'st_asgeojson(st_convexhull(st_collect(proj_geom))) as poly'
    qs += 'FROM ( SELECT kmeans(array[ST_X(geom), ST_Y(geom)], ' + numberOfPoints + ') over (), geom ';
    qs += 'FROM ' + mapping.toLowerCase() + ' ';
    qs += 'WHERE ' + mapping.toLowerCase() + '.geom && st_makeenvelope(' + bbox + ', 4326) '
    qs += ') AS ksub ';
    qs += 'GROUP BY kmeans;';

    console.log(qs);

    client.query(qs, function (err, result) {
      console.timeEnd('query');
      if (err) return callback(err);

      function toGeoJSON(makePolys) {
        return {
          type: "FeatureCollection", 
          features: result.rows.map(function (row) {
            return {
              type: "Feature", 
              properties: {count: row.count},
              geometry: JSON.parse(makePolys ? row.poly : row.centroid)
            };
          })
        };
      }

      callback(null, toGeoJSON(), {});
      // callback(null, toGeoJSON(), toGeoJSON(true));
      client.end();
    });
  });
}