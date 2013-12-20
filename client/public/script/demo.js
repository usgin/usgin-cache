(function() {
  this.cacheDemo = {};

  var NgdsCache = L.GeoJSON.extend({
    initialize: function (options) {
      L.GeoJSON.prototype.initialize.call(this, null, options);
      this._tiles = L.tileLayer('http://{s}.tiles.usgin.org/borehole-temperature/{z}/{x}/{y}.png');
      this._tilesAdded = false;
      this._dataAdded = false;
    },
    
    onAdd: function (map) {
      this._map = map;
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
  /*
  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
    subdomains: '1234',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles &copy; <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" />'
  }).addTo(map);
  */
  L.tileLayer('http://{s}.tiles.mapbox.com/v3/azgs.gia5klal/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.mapbox.com/about/maps/">Terms & Feedback</a>',
    detectRetina: true
  }).addTo(map);
  ngdsCache({
    pointToLayer: function (f, ll) {
      var zoom = cacheDemo.map.getZoom(),
          sizes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1, 1.2, 1.5, 2, 2.5, 3.5, 4];

      return L.circleMarker(ll, {
        weight: 0,
        radius: sizes[zoom] || 4,
        fillOpacity: 0.7,
        fillColor: '#E88282',
        color: f.properties.count ? '#000' : '#BD1E1E'
      });
    },
    onEachFeature: function (f, layer) {
      var html = '<table>';
      _.each(_.keys(f.properties), function (propName) {
        html += '<tr><th>' + propName + '</th><td>' + f.properties[propName] + '</td></tr>';
      });
      html += '</table>';
      layer.bindPopup(html, {maxWidth: 600});
    }
  }).addTo(map);

}).call(this);