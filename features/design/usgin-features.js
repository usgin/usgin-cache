var _ = require('underscore'),
    mappings = require('./mappings');

var cacheId = function (doc) {
  if (doc.cacheId) {
    emit(doc.cacheId, doc.feature);
  }
};

var featureType = function (doc) {
  if (doc.featuretype) {
    emit(doc.featuretype, doc.feature);
  }
};

var simple = function (doc) {
  if (doc.featuretype) {
    emit(doc.featuretype, {
      type: "Feature",
      id: doc._id,
      properties: {},
      geometry: doc.feature.geometry
    });
  }
};

var deleteHelper = function (doc) {
  emit(doc.cacheId, {
    _id: doc._id,
    _rev: doc._rev,
    _deleted: true
  });
};

var featureCollection = function (head, req) {
  start({'headers': {'Content-type': 'application/json'}});
  send('{"type":"FeatureCollection","features":[');

  var row = getRow();
  if (row) {
    send(JSON.stringify(row.value));
    while (row = getRow()) {
      send(',' + JSON.stringify(row.value));
    }
  }

  send(']}');
};

var solrToFeatureCollection = function (head, req) {
  function solr2GeoJson(solrDoc) {
    var geo = solrDoc.geo.split(' ');
    return {
      type: "Feature",
      properties: solrDoc,
      geometry: {
        type: "Point",
        coordinates: [Number(geo[0]), Number(geo[1])]
      }
    };
  }

  start({'headers': {'Content-type': 'application/json'}});
  send('{"type":"FeatureCollection","features":[');

  var row = getRow();
  if (row) {
    send(JSON.stringify(solr2GeoJson(row.value)));
    while (row = getRow()) {
      send(',' + JSON.stringify(solr2GeoJson(row.value)));
    }
  }

  send(']}');
};

// A list function that simply returns a list of values. Save yourself one `.map` function.
var values = function (head, req) {
  var result = [];
  while (row = getRow()) {
    result.push(row.value);
  }
  start({ 'headers': { 'Content-type': 'application/json' } });
  send(JSON.stringify(result));
};

var bulk = function (head, req) {
  var row = getRow();
  start({ 'headers': { 'Content-type': 'application/json' } });
  send('{"docs":[');
  if (row) {
    send(JSON.stringify(row.value));
    while (row = getRow()) {
      send(',' + JSON.stringify(row.value));
    }
  }
  send(']}');
}

module.exports = {
  _id: '_design/usgin-features',
  language: 'javascript',
  views: _.extend(mappings, {
    cacheId: {
      map: cacheId.toString()
    },
    featureType: {
      map: featureType.toString()
    },
    simple: {
      map: simple.toString()
    },
    deleteHelper: {
      map: deleteHelper.toString()
    }
  }),
  lists: {
    featureCollection: featureCollection.toString(),
    solrToFeatureCollection: solrToFeatureCollection.toString(),
    values: values.toString(),
    bulk: bulk.toString()
  }
};