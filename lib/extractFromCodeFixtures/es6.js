"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _LogMonitorEntry = _interopRequireDefault(require("./LogMonitorEntry"));

var _LogMonitorButton = _interopRequireDefault(require("./LogMonitorButton"));

var _i18n = _interopRequireDefault(require("i18n"));

var themes = _interopRequireWildcard(require("./themes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  container: {
    fontFamily: 'monaco, Consolas, Lucida Console, monospace',
    position: 'relative',
    overflowY: 'hidden',
    width: '100%',
    height: '100%',
    minWidth: 300
  },
  buttonBar: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderColor: 'transparent',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  elements: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 38,
    bottom: 0,
    overflowX: 'hidden',
    overflowY: 'auto'
  }
};

var LogMonitor =
/*#__PURE__*/
function () {
  function LogMonitor() {
    _classCallCheck(this, LogMonitor);

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyPress);
    }
  }

  _createClass(LogMonitor, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var node = (0, _react.findDOMNode)(this.refs.elements);

      if (!node) {
        this.scrollDown = true;
      } else if (this.props.stagedActions.length < nextProps.stagedActions.length) {
        var scrollTop = node.scrollTop,
            offsetHeight = node.offsetHeight,
            scrollHeight = node.scrollHeight;
        this.scrollDown = Math.abs(scrollHeight - (scrollTop + offsetHeight)) < 20;
      } else {
        this.scrollDown = false;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var node = (0, _react.findDOMNode)(this.refs.elements);

      if (!node) {
        return;
      }

      if (this.scrollDown) {
        var offsetHeight = node.offsetHeight,
            scrollHeight = node.scrollHeight;
        node.scrollTop = scrollHeight - offsetHeight;
        this.scrollDown = false;
      }
    }
  }, {
    key: "handleRollback",
    value: function handleRollback() {
      this.props.rollback();
    }
  }, {
    key: "handleSweep",
    value: function handleSweep() {
      this.props.sweep();
    }
  }, {
    key: "handleCommit",
    value: function handleCommit() {
      this.props.commit();
    }
  }, {
    key: "handleToggleAction",
    value: function handleToggleAction(index) {
      this.props.toggleAction(index);
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      this.props.reset();
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(event) {
      var monitorState = this.props.monitorState;

      if (event.ctrlKey && event.keyCode === 72) {
        // Ctrl+H
        event.preventDefault();
        this.props.setMonitorState(_objectSpread({}, monitorState, {
          isVisible: !monitorState.isVisible
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var elements = [];
      var _this$props = this.props,
          monitorState = _this$props.monitorState,
          skippedActions = _this$props.skippedActions,
          stagedActions = _this$props.stagedActions,
          computedStates = _this$props.computedStates,
          select = _this$props.select;
      var theme;

      if (typeof this.props.theme === 'string') {
        if (typeof themes[this.props.theme] !== 'undefined') {
          theme = themes[this.props.theme];
        } else {
          console.warn("DevTools theme ".concat(this.props.theme, " not found, defaulting to nicinabox"));
          theme = themes.nicinabox;
        }
      } else {
        theme = this.props.theme;
      }

      if (!monitorState.isVisible) {
        return null;
      }

      for (var i = 0; i < stagedActions.length; i++) {
        var action = stagedActions[i];
        var _computedStates$i = computedStates[i],
            state = _computedStates$i.state,
            error = _computedStates$i.error;
        var previousState = void 0;

        if (i > 0) {
          previousState = computedStates[i - 1].state;
        }

        elements.push(_react.default.createElement(_LogMonitorEntry.default, {
          key: i,
          index: i,
          theme: theme,
          select: select,
          action: action,
          state: state,
          previousState: previousState,
          collapsed: skippedActions[i],
          error: error,
          onActionClick: this.handleToggleAction
        }));
      }

      return _react.default.createElement("div", {
        style: _objectSpread({}, styles.container, {
          backgroundColor: theme.base00
        })
      }, _react.default.createElement("div", {
        style: _objectSpread({}, styles.buttonBar, {
          borderColor: theme.base02
        })
      }, _react.default.createElement(_LogMonitorButton.default, {
        theme: theme,
        onClick: this.handleReset
      }, (0, _i18n.default)('reset')), _react.default.createElement(_LogMonitorButton.default, {
        theme: theme,
        onClick: this.handleRollback,
        enabled: computedStates.length
      }, (0, _i18n.default)('revert')), _react.default.createElement(_LogMonitorButton.default, {
        theme: theme,
        onClick: this.handleSweep,
        enabled: Object.keys(skippedActions).some(function (key) {
          return skippedActions[key];
        })
      }, (0, _i18n.default)('sweep')), _react.default.createElement(_LogMonitorButton.default, {
        theme: theme,
        onClick: this.handleCommit,
        enabled: computedStates.length > 1
      }, (0, _i18n.default)('commit'))), _react.default.createElement("div", {
        style: styles.elements,
        ref: "elements"
      }, elements), _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, "kek"), _react.default.createElement("span", null, "bur")));
    }
  }]);

  return LogMonitor;
}();

exports.default = LogMonitor;

_defineProperty(_defineProperty(LogMonitor, "propTypes", {
  computedStates: _react.PropTypes.array.isRequired,
  currentStateIndex: _react.PropTypes.number.isRequired,
  monitorState: _react.PropTypes.object.isRequired,
  stagedActions: _react.PropTypes.array.isRequired,
  sweep: _react.PropTypes.func.isRequired,
  toggleAction: _react.PropTypes.func.isRequired
}), "defaultProps", {
  select: function select(state) {
    return state;
  },
  monitorState: {
    isVisible: true
  },
  theme: 'nicinabox'
});