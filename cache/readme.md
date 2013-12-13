# Cache Class

This module exists to deal with making OGC service requests. It pulls data from the cache when appropriate, or adds/updates the cache if it needs to.

## Get connected to a cache

    var cache = require('./cache')(false, config);
  
... where:

- the first argument is `Boolean`, and indicates whether or not we should force the system to refresh the cache. That is, setting this to `true` will force a request to the OGC service, ignoring what has been cached.
- the second argument is an object with two properties:
  - `dbUrl`: the url for the CouchDB
  - `dbName`: the name of the CouchDB database that contains the cache
  
If no `config` object is provided, the default values is

    {
      dbUrl: 'http://localhost:5984',
      dbName: 'usgin-cache'
    }
  
## Cache API

When returning documents, the cache will return CouchDB docs, which look like this:

    {
      _id: 'document's id',
      _rev: 'document's revision',
      requestType: 'getrecords|getrecordbyid|getfeature',
      response: 'XML content from the OGC service'
      endpoint: 'The base url for the service from which this record was fetched'
    }

In the case of WFS GetFeature responses, the document will also contain the following property:

    featuretype: 'The type of feature contained in this document'

Also, in the case of WFS GetFeature reponses, the response XML will not be included in the DouchDB doc. Instead, the response XML will be contained in an attached file.

### cache.setup([callback])

This function will make sure that the database exists, and create it if it does not. `callback` is fired once the database definitively exists. Loads the design document defined in `./design/usgin-cache.js`.

### cache.clear([callback])

This function removes all documents from the database that are not design documents.

### cache.getRecords(cswBaseUrl, [start], [limit], [callback])

Will perform a CSW GetRecords request with the specified pagination parameters. `cswBaseUrl` is required, while `start` and `limit` are optional, defaulting to 0 and 10, respectively. 

Obeying the cache refresh rule that you set when creating the `cache` object, the function will either make an OGC request, or grab a document from the cache. If provided, `callback` is fired with `(err, document)` when complete.

### cache.idsForCsw(cswBaseUrl, [callback])

Returns a list of metadata IDs from a particular CSW (identified by its `baseUrl`). Assumes that the cache is already populated for this CSW through a series of `cache.getRecords` requests. `callback` is fired with `(err, [array of ids])`.
  
### cache.getRecordById(cswBaseUrl, id, [callback])

Will perform a CSW GetRecordById request. `cswBaseUrl` and `id` are required. `callback` is identical to above.

### cache.wfsUrls([callback])

Returns a list of URLs mined from metadata records that appear to be WFS urls. `callback` is fired with `(err, [array of urls])`.

### cache.getCapabilities(wfsBaseUrl, [callback])

Performs a WFS GetCapabilities request. `callback` identical to above.

### cache.getFeature(wfsBaseUrl, featureType, [maxFeatures], [callback])

Will perform a WFS GetFeature request. `wfsBaseUrl` and `featureType` are required, while `maxFeatures` is optional. `callback` identical to above.

### cache.getFeaturesByType([featureType], [callback])

Returns a document that represents the WFS GetFeature responses that are available in the cache. These responses are indexed by the name of the featureType that they contain. If a `featureType` is provided, then only responses of that type are returned.

### cache.db

Access to the CouchDB database through [nano](https://github.com/dscape/nano#document-functions) that can be operated on to read/write to the cache if you need to. Should be avoided if possible.