var assert = require('assert'),
    server = require('./cswServer'),
    wfsServer = require('./wfsServer'),
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
        'a GetRecordById request can be made': {
          topic: function () {
            cache(false, testConfig).getRecordById('http://localhost:3011/csw', '00570e7187459885e5c18c3a5f498d5d', this.callback);
          },
          'does not fail': function (err, response) {
            assert.isNull(err);
          },
          'and forced to refresh': {
            topic: function () {
              cache(true, testConfig).getRecordById('http://localhost:3011/csw', '00570e7187459885e5c18c3a5f498d5d', this.callback);
            },
            'does not fail': function (err, response) {
              assert.isNull(err);
            },
            'before turning off the CSW server': {
              topic: function () {
                server.stop(this.callback);
              },
              'and the doc can still be retrieved': {
                topic: function () {
                  cache(false, testConfig).getRecordById('http://localhost:3011/csw', '00570e7187459885e5c18c3a5f498d5d', this.callback);
                },
                'does not fail': function (err, response) {
                  assert.isNull(err);
                },
                'has the correct requestType': function (err, response) {
                  assert.equal(response.requestType, 'getrecordbyid');
                }
              },
              'and the doc cannot be refreshed': {
                topic: function () {
                  cache(true, testConfig).getRecordById('http://localhost:3011/csw', '00570e7187459885e5c18c3a5f498d5d', this.callback);
                },
                'should fail': function (err, response) {
                  assert.isNotNull(err);
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