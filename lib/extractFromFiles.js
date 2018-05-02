"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractFromFiles;

var _glob = _interopRequireDefault(require("glob"));

var _fs = _interopRequireDefault(require("fs"));

var _extractFromCode = _interopRequireDefault(require("./extractFromCode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractFromFiles(filenames, options) {
  var keys = []; // filenames should be an array

  if (typeof filenames === 'string') {
    filenames = [filenames];
  }

  var toScan = [];
  filenames.forEach(function (filename) {
    toScan = toScan.concat(_glob.default.sync(filename, {}));
  });
  toScan.forEach(function (filename) {
    var code = _fs.default.readFileSync(filename, 'utf8');

    var extractedKeys = (0, _extractFromCode.default)(code, options);
    extractedKeys.forEach(function (keyObj) {
      keyObj.file = filename;
      keys.push(keyObj);
    });
  });
  return keys;
}