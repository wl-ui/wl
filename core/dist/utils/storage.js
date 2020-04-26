"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _settings = require("../config/settings");

var _type = _interopRequireDefault(require("./type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @method 基础判断
 * @param storageType 存储类型
 * @param encryptType 加密类型
 */
var _core = function _core() {
  var storageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _settings._storageType.Local;
  var encryptType = arguments.length > 1 ? arguments[1] : undefined;

  if (!encryptType) {
    return {
      storage: storageType === _settings._storageType.Local ? localStorage : sessionStorage
    };
  }
};

var Storage = /*#__PURE__*/function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, null, [{
    key: "set",

    /**
     * @method 将键值存入本地存储
     * @param {*} key 键
     * @param {*} value 值
     * @param {*} type 类型 默认storageType.Local
     * @param {*} encrypt 加密配置项
     */
    value: function set(key, value, type, encrypt) {
      var _core2 = _core(type),
          storage = _core2.storage;

      var _processed_value = _type["default"].isObject(value) || _type["default"].isArray(value) ? JSON.stringify(value) : value;

      storage.setItem(key, _processed_value);
    }
    /**
     * @method 根据key取本地存储数据
     * @param {*} key 键
     * @param {*} type 类型 默认storageType.Local
     * @param {*} encrypt 加密配置项
     */

  }, {
    key: "get",
    value: function get(key, type, encrypt) {
      var _core3 = _core(type),
          storage = _core3.storage;

      var _stoarge_value = storage.getItem(key);

      try {
        return JSON.parse(_stoarge_value);
      } catch (err) {
        return _stoarge_value;
      }
    }
    /**
     * @method 根据key删除本地存储数据
     * @param {*} key 键
     * @param {*} type 类型 默认storageType.Local
     */

  }, {
    key: "remove",
    value: function remove(key, type) {
      var _core4 = _core(type),
          storage = _core4.storage;

      storage.removeItem(key);
    }
    /**
     * @method 清空本地存储
     * @param {*} type 类型 默认storageType.Local
     */

  }, {
    key: "clear",
    value: function clear(type) {
      var _core5 = _core(type),
          storage = _core5.storage;

      storage.clear();
    }
    /**
     * @method 根据key查询本地存储中是否存在key的实例
     * @param {*} key 键
     * @param {*} type 类型 默认storageType.Local
     */

  }, {
    key: "had",
    value: function had(key, type) {
      var _core6 = _core(type),
          storage = _core6.storage;

      return key in storage;
    }
    /**
     * @method 获取存储库里存储实例个数
     * @param {*} type 
     */

  }, {
    key: "count",
    value: function count(type) {
      var _core7 = _core(type),
          storage = _core7.storage;

      return storage.length;
    }
  }]);

  return Storage;
}();

exports["default"] = Storage;