var _ = require('underscore'),
  async = require('async');

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
      return marker.feature;
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
  }
};