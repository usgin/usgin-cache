/**
 * Created by nahmed on 6/17/2015.
 **/
var     request = require('request'),
    toGeoJson = require('./toGeoJson'),
    jsonStream = require('JSONStream'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    Grid = require('gridfs-stream'),
    mongoosastic = require('mongoosastic'),
    utils = require('util'),
    dbmappings = require('./../mappings'),
    usgin_index = require('./../mappings/usgin-cache'),
    featuresModify = require('./restructure');
var str = require('string-to-stream');
var XmlSplit = require('xmlsplit');

Grid.mongo = mongoose.mongo;
var conn = mongoose.createConnection('mongodb://localhost:27017/usgin-cache');
var gfs = Grid(conn.db);
module.exports = function(){
    return{
        getFeatures: function (featureType,cacheId,url,filename){

            if( featureType == "aasg:GeothermalArea" /*|| featureType == "aasg:WellLog" || featureType == "aasg:BaseMetals" ||  featureType == "aasg:ThermalSpring" ||
             featureType ==  "aasg:BoreholeTemperature "  || featureType == "aasg:BoreholeLithInterval" || featureType == "aasg:WRMajorElements" ||
             featureType == "aasg:WRMajorElements" || featureType == "aasg:LiquidAnalysis" || featureType == "aasg:HeatFlow" || featureType ==  "aasg:WellTest" || featureType == "aasg:WRMajorElements" ||
             featureType == "aasg:DirectUseSite" ||  featureType == "NV_Data_NVPowerPlantFacilities:PowerPlantFacility" || featureType == "aasg:PowerPlantFacility" ||
             featureType == "aasg:GasIsotopes" ||  featureType == "aasg:VolcanicVent" || featureType == "aasg:ThermalSpring"  || featureType == "aasg:PlantProduction" || featureType == "aasg:AbandonedMine"  || featureType == "aasg:BoreholeTemperature" ||
             featureType == "aasg:Hypocenter"  || featureType == "aasg:Wellheader" || featureType == "aasg:WellHeader" */) { //||  featureType == "aasg:HydraulicProperty" ||  ||  featureType == "aasg:ThermalConductivity"  featureType == "AASG:ThermalSpring"
                featureType = "NoValue"
            }

            if(featureType != "NoValue"){
                //console.log("Feature Type is :"+featureType+" Url: "+ url);
                var Points = dbmappings(featureType);
                var usgin_cache = require('./../mappings/usgin-cache').usginModel;
                //var Points = require('./../wfscapabilites/mongoconn').Points;
                var ogr = toGeoJson();
                //var wfsData = fs.createReadStream('response.xml'),
                //conn.once('open', function () {
                if(mongoose.connection.readyState == 1 && cacheId == "55f1be8529b1cdd02034ec1f"){
                    var wfsData = gfs.createReadStream({filename: filename}),
                        pathname = "localcache/"+cacheId+".xml",                        //
                        bulkWriter = jsonStream.stringify(),
                        stringifyDisply = '';

                    /*var writeStream = fs.createWriteStream(pathname);
                        wfsData.pipe(writeStream);
                    writeStream.on('finish',function()
                    {*/
                        console.log (filename + " written successfully!");
                        //var wfsLocalData = fs.createReadStream(pathname);
                        //var wfsLocalData = fs.createReadStream("localcache/55f1be8529b1cdd02034ec1f.xml");
                        var wfsLocalData = fs.createReadStream("3.xml");
                        //var wfsLocalData = fs.createReadStream(pathname);
                        //wfsLocalData.pipe(ogr.input);
                        //wfsReadLocalData.pipe(org.input);

                    //wfsData.pipe(ogr.input); // Pipe WFS Fil
                    // e Stream into OGR as Input
                        var parser = jsonStream.parse('features.*')
                            .on('data', function (feature) {
                                if(feature.geometry.type != "point"){
                                Points == '';
                                //usgin_cache = '';
                                }

                                feature = featuresModify(featureType,feature,this.callback); //Create common Attributes (like Name,Type) across the features JSON
                                bulkWriter.write({
                                    cacheId: cacheId,
                                    baseUrl: url,
                                    featuretype: featureType,
                                    feature: feature
                                });
                            })
                            .on('end', bulkWriter.end);
                        console.time('\t- ' + cacheId);

                    //var stream = fs.createReadStream('localcache/55f1be8529b1cdd02034ec1f.xml', {flags: 'r', encoding: 'utf-8'});
                    //var stream = fs.createReadStream('1.xml', {flags: 'r', encoding: 'utf-8'});

                    var xmlsplit = new XmlSplit(batchSize=1);
                    var inputStream = fs.createReadStream("3.xml"); // from somewhere

                    inputStream.pipe(xmlsplit).on('data', function(data) {
                        console.log("in the data");
                        var xmlDocument = data.toString();
                        console.log(xmlDocument);
                        // do something with xmlDocument ..
                    });


                    var buf = '';
                    var count = 0;
                    wfsLocalData = fs.createReadStream('2.xml', {flags: 'r', encoding: 'utf-8'});
                    wfsLocalData.on('data', function(chunk) {
                        buf += chunk.toString(); // when data is read, stash it in a string buffer

                    });

                    wfsLocalData.on('error', function(err) {
                        console.log(err);
                    });

                    wfsLocalData.on('end', function() {
                        //console.log("Count: " + count );
                        //wfsLocalData.pipe(ogr.input);
                        //console.log("String: " + buf);

                        //str(buf).pipe(ogr.input);


                       //str(buf).pipe(ogr.input); // => 'hi there'
                        //console.log(str(buf));
                        //str('hi there').pipe(ogr.input) // => 'hi there'

                    });


                        //ogr.output.pipe(parser);

                    var StringDecoder = require('string_decoder').StringDecoder;
                    var decoder = new StringDecoder('utf8');
                        ogr.output.on("data", function (chunk) { if (chunk) console.log(decoder.write(chunk)) });
                        ogr.err.on("data", function (chunk) { if (chunk) console.log(decoder.write(chunk)) });
                        ogr.output.on("exit", function (code) {
                            if (code) console.log(new Error("failed with "+code))
                            else console.log("ok")
                        });



                    streamer.on('end', function() {
                        console.log('--- End Writing ---');
                        console.log(xmlObjs);
                        _.each(xmlObjs, function (item, index) {
                            item = "\<wfs:FeatureCollection xsi:schemaLocation='http://stategeothermaldata.org/uri-gin/aasg/xmlschema/welllog/0.8 http://services.azgs.az.gov/arcgis/services/NGDS/EGIWellLogs/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=WellLog http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd' xmlns:aasg='http://stategeothermaldata.org/uri-gin/aasg/xmlschema/welllog/0.8' xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'\>\<gml:boundedBy\>\<gml:Envelope srsName='urn:ogc:def:crs:EPSG:6.9:4326'\>\<gml:lowerCorner\>7.9516660000000456 -122.37147999999996\</gml:lowerCorner\>\<gml:upperCorner\>43.996100000000069 -14.374999999999943\</gml:upperCorner\>\</gml:Envelope\>\</gml:boundedBy\>"+item+"\</wfs:FeatureCollection\>";
                            console.log(item);
                            str(item).pipe(ogr.input);

                            /*var StringDecoder = require('string_decoder').StringDecoder;
                             var decoder = new StringDecoder('utf8');
                             ogr.output.on("data", function (chunk){ if (chunk) console.log(decoder.write(chunk)) });
                             ogr.err.on("data", function (chunk) { if (chunk) console.log(decoder.write(chunk)) });
                             ogr.output.on("exit", function (code) {
                             if (code) console.log(new Error("failed with "+code));
                             else console.log("ok")
                             });*/

                        });
                    });
                    ogr.output.pipe(parser);
                    fileStream.pipe(saxParser);

                        //ogr.output.pipe(parser); // Parse GeoJSON Stream obtained through Pipe from OGR

                        bulkWriter.on('error', function (err) {
                            console.log('An error occurred!', err);
                            throw err;
                        });
                        bulkWriter.on('data', function (chunk) {
                            stringifyDisply += chunk;

                        });
                        bulkWriter.on('end', function () {
                            var featureArray = JSON.parse(stringifyDisply);
                            if (Points != ''){
                                Points.create(featureArray, function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                });

                                usgin_cache.create(featureArray, function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                });
                            }
                        //console.log(cacheId + ' Completed in ');
                        //console.timeEnd('\t- ' + cacheId);
                        });
                    //});//writeStream.on('close',function(){
                    //writeStream.on('error',function(){
                    //    console.log("There is some error writing the file,,"+cacheId);
                    //});
                }//}); //connection open
            } //if(featuretype != "aasg:....
        }
    };
    //  JsonStreamOgrMongo('aasg:ThermalSpring','111'); // For Individual Test Run
};