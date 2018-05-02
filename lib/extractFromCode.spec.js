"use strict";

var _chai = require("chai");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _extractFromCode = _interopRequireDefault(require("./extractFromCode.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
function getCode(name) {
  return _fs.default.readFileSync(_path.default.join(__dirname, "extractFromCodeFixtures/".concat(name)), 'utf8');
}

describe('#extractFromCode()', function () {
  describe('static keys', function () {
    it('should return the right keys with ES5 code', function () {
      var keys = (0, _extractFromCode.default)(getCode('es5.js'));

      _chai.assert.deepEqual([{
        key: 'follow',
        loc: {
          end: {
            column: 34,
            line: 23
          },
          start: {
            column: 20,
            line: 23
          }
        }
      }, {
        key: 'follow',
        loc: {
          end: {
            column: 35,
            line: 24
          },
          start: {
            column: 21,
            line: 24
          }
        }
      }, {
        key: 'followed',
        loc: {
          end: {
            column: 63,
            line: 48
          },
          start: {
            column: 47,
            line: 48
          }
        }
      }, {
        key: 'unfollowed',
        loc: {
          end: {
            column: 65,
            line: 67
          },
          start: {
            column: 47,
            line: 67
          }
        }
      }, {
        key: 'unfollow',
        loc: {
          end: {
            column: 63,
            line: 142
          },
          start: {
            column: 47,
            line: 142
          }
        }
      }, {
        key: 'following',
        loc: {
          end: {
            column: 83,
            line: 142
          },
          start: {
            column: 66,
            line: 142
          }
        }
      }], keys, 'Should work with ES5 code.');
    });
    it('should return the right keys with ES6 code', function () {
      var keys = (0, _extractFromCode.default)(getCode('es6.js'));

      _chai.assert.deepEqual([{
        key: 'reset',
        loc: {
          end: {
            column: 26,
            line: 166
          },
          start: {
            column: 13,
            line: 166
          }
        }
      }, {
        key: 'revert',
        loc: {
          end: {
            column: 27,
            line: 173
          },
          start: {
            column: 13,
            line: 173
          }
        }
      }, {
        key: 'sweep',
        loc: {
          end: {
            column: 26,
            line: 180
          },
          start: {
            column: 13,
            line: 180
          }
        }
      }, {
        key: 'commit',
        loc: {
          end: {
            column: 27,
            line: 187
          },
          start: {
            column: 13,
            line: 187
          }
        }
      }], keys, 'Should work with ES6 code.');
    });
    it('should return the right keys with a custom marker', function () {
      var keys = (0, _extractFromCode.default)(getCode('marker.js'), {
        marker: '__'
      });

      _chai.assert.deepEqual([{
        key: 'this_is_a_custom_marker',
        loc: {
          end: {
            column: 56,
            line: 5
          },
          start: {
            column: 0,
            line: 5
          }
        }
      }], keys, 'Should take into account the marker option.');
    });
    it('should return the right keys with a custom keyLoc', function () {
      var keys = (0, _extractFromCode.default)(getCode('marker.js'), {
        marker: '__',
        keyLoc: -1
      });

      _chai.assert.deepEqual([{
        key: 'this_is_a_custom_keyLoc',
        loc: {
          end: {
            column: 56,
            line: 5
          },
          start: {
            column: 0,
            line: 5
          }
        }
      }], keys, 'Should take into account the marker option.');
    });
    it('should return the right keys with a composed custom marker', function () {
      var keys = (0, _extractFromCode.default)(getCode('markerComposed.js'), {
        marker: 'polyglot.t'
      });

      _chai.assert.deepEqual([{
        key: 'this_is_a_custom_marker',
        loc: {
          end: {
            column: 37,
            line: 5
          },
          start: {
            column: 0,
            line: 5
          }
        }
      }], keys, 'Should take into account the marker option.');
    });
    it('should return the right keys with multiple arguments', function () {
      var keys = (0, _extractFromCode.default)(getCode('many-args.js'));

      _chai.assert.deepEqual([{
        key: 'hello_username',
        loc: {
          end: {
            column: 2,
            line: 11
          },
          start: {
            column: 0,
            line: 9
          }
        }
      }], keys, "The second argument shoudn't have any impact.");
    });
    it('should deduplicate the keys', function () {
      var keys = (0, _extractFromCode.default)(getCode('duplicated.js'));

      _chai.assert.deepEqual([{
        key: 'key',
        loc: {
          end: {
            column: 11,
            line: 5
          },
          start: {
            column: 0,
            line: 5
          }
        }
      }, {
        key: 'key',
        loc: {
          end: {
            column: 11,
            line: 6
          },
          start: {
            column: 0,
            line: 6
          }
        }
      }], keys, 'Should return only one key.');
    });
    it('should return the right key with literal template', function () {
      var keys = (0, _extractFromCode.default)(getCode('template.js'));

      _chai.assert.deepEqual([{
        key: 'key',
        loc: {
          end: {
            column: 11,
            line: 5
          },
          start: {
            column: 0,
            line: 5
          }
        }
      }], keys, 'Should return only one key.');
    });
    it('should return the right key with a function call', function () {
      var keys = (0, _extractFromCode.default)(getCode('function.js'));

      _chai.assert.deepEqual([{
        key: '*',
        loc: {
          end: {
            column: 21,
            line: 7
          },
          start: {
            column: 0,
            line: 7
          }
        }
      }], keys, 'Should return one key.');
    });
    it('should return the right key with a member expression', function () {
      var keys = (0, _extractFromCode.default)(getCode('memberExpression.js'));

      _chai.assert.deepEqual([{
        key: '*',
        loc: {
          end: {
            column: 24,
            line: 7
          },
          start: {
            column: 0,
            line: 7
          }
        }
      }], keys, 'Should return one key.');
    });
    it('should return the right key with dynamic import in code', function () {
      var keys = (0, _extractFromCode.default)(getCode('dynamicImport.js'));

      _chai.assert.deepEqual([{
        key: 'key',
        loc: {
          end: {
            column: 11,
            line: 7
          },
          start: {
            column: 0,
            line: 7
          }
        }
      }], keys, 'Should return only one key.');
    });
  });
  describe('dynamic keys', function () {
    var keys;
    it('should return the right key with a concat', function () {
      keys = (0, _extractFromCode.default)(getCode('dynamicConcat.js'));

      _chai.assert.deepEqual([{
        key: 'key.*',
        loc: {
          end: {
            column: 18,
            line: 8
          },
          start: {
            column: 0,
            line: 8
          }
        }
      }, {
        key: 'key.*.bar',
        loc: {
          end: {
            column: 27,
            line: 11
          },
          start: {
            column: 0,
            line: 11
          }
        }
      }, {
        key: '*.bar',
        loc: {
          end: {
            column: 18,
            line: 14
          },
          start: {
            column: 0,
            line: 14
          }
        }
      }, {
        key: '*',
        loc: {
          end: {
            column: 9,
            line: 17
          },
          start: {
            column: 0,
            line: 17
          }
        }
      }], keys, 'Should return the right key.');
    });
    it('should return the right key with a template', function () {
      keys = (0, _extractFromCode.default)(getCode('dynamicTemplate.js'));

      _chai.assert.deepEqual([{
        key: 'key.*',
        loc: {
          end: {
            column: 18,
            line: 8
          },
          start: {
            column: 0,
            line: 8
          }
        }
      }, {
        key: 'key.*.bar',
        loc: {
          end: {
            column: 22,
            line: 11
          },
          start: {
            column: 0,
            line: 11
          }
        }
      }, {
        key: '*.bar',
        loc: {
          end: {
            column: 18,
            line: 14
          },
          start: {
            column: 0,
            line: 14
          }
        }
      }, {
        key: '*',
        loc: {
          end: {
            column: 14,
            line: 17
          },
          start: {
            column: 0,
            line: 17
          }
        }
      }], keys, 'Should return the right key.');
    });
  });
  describe('include comment', function () {
    it('should return the keys when added as a comment', function () {
      var keys = (0, _extractFromCode.default)(getCode('comment.js'));

      _chai.assert.deepEqual([{
        key: 'foo.bar1',
        loc: {
          end: {
            column: 27,
            line: 3
          },
          start: {
            column: 0,
            line: 3
          }
        }
      }, {
        key: 'foo.bar2',
        loc: {
          end: {
            column: 24,
            line: 4
          },
          start: {
            column: 0,
            line: 4
          }
        }
      }, {
        key: 'foo.bar2',
        loc: {
          end: {
            column: 27,
            line: 5
          },
          start: {
            column: 0,
            line: 5
          }
        }
      }, {
        key: 'foo spaced1',
        loc: {
          end: {
            column: 30,
            line: 6
          },
          start: {
            column: 0,
            line: 6
          }
        }
      }, {
        key: 'foo spaced2',
        loc: {
          end: {
            column: 27,
            line: 7
          },
          start: {
            column: 0,
            line: 7
          }
        }
      }], keys, 'Should return the good keys.');
    });
  });
  describe('disable line comment', function () {
    it('should ignore the keys from a line disabled from comment', function () {
      var keys = (0, _extractFromCode.default)(getCode('disable-comment.js'));

      _chai.assert.deepEqual([{
        key: 'foo.bar1',
        loc: {
          end: {
            column: 16,
            line: 4
          },
          start: {
            column: 0,
            line: 4
          }
        }
      }, {
        key: 'foo.bar3',
        loc: {
          end: {
            column: 16,
            line: 11
          },
          start: {
            column: 0,
            line: 11
          }
        }
      }], keys, 'Should return the good keys.');
    });
  });
});