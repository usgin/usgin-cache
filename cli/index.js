#!/usr/bin/env node
var argv = require('optimist')
  .alias('cswUrl', 'c')
  .describe('cswUrl', 'The URL for a CSW containing feature you\'d like to cache')
  .default('cswUrl', 'http://catalog.stategeothermaldata.org/geoportal/csw')

  .alias('featureType', 't')
  .describe('featureType', '[optional] The name of a WFS FeatureType that you would like to cache')
  .default('featureType', '')

  .alias('dbUrl', 'd')
  .describe('dbUrl', '[optional] The URL for CouchDB')
  .default('dbUrl', 'http://localhost:5984')

  .alias('cacheName', 'n')
  .describe('cacheName', '[optional] The name of the cache database')
  .default('cacheName', 'usgin-cache')

  .alias('featuresName', 'f')
  .describe('featuresName', '[optional] The name of the features database')
  .default('featuresName', 'usgin-features')

  .alias('index', 'i')
  .describe('index', '[optional] The name of a mapping function to run into the Solr index')
  .default('index', '')

  .alias('refresh', 'r')
  .boolean('refresh')
  .describe('refresh', '[optional] If specified, data already in the cache will be replaced')

  .alias('verbose', 'v')
  .boolean('verbose')
  .describe('verbose', '[optional] If specified, do some logging')
  .argv,

  config = {dbUrl: argv.dbUrl, dbName: argv.dbName},
  featureConfig = {dbUrl: argv.dbUrl, dbName: argv.featuresName, cacheName: argv.dbName},
  cache = require('../cache')(argv.refresh, config),
  features = require('../features')(argv.refresh, featureConfig),
  harvest = require('../harvest')(argv.refresh, config);


// Make sure that the database is set up first.
console.log('Setting up the OGC cache...');
cache.setup(function (err) {
  if (err) return console.log(err);

  // Then, harvest from the CSW
  console.log('Starting the CSW Harvest...')
  harvest.harvestCsw(argv.cswUrl, function (err) {
    if (err) return console.log(err);

    // Now, if asked, gather features of the specified type
    console.log('CSW Harvested!');
    if (argv.featureType !== '') {
      console.log('Gathering WFS Features of type: ' + argv.featureType + '...');
      harvest.gatherFeatures(argv.featureType, function (err) {
        if (err) return console.log(err);

        // Convert them to GeoJSON
        console.log('Setting up the feature cache...')
        features.setup(function (err) {
          if (err) return console.log(err);

          console.log('Populating the feature cache...')
          features.getFeatures(argv.featureType, function (err) {
            if (err) return console.log(err);

            console.log('Features ready!');
            if (argv.index !== '') {
              console.log('Indexing based on the ' + argv.index + ' view...');
              require('../solr')(featureConfig).addToIndex(argv.index, function (err) {
                if (err) return console.log(err);

                console.log('Indexing finished!');
              });
            }
          });
        });
      });
    }
  }, argv.verbose);
});
