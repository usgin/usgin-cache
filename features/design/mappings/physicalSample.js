module.exports = function (doc) {
    var props = doc.feature.properties || {};
    if (doc.featuretype === 'aasg:PhysicalSample') {
        var result = {
            id: props.SpecimenURI,
            content_model: 'http://schemas.usgin.org/uri-gin/ngds/dataschema/physicalsample/',
            url: props.SpecimenURI,
            faultname_t: props.OtherID,
            label_t: props.SpecimenLabel,
            othername_t: props.SamplingFeatureName,
            otheridentifier_t: props.SamplingFeatureURI,
            description_t: props.Description,
            geo: doc.feature.geometry.coordinates[0] + ' ' + doc.feature.geometry.coordinates[1]
        }
        emit(doc.cacheId, result);
    }
};