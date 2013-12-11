var express = require('express'),
    path = require('path'),
    app = express();

app.get('/wfs', function (req, res, next) {
    if (req.query.request) {
        switch (req.query.request.toLowerCase()) {
            case 'getcapabilities':
                return res.download(path.join(__dirname, 'sampleWfsGetCapabilitiesResponses/00570e7187459885e5c18c3a5f498d5d.iso.xml'));
            case 'getfeature':
                if (req.query.typeName === 'azgs:earthquakedata') {
                    return res.download(path.join(__dirname, 'wfsResponse.xml'));
                }
                break;
            default:
                break;
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
