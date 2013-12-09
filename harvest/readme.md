# Harvest Class

This module is used for gathering content from a CSW server.  It paginates through GetRecords requests to cache all records when possible, or it caches records by specific features in the data.

## Harvest API

Gathers content from a CSW server and caches it to a CouchDB document database.

### harvest.harvestCsw(cswBaseUrl, [callback])

Given a CSW service endpoint, this high-level function populates the cache with metadata content from the CSW.  Metadata records can be obtained all at once or by ID.

### harvest.gatherFeatures([featuretype], [callback])

Populates the cache with features of the specified featureType.