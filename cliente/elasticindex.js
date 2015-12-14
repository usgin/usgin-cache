var express = require('express'),
    app = express(),
  //  features = require('../features')();
    index = "usgin-caches",
    type = "",
    ElasticSearchClient = require('elasticsearchclient'),
    Q = require('q'),
    serverOptions = { host: 'localhost',port: 9200 },
    elasticSearchClient = new ElasticSearchClient(serverOptions);
    app.use(express.static(__dirname + '/public'));
    console.log("app.use="+ __dirname + '/public');
    app.get('/data/:zoom', function (req, res, next) {
    //console.log('Zoom: ', req.params.zoom);
    //res.send('hello world');
    // ## Getting Data
    // This function is the primary API for drawing data out of the system for visualization.
    // All you have to do is make a GET request, and make sure to pass an integer Zoom number.
    // Optionally, you can provide a `?bbox=w,s,e,n` query to limit the search by area.

    // ## Important
    // This only returns features if there will be less than 3000 in the response. Otherwise it returns an empty FeatureCollection.
    // TODO:
    // - Allow for more complex searching (this may occur through a broader API)
    // Make sure that a Zoom level was specified
    if (isNaN(req.params.zoom)) return res.send(400);
    if (!req.query.bbox) return res.send(400);

    var bbox = req.query.bbox.split(','),
        range = {
            field: 'geo',
            start: [bbox[1], bbox[0]].join(','),
            end: [bbox[3], bbox[2]].join(',')
        };

    var qryObj = {
        "from": 0, "size":3000,
        "query" : {
            "filtered": {
                "filter": {
                    "geo_bounding_box": {
                        "type":    "indexed",

                        "geometry": {
                            "bottom_left": {  "lat":  bbox[1],"lon": bbox[0] // "lat": 29.57345707301757,"lon": -128.1884765625
                            },
                            "top_right": {    "lat":  bbox[3],"lon":  bbox[2] // "lat": 49.63917719651036,"lon": -66.6650390625
                            }
                        }
                    }
                }
            }
        }
    };

    elasticSearchClient.search(index, type, qryObj, function (err, result) {
        if (result != null) {
            var JsonResults = JSON.parse(result);
            //console.log(JsonResults);
             //console.log("in the features... "+doc.geo[0]);
            console.log(bbox + ': Features:' + JsonResults.hits.total + " --" );
            elasticSearchClient.search(index, type, qryObj, function (err, result) {
                var features = JsonResults.hits.hits.map(function (doc) {
                var long = Number(doc._source.feature.geometry.lon);
                var lat = Number(doc._source.feature.geometry.lat);
                //    console.log(lat)
                return {
                    type: "Feature",
                    properties: doc._source.feature.properties,
                    geometry: {
                        type: "Point",
                        coordinates: [long, lat]
                        //geometry: [long, lat]
                    }
                };
            });
            res.json({type: "FeatureCollection", features: features});
            }); // Second search feature
        } else {
            console.log("Empty results");
            res.json({type: "FeatureCollection", features: []});
        }
   });
});
//}
app.listen(3000);
