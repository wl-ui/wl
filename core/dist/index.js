"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Storage: true,
  DataType: true
};
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

var _array = require("./utils/array");

Object.keys(_array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _array[key];
    }
  });
});

var _validate = require("./utils/validate");

Object.keys(_validate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validate[key];
    }
  });
});

var _event = require("./utils/event");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _event[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }