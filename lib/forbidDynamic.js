"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = forbidDynamic;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FORBID_DYNAMIC = 'FORBID_DYNAMIC';

function forbidDynamic(locale, keysUsed) {
  var reports = [];
  keysUsed.forEach(function (keyUsed) {
    // Dynamic key
    if (keyUsed.key.includes('*')) {
      reports.push(_objectSpread({
        type: FORBID_DYNAMIC
      }, keyUsed));
    }
  });
  return reports;
}