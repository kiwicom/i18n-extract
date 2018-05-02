"use strict";

var _chai = require("chai");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _gettextParser = _interopRequireDefault(require("gettext-parser"));

var _extractFromFiles = _interopRequireDefault(require("./extractFromFiles.js"));

var _mergeMessagesWithPO = _interopRequireDefault(require("./mergeMessagesWithPO.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
describe('#mergeMessagesWithPO()', function () {
  var output = 'messages2.po';
  var messages;
  beforeEach(function () {
    messages = (0, _extractFromFiles.default)('src/mergeMessagesWithPOFixtures/input.js');
  });
  afterEach(function () {
    _fs.default.unlinkSync(output);
  });
  it('should not crash when the path is absolute', function () {
    (0, _mergeMessagesWithPO.default)(messages, _path.default.join(__dirname, 'mergeMessagesWithPOFixtures/messages.po'), output);
  }); // when we give a po file outdated message

  it('should output a new po file with merged messages', function () {
    (0, _mergeMessagesWithPO.default)(messages, 'mergeMessagesWithPOFixtures/messages.po', output);

    var poContent = _fs.default.readFileSync(output);

    var po = _gettextParser.default.po.parse(poContent);

    _chai.assert.deepEqual(po, {
      charset: 'utf-8',
      headers: {
        'content-transfer-encoding': '8bit',
        'content-type': 'text/plain; charset=utf-8',
        language: 'fr'
      },
      translations: {
        '': {
          '': {
            msgid: '',
            msgstr: [['Language: fr', 'Content-Type: text/plain; charset=utf-8', 'Content-Transfer-Encoding: 8bit\n'].join('\n')]
          },
          follow: {
            msgid: 'follow',
            msgstr: ['Suivre']
          },
          followed: {
            msgid: 'followed',
            msgstr: ['Suivi !']
          },
          following: {
            msgid: 'following',
            msgstr: ['']
          },
          unfollow: {
            msgid: 'unfollow',
            msgstr: ['']
          },
          unfollowed: {
            msgid: 'unfollowed',
            msgstr: ['']
          }
        }
      }
    });
  });
});