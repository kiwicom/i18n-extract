"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findDuplicated;
var DUPLICATED = 'DUPLICATED';

function findDuplicated(locale, keysUsed) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var reports = [];
  var _options$threshold = options.threshold,
      threshold = _options$threshold === void 0 ? 1 : _options$threshold;
  var valuesUsedHash = {}; // Used for the second stage report

  var valuesAboveThreshold = [];
  Object.keys(locale).forEach(function (key) {
    var value = locale[key];

    if (valuesUsedHash[value]) {
      valuesUsedHash[value].push(key);
    } else {
      valuesUsedHash[value] = [key];
    }

    if (valuesUsedHash[value].length === threshold + 1) {
      valuesAboveThreshold.push(value);
    }
  });
  valuesAboveThreshold.forEach(function (value) {
    reports.push({
      type: DUPLICATED,
      keys: valuesUsedHash[value],
      value: value
    });
  });
  return reports;
}