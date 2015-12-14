/**
 * Created by nahmed on 6/17/2015.
 */
var request = require('request'),
    fs = require('fs'),
    //url ='http://xml2.des.state.nh.us/arcgis/services/aasggeothermal/NHThermalSprings1_8/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=ThermalSpring'
    mongoose = require('mongoose'),
    urls = require('./../cache/urls'),
    Grid = require('gridfs-stream'),
    arrayWFSInfo = [],
    //featuretype = 'aasg:ThermalSpring',
    //insertFeatures =  require('./getFeatures.js'),
    cacheId = '';
    var conn = mongoose.createConnection('mongodb://localhost:27017/usgin-cache');
Grid.mongo = mongoose.mongo;
module.exports = function(){
    function toHex(str) {
        var hex = '';
        for(var i=0;i<str.length;i++) {
            hex += ''+str.charCodeAt(i).toString(16);
        }
        return hex+".xml";
    }
    return{
        getWFSURL: function(url,featuretype){
        //  console.log (mongoose.connection.readyState);
        if(mongoose.connection.readyState == 1){

        //conn.once('open', function () {
          //  console.log(mongoose.connection.readyState);
            var gfs = Grid(conn.db);
            var filename = toHex(url);
          //  console.log(filename);

            // all set!
            // Check to see if File Exists or Not
            gfs.exist({filename: filename}, function (err, found) {
                if (err) {
                    console.log(err);
                }
                if (found) {
                    //console.log(found + "--" + found._id);
                    removeExisting();
                }
                else {
                    console.log('File does not exist in DB');
                }
            });

            // Remove if Already there
            function removeExisting() {
                gfs.remove({filename: filename}, function (err) {
                    if (err) return handleError(err);
                    console.log('Existing Replaced');
                });
            }
            // streaming to gridfs
            var options = {
                filename: filename,
                metadata: {
                    featuretype: featuretype,
                    endpoint: urls.base(url),
                    requestType: 'getfeature'
                }
            };
            var writestream = gfs.createWriteStream(options);
            request(url).pipe(writestream);
            /*
            writestream.on('close', function () {
                var insertFeatures = require('./getFeatures.js');
                gfs.files.find({filename: filename}).toArray(function (err, files) {
                    if (err) { console.log(err) }
                    cacheId = files[0]._id;
                    console.log("insert features for "+urls.base(url));
                    //insertFeatures().getFeatures(featuretype, cacheId, urls.base(url), filename);
                    //arrayWFSInfo = arrayWFSInfo.push(featuretype, cacheId, urls.base(url), filename);
                }); */
                //console.log('New Created');

                // READ FILE WHEN WRITING FINISHED
                /*
                 var readstream = gfs.createReadStream({ filename: 'response.xml' });
                 readstream.on('error', function (err) {
                 console.log('An error occurred!', err);
                 throw err;
                 });
                 readstream.on("data", function (chunk) {
                 buffer += chunk;
                 });
                 readstream.on('end',function(){
                 console.log('contents of file /n/n', buffer);
                 });
                 */
            //});
        }
//});
       }//function
}
};
