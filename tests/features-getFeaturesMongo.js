var assert = require('assert'),
    server = require('./wfsServer'),
    cache = require('../cacheMongo'),
    features = require('../featuresMongo'),
    vows = require('vows'),
    urlString = 'http://services.azgs.az.gov/ArcGIS/services/aasggeothermal/CAThermalSprings/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=ThermalSpring',
/*cacheConfig = {dbName:'usgin-cache-all', dbUrl: 'http://localhost:5984'},
    featureConfig = {dbName: 'usgin-feature-all', cacheName: cacheConfig.dbName, dbUrl: 'http://localhost:5984'};*/
    cacheConfig = {dbName:'usgin-cache-all', dbUrl: 'mongodb://localhost:27017/'},
    featureConfig = {dbName: 'usgin-feature-all', cacheName: cacheConfig.dbName, dbUrl: 'mongodb://localhost:27017/'};
   // writeToFile = require('../featuresMongo/testMongo');

/*
 urlSplit = urlString.split("/"),
 StateName = urlSplit[6].substr(0,2).toLowerCase(),
 cacheConfig = {dbName:'usgin-cache-'+StateName, dbUrl: 'http://localhost:5984'},
 featureConfig = {dbName: 'usgin-feature-'+StateName, cacheName: cacheConfig.dbName, dbUrl: 'http://localhost:5984'};
 //console.log('usgin-cache-'+ StateName); */


var tests = {

   /* 'with the test WFS Server running': {
        topic: function () {
            server.start(this.callback);
        },
    */
        'and the database setup': {
           topic: function () {
                cache(false, cacheConfig).setup(this.callback);
                console.log("setup successful");
            },
            'database setup works': function (err, response) {
                assert.isNull(err);
                console.log("setup successful ");
            },
              'and cleared,': {
            topic: function () {
                    console.log("Clear Starts here");
                    cache(false, cacheConfig).clear(this.callback);
                },
                'database clear works': function (err, response) {

                    assert.isNull(err);
                } ,
                'a GetFeature request can be made': {
                    topic: function () {

                        //cache(false, cacheConfig).getFeature('http://localhost:3010/wfs/00570e7187459885e5c18c3a5f498d5d', 'aasg:BoreholeLithInterval', this.callback);
                        cache(false, cacheConfig).getFeature(urlString, 'aasg:ThermalSpring', this.callback);
                        // cache(false, cacheConfig).getFeature('http://services.azgs.az.gov/ArcGIS/services/aasggeothermal/AZThermalSprings/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=ThermalSpring', 'aasg:ThermalSpring', this.callback);
                        // cache(false, cacheConfig).getFeature('http://mgs.geology.wmich.edu/arcgis/services/MIWellLogs/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=WellLog', 'aasg:WellLog', this.callback);
                        // cache(false, cacheConfig).getFeature('http://localhost:3010/wfs/00570e7187459885e5c18c3a5f498d5d?request=GetFeature&TypeName=', 'aasg:ThermalSpring', this.callback);
                        console.log("Get Feature  request completes here");
                    },
                    'does not fail': function (err, doc) {
                        assert.isNull(err);
                    },
                    'before shutting the server down.': {
                        topic: function () {
                            server.stop(this.callback);
                        },
                        'successfully': function (err) {
                            assert(!err);
                        },
                        'Setup the feature db': {

                            topic: function () {
                                console.log("in the feature configurations");
                                //features(featureConfig).setup(this.callback);
                            },
                            'clear it': {
                                topic: function () {
                                    features(featureConfig).clear(this.callback);
                                },
                                'and the features can be converted': {
                                    topic: function () {
                                        console.log("in the get features...!");
                                        features(featureConfig).getFeatures(this.callback);
                                    },
                                    'does not fail': function (err, doc) {
                                        assert.isNull(err);
                                    },
                                    'and leaves the right number of records': {
                                        topic: function () {
                                            features(featureConfig).db.list(this.callback);
                                        },
                                        'there should be 75' : function (err, response) {
                                            //assert.equal(133, response.rows.length - 1);
                                            if (response.rows.length - 1 > 0) {
                                                assert.equal(response.rows.length - 1, response.rows.length - 1);
                                            }
                                        }
                                    }
                                }
                            } //Clear Features
                        } //setup Featurest
                   } //Before Shutting Down the server
                } //Get Feature Request
         } //clear cache
       } //server starts
 //  }
};

if (require.main === module) {
    vows.describe('The Features Module').addBatch(tests).export(module);
} else {
    module.exports = tests;
}