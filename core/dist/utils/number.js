"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WlNumber = /*#__PURE__*/function () {
  /**
   * @name 实例化bigjs
   * @param {Number|String} val 
   */
  function WlNumber(val) {
    _classCallCheck(this, WlNumber);

    this._val = new _big["default"](val);
  }
  /**
   * @name 加
   * @param {Number|String} val 要加的值
   */


  _createClass(WlNumber, [{
    key: "plus",
    value: function plus(val) {
      this._val = this._val.plus(val);
      return this._val;
    }
    /**
     * @name 减
     * @param {Number|String} val 要减的值
     */

  }, {
    key: "minus",
    value: function minus(val) {
      this._val = this._val.minus(val);
      return this._val;
    }
    /**
     * @name 乘
     * @param {Number|String} val 要乘的值
     */

  }, {
    key: "times",
    value: function times(val) {
      this._val = this._val.times(val);
      return this._val;
    }
    /**
     * @name 除以
     * @param {Number|String} val 要除以的值
     */

  }, {
    key: "div",
    value: function div(val) {
      this._val = this._val.div(val);
      return this._val;
    }
    /**
     * @name 取余
     * @param {Number|String} val 要除以的值
     */

  }, {
    key: "mod",
    value: function mod(val) {
      this._val = this._val.mod(val);
      return this._val;
    }
    /**
     * @name 取绝对值
     * @param {Number|String} val 取绝对值的值
     */

  }, {
    key: "abs",
    value: function abs() {
      this._val = this._val.abs();
      return this._val;
    }
    /**
     * @name 大于
     * @param {Number|String} val 取比较的值
     * @returns Boolean
     */

  }, {
    key: "gt",
    value: function gt(val) {
      return this._val.gt(val);
    }
    /**
     * @name 大于等于
     * @param {Number|String} val 取比较的值
     * @returns Boolean
     */

  }, {
    key: "gte",
    value: function gte(val) {
      return this._val.gte(val);
    }
    /**
     * @name 小于
     * @param {Number|String} val 取比较的值
     * @returns Boolean
     */

  }, {
    key: "lt",
    value: function lt(val) {
      return this._val.lt(val);
    }
    /**
     * @name 小于等于
     * @param {Number|String} val 取比较的值
     * @returns Boolean
     */

  }, {
    key: "lte",
    value: function lte(val) {
      return this._val.lte(val);
    }
    /**
     * @name 将数据转化为数字类型，如果不可转化则返回0
     * @param {*} val 
     */

  }], [{
    key: "toNumber",
    value: function toNumber(val) {
      return Number(val) || 0;
    }
  }]);

  return WlNumber;
}();

var _default = WlNumber;
exports["default"] = _default;