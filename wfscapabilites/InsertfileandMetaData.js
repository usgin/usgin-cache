/**
 * Created by nahmed on 6/17/2015.
 */
var request = require('request'),
    fs = require('fs'),
    url ='http://xml2.des.state.nh.us/arcgis/services/aasggeothermal/NHThermalSprings1_8/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=ThermalSpring'
    mongoose = require('mongoose'),
    urls = require('./../../cache/urls'),
    Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo,
    featuretype = 'aasg:ThermalSpring',
    insertFeatures =  require('./getFeatures.js'),
    cacheId = '';
    var conn = mongoose.createConnection('mongodb://localhost:27017/usgin-cache');
    conn.once('open', function () {
    var gfs = Grid(conn.db);
    // all set!
    // Check to see if File Exists or Not
    gfs.exist({ filename: 'response.xml' }, function (err, found) {
        if (err) {console.log(err);}
        if(found) {
           console.log(found + "--" + found._id);
            removeExisting();
        }
        else {
            console.log('File does not exist');
        }
    });

    // Remove if Already there
    function removeExisting(){
    gfs.remove({ filename: 'response.xml' }, function (err) {
        if (err) return handleError(err);
        console.log('Existing Replaced');
    });
    }
    // streaming to gridfs
    var options = { filename: 'response.xml',
                        metadata: { featuretype: featuretype,
                                    endpoint: urls.base(url),
                                    requestType: 'getfeature'
                        }
                     };
    var writestream = gfs.createWriteStream(options);
    request(url).pipe(writestream);

    writestream.on('close',function(){
        gfs.files.find({ filename: 'response.xml' }).toArray(function (err, files) {
            if (err) {console.log(err)}
            cacheId = files[0]._id;
            insertFeatures().getFeatures('aasg:ThermalSpring',cacheId,urls.base(url));
        });
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
    });

});