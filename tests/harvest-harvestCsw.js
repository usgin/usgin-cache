var assert = require('assert'),
    server = require('./cswServer'),
    cache = require('../cache'),
    harvest = require('../harvest'),
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
        'can harvest a CSW' : {
          topic: function () {
            var harvester = harvest(false, testConfig)
            harvester.harvestCsw('http://localhost:8000', this.callback);
          },
          'does not fail': function (err) {
            assert(!err);
          },
          'and counting records': {
            topic: function () {
              cache(false, testConfig).db.list(this.callback);
            },
            'returns the correct number': function (err, response) {
              assert.equal(response.rows.length, 7);
            },
            'before turning off the CSW server': {
              topic: function () {
                server.stop(this.callback);
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