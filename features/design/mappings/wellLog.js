module.exports = function (doc) {
    var props = doc.feature.properties || {};
    if (doc.featuretype === 'aasg:WellLog') {
        var result = {
            id: props.LogURI,
            content_model: 'http://schemas.usgin.org/uri-gin/ngds/dataschema/welllog/',
            url: props.LogURI,
            header_t: props.WellBoreURI,
            logtypeterm_t: props.LogTypeTerm,
            scannedfileurl_t: props.ScannedFileURL,
            lasfileurl_t: props.LASFileURL,
            geo: doc.feature.geometry.coordinates[0] + ' ' + doc.feature.geometry.coordinates[1]
        }
        emit(doc.cacheId, result);
    }
};