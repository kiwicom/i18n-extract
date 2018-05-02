"use strict";

var _chai = require("chai");

var _findUnused = _interopRequireDefault(require("./findUnused.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
describe('#findUnused()', function () {
  describe('static keys', function () {
    it('should work with a simple case', function () {
      var unused = (0, _findUnused.default)({
        key1: 'Key 1',
        key2: 'Key 2'
      }, [{
        key: 'key1',
        loc: null
      }, {
        key: 'key2',
        loc: null
      }]);

      _chai.assert.deepEqual([], unused, 'Should report zero unused key.');
    });
    it('should work with a simple case', function () {
      var unused = (0, _findUnused.default)({
        key1: 'Key 1',
        key2: 'Key 2',
        key3: 'Key 3'
      }, [{
        key: 'key1',
        loc: null
      }, {
        key: 'key2',
        loc: null
      }]);

      _chai.assert.deepEqual([{
        type: 'UNUSED',
        key: 'key3'
      }], unused, 'Should report one unused key.');
    });
  });
  describe('dynamic keys', function () {
    it('should work with a simple case', function () {
      var unused = (0, _findUnused.default)({
        'foo.key1': 'Key 1',
        'foo.key2': 'Key 2'
      }, [{
        key: 'foo.*',
        loc: null
      }]);

      _chai.assert.deepEqual([], unused, 'Should report zero unused key.');
    });
    it('should work with a simple case', function () {
      var unused = (0, _findUnused.default)({
        'foo.key1': 'Key 1',
        'foo.key2': 'Key 2',
        key3: 'Key 3'
      }, [{
        key: 'foo.*',
        loc: null
      }]);

      _chai.assert.deepEqual([{
        type: 'UNUSED',
        key: 'key3'
      }], unused, 'Should report one unused key.');
    });
    it('should do an exact match even with dynamic keys', function () {
      var missing = (0, _findUnused.default)({
        'bar.key.foo': 'Key 1'
      }, [{
        key: 'key.*',
        loc: null
      }]);

      _chai.assert.deepEqual([{
        key: 'bar.key.foo',
        type: 'UNUSED'
      }], missing, 'Should report one missing key.');
    });
  });
});