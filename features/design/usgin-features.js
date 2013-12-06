var cacheId = function (doc) {
  if (doc.cacheId) {
    emit(doc.cacheId, 1);
  }
};

var featureType = function (doc) {
  if (doc.featuretype) {
    emit(doc.featuretype, doc.feature);
  }
}

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

module.exports = {
  _id: '_design/usgin-features',
  language: 'javascript',
  views: {
    cacheId: {
      map: cacheId.toString()
    },
    featureType: {
      map: featureType.toString()
    }
  },
  lists: {
    featureCollection: featureCollection.toString()
  }
};