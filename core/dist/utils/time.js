"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _settings = require("../config/settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Time = /*#__PURE__*/function () {
  /**
   * 时间类实例化
   * @param {*} date 时间
   * @param {*} format 格式
   */
  function Time() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Time);

    this.__date__ = this.dayjs(date);
    this.__format__ = format;
  }
  /**
   * 将时间格式转化为dayjs格式
   * @param {*} date 时间
   */


  _createClass(Time, [{
    key: "dayjs",
    value: function dayjs(date) {
      this.__date__ = (0, _dayjs["default"])(date);
      return this.__date__;
    }
    /**
     * 格式化时间
     * @param {String} format 格式
     */

  }, {
    key: "format",
    value: function format(_format) {
      var _this$__date__, _this$__date__$format;

      return (_this$__date__ = this.__date__) === null || _this$__date__ === void 0 ? void 0 : (_this$__date__$format = _this$__date__.format) === null || _this$__date__$format === void 0 ? void 0 : _this$__date__$format.call(_this$__date__, _format);
    }
    /**
     * 时间相加
     * @param {*} num 要加的时间
     * @param {*} unit 要加的时间的单位
     */

  }, {
    key: "add",
    value: function add(num) {
      var _this$__date__2, _this$__date__2$add;

      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings._timeUnit.Second;
      return (_this$__date__2 = this.__date__) === null || _this$__date__2 === void 0 ? void 0 : (_this$__date__2$add = _this$__date__2.add) === null || _this$__date__2$add === void 0 ? void 0 : _this$__date__2$add.call(_this$__date__2, num, unit);
    }
    /**
     * 时间相减
     * @param {*} num 要加的时间
     * @param {*} unit 要加的时间的单位
     */

  }, {
    key: "subtract",
    value: function subtract(num) {
      var _this$__date__3, _this$__date__3$subtr;

      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings._timeUnit.Second;
      return (_this$__date__3 = this.__date__) === null || _this$__date__3 === void 0 ? void 0 : (_this$__date__3$subtr = _this$__date__3.subtract) === null || _this$__date__3$subtr === void 0 ? void 0 : _this$__date__3$subtr.call(_this$__date__3, num, unit);
    }
    /**
     * 时间比较，是否之前
     * @param {*} endDate 结束时间
     * @param {*} unit 时间单位默认秒
     */

  }, {
    key: "isBefore",
    value: function isBefore(endDate) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings._timeUnit.Second;
      return this.__date__.isBefore(endDate, unit);
    }
    /**
     * 计算时差
     * @param {*} endDate 结束时间
     * @param {*} unit 时间单位默认秒
     */

  }, {
    key: "diff",
    value: function diff(endDate) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings._timeUnit.Second;
      return this.__date__.diff(endDate, unit);
    }
    /**
     * @name 静态时间格式化
     * @param {Date} date 时间
     * @param {String} format 格式，默认YYYY-MM-DD
     */

  }], [{
    key: "quickFormat",
    value: function quickFormat(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "YYYY-MM-DD";
      return (0, _dayjs["default"])(date).format(format);
    }
    /**
     * @name 初始化时间为dayjs格式
     * @param {Date} date 时间
     */

  }, {
    key: "init",
    value: function init(date) {
      return (0, _dayjs["default"])(date);
    }
  }]);

  return Time;
}();

exports["default"] = Time;