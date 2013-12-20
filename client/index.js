var express = require('express'),
    app = express(),
    solrClient = require('solr-client'),
    features = require('../features')(),

    argv = require('optimist')
      .alias('solr', 's')
      .describe('solr', '[optional] Connection information for interacting with SOLR')
      .default('solr', '')
      .argv;

if (argv.solr !== '') {
  var connect = /\/\/(.+?):(\d+)\/((.+)\/)?(.+)/.exec(argv.solr);
  argv.solr = {
    host: connect[1],
    port: connect[2],
    core: connect[4],
    path: '/' + connect[5]
  };
}

var solr = solrClient.createClient(argv.solr.host, argv.solr.port, argv.solr.core, argv.solr.path);
//var solr = solrClient.createClient();

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
  if (!req.query.bbox) return res.send(400);

  var bbox = req.query.bbox.split(','),
      range = {
        field: 'geo',
        start: [bbox[1],bbox[0]].join(','),
        end: [bbox[3],bbox[2]].join(',')
      },
      query = solr.createQuery()
        .q('*.*').rows(0)
        .rangeFilter(range);

  if (req.params.zoom < 9) {
    // Make a request for clusters from CouchDB
    features.getClusters(req.params.zoom, function (err, result) {
      if (err) return next(err);
      res.json(result);
    });
  } else {
    // Check how many features Solr would return directly
    solr.search(query, function (err, result) {
      if (result.response.numFound > 3000) {
        console.log(result.response.numFound);
      } else {
        query = solr.createQuery()
          .q('*.*').rows(result.response.numFound)
          .rangeFilter(range);
        solr.search(query, function (err, result) {
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
      }
    });
  }
});

app.listen(3000);