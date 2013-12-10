var express = require('express'),
    path = require('path'),
    app = express();

app.get('/csw', function (req, res, next) {
    if (req.query.request) {
        switch (req.query.request.toLowerCase()) {
            case 'getrecords':
                return res.download(path.join(__dirname, 'cswResponse.xml'));
                break;
            case 'getrecordbyid':
                if (req.query.id === '00570e7187459885e5c18c3a5f498d5d') {
                    return res.download(path.join(__dirname, 'sampleMetadata', req.query.id + '.iso.xml'));
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
