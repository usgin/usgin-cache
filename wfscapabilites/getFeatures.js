/**
 * Created by nahmed on 6/17/2015.
 */
var     request = require('request'),
        toGeoJson = require('./toGeoJson'),
        jsonStream = require('JSONStream'),
        fs = require('fs'),
        util = require('util'),
        mongoose = require('mongoose'),
        Grid = require('gridfs-stream');
        Grid.mongo = mongoose.mongo;
        var conn = mongoose.createConnection('mongodb://localhost:27017/usgin-cache');
        var gfs = Grid(conn.db);

module.exports = function(){
    return{
        getFeatures: function (featureType,cacheId,url,filename){
        var Points = require('./mongoconn').Points;
        var ogr = toGeoJson();
        //var wfsData = fs.createReadStream('response.xml'),
        conn.once('open', function () {

            var wfsData = gfs.createReadStream({filename: filename}),
                bulkWriter = jsonStream.stringify(),
                stringifyDisply = '';

            wfsData.pipe(ogr.input); // Pipe WFS File Stream into OGR as Input
            var parser = jsonStream.parse('features.*')
             .on('data',function(feature){
             bulkWriter.write({
             cacheId: cacheId,
             baseUrl: url,
             featuretype: featureType,
             feature: feature

             });
             })
             .on('end',bulkWriter.end);
             console.time('\t- ' + cacheId);
             ogr.output.pipe(parser); // Parse GeoJSON Stream obtained through Pipe from OGR
             bulkWriter.on('error', function (err) {
             console.log('An error occurred!', err);
             throw err;
             });
             bulkWriter.on('data',function(chunk){
             stringifyDisply += chunk;
             });
             bulkWriter.on('end',function(){
             var featureArray = JSON.parse(stringifyDisply);
             Points.create(featureArray,function(err) { if(err){console.log(err)}});
             console.log(cacheId + ' Completed in ');
             console.timeEnd('\t- ' + cacheId);
             });

         }); //connection open
        }
    };
    //  JsonStreamOgrMongo('aasg:ThermalSpring','111'); // For Individual Test Run
};