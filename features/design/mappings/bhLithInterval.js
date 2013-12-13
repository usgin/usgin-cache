// ## An Example of a Map Function
// 
// This function generates a Solr index document from a GeoJSON representation of a ThermalSprings feature.
// Here we're presenting a relatively simple pattern that all such functions should follow:
// 
// - Define the function as `module.exports = function (doc) {...}`. This will allow the program to find the function and include it in CouchDB.
// - The name of the file (stripped of `.js`) will become the name of the "view" in CouchDB.
// - This function is given one CouchDB document, and must return an object that represents the Solr index document for this feature.
// - Once included in the database, the view will be accessible at http://localhost:5984/usgin-features/_design/usgin-features/_view/yourFileName.
module.exports = function (doc) {
    // A GeoJSON objects stores attributes inside an object called `properties`.
    var props = doc.feature.properties || {};
    // It is important to include a condition limiting what should be indexed by this function.
    if (doc.featuretype === 'aasg:BoreholeLithInterval') {
        // Build an object that represents the key/value pairs that Solr will index.
        // These will become the fields that you can search the Solr index on.
        var result = {
            // It is always important to include an ID value.
            id: props.ThermalSpringURI,
            // It is useful to include the identifier for the content model for NGDS purposes.
            content_model: 'http://schemas.usgin.org/uri-gin/ngds/dataschema/bhlithinterval/',
            // It is great if you can include a normative URL for this feature.
            url: props.ThermalSpringURI,
            // *_t fields will be indexed as text, and also added to the default full-text index field.
            springname_t: props.SpringName,
            label_t: props.Label,
            othername_t: props.OtherName,
            otheridentifier_t: props.OtherIdentifier,
            description_t: props.Description,
            // ### Index the geometry
            // It is very important to index the geometry properly.
            // For points, this is as simple as listing the coordinates as `x y` or `lon lat`
            // [Here is more information about Geo and Solr](http://wiki.apache.org/solr/SolrAdaptersForLuceneSpatial4)
            geo: doc.feature.geometry.coordinates[0] + ' ' + doc.feature.geometry.coordinates[1]
        }
        // Finally, instruct CouchDB to "emit" the result.
        // 
        // It is important to give `doc.cacheId` as the key. This will allow the results to be narrowed down to a single WFS if appropriate
        emit(doc.cacheId, result);
    }
};