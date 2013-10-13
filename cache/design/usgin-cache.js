var requests = function (doc) {
  if (doc.hasOwnProperty('requestType')) {
    emit(doc.requestType, 1);
  }
};

var metadataIds = function (doc) {
  if (doc.endpoint && doc.response && doc.requestType && doc.requestType === 'getrecords') {
    var re = /<gmd:fileIdentifier><gco:CharacterString>(.+?)<\/gco:CharacterString><\/gmd:fileIdentifier>/g,
        xml = doc.response,
        match;
    while (match = re.exec(xml)) {
      emit(match[1], doc.endpoint);
    }
  }
};

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

var threshold = function (head, req) {
  start({ 'headers': { 'Content-type': 'application/json' } });
  var min = req.query.min || 0,
      max = req.query.max || 9999,
      result = [];
  
  while (row = getRow()) {
    if (row.key >= min && row.key <= max) {
      result.push(row.value);
    }
  }

  send(JSON.stringify(result));
};

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
    }
  },
  lists: {
    threshold: threshold.toString()
  }
};