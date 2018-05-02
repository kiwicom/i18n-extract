"use strict";

var _chai = require("chai");

var _findDuplicated = _interopRequireDefault(require("./findDuplicated.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
describe('#findDuplicated()', function () {
  it('should report one duplicated key', function () {
    var duplicated = (0, _findDuplicated.default)({
      key1: 'Key 1',
      key2: 'Key 2',
      key3: 'Key 2'
    });

    _chai.assert.deepEqual([{
      type: 'DUPLICATED',
      keys: ['key2', 'key3'],
      value: 'Key 2'
    }], duplicated, 'Should report one duplicated key.');
  });
  it('should report two duplicated keys', function () {
    var duplicated = (0, _findDuplicated.default)({
      key1: 'Key 1',
      key2: 'Key 2',
      key3: 'Key 2',
      key4: 'Key 2'
    });

    _chai.assert.deepEqual([{
      type: 'DUPLICATED',
      keys: ['key2', 'key3', 'key4'],
      value: 'Key 2'
    }], duplicated, 'Should report two duplicated keys.');
  });
  describe('option: threshold', function () {
    it('should report zero duplicated key', function () {
      var duplicated = (0, _findDuplicated.default)({
        key1: 'Key 1',
        key2: 'Key 2',
        key3: 'Key 2',
        key4: 'Key 2'
      }, [], {
        threshold: 3
      });

      _chai.assert.deepEqual([], duplicated, 'Should report zero duplicated key.');
    });
    it('should report two duplicated keys', function () {
      var duplicated = (0, _findDuplicated.default)({
        key1: 'Key 1',
        key2: 'Key 2',
        key3: 'Key 2',
        key4: 'Key 2'
      }, [], {
        threshold: 2
      });

      _chai.assert.deepEqual([{
        type: 'DUPLICATED',
        keys: ['key2', 'key3', 'key4'],
        value: 'Key 2'
      }], duplicated, 'Should report two duplicated keys.');
    });
  });
});