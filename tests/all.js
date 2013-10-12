var vows = require('vows');

vows.describe('The USGIN Cache')
  .addBatch(require('./cache-getRecords'))
  .addBatch(require('./cache-getRecordById'))
  .export(module);