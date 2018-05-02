"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findMissing;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MISSING = 'MISSING';

function isMissing(locale, keyUsed) {
  // Dynamic key
  if (keyUsed.includes('*')) {
    var regExp = new RegExp("^".concat(keyUsed.replace('*', '(.+)'), "$"));
    return Object.keys(locale).every(function (localeKey) {
      return regExp.exec(localeKey) === null;
    });
  }

  return !locale[keyUsed];
}

function findMissing(locale, keysUsed) {
  var reports = [];
  keysUsed.forEach(function (keyUsed) {
    if (isMissing(locale, keyUsed.key)) {
      reports.push(_objectSpread({
        type: MISSING
      }, keyUsed));
    }
  });
  return reports;
}