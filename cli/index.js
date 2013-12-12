#!/usr/bin/env node
var argv = require('optimist')
  .alias('cswUrl', 'c')
  .demand('cswUrl')
  .describe('cswUrl', 'The URL for a CSW containing feature you\'d like to cache')
  
  .alias('featureType', 'f')
  .describe('featureType', '[optional] The name of a WFS FeatureType that you would like to cache')
  .default('featureType', '')

  .alias('dbUrl', 'd')
  .describe('dbUrl', '[optional] The URL for CouchDB')
  .default('dbUrl', 'http://localhost:5984')

  .alias('dbName', 'n')
  .describe('dbName', '[optional] The name of the cache database')
  .default('dbName', 'usgin-cache')

  .alias('refresh', 'r')
  .boolean('refresh')
  .describe('refresh', '[optional] If specified, data already in the cache will be replaced')

  .alias('verbose', 'v')
  .boolean('verbose')
  .describe('verbose', '[optional] If specified, do some logging')
  .argv,

  config = {dbUrl: argv.dbUrl, dbName: argv.dbName},
  cache = require('../cache')(argv.refresh, config),
  harvest = require('../harvest')(argv.refresh, config);


// Make sure that the database is set up first.
cache.setup(function (err) {
  if (err) return console.log(err);

  // Then, harvest from the CSW
  harvest.harvestCsw(argv.cswUrl, argv.verbose, function (err) {
    if (err) return console.log(err);

    // Now, if asked, gather features of the specified type
    if (argv.featureType !== '') {
      harvest.gatherFeatures(argv.featureType, function (err) {
        if (err) return console.log(err);
      });
    }
  });
});
