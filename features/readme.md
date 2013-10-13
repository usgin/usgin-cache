# Features Module

Primary goal is to convert WFS GetFeature responses into sets of GeoJSON features, and store each as a document in the cache. Must be able to:
- Link GeoJSON features back to the WFS GetFeature request they came from
- so that they can be refreshed or removed as needed
- views to convert to solr index docs
- build cluster features behind the scenes