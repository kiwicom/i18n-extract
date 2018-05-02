"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractFromCode;

var _babylon = require("babylon");

var _traverse = _interopRequireDefault(require("@babel/traverse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noInformationTypes = ['CallExpression', 'Identifier', 'MemberExpression'];

function getKey(node) {
  if (node.type === 'StringLiteral') {
    return node.value;
  } else if (node.type === 'BinaryExpression' && node.operator === '+') {
    return getKey(node.left) + getKey(node.right);
  } else if (node.type === 'TemplateLiteral') {
    return node.quasis.map(function (quasi) {
      return quasi.value.cooked;
    }).join('*');
  } else if (noInformationTypes.includes(node.type)) {
    return '*'; // We can't extract anything.
  }

  console.warn("Unsupported node: ".concat(node.type));
  return null;
}

var commentRegExp = /i18n-extract (.+)/;
var commentIgnoreRegExp = /i18n-extract-disable-line/;

function extractFromCode(code) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$marker = options.marker,
      marker = _options$marker === void 0 ? 'i18n' : _options$marker,
      _options$keyLoc = options.keyLoc,
      keyLoc = _options$keyLoc === void 0 ? 0 : _options$keyLoc;
  var ast = (0, _babylon.parse)(code, {
    sourceType: 'module',
    // Enable all the plugins
    plugins: ['jsx', 'flow', 'asyncFunctions', 'classConstructorCall', 'doExpressions', 'trailingFunctionCommas', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'exponentiationOperator', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport']
  });
  var keys = [];
  var ignoredLines = []; // Look for keys in the comments.

  ast.comments.forEach(function (comment) {
    var match = commentRegExp.exec(comment.value);

    if (match) {
      keys.push({
        key: match[1].trim(),
        loc: comment.loc
      });
    } // Check for ignored lines


    match = commentIgnoreRegExp.exec(comment.value);

    if (match) {
      ignoredLines.push(comment.loc.start.line);
    }
  }); // Look for keys in the source code.

  (0, _traverse.default)(ast, {
    CallExpression: function CallExpression(path) {
      var node = path.node;

      if (ignoredLines.includes(node.loc.end.line)) {
        // Skip ignored lines
        return;
      }

      var _node$callee = node.callee,
          name = _node$callee.name,
          type = _node$callee.type;

      if (type === 'Identifier' && name === marker || path.get('callee').matchesPattern(marker)) {
        var key = getKey(keyLoc < 0 ? node.arguments[node.arguments.length + keyLoc] : node.arguments[keyLoc]);

        if (key) {
          keys.push({
            key: key,
            loc: node.loc
          });
        }
      }
    }
  });
  return keys;
}