var assert = require('assert'),
    server = require('./cswServer'),
    cache = require('../cache'),
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
            cache(false, testConfig).getRecords('http://localhost:3011/csw', 0, 2, this.callback);
          },
          'and the metadata ids for csw are found': {
            topic: function () {
              cache(true, testConfig).idsFromCsw('http://localhost:3011/csw', this.callback);
            },
            'equals 5': function (err, response) {
              assert.equal(response.length, 5);
            },
            'before turning off the CSW server': {
              topic: function () {
                server.stop(this.callback);
              },
              'and the metadata ids can still be retrieved': {
                topic: function () {
                  cache(false, testConfig).idsFromCsw('http://localhost:3011/csw', this.callback);
                },
                'equals 5': function (err, response) {
                  assert.equal(response.length, 5);
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
  vows.describe('The CSW Module').addBatch(tests).export(module);
} else {
  module.exports = tests;
}