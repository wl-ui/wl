"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

/**
 * @author weilan
 * @time 2020.04.26
 * @description 将路由映射到真实路径，babel之后会失效，将这句代码在每个项目中复制，也可修改映射规则
 */
module.exports = function (path) {
  return function () {
    return Promise.resolve("@/views".concat(path, "/index.vue")).then(function (s) {
      return (0, _interopRequireWildcard2["default"])(require(s));
    });
  };
};