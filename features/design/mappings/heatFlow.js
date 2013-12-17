module.exports = function (doc) {
    var props = doc.feature.properties || {};
    if (doc.featuretype === 'aasg:HeatFlow') {
        var result = {
            id: props.ObservationURI,
            content_model: 'http://schemas.usgin.org/uri-gin/ngds/dataschema/heatflow/',
            url: props.ObservationURI,
            header_t: props.HeaderURI,
            siteheatflow_t: props.SiteHeatFlow,
            geo: doc.feature.geometry.coordinates[0] + ' ' + doc.feature.geometry.coordinates[1]
        }
        emit(doc.cacheId, result);
    }
};