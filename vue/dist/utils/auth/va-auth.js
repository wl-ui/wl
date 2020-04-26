"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _wlCore = require("wl-core");

/**
 * @author weilan
 * @time 2020.04.23
 * @description 用户身份校验类
 */
var VaJwt = /*#__PURE__*/function () {
  function VaJwt() {
    (0, _classCallCheck2["default"])(this, VaJwt);
  }

  (0, _createClass2["default"])(VaJwt, null, [{
    key: "extractJwtPayload",

    /**
     * 截取jwt中有效载荷部分
     * @param {*} jwt 
     */
    value: function extractJwtPayload(jwt) {
      if (!jwt) throw Error('缺少jwt！');
      var jwt_split = jwt.split('.');
      if (jwt_split.length !== 3) throw Error('jwt格式不正确！');
      return jwt_split[1];
    }
    /**
     * 简单解析未特殊加密的payload部分
     * @param {*} jwt 
     */

  }, {
    key: "payloadAtob",
    value: function payloadAtob(jwt) {
      var jwt_payload = this.extractJwtPayload(jwt);
      var decodedData = window.atob(jwt_payload);
      return JSON.parse(decodedData);
    }
    /**
     * 检验jwt是否过期
     * @param {String} jwt 
     * @param {Function} vaCb 自定义验证函数，返回Boolean true表示过期
     */

  }, {
    key: "vaJwtExpired",
    value: function vaJwtExpired(jwt, vaCb) {
      var exp = this.payloadAtob(jwt).exp * 1000;

      if (vaCb) {
        return vaCb(exp);
      }

      var _time = new _wlCore.Time(exp);

      return _time.isBefore(new Date());
    }
    /**
     * 监测浏览器tab页切换立即校验账号
     * @param {Function} cb 检测到切换后的回调函数  
     */

  }, {
    key: "vaVisibilityChange",
    value: function vaVisibilityChange(cb) {
      window.addEventListener("visibilitychange", cb);
    }
  }]);
  return VaJwt;
}();

exports["default"] = VaJwt;