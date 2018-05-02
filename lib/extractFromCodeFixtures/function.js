"use strict";

var _i18n = _interopRequireDefault(require("i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var boolToStr = function boolToStr(a) {
  return a ? 'yes' : 'no';
};

(0, _i18n.default)(boolToStr(true));