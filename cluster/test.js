var cluster = require('./index');
cluster.pgClusterRange('thermalSprings', [0,1,2,3,4,5,6], function (err, result) {
  console.log(err || result);
});