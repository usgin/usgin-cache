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
                if(mongoose.connection.readyState == 1){
                    var wfsData = gfs.createReadStream({filename: filename}),
                        bulkWriter = jsonStream.stringify(),
                        stringifyDisply = '';
                    wfsData.pipe(ogr.input); // Pipe WFS File Stream into OGR as Input
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
                    ogr.output.pipe(parser); // Parse GeoJSON Stream obtained through Pipe from OGR
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

                }//}); //connection open
            } //if(featuretype != "aasg:....
        }
    };
    //  JsonStreamOgrMongo('aasg:ThermalSpring','111'); // For Individual Test Run
};