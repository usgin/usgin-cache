/**
 * Created by nahmed on 6/17/2015.
 */
var request = require('request'),
    mongoose = require('mongoose'),
    toGeoJson = require('./toGeoJson'),
    Grid = require('gridfs-stream');
    async = require("async"),
    xpath = require('xpath'),
    utils = require('util'),
    request = require('request'),
    xpath = require('xpath'),
     dbmappings = require('./../mappings'),
     //getFeatureType = require('./../featurepages/harvestCSW'),
    dom = require('xmldom').DOMParser;
    //Grid.mongo = mongoose.mongo;
    //var conn = mongoose.createConnection('mongodb://localhost:27017/usgin-cache');
    //var gfs = Grid(conn.db);
    var files = require('./../wfscapabilites/mongoconn').Files,
        timeout = 0,
        pointer = 0,
        flag = 0,
    indicesComplete = 0,
    urls = require('./../cache/urls'),
    insertFeatures = require('./getFeatures.js');
files.count({}, function(err, c)
{
    console.log('Count is ' + c);
    TotalCount = c;
});


   //var GetFeatures =
        function getFeatures(WFSRecord,featureNum,Callback){
    //Set Time out interval on auto bases
        var featuretype = WFSRecord.metadata.featuretype,
            cacheId = WFSRecord._id,
            url = WFSRecord.metadata.endpoint,
            filename = WFSRecord.filename,
            fileSize = WFSRecord.length,
            timer = fileSize/70
            flag = 1
        //setTimeout(function () {

            {
                /*console.log("Pointer ="+pointer);*/
            //if (fileSize > 100000000 ){
                console.log(" Length is "+fileSize);
            //}
            console.log(" Timer is "+timer);
            flag = 1

                insertFeatures().getFeatures(featuretype, cacheId, url, filename,featureNum, function callback(res){
                    console.log("Num of Res are  "+res);
                    //if(res){
                        console.log("Call Back..>!")
                        Callback(0)
                        return;
                    //}
                });
             //Callback(0)
            console.log("Pointer ="+pointer)
            }
            pointer+=1;
            //}

            //--- TRY WITH ASYN QUEUE
        //},4000);  //40000* Math.random());
    }

    if(pointer == 0)
    { //global index usgin-cache
      dbmappings("0:usgin-cache");
      pointer = 1;
    }
    var WFRecords = [];
    //files.find({"metadata.featuretype" : "aasg:WellLog"},function (err, WFSRecord,callback) { //Find all files in the wfscolls and store them in WFSRecords Array
    var n = 0,flag= 0,TotalCount=0;


//var findData = function (userInput, callback) {
    async.parallel({
        modelAFind: function (cb){ files.find().exec(cb); }//,
        //modelBFind: function (cb){ ModelB.find(input).exec(cb); }
    }, function(err, result){
        ret = result.modelAFind;
        n =0; //455
        console.log ( n +"="+TotalCount)
        if(n < TotalCount) {
            uploader(n)
        } else {
            console.log ( n +"="+TotalCount);
        }
    });
var ret = '';

function uploader(n){
    console.log(ret.length+ " + " +flag )
    while(n < ret.length && flag == 0) {
        console.log(n + "." + ret[n].length);
        if (ret[n].length <= 200) {
            n = n + 1;
            uploader(n)
        } else {
            var ftype = ret[n].metadata.featuretype;
            dbmappings(ftype);
            getFeatures(ret[n],n, function (value) {
                flag = value;
                console.log("value of flag is: " + flag + "value of n is: " + n)
                if (flag == 0) {
                    n = n + 1;
                    //flag = 1
                    uploader(n)
                    //process.on('uncaughtException', function (err) {
                    //    console.log('Caught exception: ' + err);
                    //});

                } else {
                    console.log("This was the Last Record")
                }
            });
        }
    }//else
}
    /*files.find({ },function (err, WFSRecord,callback) { //Find all files in the wfscolls and store them in WFSRecords Array
        if (err) return console.error(err);
        while(n < WFSRecord.length){
            console.log(WFSRecord[n].filename)

            if(flag == 0){
                console.log(WFSRecord[n].length);
                flag = 1;
                getFeatures(WFSRecord[n],
                    function(value){
                        //console.log("value of flag is:"+flag)
                        flag = value
                       // console.log("value of flag is:"+flag)
                    });
                //
            }
            n+=1;
        }
        //Because we first want to create mappings for elastic indices so asyn.each is called to keep the
        //indices creation and data insertion processes separte from eachother.
    });*/


        /*console.log("Checking flag: " + flag)
            if (flag == 0) {
                getFeatures(data[i], function (callback) {
                })
            }
            flag = 1;*/

            //console.log(i);
            //(function(i) {
                /*async.series({
                    i : function(callback) {
                        getFeatures(WFSRecord[i],callback);
                    }
                })*/
            //})(i);

        //}
//});
        /*var queue = async.queue(GetFeatures, 1); // Run ten simultaneous uploads
        //    process.nextTick(insertFeatures);
        queue.drain = function() {
            console.log("XML UP NOW");
        };
        // Queue your files for upload
        queue.push(WFSRecord);
        queue.concurrency = 1; // Increase to twenty simultaneous uploads
        console.log("Length of the queue is :" +queue.length());
        queue.saturated = function(){
            console.log("Queue is Saturated...XXXXXX")
        }
        queue.kill;*/
        /*async.forEachSeries(WFSRecord, function(WFSeach, callback) {
            var featuretype = WFSeach.metadata.featuretype; //create mappings
            dbmappings(featuretype);
            callback();
        }, function(err) {
            if( err ) { return console.log(err); }
            async.map(WFSRecord, GetFeatures, function(err,result){ //insert data asynchronusly
                if(err){ console.log(err);}
                console.log("Data Function Finished!");
                console.log(result);
            });
        });*/

        /*
        async.mapSeries(WFSRecord, createIndices, function(err,result){
            if(err){ console.log(erearchr);}
            console.log("Finished!");
            indicesComplete = 1;
            console.log(result);
        });
        console.log("completed.............!");
       // ---- TRY GULP THROU
       async.map(WFSRecord, GetFeatures, function(err,result){
            if(err){ console.log(err);}
            console.log("Finished!");
            console.log(result);
        }); */
    //});
