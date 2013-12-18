# Features Module

This module exists to deal with turning OGC service requests into GeoJSON features and storing them. It pulls data from the OGC cache and updates another database table with GeoJSON features.

## Get connected to the feature-store

    var features = require('./features')(config);
  
... where:

- the `config` argument is an object with three properties:
  - `dbUrl`: the url for the CouchDB
  - `dbName`: the name of the CouchDB database that contains the cache
  - `cacheName`: the name of the CouchDB database that contains the OGC request cache
  
If no `config` object is provided, the default values are

    {
      dbUrl: 'http://localhost:5984',
      dbName: 'feature-cache',
      cacheName: 'usgin-cache'
    }

## What stored features look like

The features cache contains records that represent individual WFS features that were collected in the OGC request cache. Each record in this database looks something like this:

    {
      '_id': 'The CouchDB-assigned ID for the document',
      '_rev': 'The CouchDB-assigned revision identifier for the document's current state',
      'cacheId': 'A reference to the WFS GetFeature response document stored in the OGC request cache',
      'featuretype': 'The name of the type of feature that is represented',
      'feature': {The GeoJSON representation of a single feature}
    }

## Features API

### features.setup([callback])

This function will make sure that the database exists, and create it if it does not. `callback` is fired once the database definitively exists. Loads the design document defined in `./design/feature-cache.js`.

### features.clear([callback])

This function removes all documents from the database that are not design documents.

### features.getFeatures([featuretype], [callback])

This function is used to parse WFS GetFeature responses that exist in the OGC request cache, convert them to GeoJSON features, and store them in the feature cache. This process always overwrites existing content in the feature cache. There are three major stpes in the process:

1. Gather a list of WFS GetFeature responses that are available in the OGC request cache. If a `featuretype` is provided, this will be used to limit the GetFeature documents that will be parsed.
2. For each GetFeature document in the list to be parsed, remove any WFS records that already exist in the feature cache that came from the same document.
3. Convert features in each document to GeoJSON, and store records in the feature cache as described above.

### features.convertWfs(cacheId, [callback])

This function takes a single WFS GetFeature response from the cache (indicated by `cacheId`) and converts it to GeoJSON, placing it into the feature cache.

### features.getGeoJson([featuretype], [callback])

This function returns a set of GeoJSON features as a FeatureCollection. If a `featuretype` is provided, then the FeatureCollection will only contain features of the specified type.

### features.db

Access to the CouchDB database through [nano](https://github.com/dscape/nano#document-functions) that can be operated on to read/write to the cache if you need to. Should be avoided if possible.