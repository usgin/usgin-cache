var assert = require('assert'),
    server = require('./cswServer'),
    cache = require('../cache'),
    csw = require('../harvest/csw'),
    vows = require('vows'),
    
    testConfig = {dbName: 'usgin-cache-test', dbUrl: 'http://localhost:5984'};

var tests = {
  'with the test CSW Server running': {
    topic: function () {
      server.start(this.callback);
    },
    'and the database setup': {
      topic: function () {
        cache(false, testConfig).setup(this.callback);
      },
      'database setup works': function (err, response) {
        assert.isNull(err);
      },
      'and cleared,': {
        topic: function () {
          cache(false, testConfig).clear(this.callback);
        },
        'database clear works': function (err, response) {
          assert.isNull(err);
        },
        'a GetRecords request can be made': {
          topic: function () {
            cache(false, testConfig).getRecords('http://localhost:8000', 0, 10, this.callback);
          },
          'followed by a CSW getRecordsById operation': {
            topic: function () {
              var harvester = csw(cache(false, testConfig), 'http://localhost:8000');
              harvester.getRecordsByIds(this.callback);
            },
            'does not fail': function (err, response) {
              assert.isNull(err);
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