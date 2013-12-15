module.exports = function (doc) {
    var props = doc.feature.properties || {};
    if (doc.featuretype === 'aasg:BoreholeLithIntercept') {
        var result = {
            id: props.BHInterceptURI,
            content_model: 'http://schemas.usgin.org/uri-gin/ngds/dataschema/bhlithintercept/',
            url: props.BHInterceptURI,
            bhlithinterceptname_t: props.WellName,
            label_t: props.APINo,
            othername_t: props.WellName,
            otheridentifier_t: props.BoreholeName,
            description_t: props.Description,
            geo: doc.feature.geometry.coordinates[0] + ' ' + doc.feature.geometry.coordinates[1]
        }
        emit(doc.cacheId, result);
    }
};