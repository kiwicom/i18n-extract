"use strict";

var _chai = require("chai");

var _findMissing = _interopRequireDefault(require("./findMissing.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
describe('#findMissing()', function () {
  describe('static keys', function () {
    it('should work with a simple case', function () {
      var missing = (0, _findMissing.default)({
        key1: 'Key 1',
        key2: 'Key 2'
      }, [{
        key: 'key1',
        loc: null
      }, {
        key: 'key2',
        loc: null
      }, {
        key: 'key3',
        loc: null
      }]);

      _chai.assert.deepEqual([{
        type: 'MISSING',
        key: 'key3',
        loc: null
      }], missing, 'Should report one missing key.');
    });
  });
  describe('dynamic keys', function () {
    it('should work with a simple case', function () {
      var missing = (0, _findMissing.default)({
        'foo.key1': 'Key 1',
        'foo.key2': 'Key 2',
        bar: 'Key 3',
        'foo.key.bar': 'Key 4'
      }, [{
        key: 'foo.*',
        loc: null
      }, {
        key: '*.key1',
        loc: null
      }, {
        key: '*',
        loc: null
      }, {
        key: 'foo.*.bar',
        loc: null
      }]);

      _chai.assert.deepEqual([], missing, 'Should report zero missing key.');
    });
    it('should work with a simple case', function () {
      var missing = (0, _findMissing.default)({
        'bar.key1': 'Key 1',
        'bar.key.foo': 'Key 1',
        foo: 'Key 2'
      }, [{
        key: 'foo.*',
        loc: null
      }, {
        key: '*.key2',
        loc: null
      }, {
        key: 'bar.*.foo1',
        loc: null
      }]);

      _chai.assert.deepEqual([{
        key: 'foo.*',
        type: 'MISSING',
        loc: null
      }, {
        key: '*.key2',
        type: 'MISSING',
        loc: null
      }, {
        key: 'bar.*.foo1',
        type: 'MISSING',
        loc: null
      }], missing, 'Should report three missing key.');
    });
    it('should do an exact match even with dynamic keys', function () {
      var missing = (0, _findMissing.default)({
        'bar.key.foo': 'Key 1'
      }, [{
        key: 'key.*',
        loc: null
      }]);

      _chai.assert.deepEqual([{
        key: 'key.*',
        type: 'MISSING',
        loc: null
      }], missing, 'Should report one missing key.');
    });
  });
});