"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Storage", {
  enumerable: true,
  get: function get() {
    return _storage["default"];
  }
});
Object.defineProperty(exports, "DataType", {
  enumerable: true,
  get: function get() {
    return _type["default"];
  }
});

var _storage = _interopRequireDefault(require("./utils/storage"));

var _type = _interopRequireDefault(require("./utils/type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }