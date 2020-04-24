"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

/**
 * @author weilan
 * @time 2020.04.22
 * @description 时间操作类filter
 */

/**
 * 日期格式化
 * @param {*} date 
 */
var dateFormat = {
  name: 'date',
  rule: function rule(date) {
    return date ? (0, _dayjs["default"])(date).format('YYYY-MM-DD') : null;
  }
};
/**
 * 日期时间格式化
 * @param {*} dateTime
 */

var dateTimeFormat = {
  name: 'dateTime',
  rule: function rule(date) {
    return date ? (0, _dayjs["default"])(date).format('YYYY-MM-DD HH:mm:ss') : null;
  }
};
var _default = [dateFormat, dateTimeFormat];
exports["default"] = _default;