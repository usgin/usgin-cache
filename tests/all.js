var vows = require('vows');

vows.describe('The USGIN Cache')
  .addBatch(require('./cache-getRecords'))
  .addBatch(require('./cache-idsFromCsw'))
  .addBatch(require('./cache-getRecordById'))
  .addBatch(require('./cache-getCapabilities.js'))
  .addBatch(require('./cache-getFeature.js'))
  .addBatch(require('./harvest-getAllRecords.js'))
  .addBatch(require('./harvest-getRecordsById.js'))
  .addBatch(require('./harvest-harvestCsw.js'))
  .addBatch(require('./features-getFeatures.js'))
  .export(module);