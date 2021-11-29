"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mockXmlhttprequest = require("mock-xmlhttprequest");

var _responseBuilder = _interopRequireDefault(require("./responseBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Faker {
  constructor() {
    var _this = this;

    _defineProperty(this, "getApis", () => Object.values(this.apiList));

    _defineProperty(this, "getKey", (url, method) => [url, method.toLowerCase()].join('_'));

    _defineProperty(this, "makeInitialApis", apis => {
      if (!apis || !Array.isArray(apis)) {
        this.apiList = {};
        return;
      }

      this.apiList = apis.reduce((acc, cur) => {
        var key = this.getKey(cur.url, cur.method);
        acc[key] = _objectSpread(_objectSpread({}, cur), {}, {
          skip: false
        });
        return acc;
      }, {});
    });

    _defineProperty(this, "add", api => {
      var key = this.getKey(api.url, api.method);
      this.apiList[key] = api;
    });

    _defineProperty(this, "setSkip", (url, method) => {
      var key = this.getKey(url, method);
      this.apiList[key].skip = !this.apiList[key].skip;
    });

    _defineProperty(this, "matchMock", function (url) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";

      var key = _this.getKey(url, method);

      if (_this.apiList[key] && !_this.apiList[key].skip) {
        return _this.apiList[key];
      }

      return null;
    });

    _defineProperty(this, "mockFetch", (url, options) => {
      var {
        method
      } = options || {};
      var matched = this.matchMock(url, method);

      if (matched) {
        return new Promise(resolve => {
          var response = (0, _responseBuilder.default)(url, matched.status || 200, matched.response);
          resolve(response);
        });
      } // eslint-disable-next-line no-restricted-globals


      return self.realFetch(url, options);
    });

    _defineProperty(this, "mockXhrRequest", xhr => {
      var {
        method,
        url
      } = xhr;
      var matched = this.matchMock(url, method);

      if (matched) {
        xhr.respond(matched.status || 200, {}, matched.response);
      } else {
        // eslint-disable-next-line new-cap
        var realXhr = new self.realXMLHttpRequest();

        realXhr.onreadystatechange = function onReadyStateChange() {
          if (realXhr.readyState === 4 && realXhr.status === 200) {
            xhr.respond(200, {}, this.responseText);
          }
        };

        realXhr.open(method, url);
        realXhr.send();

        realXhr.onerror = function onError() {
          return 'Request failed';
        };
      }
    });

    _defineProperty(this, "restore", () => {
      this.apiList = {};
    });

    this.MockXhr = (0, _mockXmlhttprequest.newMockXhr)();
    this.MockXhr.onSend = this.mockXhrRequest;
    self.realFetch = self.fetch;
    self.realXMLHttpRequest = self.XMLHttpRequest;
    self.fetch = this.mockFetch;
    self.XMLHttpRequest = this.MockXhr;
    this.apiList = {};
  }

}

var _default = new Faker();

exports.default = _default;