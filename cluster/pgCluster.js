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
    qs += 'st_asgeojson(st_transform(st_centroid(st_convexhull(st_collect(proj_geom))), 4326)) AS centroid, ';
    qs += 'st_asgeojson(st_transform(st_convexhull(st_collect(proj_geom)), 4326)) as poly ';
    qs += 'FROM ( SELECT kmeans(array[ST_X(proj_geom), ST_Y(proj_geom)], ' + numberOfPoints + ') over (), proj_geom ';
    qs += 'FROM ( SELECT st_transform(st_setsrid(geom, 4326), 3857) as proj_geom FROM ' + mapping.toLowerCase() + ' ';
    qs += 'WHERE ' + mapping.toLowerCase() + '.geom && st_makeenvelope(' + bbox + ', 4326) '
    qs += ') as projected ) AS ksub ';
    qs += 'GROUP BY kmeans ORDER BY kmeans;';

    console.log(qs);

    client.query(qs, function (err, result) {
      console.timeEnd('query');
      if (err) return callback(err);

      var centroids = {type: "FeatureCollection", features: []},
          polygons = {type: "FeatureCollection", features: []};

      result.rows.forEach(function (row) {
        var center = {type: "Feature", properties: {count: row.count}},
            poly = _.clone(center);
        center.geometry = JSON.parse(row.centroid);
        centroids.features.push(center);
        poly.geometry = JSON.parse(row.poly);
        polygons.features.push(poly);
      });

      callback(null, centroids, polygons);
      client.end();
    });
  });
}