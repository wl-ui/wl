"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "mockXHR", {
  enumerable: true,
  get: function get() {
    return _mock.mockXHR;
  }
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("./utils/http"));

var _mock = require("./utils/mock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _http["default"];
exports["default"] = _default;