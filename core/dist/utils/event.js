"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = exports.throttle = void 0;

/**
 * @author weilan
 * @description event事件库
 * @time 2020.04.21
 */

/**
 * @method 节流函数(500ms内只能点击一次，点击后立即触发，重复点击无效，必须等3s之后才能点击第二次)
 * @param {Function} {handler} 事件处理函数
 * @param {Number} {delay} 恢复点击的毫秒数
 */
var throttle = function throttle(handler, delay) {
  var last, deferTimer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var that = this;
    var now = +new Date();

    if (last && now < last + delay) {
      deferTimer && clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        handler.apply(that, args);
      }, delay);
    } else {
      last = now;
      handler.apply(that, args);
    }
  };
};
/**
 * @method 防抖函数(500ms之后出结果，重复点击无效，如果重复点击了，重新计算3s时间，从点击的时刻算起，必须等待3s时间触发事件)
 * @param {Function} {handler} 事件处理函数
 * @param {Number} {delay} 恢复点击的毫秒数
 */


exports.throttle = throttle;

var debounce = function debounce(handler) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var timeout;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    // 获取函数的作用域和变量
    var that = this; // 每次事件被触发，都会清除当前的timer，然后重写设置超时调用

    timeout && clearTimeout(timeout);
    timeout = setTimeout(function () {
      handler.apply(that, args);
    }, delay);
  };
};

exports.debounce = debounce;