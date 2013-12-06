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
        'a GetRecordById request can be made': {
          topic: function () {
            cache(false, testConfig).getRecordById('http://localhost:8000', '00570e7187459885e5c18c3a5f498d5d', this.callback);
          },
          'and wfs urls found': {
            topic: function () {
              cache(false, testConfig).wfsUrls(this.callback);
            },
            'does not fail': function (err, urls) {
              assert(!err);
            },
            'and capabilities requested': {
              topic: function (urls) {
                cache(false, testConfig).getCapabilities(urls[0], this.callback);
              },
              'does not fail': function (err, doc) {
                assert.isNull(err);
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
    }
  }
};

if (require.main === module) {
  vows.describe('The Cache Module').addBatch(tests).export(module);
} else {
  module.exports = tests;
}