module.exports = function (doc) {
    var props = doc.feature.properties || {};
    if (doc.featuretype === 'aasg:DirectUseSite') {
        var result = {
            id: props.FeatureURI,
            content_model: 'http://schemas.usgin.org/uri-gin/ngds/dataschema/directusesite/',
            url: props.FeatureURI,
            sitename_t: props.SiteName,
            label_t: props.Label,
            othername_t: props.OtherLocationName,
            otheridentifier_t: props.FeatureType,
            description_t: props.Description,
            geo: doc.feature.geometry.coordinates[0] + ' ' + doc.feature.geometry.coordinates[1]
        }
        emit(doc.cacheId, result);
    }
};