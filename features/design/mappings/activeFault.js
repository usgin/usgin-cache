module.exports = function (doc) {
    var props = doc.feature.properties || {};
    if (doc.featuretype === 'aasg:ActiveFault') {
        var result = {
            id: props.FeatureURI,
            content_model: 'http://schemas.usgin.org/uri-gin/ngds/dataschema/activefault/',
            url: props.FeatureURI,
            faultname_t: props.Name,
            label_t: props.Label,
            othername_t: props.Name,
            otheridentifier_t: props.SpecificationURI,
            description_t: props.Description,
            geo: doc.feature.geometry.coordinates[0] + ' ' + doc.feature.geometry.coordinates[1]
        }
        emit(doc.cacheId, result);
    }
};