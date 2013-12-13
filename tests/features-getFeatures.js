var assert = require('assert'),
    server = require('./wfsServer'),
    cache = require('../cache'),
    features = require('../features'),
    vows = require('vows'),
    
    cacheConfig = {dbName: 'usgin-cache-test', dbUrl: 'http://localhost:5984'},
    featureConfig = {dbName: 'usgin-feature-test', cacheName: cacheConfig.dbName, dbUrl: 'http://localhost:5984'};

var tests = {
  'with the test WFS Server running': {
    topic: function () {
      server.start(this.callback);
    },
    'and the database setup': {
      topic: function () {
        cache(false, cacheConfig).setup(this.callback);
      },
      'database setup works': function (err, response) {
        assert.isNull(err);
      },
      'and cleared,': {
        topic: function () {
          cache(false, cacheConfig).clear(this.callback);
        },
        'database clear works': function (err, response) {
          assert.isNull(err);
        },
        'a GetFeature request can be made': {
          topic: function () {
            cache(false, cacheConfig).getFeature('http://localhost:3010/wfs/00570e7187459885e5c18c3a5f498d5d', 'aasg:BoreholeLithInterval', this.callback);
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
                features(featureConfig).setup(this.callback);
              },
              'clear it': {
                topic: function () {
                  features(featureConfig).clear(this.callback);
                },
                'and the features can be converted': {
                  topic: function () {
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
                      assert.equal(75, response.rows.length - 1);
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
  vows.describe('The Features Module').addBatch(tests).export(module);
} else {
  module.exports = tests;
}