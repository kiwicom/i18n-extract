"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findUnused;
var UNUSED = 'UNUSED';

function findUnused(locale, keysUsed) {
  var reports = [];
  var keysUsedHash = {};
  keysUsed.forEach(function (keyUsed) {
    keyUsed = keyUsed.key; // Dynamic key

    if (keyUsed.includes('*')) {
      var regExp = new RegExp("^".concat(keyUsed.replace('*', '(.+)'), "$"));
      Object.keys(locale).forEach(function (localeKey) {
        if (regExp.exec(localeKey) !== null) {
          keysUsedHash[localeKey] = true;
        }
      });
    } else {
      keysUsedHash[keyUsed] = true;
    }
  });
  Object.keys(locale).forEach(function (key) {
    if (!keysUsedHash[key]) {
      reports.push({
        type: UNUSED,
        key: key
      });
    }
  });
  return reports;
}