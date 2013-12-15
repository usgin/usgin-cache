var pg = require('pg'),
    fs = require('fs'),
    _ = require('underscore'); 

var conString = "postgres://localhost/ngds";
    client = new pg.Client(conString),
    numberOfPoints = 375;

client.connect(function(err) {
  if(err) return console.error('could not connect to postgres', err);
  console.time('query');
  client.query('SELECT kmeans, count(*), st_asgeojson(st_transform(st_centroid(st_convexhull(st_collect(proj_geom))), 4326)) AS centroid, st_asgeojson(st_transform(st_convexhull(st_collect(proj_geom)), 4326)) as poly FROM ( SELECT kmeans(array[ST_X(proj_geom), ST_Y(proj_geom)], ' + numberOfPoints + ') over (), proj_geom FROM ( SELECT st_transform(st_setsrid(wkb_geometry,4326), 3857) as proj_geom FROM boreholetemperature ) as projected ) AS ksub GROUP BY kmeans ORDER BY kmeans;',
    function (err, result) {
      console.log(numberOfPoints + " generated");
      console.timeEnd('query');
      if(err) return console.error('error running query', err); 
      client.end();

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

      fs.writeFile('centroid.json', JSON.stringify(centroids, null, 2));
      fs.writeFile('poly.json', JSON.stringify(polygons, null, 2));
    }
  );
});