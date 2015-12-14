/**
 * Created by nahmed on 6/17/2015.
 */
// Bring Mongoose into the app
var mongoose = require( 'mongoose'),
    mongoosastic = require('mongoosastic'),
    Grid = require('gridfs-stream'),
    // Build the connection string
    dbURI = 'mongodb://localhost:27017/usgin-cache';

//1. Create the database connection
if(mongoose.connection.readyState == 0) {
    mongoose.connect(dbURI);
    console.log ("NEW MONGOOSE CONNECTION CREATED");
}

//2. CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
    console.log("conection State "+mongoose.connection.readyState);
    //exports.gfs = new Grid(mongoose.connection.db, mongoose.mongo);
    /*
    var readstream = gfs.createReadStream({ filename: 'response.xml' });
    //console.log("read stream is:"+ util.inspect(readstream))
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

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// 3. Mongoose Schema
var     pointSchema = mongoose.Schema({
        baseUrl: String
        },
        {strict:false});
        pointSchema.index({ baseUrl: 1, "feature.id": 1}, { unique: true })
var WFSSchema = mongoose.Schema({
    wfsurl     : { type : String, unique : true, required : true, dropDups: true },
    cswURL     : { type : String},
    featureType: { type : String},
    status     : { type : Number, default: 0}
},{strict:false});
var fileSchema = mongoose.Schema({
        filename     : { type : String, required : true, dropDups: true },
        length     : { type : Number },
        metadata: {
            featuretype: { type : String},
            endpoint: { type : String},
            requestType: { type : String}
        }
    }
    ,{strict:false}   );
// 4. Create Point Schema
    exports.Points = mongoose.model('PointColl',pointSchema);
    exports.WFSCache = mongoose.model('WFSColl',WFSSchema);
    exports.Files = mongoose.model('fs.files',fileSchema);
/*
    Points = mongoose.model('PointColl',mongoSchema);
var centerPoint = new Points({ _id: '55', name: 'Ric', Res: 'Tucson' });
centerPoint.save(); */