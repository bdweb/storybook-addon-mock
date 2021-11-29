"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _addons = require("@storybook/addons");

var _api = require("@storybook/api");

var _components = require("@storybook/components");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _events = require("./utils/events");

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Checkbox = _styled.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  input[type=checkbox]:checked {\n    background: #1EA7FD;\n  }\n"])));

var Item = _styled.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border: 1px #ddd solid;\n\n  label:last-child {\n    margin-bottom: 0;\n    border-bottom: none;\n  }\n"])));

var ADDON_ID = 'mockAddon';
var PARAM_KEY = 'mockAddon';
var PANEL_ID = "".concat(ADDON_ID, "/panel");

var MockPanel = () => {
  var [mockData, setMockData] = (0, _react.useState)([]);
  var emit = (0, _api.useChannel)({
    ADDONS_MOCK_SEND_DATA: parameters => {
      setMockData(parameters);
    }
  });

  var setSkip = item => {
    emit(_events.ADDONS_MOCK_SET_SKIP, item);
  };

  return /*#__PURE__*/_react.default.createElement(_components.ScrollArea, null, mockData.map((item, index) => /*#__PURE__*/_react.default.createElement(Item, {
    key: index
  }, /*#__PURE__*/_react.default.createElement(_components.Form.Field, {
    label: "Enabled"
  }, /*#__PURE__*/_react.default.createElement(Checkbox, null, /*#__PURE__*/_react.default.createElement(_components.Form.Input, {
    type: "checkbox",
    checked: !item.skip,
    onChange: () => setSkip(item)
  }))), /*#__PURE__*/_react.default.createElement(_components.Form.Field, {
    label: "URL"
  }, ' ', item.url, ' '), /*#__PURE__*/_react.default.createElement(_components.Form.Field, {
    label: "Method"
  }, ' ', item.method, ' '), /*#__PURE__*/_react.default.createElement(_components.Form.Field, {
    label: "Response"
  }, ' ', /*#__PURE__*/_react.default.createElement("code", null, JSON.stringify(item.response, null, 2))))));
};

function register() {
  _addons.addons.register(ADDON_ID, () => {
    // eslint-disable-next-line react/prop-types
    var render = _ref => {
      var {
        active,
        key
      } = _ref;
      return /*#__PURE__*/_react.default.createElement(_components.AddonPanel, {
        active: active,
        key: key
      }, /*#__PURE__*/_react.default.createElement(MockPanel, null));
    };

    var title = 'Mock';

    _addons.addons.add(PANEL_ID, {
      type: _addons.types.PANEL,
      title,
      render,
      paramKey: PARAM_KEY
    });
  });
}

var _default = register();

exports.default = _default;