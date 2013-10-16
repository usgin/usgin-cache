var vows = require('vows');

vows.describe('The USGIN Cache')
  .addBatch(require('./cache-getRecords'))
  .addBatch(require('./cache-getRecordById'))
  .addBatch(require('./cache-getCapabilities.js'))
  .addBatch(require('./harvest-getAllRecords.js'))
  .addBatch(require('./harvest-getRecordsById.js'))
  .addBatch(require('./harvest-harvestCsw.js'))
  .export(module);