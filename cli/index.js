#!/usr/bin/env node
var async = require('async');

var argv = require('optimist')
  .alias('cswUrl', 'c')
  .describe('cswUrl', 'The URL for a CSW containing feature you\'d like to cache')
  .default('cswUrl', '')

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

  .alias('solr', 's')
  .describe('solr', '[optional] Connection information for interacting with SOLR')
  .default('solr', '')

  .alias('postgresql', 'p')
  .describe('postgresql', '[optional] Connection information for interacting with PostGIS')
  .default('postgresql', '')

  .alias('mapping', 'm')
  .describe('mapping', '[optional] Specify the name of a mapping function to use with -index, -addToPostGis, and -cluster')
  .default('mapping', '')

  .alias('index', 'i')
  .boolean('index')
  .describe('index', '[optional] If specified, data from the specified mapping will be updated in the Solr index')

  .alias('addToPostGis', 'a')
  .boolean('addToPostGis')
  .describe('addToPostGis', '[optional] If specified, rebuild the PostGIS table for the specified mapping')

  .alias('cluster', 'g')
  .boolean('cluster')
  .describe('cluster', '[optional] If specified, rebuild the cache of clustered features for the specified mapping')

  .alias('refresh', 'r')
  .describe('refresh', '[optional] Comma-separated list of aspects of the system to refresh. Options are csw|capabilities|features.')
  .default('refresh', '')
  .argv,

  config = {dbUrl: argv.dbUrl, dbName: argv.dbName},
  featureConfig = {dbUrl: argv.dbUrl, dbName: argv.featuresName, cacheName: argv.dbName},
  refresh = argv.refresh.split(','),
  cache = require('../cache')(false, config),
  features = require('../features')(featureConfig),
  refreshHarvest = require('../harvest')(true, config),
  doNotRefreshHarvest = require('../harvest')(false, config);


if (argv.solr !== '') {
  console.log('Parsing SOLR configuration...');
  var connect = /\/\/(.+?):(.+)\/(.+)\/(.+)/.exec(argv.solr);
  argv.solr = {
    host: connect[1],
    port: connect[2],
    core: connect[3],
    path: connect[4]
  };
  featureConfig['solr'] = argv.solr;
}

if (argv.postgresql !== '') {
  var connect = /\/\/(.+?):(.+)@(.+):(.+)\/(.+)$/.exec(argv.postgresql);
  argv.postgresql = {
    user: connect[1],
    password: connect[2],
    host: connect[3],
    port: connect[4],
    dbname: connect[5]
  };
}

// Make sure that the databases are set up first.
console.log('Setting up the OGC cache...');
cache.setup(function (err) {
  if (err) return console.log(err);

  console.log('Setting up the feature cache...')
  features.setup(function (err) {
    var toDo = [];
    if (argv.cswUrl !== '') toDo.push(cswHarvest);
    if (argv.featureType !== '') toDo.push(wfsHarvest);
    if (argv.index !== '') toDo.push(runIndexing);
    if (argv.cluster) toDo.push(buildClusters);
    if (argv.index && argv.mapping) toDo.push(runIndexing);    
    if (argv.addToPostGis && argv.postgresql !== '' && argv.mapping !== '') toDo.push(pushToPostGIS);
    if (argv.cluster && argv.postgresql !== '' && argv.mapping !== '') toDo.push(buildClusters);
    async.series(toDo);
  });
});

function cswHarvest(callback) {
  console.log('Starting the CSW Harvest...')
  var harvest = refresh.indexOf('csw') !== -1 ? refreshHarvest : doNotRefreshHarvest;
  harvest.harvestCsw(argv.cswUrl, function (err) {
    var msg = err ? err : 'CSW Harvested!';
    console.log(msg);
    if (callback) callback(err);
  });
}

function wfsHarvest(callback) {
  console.log('Gathering WFS GetCapabilities documents...');
  var harvest = refresh.indexOf('capabilities') !== -1 ? refreshHarvest : doNotRefreshHarvest;
  harvest.gatherCapabilities(function (err) {
    console.log('Gathering WFS Features of type: ' + argv.featureType + '...');
    harvest = refresh.indexOf('features') !== -1 ? refreshHarvest : doNotRefreshHarvest;
    harvest.gatherFeatures(argv.featureType, function (err) {
      var msg = err ? err : 'WFS Features Harvested!';
      console.log(msg);
      if (err) return callback(err);
      console.log('Populating the feature cache...')
      features.getFeatures(argv.featureType, function (err) {
        var msg = err ? err : 'Features Ready!';
        console.log(msg);
        callback(err);
      });
    });
  });
}

function runIndexing(callback) {
  console.log('Indexing based on the ' + argv.mapping + ' view...');
  require('../solr')(featureConfig).addToIndex(argv.mapping, function (err) {
    var msg = err ? err : 'Indexing finished!';
    console.log(msg);
    if (callback) callback(err);
  });
}

function buildClusters(callback) {
  console.log('Building clustered features...');
  features.buildClusters(argv.mapping, argv.postgresql, function (err) {
    var msg = err ? err : 'Clustering finished!';
    console.log(msg);
    if (callback) callback(err);
  });
}

function pushToPostGIS(callback) {
  console.log('Pushing ' + argv.mapping + ' features to PostGIS...');  
  features.toPostGis(argv.mapping, argv.postgresql, function (err) {
    console.log(err ? err : 'PostGIS features pushed!');
    if (callback) callback(err);
  });
}