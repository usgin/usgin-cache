/**
 * Created by nahmed on 6/15/2015.
 */
var fs = require('fs'),
    request = require('request'),
    http = require('http');
mongoose = require('mongoose');

var mapReducefunction1 = function(){
emit(this._id,this.language);
}


//var srcPath = "C:/usgin-cache/response.xml";
mongoose.connect('mongodb://127.0.0.1/usgin-cache');
var conn = mongoose.connection;
conn.usgin-cache.mapReduce(
    mapReducefunction1,
    {out:"map-reduce-example"}
)
//Grid.mongo = mongoose.mongo;
var localFile = "C:/usgin-cache/doc/response.xml";
var url = 'http://services.azgs.az.gov/ArcGIS/services/aasggeothermal/CAThermalSprings/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=ThermalSpring';
var file = fs.createWriteStream(localFile);

var request = http.get(url, function(response) {
    response.pipe(file);
    file.once('finish', function () {
        fs.readFile(localFile,'utf-8', function(err, data) {
            console.log(data);
        });
    });
});