"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniq = uniq;
exports.default = void 0;

function uniq(array) {
  var seen = {};
  return array.filter(function (item) {
    if (seen[item]) {
      return false;
    }

    seen[item] = true;
    return true;
  });
}

var _default = {};
exports.default = _default;