"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author weilan
 * @description 类型检查基础类
 * @time 2020.04.20
 */
var DataType = /*#__PURE__*/function () {
  function DataType() {
    _classCallCheck(this, DataType);
  }

  _createClass(DataType, null, [{
    key: "isObject",

    /**
     * @method 检测当前目标是否为对象
     * @param {*} item 
     */
    value: function isObject(item) {
      return Object.prototype.toString.call(item) === "[object Object]";
    }
    /**
     * @method 检测当前目标是否为空对象
     * @param {*} item 
     */

  }, {
    key: "isEmptyObject",
    value: function isEmptyObject(item) {
      return this.isObject(item) && Object.keys(item).length === 0;
    }
    /**
     * @method 检测当前目标是否为数组
     * @param {*} item 
     */

  }, {
    key: "isArray",
    value: function isArray(item) {
      return Array.isArray(item);
    }
    /**
     * @method 检测当前目标是否为空数组
     * @param {*} item 
     */

  }, {
    key: "isEmptyArray",
    value: function isEmptyArray(item) {
      return this.isArray(item) && item.length === 0;
    }
  }]);

  return DataType;
}();

exports["default"] = DataType;