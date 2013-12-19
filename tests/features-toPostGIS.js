// # These tests assume that you've started SOLR and PostgreSQL externally for now.  Also, that you've created a test db in PostgreSQL.

var assert = require('assert'),
  	vows = require('vows'),
  	pg = require('pg'),
  	testConfig = {cacheName: 'usgin-cache-test', dbUrl: 'http://localhost:5984', dbName: 'usgin-features-test'},
    loadTestData = require('./solrData'),
    solr = require('../solr')(testConfig),
    pgParams = require('./test-config'),
    features = require('../features')(testConfig);

var tests = {
'send three features over to postgis': {
  topic: function () {
  	var finalCallback = this.callback;
  	loadTestData(testConfig, function (err) {
  		if (err) return finalCallback(err);

	    features.toPostGis('thermalSprings', pgParams, function (err) {
	    	if (err) return finalCallback(err);
	    	
	    	var conString = 'postgres://';
	    		conString += pgParams.user && pgParams.password ? pgParams.user + ':' + pgParams.password + '@' : '';
	    		conString += pgParams.host + ':' + pgParams.port + '/' + pgParams.dbname,

	    	client = new pg.Client(conString);

	    	client.connect(function (err) {
	    		if (err) return callback(err);

	    		var qs = "SELECT * FROM thermalsprings;"

	    		client.query(qs, function (err, result) {
	    			if (err) return finalCallback(err);
	    			assert.equal(3, result.rows.length)

				    finalCallback(err);
				   	client.end();
	    		});
	    	});
	    });
  	});  	
  },
  'puts data in postgis': function (err, response) {
  	assert(!err);
  }
}
};

if (require.main === module) {
  vows.describe('The Features Module-PostGIS').addBatch(tests).export(module);
} else {
  module.exports = tests;
}