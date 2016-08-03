'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTabs = require('react-tabs');

var _jsondiffpatch = require('jsondiffpatch');

var _jsondiffpatch2 = _interopRequireDefault(_jsondiffpatch);

var _html = require('jsondiffpatch/src/formatters/html');

var _html2 = _interopRequireDefault(_html);

var _reduxDevtools = require('redux-devtools');

var _injectCSS = require('./injectCSS');

var _injectCSS2 = _interopRequireDefault(_injectCSS);

var _diffStylesheet = require('./diffStylesheet');

var _diffStylesheet2 = _interopRequireDefault(_diffStylesheet);

var _defaultStylesheet = require('./defaultStylesheet');

var _defaultStylesheet2 = _interopRequireDefault(_defaultStylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var jsondiffpatch = _jsondiffpatch2.default.create();
var jumpToState = _reduxDevtools.ActionCreators.jumpToState;


(0, _injectCSS2.default)((0, _diffStylesheet2.default)());
(0, _injectCSS2.default)(_defaultStylesheet2.default);

var Monitor = function (_Component) {
  _inherits(Monitor, _Component);

  function Monitor(props) {
    _classCallCheck(this, Monitor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Monitor).call(this, props));

    _this.state = {
      previous: 0
    };
    return _this;
  }

  _createClass(Monitor, [{
    key: 'renderTabs',
    value: function renderTabs(tabs) {
      return _react2.default.createElement(
        _reactTabs.TabList,
        null,
        tabs.map(function (tab) {
          return _react2.default.createElement(
            _reactTabs.Tab,
            null,
            tab.reducer
          );
        })
      );
    }
  }, {
    key: 'renderPanels',
    value: function renderPanels(tabs) {
      return tabs.map(function (tab) {
        return _react2.default.createElement(
          _reactTabs.TabPanel,
          { key: tab.reducer },
          _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: tab.diff } })
        );
      });
    }
  }, {
    key: 'renderActions',
    value: function renderActions(selected, action) {
      var actionsById = this.props.actionsById;

      return _react2.default.createElement(
        'select',
        { value: selected, onChange: function onChange(evt) {
            return action(evt.target.value);
          } },
        Object.keys(actionsById).map(function (actionIndex) {
          return _react2.default.createElement(
            'option',
            { value: actionIndex },
            actionsById[actionIndex].action.type
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var computedStates = _props.computedStates;
      var currentStateIndex = _props.currentStateIndex;

      var tabs = Object.keys(computedStates[currentStateIndex].state).map(function (reducerName) {
        var current = computedStates[currentStateIndex].state[reducerName];
        var previous = computedStates[_this2.state.previous].state[reducerName];
        var delta = jsondiffpatch.diff(previous || {}, current || {});
        var renderedDiff = _html2.default.format(delta, current);
        return {
          diff: renderedDiff,
          reducer: reducerName,
          hasChanged: !!delta
        };
      }).filter(function (x) {
        return x.hasChanged;
      });
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'current-previous-select' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'p',
              null,
              ' Previous state '
            ),
            this.renderActions(this.state.previous, function (previous) {
              return _this2.setState({ previous: previous });
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'p',
              null,
              ' Current state '
            ),
            this.renderActions(currentStateIndex, function (index) {
              return _this2.props.dispatch(jumpToState(+index));
            })
          )
        ),
        _react2.default.createElement(
          _reactTabs.Tabs,
          { sty: true },
          this.renderTabs(tabs),
          this.renderPanels(tabs)
        )
      );
    }
  }]);

  return Monitor;
}(_react.Component);

Monitor.update = function () {};

Monitor.propTypes = {
  dispatch: _react.PropTypes.func,
  computedStates: _react.PropTypes.object,
  actionsById: _react.PropTypes.object,
  currentStateIndex: _react.PropTypes.number,
  stagedActionIds: _react.PropTypes.array,
  skippedActionIds: _react.PropTypes.array,
  monitorState: _react.PropTypes.shape({
    initialScrollTop: _react.PropTypes.number
  })
};
exports.default = Monitor;