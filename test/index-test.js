var vows = require('vows');
var assert = require('assert');
var util = require('util');
var sheknows = require('../lib');


vows.describe('passport-sheknows').addBatch({

  'module': {
    'should report a version': function (x) {
      assert.isString(sheknows.version);
    },
  },

}).export(module);
