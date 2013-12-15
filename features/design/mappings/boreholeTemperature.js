module.exports = function (doc) {
    var props = doc.feature.properties || {};
    if (doc.featuretype === 'aasg:BoreholeTemperature') {
        var result = {
            id: props.ObservationURI,
            content_model: 'http://schemas.usgin.org/uri-gin/ngds/dataschema/boreholetemperature/',
            url: props.ObservationURI,
            header_t: props.HeaderURI,
            label_t: props.Label,
            measuredtemp_t: props.MeasuredTemperature,
            tempunits_t: props.TemperatureUnits,
            geo: doc.feature.geometry.coordinates[0] + ' ' + doc.feature.geometry.coordinates[1]
        }
        emit(doc.cacheId, result);
    }
};