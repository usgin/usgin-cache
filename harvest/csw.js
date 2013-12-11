// # CSW Harvester
var async = require('async'),
    _ = require('underscore');

// Initiate by passing in the base URL for a CSW service
module.exports = function (cache, cswUrl) {
  
  // Public API
  return  {
    // Paginate through GetRecords requests until the entire CSW is harvested
    getAllRecords: function (limit, callback) {
      if (typeof limit === 'function' || !limit) {
        callback = limit ? limit : function () {};
        limit = 10;
      }

      // Queue up subsequent requests
      cache.getRecords(cswUrl, 0, limit, function (err, doc) {
        if (err) return callback(err);
        
        var totalRe = /numberOfRecordsMatched="(\d+)"/i,
            returnedRe = /numberOfRecordsReturned="(\d+)"/i,
            xml = doc.response,

            total = totalRe.exec(xml),
            returned = returnedRe.exec(xml);

        if ((!total || total.length < 2) || (!returned || returned.length < 2)) {
          callback(new Error('CSW Response was invalid.')); return;
        }

        total = Number(total[1]);
        returned = Number(returned[1]);
        var start = returned + 1,
            starts = [];
        while (start < total) {
          starts.push(start);
          start = start + returned;
        }
        
        async.eachLimit(starts, 10, function (start, callback) {
          cache.getRecords(cswUrl, start, limit, callback);
        }, callback);
      });

      function finishedYet(err, doc) {
        if (err) { callback(err); return; }

        var xml = doc.response,
            total, next;
        
        try {
          total = totalRe.exec(xml)[1];
          next = nextRe.exec(xml)[1];
        }
        catch (error) { callback(error); return; }
        
        if (next !== 0 && next <= total) {
          cache.getRecords(cswUrl, next, limit, finishedYet);
        } else {
          callback(null);
        }
      }
    },

    // Make a set of GetRecordByID requests
    //  If `ids` are not provided, it assumes ALL ids available for this CSW base URL
    getRecordsByIds: function (ids, callback) {
      // First need to make sure we have ids and a callback
      if (typeof ids === 'function' || !ids) {
        callback = ids ? ids : function () {};
        cache.idsFromCsw(cswUrl, idsReady);
      } else {
        idsReady(null, ids);
      }

      // This routine actually fetches the IDS, fires the callback when done.
      function idsReady(err, ids) {
        async.eachLimit(ids, 10, performRequest, function (err) {
          callback(err);
        });
      }

      // Given one ID, make a GetRecordByID request
      function performRequest(id, callback) {
        cache.getRecordById(cswUrl, id, callback);
      }
    }
  };
};