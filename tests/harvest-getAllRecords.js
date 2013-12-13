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
        'all CSW records can be gathered': {
          topic: function () {
            var harvester = csw(cache(false, testConfig), 'http://localhost:3011/csw');
            harvester.getAllRecords(this.callback);
          },
          'does not fail': function (err) {
            assert(!err);
          },
          'before turning off the CSW server': {
            topic: function () {
              server.stop(this.callback);  
            },
            'and we are all smiling and happy': function (err, doc) {
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