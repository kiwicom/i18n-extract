"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

function flatten(locale) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var flattened = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.keys(locale).forEach(function (key) {
    var value = locale[key];
    var fullKey;

    if (prefix !== '') {
      fullKey = "".concat(prefix, ".").concat(key);
    } else {
      fullKey = key;
    }

    if (typeof value === 'string') {
      flattened[fullKey] = value;
    } else {
      flatten(value, fullKey, flattened);
    }
  });
  return flattened;
}