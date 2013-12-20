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
      var map = this._map;

      if (map) {
        var zoom = map.getZoom(),
            bounds = map.getBounds().toBBoxString();
        d3.json('/data/' + zoom + '?bbox=' + bounds, L.bind(function (err, data) {
          this.clearLayers();

          if (data.features.length > 0) {
            this.addData(data);
            if (!this._dataAdded) {
              L.LayerGroup.prototype.onAdd.call(this, map);
              this._dataAdded = true;
            }
            if (this._tilesAdded) {
              map.removeLayer(this._tiles);
              this._tilesAdded = false;
            }
          } else {
            if (this._dataAdded) {
              L.LayerGroup.prototype.onAdd.call(this, map);
              this._dataAdded = false;
            }
            if (!this._tilesAdded) {
              this._tiles.addTo(map);
              this._tilesAdded = true;
            }
          }


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
      return L.circleMarker(ll, {
        weight: 0,
        radius: 3.5,
        fillOpacity: 0.7,
        fillColor: '#594'
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