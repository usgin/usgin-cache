(function() {
  this.cacheDemo = {};

  var ClusterCache = L.GeoJSON.extend({
    initialize: function (options) {
      var self = this;
      
      L.GeoJSON.prototype.initialize.call(this, null, options);
      
      d3.json('url/for/cached-cluster.json', function (err, json) {
        self._data = json;
        self.zoomEnd();
      });
    },
    
    onAdd: function (map) {
      L.LayerGroup.prototype.onAdd.call(this, map);
      map.on('zoomend', this.zoomEnd, this);
      if (this._data) { this.zoomEnd(); }
    },
    
    onRemove: function (map) {
      map.off('zoomend', this.zoomEnd, this);
      L.LayerGroup.prototype.onRemove.call(this, map);
    },
    
    zoomEnd: function (evt) {
      if (this._data && this._map) {
        var zoom = this._map.getZoom();
        
        this.clearLayers();
        this.addData(this._data[zoom]);
      }
    }
  });

  var clusterCache = this.cacheDemo.clusterCache = function (options) {
    return new ClusterCache(options);
  };

  var map = this.cacheDemo.map = L.map('map').setView([40.346, -97.448], 5);
  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    subdomains: '1234',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles &copy; <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" />'
  }).addTo(map);

}).call(this);