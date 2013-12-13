// # These tests assume that you've started SOLR externally for now.

var assert = require('assert'),
    vows = require('vows'),

    testConfig = {cacheName: 'usgin-cache-test', dbUrl: 'http://localhost:5984', dbName: 'usgin-features-test'},
    loadTestData = require('./solrData'),
    solr = require('../solr')(testConfig); // <<<< Need a way to run tests without borking your operational index

var tests = {
  'adds features to the index': {
    topic: function () {
      var finalCallback = this.callback;
      loadTestData(testConfig, function (err) {
        if (err) return finalCallback(err);
        solr.purgeIndex(function (err) {
          if (err) return finalCallback(err);
          solr.addToIndex('thermalSprings', function (err){
            if (err) return finalCallback(err);
            solr.countRecords(finalCallback);
          });
        });
      });
    },
    'but has no chance in hell': function (err, docCount) {
      assert.equal(docCount, 3);
    }
  }
};

if (require.main === module) {
  vows.describe('The Solr Module').addBatch(tests).export(module);
} else {
  module.exports = tests;
}