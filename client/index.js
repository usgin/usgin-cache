var express = require('express'),
    app = express(),
    solrClient = require('solr-client'),
    solr = solrClient.createClient();

app.use(express.static(__dirname + '/public'));

app.get('/data/:zoom', function (req, res, next) {
  // ## Getting Data
  // This function is the primary API for drawing data out of the system for visualization.
  // All you have to do is make a GET request, and make sure to pass an integer Zoom number.
  // Optionally, you can provide a `?bbox=w,s,e,n` query to limit the search by area.

  // TODO:
  // - Get clustered data based on the requested Zoom level
  // - Allow for more complex searching (this may occur through a broader API)

  // Make sure that a Zoom level was specified
  if (isNaN(req.params.zoom)) return res.send(400);

  // Start building a Solr Query
  var query = solr.createQuery()
    .q('*.*').rows(10000000);

  // Deal with the bbox if provided
  if (req.query.bbox) {
    var bbox = req.query.bbox.split(',');
    query = query.rangeFilter({
      field: 'geo',
      start: [bbox[1],bbox[0]].join(','),
      end: [bbox[3],bbox[2]].join(',')
    });
  }

  // Make the query
  solr.search(query, function (err, result) {
    if (err) return next(err);

    // Convert to GeoJSON FeatureCollection
    var features = result.response.docs.map(function (doc) {
      var geo = doc.geo[0].split(' ');
      return {
        type: "Feature",
        properties: doc,
        geometry: {
          type: "Point",
          coordinates: [Number(geo[0]), Number(geo[1])]
        }
      };
    });
    res.json({type: "FeatureCollection", features: features});
  });
});

app.listen(3000);