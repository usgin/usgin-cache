// # usgin-cache Design Document

// A view to index cached records by requestType
var requests = function (doc) {
  if (doc.hasOwnProperty('requestType')) {
    emit(doc.requestType, 1);
  }
};

// A view to list metadata IDs from the cached set of CSW GetRecords requests.
// These IDs are indexed by the CSW URL from which they were fetched
var metadataIds = function (doc) {
  if (doc.endpoint && doc.response && doc.requestType && doc.requestType === 'getrecords') {
    var re = /<gmd:fileIdentifier>\n?<gco:CharacterString>(.+?)<\/gco:CharacterString>\n?<\/gmd:fileIdentifier>/g,
        xml = doc.response,
        match;
    while (match = re.exec(xml)) {
      emit(doc.endpoint, match[1]);
    }
  }
};

// A view to list WFS URLs that are found in metadata records in the cache.
// This finds all `<gmd:URL>` elements in the metadata record and ranks how likely it is to be a WFS URL.
// The URLs are indexed on this ranking, so that they can be sorted by it. See `threshold` below.
// Ranking points as follows:
//
// - 5 points: contains "service=wfs"
// - 3 points: contains "wfs"
// - 1 point: contains "request="
// - 1 point: contains "version="
//
// Points are cumulative -- that is, a URL containing `service=wfs` will always get at least 8 points.
var wfsUrls = function (doc) {
  if (doc.response && doc.requestType && doc.requestType === 'getrecordbyid') {
    var findUrls = /<gmd:URL>(.+?)<\/gmd:URL>/g,
    xml = doc.response,
    urls = [], match;

    while (match = findUrls.exec(xml)) { urls.push(match[1]); }

    var exps = [
      {re: /service=wfs/i, points: 5}, {re: /wfs/i, points: 3},
      {re: /request=/i, points: 1}, {re: /version=/i, points: 1}
    ];

    urls.map(function (url) {
      return {
        url: url,
        rank: exps.reduce(function (result, exp) {
          var rank = isNaN(result) ? (result.re.exec(url) ? result.points : 0) : result;
          return exp.re.exec(url) ? rank + exp.points : rank;
        })
      };
    }).forEach(function (ranked) {
      emit(ranked.rank, ranked.url);
    });
  }
};

// A view function to find featuretypes in WFS Capabilities docs
var wfsFeatureTypes = function (doc) {
  if (doc.response && doc.requestType && doc.requestType === 'getcapabilities') {
    var findTypes = /Name>(.+?)<\//g,
        xml = doc.response,
        featureTypes = [], match;

      while (match = findTypes.exec(xml)) featureTypes.push(match[1]);

      featureTypes.forEach(function (featureType) {
        emit(featureType, doc.endpoint);
      });
  }
};

// A view function to find cached WFS responses of a particular featuretype
var wfsFeaturesByType = function (doc) {
  if (doc.featuretype) {
    emit(doc.featuretype, doc.response);
  }
};

// A list function that is intended to be used in tandem with the above `wfsUrls` view.
// A request should look something like this:
//
//     /_design/usgin-cache/_list/threshold/wfsUrls?min=5
//
// This will return a list of URLs with a minimum ranking of 5. See `wfsUrls` for rank breakdown.
var threshold = function (head, req) {
  var min = req.query.min || 0,
      max = req.query.max || 9999,
      result = [];
  
  start({ 'headers': { 'Content-type': 'application/json' } });

  while (row = getRow()) {
    if (row.key >= min && row.key <= max) {
      result.push(row.value);
    }
  }

  send(JSON.stringify(result));
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

// This is the design document itself
module.exports = {
  _id: '_design/usgin-cache',
  language: 'javascript',
  views: {
    requests: {
      map: requests.toString()
    },
    metadataIds: {
      map: metadataIds.toString()
    },
    wfsUrls : {
      map: wfsUrls.toString()
    },
    wfsFeatureTypes: {
      map: wfsFeatureTypes.toString()
    },
    wfsFeaturesByType: {
      map: wfsFeaturesByType.toString()
    }
  },
  lists: {
    threshold: threshold.toString(),
    values: values.toString()
  }
};