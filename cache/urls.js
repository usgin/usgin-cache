var url = require('url'),
    qs = require('querystring');

// Function that extracts the base url from whatever someone decided to give
function cleanBaseUrl(givenUrl) {
  var parsedUrl = url.parse(givenUrl, true, true);
  return url.format({
    protocol: parsedUrl.protocol,
    host: parsedUrl.host,
    auth: parsedUrl.auth,
    pathname: parsedUrl.pathname
  });
}

module.exports = {
  // Given a request type and base url, construct the approriate OGC request URL
  request: function (requestType, baseUrl, params) {
    var base = cleanBaseUrl(baseUrl),
        query = {};
    
    params = typeof params === 'object' ? params : {};
    requestType = requestType.toLowerCase();
    
    if (requestType === 'getrecords') {
      query = {
        service: 'CSW',
        version: '2.0.2',
        request: 'GetRecords',
        typeNames: params.typeNames || 'gmd:MD_Metadata',
        outputSchema: params.outputSchema || 'http://www.isotc211.org/2005/gmd',
        elementSetName: params.elementSetName || 'brief',
        resultType: params.resultType || 'results',
        maxRecords: params.limit || 10,
        startPosition: params.start || 0
      };
    }
    
    else if (requestType === 'getrecordbyid') {
      query = {
        service: 'CSW',
        version: '2.0.2',
        request: 'GetRecordById',
        typeNames: params.typeNames || 'gmd:MD_Metadata',
        outputSchema: params.outputSchema || 'http://www.isotc211.org/2005/gmd',
        elementSetName: params.elementSetName || 'full',
        id: params.id || ''
      };
    }
    
    else if (requestType === 'getcapabilities') {
      query = {
        service: 'WFS',
        request: 'GetCapabilities'
      };

      if (params.version) query.version = params.version;
    }

    else if (requestType === 'getfeature') {
      query = {
        service: 'WFS',
        version: params.version || '1.1.0',
        request: 'GetFeature',
        typeName: params.featureType || ''
      };
      
      if (params.outputFormat) query.outputFormat = params.outputFormat;
      if (params.maxFeatures) query.maxFeatures = params.maxFeatures;
    }
    
    else {
      throw new Error(requestType + ' is not a valid request type');
    }
    
    return [base, qs.stringify(query)].join('?');
  },
  
  // Just return the cleaned-up base URL
  base: cleanBaseUrl
};
    