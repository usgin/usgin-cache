# Harvest Module

The idea here is to control gathering content from a CSW server. It needs to do things like

- Paginate through GetRecords requests to cache them all
- Gather IDs from the `metadataIds` view
- Make and cache all the GetRecordByID requests
- Gather WFS Urls from a view that needs to be made
- Make and cache WFS GetCapabilities requests (this needs to be added to cache module)
- Find WFS urls that offer a particular featuretype (from a view that needs to be made)
- GetFeature from a set of WFS Urls and cache them