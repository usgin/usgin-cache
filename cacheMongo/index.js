// # Cache Module
var mongoose = require('mongoose'), // nano = require('nano'),
    admin = mongoose.mongo.admin,
    crypto = require('crypto'),
    request = require('request'),
    _ = require('underscore'),
    async = require('async'),
    urls = require('./urls'),
    designDoc = require('./design/usgin-cache'),
    fs = require('fs'),
    writeToFile = require('../featuresMongo/testMongo1'),
    Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;

// ## Contructor
// You should pass whether or not you want to refresh the cache and also a config obj.
module.exports = function (forceRefresh, config) {
    config = typeof forceRefresh === 'object' ? forceRefresh : config;
    forceRefresh = typeof forceRefresh === 'boolean' ? forceRefresh : false;
    config = config || {};
    config.dbName = config.dbName || 'usgin-cache';
    config.dbUrl = config.dbUrl || 'mongodb://localhost:27017/';
    var connection = mongoose.createConnection('mongodb://localhost:27017/test');
    if(mongoose.connection.readyState == 0){
        mongoose.connect(config.dbUrl+'usgin-cache');
    }
    var db  = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {    }),
    mongoSchema = mongoose.Schema({_id: String, _rev: String},{strict:false}),
    dbcache = mongoose.model(config.dbName,mongoSchema);
    // ## Private functions
    // ### Control how we identify requests in the cache
    function getIdFor(requestType, url) {
        var hash = crypto.createHash('sha256');
        hash.update(decodeURIComponent(url).toUpperCase());
        return hash.digest('hex');
    }

    // ### Add or update a document in the cache
    function refreshDoc(requestType, url, doc, callback) {
        // Get the cache ID for this request
        var id = getIdFor(requestType, url),
        // If a CouchDB doc was passed in, get its revision
           rev = null;
        console.log(typeof doc + doc);
       // if (typeof doc === 'object') // rev = doc._rev || null;

        // If a doc was not passed, then we've got to get our function straight
       // if (typeof doc === 'function') callback = doc;

        // Build the cache document
        var cacheDoc = {
            _id: id,
            requestType: requestType.toLowerCase(),
            endpoint: urls.base(url)

        };

        // Need to capture featuretype for GetFeature requests
        if (requestType === 'getfeature') cacheDoc.featuretype = decodeURIComponent(/typename=(.+?)(&|$)/i.exec(url)[1]);

        // Add the revision if a doc was passed in (if we're refreshing the cache)
        if (rev) cacheDoc['_rev'] = rev;

        // **Strange Distinction Here**
        // - If it is a GetFeature request, we'll be piping the response into an attachment.
        // - If it is any other request, we'll attach the response as a big string in the CouchDB doc.
         if (requestType === 'getfeature') {
            // First insert the document.
             var cache_Doc = new dbcache(cacheDoc);
             cache_Doc.save(function(err){
                 if (err) { //callback(err); return;
                     console.log(err);
                 }
                    console.log("about to write a file");
                    //writeToFile.WriteUrlFile(url);
                   writeToFile.FileUpload(url);
                    //writeToFile.wrtiteFile();
                 });
                //console.log (cacheSchema)
                //    cacheModel = mongoose.Model(config.dbName,cacheSchema);
              /*    cache_Doc = new cacheModel(cacheDoc);
                    cache_Doc.save(function(err,cacheDoc){
                     if (err) { callback(err); return; }
                     //  .pipe(db.attachment.insert())
                });

             db.insert(cacheDoc, id, function (err, dbResponse) {
                // if the insert failed, send back the Error
                if (err) { callback(err); return; }
                // Now, request the doc and pipe it into an attachment
                request(url)
                    .on('error', callback)
                    .pipe(db.attachment.insert(id, 'response.xml', null, 'application/xml', {rev: dbResponse.rev}))
                    .on('end', function () {
                        callback(null, cacheDoc);
                    });
            }); */
        }
        else {
            // Now, request the URL
            request(url, function (err, response) {
                if (err && err.code !== 'ETIMEDOUT') {
                    // If the request failed for any reason other than a timeout, send back the error
                    return callback(err);
                } else if (err) {
                    // If the request timed out, make a fake response doc that will be added to CouchDB.
                    // This will allow code to continue to execute when timeouts happen (and they will).
                    response = {body: 'Request for ' + url + ' timed out'};
                }

                cacheDoc.response = response.body;

                // Insert the document
                db.insert(cacheDoc, id, function (err, dbResponse) {
                    // If the insert failed, send back the error
                    if (err) { callback(err); return; }
                    callback(null, cacheDoc);
                });
            });
        }
    }

    // ### Return a document from the cache, adding or updating as neccessary
    function fetch(requestType, url, refresh, callback) {
        // Valid requestTypes
        var validRequests = ['getrecords', 'getrecordbyid', 'getfeature', 'getcapabilities'];
        if (!_.contains(validRequests, requestType.toLowerCase())) {
            callback(new Error('System will only cache ' + validRequests.join(', ') + ' requests'));
        }

        // Get the cache ID for this request
        var id = getIdFor(requestType, url),

        // Get our arguments straight
            forceRefresh = false;
        if (typeof refresh === 'function') callback = refresh;
        if (typeof refresh === 'boolean') forceRefresh = refresh;

        dbcache.findOne({_id:id},function(err,doc){
            if (err && err.status_code !== 404) { callback(err); return; }
            if(doc){
                //console.log("Document already exists");
            }
            else {//console.log("document not exists");
             }
            refreshDoc(requestType, url, doc, callback);
        });

        /*
        db.get(id, function (err, doc) {
            // Throw error if there was one, and it was not a 404
            if (err && err.status_code !== 404) { callback(err); return; }

            // If we got a doc back, and we aren't being forced to refresh...
            if (doc && !forceRefresh) {
                // Anything other than a GetFeature doc is fine to return
                if (doc.requestType !== 'getfeature') return callback(null, doc);
                // Successful GetFeature requests will have an attachment and can be returned
                else if (doc.hasOwnProperty('_attachments')) return callback(null, doc);
            }

            // Either the doc has not been cached, we're being forced to refresh the cache, or the doc is bad
            refreshDoc(requestType, url, doc, callback);
        }); */

    }

    // ## Public API
    return {
        // ### Access to the cache database
        db: db,

        // ### CSW GetRecords request
        getRecords: function (cswBaseUrl, start, limit, callback) {
            console.log("in the fetch");
            /*
            var requestType = 'getrecords',
                params = {};

            if (!isNaN(start)) params.start = start;
            if (typeof start === 'function') callback = start;
            if (!isNaN(limit)) params.limit = limit;
            if (typeof limit === 'function ') callback = limit;
            callback = callback || function () {};
            */
            var url = urls.request(requestType, cswBaseUrl, params);
            console.log("before fetch");
           // fetch(requestType, url, forceRefresh, callback);
        },

        // ### Return all Metadata IDs from a particular CSW
        idsFromCsw: function (cswBaseUrl, callback) {
            var url = urls.base(cswBaseUrl);
            db.view_with_list('usgin-cache', 'metadataIds', 'values', {key: url}, callback);
        },

        // ### CSW GetRecordByID request
        getRecordById: function (cswBaseUrl, id, callback) {
            var requestType = 'getrecordbyid',
                url = urls.request(requestType, cswBaseUrl, {id: id});

            callback = callback || function () {};

            fetch(requestType, url, forceRefresh, callback);
        },

        // ### Get all WFS Urls available in the cache
        wfsUrls: function (callback) {
            db.view_with_list('usgin-cache', 'wfsUrls', 'threshold', {min:4}, function (err, urls) {
                callback(err, _.uniq(urls));
            });
        },

        wfsUrlsByType: function (featuretype, callback) {
            db.view('usgin-cache', 'wfsFeatureTypes', {key: featuretype}, function (err, response) {
                if (err) return callback(err);
                callback(null, response.rows.map(function (row) {
                    return row.value;
                }));
            });
        },

        // ### WFS GetCapabilities request
        getCapabilities: function (wfsBaseUrl, callback) {
            var requestType = 'getcapabilities',
                url = urls.request(requestType, wfsBaseUrl);

            fetch(requestType, url, forceRefresh, callback);
        },

        // ### WFS GetFeature request
        getFeature: function (wfsBaseUrl, featureType, maxFeatures, callback) {

            var requestType = 'getfeature',
                params = {};

            if (typeof featureType === 'string') params.featureType = featureType;
            if (typeof featureType === 'function') callback = featureType;
            if (!isNaN(maxFeatures)) params.maxFeatures = maxFeatures;
            if (typeof maxFeatures === 'function') callback = maxFeatures;
            callback = callback || function () {};
            var url = urls.request(requestType, wfsBaseUrl, params);
            fetch(requestType, url, forceRefresh, callback);
        },

        // ### List WFS GetFeature responses by type
        wfsFeaturesByType: function (featuretype, callback) {
            console.log("in the WFS Feature by type")
            callback = typeof featuretype === 'function' ? featuretype : callback;
            var params = typeof featuretype === 'string' ? {key: featuretype} : {};
            console.log("Name of inherited " + params);

            db.view('usgin-cache', 'wfsFeaturesByType', params, function (err, response) {
                if (err) return callback(err);
                callback(null, response.rows.map(function (row) {
                    return {id: row.id, key: row.key};
                }));
            });
        },


        // ### List failed WFS GetFeature requests
        failedGetFeature: function (callback) {
            callback = callback || function () {};
            db.view_with_list('usgin-cache', 'getFeatureAttachments', 'values', {key: null}, callback);
        },

        // ### Clear everything except design documents from the database
        clear: function (callback) {
            callback = callback || function () {};

            db.list({include_docs: true}, function (err, result) {
                if (err) { callback(err); return; }

                var docs = _.reject(result.rows, function (doc) {
                    return doc.id.indexOf('_design') === 0;
                });
                /*
                 docs = _.map(docs, function (row) {
                 return _.extend({ _deleted: true }, row.doc);
                 });
                 */
                db.bulk({docs: docs}, callback);
            });
        },

        // ### Setup the database
        setup: function (callback) {
            console.log("in the setup")
            callback = callback || function () {};

            function designDocs() {

                var id= '_design/usgin-cache';

                var //mongoSchema = mongoose.Schema({_id: String, _rev: String},{strict:false}),
                    //dbcache = mongoose.model(config.dbName,mongoSchema);
                    design_Doc = new dbcache(designDoc);

                    dbcache.findOne({_id:id},function(err,obj){
                       if(obj){
                           dbcache.remove({_id:id},function(err){
                               if(err){
                               console.log("Error Removing Document"); }
                           }); // delete existing
                       }
                          design_Doc.save(function(err,design_doc){
                              if(err){console.log("save error");}
                          });
                    });
                 /*

                        if(_.contains(existingdbs,id)){
                            //console.log("id exists");
                           mongoose.connection.db.dropCollection(id,function(err){if(err){console.log(err);}});
                            design_Doc.save(function(err){
                                if(err){console.log(err);}
                            });                        }
                        else{ //console.log("id not exists");
                            design_Doc.save(function(err){
                                if(err){console.log(err);}
                            });
                        }
                    });
                });*/
            }
           designDocs();
        }
    };
};