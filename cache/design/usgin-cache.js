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

module.exports = {
  _id: '_design/usgin-cache',
  language: 'javascript',
  views: {
    requests: {
      map: requests.toString()
    },
    metadataIds: {
      map: metadataIds.toString()
    }
  }
};