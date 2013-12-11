(function() {
  this.cacheDemo = {};

  var map = this.cacheDemo.map = L.map('map');
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

}).call(this);