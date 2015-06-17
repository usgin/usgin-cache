var assert = require('assert'),
    vows = require('vows'),
    server = require('./cswServer'),
    wfsServer = require('./wfsServer'),
    cache = require('../cache'),
    harvest = require('../harvest'),
    wfs = require('../harvest/wfs');
    
    testConfig = {dbName: 'usgin-cache-test', dbUrl: 'http://localhost:5984'}, 
    db = cache(false, testConfig);

    var tests = {
    	'setup test csw server': {
    		topic: function () {
    			server.start(this.callback);
    		},
            'setup test wfs server': {
                topic: function () {
                    wfsServer.start(this.callback)
                },
                'make a db connection': {
                    topic: function () {
                        db.setup(this.callback);
                    },
                    'db connected': function (err, response) {
                        assert.isNull(err);
                    },
                    'clear db': {
                        topic: function () {
                            db.clear(this.callback);
                        },
                        'db cleared': function (err, repsonse) {
                            assert.isNull(err);
                        },
                        'get record by id': {
                            topic: function () {
                                db.getRecordById('http://localhost:3011/csw', '00570e7187459885e5c18c3a5f498d5d', this.callback);
                            },
                            'and works': function (err, response) {
                                assert.isNull(err);
                            },
                            'so gather some capabilities': {
                                topic: function () {
                                    wfs(db).gatherCapabilities(this.callback);
                                },
                                'did not fail': function (err) {
                                    assert(!err);
                                },
                                'and has some capabilities in the db': {
                                    topic: function () {
                                        db.db.view('usgin-cache', 'requests', {key: 'getcapabilities', reduce: false}, this.callback);
                                    },
                                    'has a capabilities doc': function (err, response) {
                                        assert.equal(response.rows.length, 1);
                                    },
                                    'get wfs urls by type': {
                                        topic: function () {
                                            featuretype = "aasg:BoreholeLithInterval";
                                            db.wfsUrlsByType(featuretype, this.callback);
                                        },
                                        'did not fail': function (err, response) {
                                            assert(!err);
                                        },
                                        'get some features by type': {
                                            topic: function () {
                                                var urls = [ 'http://localhost:3010/wfs/00570e7187459885e5c18c3a5f498d5d' ],
                                                    featuretype = "aasg:BoreholeLithInterval",
                                                    //featuretype = "aasg",
                                                    maxfeatures = 10;
                                                wfs(db).getFeatures(urls, featuretype, maxfeatures, this.callback);
                                            },
                                            'did not fail': function (err, response) {
                                                assert(!err);
                                            },
                                            'and has some features in the db': {
                                                topic: function () {
                                                    db.db.view('usgin-cache', 'requests', {key: 'getfeature', reduce: false}, this.callback);
                                                },
                                                'has features': function (err, response) {
                                                    assert.equal(response.rows.length, 1);
                                                },
                                                'turn off wfs server': {
                                                    topic: function() {
                                                        wfsServer.stop(this.callback)
                                                    },
                                                    'turn off csw server': {
                                                        topic: function () {
                                                            server.stop(this.callback);
                                                        },
                                                        'worked': function (err, response) {
                                                            assert.isNull(err);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
    	}
    };

if (require.main === module) {
  vows.describe('The Harvest Module').addBatch(tests).export(module);
} else {
  module.exports = tests;
}