(function() {
  this.cacheDemo = {};

  var NgdsCache = L.GeoJSON.extend({
    initialize: function (options) {
      var self = this;
      
      L.GeoJSON.prototype.initialize.call(this, null, options);
    },
    
    onAdd: function (map) {
      L.LayerGroup.prototype.onAdd.call(this, map);
      map.on('moveend', this.getData, this);
      this.getData();
    },
    
    onRemove: function (map) {
      map.off('moveend', this.getData, this);
      L.LayerGroup.prototype.onRemove.call(this, map);
    },
    
    getData: function (evt) {
      if (this._map) {
        var zoom = this._map.getZoom(),
            bounds = this._map.getBounds().toBBoxString();
        console.time('Zoom level ' + zoom);
        d3.json('/data/' + zoom + '?bbox=' + bounds, L.bind(function (err, data) {
          this.clearLayers();
          this.addData(data);
          console.timeEnd('Zoom level ' + zoom);
          console.log('\t' + data.features.length + ' features drawn');
          console.log('\t' + data.features.reduce(function (memo, f) {return memo + Number(f.properties.count);}, 0) + ' child features');
        }, this));
      }
    }
  });

  var ngdsCache = this.cacheDemo.ngdsCache = function (options) {
    return new NgdsCache(options);
  };

  var map = this.cacheDemo.map = L.map('map').setView([40.346, -97.448], 5);
  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    subdomains: '1234',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles &copy; <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" />'
  }).addTo(map);

  ngdsCache({
    pointToLayer: function (f, ll) {
      return L.circleMarker(ll, {
        weight: 2,
        radius: 6,
        fillOpacity: 0.7,
        fillColor: '#E88282',
        color: f.properties.count ? '#000' : '#BD1E1E'
      });
    }
  }).addTo(map);

}).call(this);