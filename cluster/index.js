var _ = require('underscore'),
  async = require('async'),
  pgCluster = require('./pgCluster'),
  sm = new (require('sphericalmercator'));

function cluster(geojson, zoom, callback) {
  var L = require('./leaflet')(),
    
    map = L.map('map', {
      center: [38.543869175876154, -92.5433349609375],
      zoom: zoom,
      maxZoom: 10
    }),
    
    dataLayer = L.geoJson(geojson),
    clusterLayer = new L.MarkerClusterGroup();
  
  map.addLayer(clusterLayer);
  clusterLayer.addLayer(dataLayer);
  
  var features = clusterLayer._featureGroup.getLayers().map(function (layer) {
    var f = layer.toGeoJSON();
    var children = typeof layer.getAllChildMarkers === 'function' ? layer.getAllChildMarkers() : [];
    f.properties.children = children.map(function (marker) {
      return {
        id: marker.feature.properties.id,
        content_model: marker.feature.properties.content_model
      };
    });
    return f;
  });

  // TODO: index features by featuretype

  callback(null, features);
}

module.exports = {
  cluster: cluster,
  
  clusterRange: function (features, range, callback) {
    // TODO: check that range is full of integers
    async.map(range, function (zoom, cb) {
      cluster(features, zoom, cb);
    }, function (err, results) {
      var result = results.reduce(function (memo, r, i) {
        memo[range[i]] = r;
        return memo;
      }, {});
      callback(null, result);
    });
  },

  pgClusterRange: function (mapping, range, callback) {
    function clusterOneTile(bbox, callback) {
      pgCluster(mapping, bbox, null, 3, callback);
    }

    function bboxes(zoom) {
      var values = _.range(Math.pow(2, zoom));
      return values.reduce(function (memo, x) {
        var bboxes = values.map(function (y) { return sm.bbox(x, y, zoom).join(','); });
        return memo.concat(bboxes);
      }, []);
    }

    function clusterOneZoomLevel(zoom, callback) {
      async.mapLimit(bboxes(zoom), 10, clusterOneTile, function (err, results) {
        if (err) return callback(err);
        var features = results.reduce(function (memo, featureCollection) {
          return memo.concat(featureCollection.features);
        }, []);
        callback(null, [zoom, features]);
      });
    }

    function zoomLevelsClustered(err, results) {
      if (err) return callback(err);
      callback(null, results.reduce(function (memo, result) {
        memo[result[0]] = result[1];
        return memo;
      }, {}));
    }

    async.mapSeries(range, clusterOneZoomLevel, zoomLevelsClustered);
  }
};