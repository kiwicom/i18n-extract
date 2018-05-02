"use strict";

var _i18n = _interopRequireDefault(require("i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var foo = 'bar'; // Tail position

(0, _i18n.default)("key.".concat(foo)); // Middle position

(0, _i18n.default)("key.".concat(foo, ".bar")); // Start position

(0, _i18n.default)("".concat(foo, ".bar")); // All

(0, _i18n.default)("".concat(foo));