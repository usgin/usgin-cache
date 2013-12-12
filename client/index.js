var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.get('/data/:zoom', function (req, res, next) {

});

app.listen(3000);