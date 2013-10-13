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

      var start = 0,
          totalRe = /numberOfRecordsMatched=(\d+)/i,
          nextRe = /nextRecord=(\d+)/i;

      cache.GetRecords(cswUrl, start, limit, finishedYet);

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
          cache.GetRecords(cswUrl, next, limit, finishedYet);
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
        async.eachLimit(ids, 10, performRequest, callback);
      }

      // Given one ID, make a GetRecordByID request
      function performRequest(id, callback) {
        cache.getRecordById(cswUrl, id, callback);
      }
    }
  };
};