"use strict";

var _chai = require("chai");

var _flatten = _interopRequireDefault(require("./flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
describe('#flatten()', function () {
  it('should work with flat object', function () {
    var flattened = (0, _flatten.default)({
      key1: 'Key 1',
      key2: 'Key 2',
      key4: 'Key 4'
    });

    _chai.assert.deepEqual({
      key1: 'Key 1',
      key2: 'Key 2',
      key4: 'Key 4'
    }, flattened, 'Should work with a flat object.');
  });
  it('should work with a nested object', function () {
    var flattened = (0, _flatten.default)({
      key1: 'Key 1',
      key2: 'Key 2',
      key4: {
        key41: 'Key 4.1',
        key42: {
          key421: 'Key 4.2.1'
        }
      }
    });

    _chai.assert.deepEqual({
      key1: 'Key 1',
      key2: 'Key 2',
      'key4.key41': 'Key 4.1',
      'key4.key42.key421': 'Key 4.2.1'
    }, flattened, 'Should work with a flat object.');
  });
});