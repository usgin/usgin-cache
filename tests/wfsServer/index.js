var express = require('express'),
    path = require('path'),
    app = express();

app.get('/wfs/:serviceId', function (req, res, next) {
    if (req.params.serviceId) {
        if (req.query.request) {
            switch (req.query.request.toLowerCase()) {
                case 'getcapabilities':
                    return res.download(path.join(__dirname, 'sampleWfsGetCapabilitiesResponses', req.params.serviceId + '.iso.xml'));
                    break;
                case 'getfeature':
                    if (req.query.typeName) {
                        return res.download(path.join(__dirname, 'sampleWfsGetFeatureResponses', req.params.serviceId + req.query.typeName + '.iso.xml'));
                        //return res.download(path.join(__dirname, 'sampleWfsGetFeatureResponses', req.params.serviceId + req.query.typeName + '.iso.xml'));
                    }
                    break;
                default:
                    break;
            }
        }
    }

    next(new Error('invalid request'));
});

if (require.main === module) {
    app.listen(3010);
} else {
    var p;
    module.exports = {
        start: function (callback) {
            p = app.listen(3010);
            setTimeout(callback, 500);
        },

        stop: function (callback) {
            p.close();
            setTimeout(callback, 500);
        }
    };
}
