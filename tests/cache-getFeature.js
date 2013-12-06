var assert = require('assert'),
    server = require('./wfsServer'),
    cache = require('../cache'),
    vows = require('vows'),
    
    testConfig = {dbName: 'usgin-cache-test', dbUrl: 'http://localhost:5984'};

var tests = {
  'with the test WFS Server running': {
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
        'a GetFeature request can be made': {
          topic: function () {
            cache(false, testConfig).getFeature('http://localhost:3010/wfs', 'azgs:earthquakedata', this.callback);
          },
          'does not fail': function (err, doc) {
            assert.isNull(err);
          },
          'before shutting the server down': {
            topic: function () {
              server.stop(this.callback);
            },
            'successfully': function (err) {
              assert(!err);
            },
            'and requesting the cached doc': {
              topic: function () {
                cache(false, testConfig).getFeature('http://localhost:3010/wfs', 'azgs:earthquakedata', this.callback);
              },
              'returns it': function (err, doc) {
                assert.isNull(err);
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