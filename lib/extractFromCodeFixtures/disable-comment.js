"use strict";

var _i18n = _interopRequireDefault(require("i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
(0, _i18n.default)('foo.bar1');
(0, _i18n.default)('foo.bar2');
/* i18n-extract-disable-line */

(0, _i18n.default)('foo.bar4');
/*
  * i18n-extract-disable-line
  */

(0, _i18n.default)('foo.bar5'); // i18n-extract-disable-line

/* i18n-extract-disable-line */

(0, _i18n.default)('foo.bar6');
(0, _i18n.default)('foo.bar3');