"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _statusMap = _interopRequireDefault(require("./statusMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(url, status, responseText) {
  var _keys = [];
  var all = [];
  var headers = {};

  var response = () => ({
    // eslint-disable-next-line no-bitwise
    ok: (status / 100 | 0) === 2,
    // 200-299
    statusText: _statusMap.default[status.toString()],
    status,
    url,
    text: () => Promise.resolve(responseText),
    json: () => Promise.resolve(responseText),
    blob: () => Promise.resolve(new Blob([response])),
    clone: response,
    headers: {
      keys: () => _keys,
      entries: () => all,
      get: n => headers[n.toLowerCase()],
      has: n => n.toLowerCase() in headers
    }
  });

  return response();
}