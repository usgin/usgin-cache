/**
 * Created by nahmed on 6/17/2015.
 */
var request = require('request'),
    mongoose = require('mongoose'),
    toGeoJson = require('./toGeoJson'),
    Grid = require('gridfs-stream');
    async = require("async"),
    utils = require('util'),
    request = require('request'),
    xpath = require('xpath'),
    dom = require('xmldom').DOMParser,
    fs = require('fs'),
    xport = require('./ExtractXMLtoGeoJSON');
    Grid.mongo = mongoose.mongo;
    //var conn = mongoose.createConnection('mongodb://localhost:27017/usgin-cache');
    //var gfs = Grid(conn.db);
    var wfs = require('./mongoconn').WFSCache,
    pointer = 0, counter=1;
    var featureTypeName = '',
        queue = '',
        urls = require('./../cache/urls');
    GetFeatures = function getFeatures(WFSRecord,doneCallback){
        //console.log(WFSRecord.wfsurl);
        //setTimeout(function () {
            request(WFSRecord.wfsurl, function (error, response, body) { //Get the body of the WFS GetCapability into a variable
                if(error){console.log("Error Reading file"+error +" :"+WFSRecord.wfsurl); return error;}
                if (!error && response.statusCode == 200) {
                    //console.log(body); // Show the HTML for the Google homepage.
                    if(body.length > 0) {
                        var getFeaturesURL = urls.request('getfeature',WFSRecord.wfsurl);
                        //Parse the body using xmlDom and search for wfs:Name to get feature Type
                        var featureType = getfeatureType(body,WFSRecord.wfsurl);
                        var Url = getFeaturesURL+featureType;
                        //var Url = 'http://xml2.des.state.nh.us/arcgis/services/aasggeothermal/NHThermalSprings1_8/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=ThermalSpring';
                        if(featureType!= '')
                        {
                            console.log("Entertaining :" + Url + "  Featuretype : " + featureType);
                            fs.appendFile('goodOnes.txt', WFSRecord.wfsurl+"\r\n", function (err) {
                                if (err) throw err;
                                //console.log('The "data to append" was appended to file!');
                            });
                            //Update the Records that are valid
                            /*
                            wfs.update({wfsurl: WFSRecord.wfsurl},{status: 1},callback);
                            function callback (err, numAffected) {
                                console.log("Affected Records are "+numAffected);
                                // numAffected is the number of updated documents
                            }*/


                            counter+=1;
                        }
                    }
                    console.log("Num: "+counter)
                    xport().getWFSURL(Url,featureType);
                }
                else {
                    console.log("There was an error in Record :"+WFSRecord.wfsurl)
                }

            });

            //xport().getFeatures(WFSRecord.wfsurl,WFSRecord.featureType);
            //console.log(WFSRecord.featureType )
            return doneCallback(null);
        //}, 600 * Math.random());
        //console.log("Process at the end");
        //return doneCallback(null,WFSRecord.wfsurl);
    };
function getfeatureType(xmlDoc,wfsURL){
    var namespace = "";
    var n = xmlDoc.search("ows:ServiceTypeVersion");
    if (n > 0)
    {
        var ver = xmlDoc.substr(n+23,5)
        console.log("version is :"+ver)
        if(ver == '2.0.0'){
         namespace = "http://www.opengis.net/wfs/2.0"
        } else {
            namespace = "http://www.opengis.net/wfs"
        }
    }

    var doc = new dom().parseFromString(xmlDoc);
    //var select = xpath.useNamespaces({"zzz": "http://www.opengis.net/wfs"});
    var select = xpath.useNamespaces({"zzz": namespace});
    if (undefined !== select('//zzz:WFS_Capabilities/zzz:FeatureTypeList/zzz:FeatureType/zzz:Name/text()', doc)[0] ) {
        // `theHref` is not undefined and has truthy property _length_
        // do stuff
        featureTypeName = select('//zzz:WFS_Capabilities/zzz:FeatureTypeList/zzz:FeatureType/zzz:Name/text()', doc)[0].nodeValue;
        process.on('uncaughtException', function (err) {
           fs.appendFile('message1.txt', wfsURL+" : Error"+ err+featureTypeName+"\r\n" , function (error) {
                if (error) throw error;
                //console.log('The "data to append" was appended to file!');
            });
            return featureTypeName;
            //console.log( 'Caught exception: ' + err);
        });
    }
    else {
        fs.appendFile('message.txt', wfsURL+"\r\n", function (err) {
            if (err) throw err;
            //console.log('The "data to append" was appended to file!');
        });
    }
    return featureTypeName;
}
    //xport().getFeatures('http://xml2.des.state.nh.us/arcgis/services/aasggeothermal/NHThermalSprings1_8/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=ThermalSpring','aasg:ThermalSpring');
    wfs.find({status: 0},function (err, WFSRecord) {
        if (err) return console.error(err);
        //console.log(WFSRecord[200].featureType);
        queue = async.queue(GetFeatures, 1);
        queue.drain = function() {
            console.log("XML uploaded");
        };
        // Queue your files for upload
        queue.push(WFSRecord);
        queue.concurrency = 1; // Increase to twenty simultaneous uploads

        /*async.map(WFSRecord, GetFeatures, function(err,result){
            if(err){ console.log(err);}
            console.log("Finished!");
            console.log(result);
        });*/

    });

    /*wfs.find().distinct('featureType', function(error, featureType) {
    // ids is an array of all ObjectIds
    console.log("Feature types are : "+featureType);
    });*/