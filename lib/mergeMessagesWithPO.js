"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeMessagesWithPO;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _gettextParser = _interopRequireDefault(require("gettext-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeMessagesWithPO(messages, poFileName, outputFileName) {
  var poContent = _fs.default.readFileSync(_path.default.resolve(__dirname, poFileName), 'utf8');

  var po = _gettextParser.default.po.parse(poContent);

  var poTransalations = po.translations[''];
  var translations = {};
  var messagesNew = 0;
  var messagesReused = 0;
  messages.forEach(function (message) {
    message = message.key; // The translation already exist

    if (poTransalations[message]) {
      messagesReused += 1;
      translations[message] = poTransalations[message];
      delete translations[message].comments;
    } else {
      messagesNew += 1;
      translations[message] = {
        msgid: message,
        msgstr: ['']
      };
    }
  });
  po.translations[''] = translations;

  _fs.default.writeFileSync(outputFileName, _gettextParser.default.po.compile(po)); // Not sure why the -1 is for


  var messagesLengthBefore = Object.keys(poTransalations).length - 1;
  var messagesLengthAfter = Object.keys(translations).length;
  console.log("".concat(outputFileName, " has ").concat(messagesLengthAfter, " messages."));
  console.log("We have added ".concat(messagesNew, " messages."));
  console.log("We have removed ".concat(messagesLengthBefore - messagesReused, " messages."));
}