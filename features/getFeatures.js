/**
 * Created by nahmed on 6/17/2015.
 **/
var request = require('request'),
    toGeoJson = require('./toGeoJson'),
    jsonStream = require('JSONStream'),
    Validator = require('jsonschema').Validator,
    fs = require('fs'),
    mongoose = require('mongoose'),
    Grid = require('gridfs-stream'),
    //mongoosastic = require('mongoosastic'),
    utils = require('util'),
    dbmappings = require('./../mappings'),
    usgin_index = require('./../mappings/usgin-cache'),
    featuresModify = require('./restructure'),
    debug = require("debug"),
    async = require("async"),
    flow = require('xml-flow');
var ss = require('smart-stream'),queue = '';
var _ = require('underscore');
var saxpath = require('saxpath');
var sax     = require('sax'), j = 1,xmlObjControl='';
var str = require('string-to-stream');
    Grid.mongo = mongoose.mongo;
//var g = require('idle-gc');
var Throttle = require('throttle');

// create a "Throttle" instance that reads at 45000 b/s
//var throttle = new Throttle(45000);

    module.exports = function(){

    return{
        getFeatures: function (featureType,cacheId,url,filename,featureNum,point){
                //var insertFeatures = function InsertFeatures(xmlObj,doneCallback) {
            //var insertFeatures =
                function InsertFeatures(xmlObj,doneCallback) {
                    {
                    //console.log(i,'. ');
                    var Points = dbmappings(featureType);
                    var usgin_cache = require('./../mappings/usgin-cache').usginModel;
                    //setTimeout(function ()         {
                        var v = new Validator();
                        var instance = 4;
                        // --------------- Parser Section Begins
                        var bulkWriter = jsonStream.stringify(),
                            stringifyDisply = '', dataFeature = '';
                        var parser = jsonStream.parse('features.*')
                            .on('data', function (feature) {
                                if (feature.geometry.type != "point") {
                                    Points == '';
                                    //usgin_cache = '';
                                }
                                feature = featuresModify(featureType, feature, this.callback); //Create common Attributes (like Name,Type) across the features JSON
                                bulkWriter.write({
                                    cacheId: cacheId,
                                    //baseUrl: url,
                                    featuretype: featureType,
                                    feature: feature
                                });
                            })
                            .on('error', function (err) {
                                console.log('An error occurred in Parser !', err);
                                throw err;
                            })
                            .on('end', function () {
                                bulkWriter.end;
                            });
                        console.time('\t- ' + cacheId);
                        bulkWriter.on('error', function (err) {
                            console.log('An error occurred!', err);
                            throw err;
                        });
                        bulkWriter.on('data', function (chunk) {
                            stringifyDisply += chunk;
                            //console.log(i, ". ", chunk); //Prints Chunk
                            var featureArray = JSON.parse(stringifyDisply + "]\n");
                            if (Points != '') {
                                Points.create(featureArray, function (err) {
                                    if (err) {
                                        console.log(err, "on ->", featureArray)
                                    }
                                });
                                usgin_cache.create(featureArray, function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                });
                            }
                        });
                        // --------------- Parser Section Ends ----------------
                         xmlObj = "\<wfs:FeatureCollection xmlns:aasg='http://stategeothermaldata.org/uri-gin/aasg/xmlschema/welllog/0.8' xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs'\>" + xmlObj + "\</wfs:FeatureCollection\>";
                        //------Special Section
                        var params = ["-f", "GeoJSON", "-preserve_fid", "-gt", "-progress", "-skipfailures", "/vsistdout/", "/vsistdin/"];
                        var ogr = require("child_process").spawn("ogr2ogr", params);
                        params = null
                        //-----------------------------------------------------
                        ogr.stdin.setMaxListeners(Infinity);
                        str(xmlObj).pipe(ogr.stdin);
                        i+=1
                        ogr.stdout.on("data", function (chunk) {
                            dataFeature += chunk;
                            str(dataFeature).pipe(parser);
                            ogr.kill();
                            return doneCallback(i);
                            //global.gc();
                        });
                        ogr.stdout.on("end", function () {
                            parser.setMaxListeners(Infinity);
                            ogr.kill();
                        });
                        ogr.stderr.on("data", function (chunk) { if (chunk) console.log("Err: "+chunk) })
                        ogr.stdout.on("exit", function (code) {
                            if (code) console.log(new Error("failed with " + code)); else console.log("ok")
                            ogr.kill();
                        });

                }//if i check
            };

            if( featureType == "aasg:GeothermalArea" ) {
                featureType = "NoValue" }
            if( featureType.split(':')[1] == "ShearDisplacementStructureView" ) {
                featureType = "NoValue" }
            if( featureType.split(':')[1] == "GeologicUnitView" ) {
                featureType = "NoValue" }
            if( featureType == "aasg:WellHeader" ) {
                featureType = "aasg:Wellheader" }
            if(featureType != "NoValue"){
                //var Points = require('./../wfscapabilites/mongoconn').Points;
                //var ogr = toGeoJson();
                console.log("Connection State mongoose.connection.readyState = "+mongoose.connection.readyState)
                if(mongoose.connection.readyState == 1){
                    var gfs = Grid(mongoose.connection.db);
                    var wfsData = gfs.createReadStream({filename: filename}),
                    bulkWriter = jsonStream.stringify(),
                    stringifyDisply = '';
                    //--------- Break WFS Data into parts----------------
                    var saxParser  = sax.createStream(true),recorder = '',
                        streamer   = new saxpath.SaXPath(saxParser, '//gml:featureMember',recorder),
                        xmlObjs = [], i = 0, j = 0,counter= 0,curBytes = 0;
                        console.log("....Length :"+recorder);
                    async.parallel({
                        findMatch: function (cb){

                            streamer.on('match', function(xml) {
                                j += 1;
                                InsertFeatures(xml, function (res) {
                                    console.log(res + " Added...!")
                                });
                                console.log(j + ". Pointer= " + featureNum);
                        });

                        }
                    }, function(err, result){
                        console.log("result is: "+result)

                    })
                    var startTime = 0;

                    /*setTimeout(function (){
                        streamer.on('match', function(xml) {
                        j+=1;
                        InsertFeatures(xml,function(res){
                            console.log(res+" Added...!")
                        });
                        console.log(j+". Pointer= "+featureNum);
                    });

                    }, 10000);*/
                    streamer.on('end', function() {
                        console.log('--- Aray length ---:'+j)
                         return point(0)});
                    //setTimeout(function () {
                        wfsData.pipe(new Throttle(12000)).pipe(saxParser);
                        saxParser.setMaxListeners(Infinity);
                    //}, 1000);

                    wfsData.on('close', function(err) {
                        console.log('Stream has been destroyed and file has been closed');
                        if (err)
                        {
                            console.log("IN THE J ="+ j)
                            return point(0);
                        }
                    });
                }//}); //connection open

            } //if(featuretype != "aasg:....
            else {
                console.log("Exit Because Feature Type is :"+featureType)
                return point(0);
            }

        }

    };
};