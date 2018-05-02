"use strict";

var _chai = require("chai");

var _forbidDynamic = _interopRequireDefault(require("./forbidDynamic.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
describe('#forbidDynamic()', function () {
  describe('simple case', function () {
    it('should report forbidden dynamic key', function () {
      var missing = (0, _forbidDynamic.default)({}, [{
        key: 'key1.*',
        loc: null
      }, {
        key: '*.key2',
        loc: null
      }]);

      _chai.assert.deepEqual([{
        type: 'FORBID_DYNAMIC',
        key: 'key1.*',
        loc: null
      }, {
        type: 'FORBID_DYNAMIC',
        key: '*.key2',
        loc: null
      }], missing, 'Should report forbidden dynamic key.');
    });
    it('should no report static key', function () {
      var missing = (0, _forbidDynamic.default)({}, [{
        key: 'key1',
        loc: null
      }, {
        key: 'key2',
        loc: null
      }]);

      _chai.assert.deepEqual([], missing, 'Should not report static key.');
    });
  });
});