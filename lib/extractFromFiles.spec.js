"use strict";

var _chai = require("chai");

var _extractFromFiles = _interopRequireDefault(require("./extractFromFiles.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */
describe('#extractFromFiles()', function () {
  it('should work when scanning with a glob and a string parameter', function () {
    var keys = (0, _extractFromFiles.default)('src/extractFromFilesFixture/*View.js');

    _chai.assert.deepEqual([{
      key: 'key1',
      file: 'src/extractFromFilesFixture/AccoutView.js',
      loc: {
        end: {
          column: 12,
          line: 5
        },
        start: {
          column: 0,
          line: 5
        }
      }
    }, {
      key: 'key2',
      file: 'src/extractFromFilesFixture/AccoutView.js',
      loc: {
        end: {
          column: 12,
          line: 6
        },
        start: {
          column: 0,
          line: 6
        }
      }
    }, {
      key: 'key3',
      file: 'src/extractFromFilesFixture/ExpenseView.js',
      loc: {
        end: {
          column: 12,
          line: 5
        },
        start: {
          column: 0,
          line: 5
        }
      }
    }, {
      key: 'key1',
      file: 'src/extractFromFilesFixture/ExpenseView.js',
      loc: {
        end: {
          column: 12,
          line: 6
        },
        start: {
          column: 0,
          line: 6
        }
      }
    }], keys, 'Should find all the key without duplication');
  });
  it('should work when scanning with an array as parameter', function () {
    var keys = (0, _extractFromFiles.default)(['src/extractFromFilesFixture/*.jsx', 'src/extractFromFilesFixture/*.js']);

    _chai.assert.deepEqual([{
      key: 'key3',
      file: 'src/extractFromFilesFixture/MemberView.jsx',
      loc: {
        end: {
          column: 12,
          line: 5
        },
        start: {
          column: 0,
          line: 5
        }
      }
    }, {
      key: 'key4',
      file: 'src/extractFromFilesFixture/MemberView.jsx',
      loc: {
        end: {
          column: 12,
          line: 6
        },
        start: {
          column: 0,
          line: 6
        }
      }
    }, {
      key: 'key1',
      file: 'src/extractFromFilesFixture/AccoutView.js',
      loc: {
        end: {
          column: 12,
          line: 5
        },
        start: {
          column: 0,
          line: 5
        }
      }
    }, {
      key: 'key2',
      file: 'src/extractFromFilesFixture/AccoutView.js',
      loc: {
        end: {
          column: 12,
          line: 6
        },
        start: {
          column: 0,
          line: 6
        }
      }
    }, {
      key: 'key3',
      file: 'src/extractFromFilesFixture/ExpenseView.js',
      loc: {
        end: {
          column: 12,
          line: 5
        },
        start: {
          column: 0,
          line: 5
        }
      }
    }, {
      key: 'key1',
      file: 'src/extractFromFilesFixture/ExpenseView.js',
      loc: {
        end: {
          column: 12,
          line: 6
        },
        start: {
          column: 0,
          line: 6
        }
      }
    }], keys, 'Should work with an array as first parameter');
  });
});