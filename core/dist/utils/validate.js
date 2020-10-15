"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vaPhone = vaPhone;
exports.regPhone = regPhone;
exports.isNum = isNum;
exports.isInteger = isInteger;
exports.validate = validate;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * auth: weilan
 * time: 2020-03-11
 * des: el自定义表单验证及正则验证
 * rule：el校验以va开头 vaPhone；正则验证以reg开头 
 */
// el手机格式校验
function vaPhone(rule, value, callback) {
  if (!value || regPhone(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号!'));
  }
} // 正则手机格式校验


function regPhone(value) {
  return /^1[3-9][0-9]{9}/.test(value);
}
/**
 * 验证是数字类型或可转换为数字类型
 * @param {*} value 要验证的值
 */


function isNum(value) {
  return !Number.isNaN(Math.sign(value));
}
/**
 * @name 验证整数
 * @param {*} val 要验证的内容 
 */


function isInteger(val) {
  return /^[0-9]*$/.test(value);
}
/**
 * 需要校验的表格验证
 * @param {*} columns 表头
 * @param {*} length 长度
 */


function validate(columns, length, _vm) {
  var _va_columns = columns.filter(function (i) {
    return i.validate;
  });

  var _iterator = _createForOfIteratorHelper(_va_columns),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;

      for (var t = 0; t < length; t++) {
        var _va_result = _vm.$refs[i.prop + t].validate();

        if (!_va_result) return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}