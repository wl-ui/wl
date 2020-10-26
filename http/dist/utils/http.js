"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fetch = _interopRequireDefault(require("./fetch"));

var _settings = require("../config/settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 导入配置项
var Http = /*#__PURE__*/function () {
  /**
   * 
   * @param {Object} axios 外部axios实例 无特殊情况不要使用此参数; 如果传入则表示使用自定义axios实例，后续参数将不会产生作用
   * @param {Object} axiosOptions Fetch.create
   * @description retry:Number 请求失败自动重连次数 默认2
   * @description retryDelay:Number 请求失败自动重连时间间隔 默认1000ms
   * @description withCredentials:Boolean 开启请求跨域 默认true
   * @description headers:Object 请求头配置 默认"Content-Type": "application/json;charset=UTF-8"
   * @description timeout:Number 请求超时时间 默认5000
   * @description baseURL:String 请求地址前缀 默认''
   * @description successCode:Number //废弃 后台请求成功状态码，默认200 将会把所有非200的请求回调归入reject
   * @description expand:Object 其他需要扩展的配置项 other
   * @param {Function} requestInterceptorSuccessCb 非必填 请求拦截器成功回调，必须返回一个config对象
   * @param {Function} responseInterceptorSuccessCb 非必填 响应拦截器成功回调，必须返回一个response对象
   * @param {Function} responseInterceptorErrorCb 非必填 响应拦截器失败回调，必须返回一个response对象
   */
  function Http() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        axios = _ref.axios,
        axiosOptions = _ref.axiosOptions,
        requestInterceptorSuccessCb = _ref.requestInterceptorSuccessCb,
        responseInterceptorSuccessCb = _ref.responseInterceptorSuccessCb,
        responseInterceptorErrorCb = _ref.responseInterceptorErrorCb;

    _classCallCheck(this, Http);

    this.__http__ = axios || _fetch["default"].create(axiosOptions, requestInterceptorSuccessCb, responseInterceptorSuccessCb, responseInterceptorErrorCb);
  }
  /**
   * get方法请求
   * @param {Object} options 
   * @description url:String 请求地址
   * @description params:Object 即将与请求一起发送的 URL 参数
   * @description data:Object 作为请求主体被发送的数据
   * @description instance:Object 外部传入的axios实例，默认使用内部创建，无特殊需求不得在外部创建多余实例
   * @description expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */


  _createClass(Http, [{
    key: "get",
    value: function get(options) {
      return _fetch["default"].axios(_objectSpread(_objectSpread({}, options), {}, {
        method: _settings._httpType.GET
      }));
    }
    /**
     * post方法请求
     * @param {Object} options 
     * @description url:String 请求地址
     * @description params:Object 即将与请求一起发送的 URL 参数
     * @description data:Object 作为请求主体被发送的数据
     * @description instance:Object 外部传入的axios实例，默认使用内部创建，无特殊需求不得在外部创建多余实例
     * @description expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
     */

  }, {
    key: "post",
    value: function post(options) {
      return _fetch["default"].axios(_objectSpread(_objectSpread({}, options), {}, {
        method: _settings._httpType.POST
      }));
    }
    /**
     * 执行多个并发请求
     * @param {Array} list axios Promise 对象
     */

  }, {
    key: "all",
    value: function all(list) {
      return _fetch["default"].all(list);
    }
    /**
     * delete方法请求
     * @param {Object} options 
     * @description url:String 请求地址
     * @description params:Object 即将与请求一起发送的 URL 参数
     * @description data:Object 作为请求主体被发送的数据
     * @description instance:Object 外部传入的axios实例，默认使用内部创建，无特殊需求不得在外部创建多余实例
     * @description expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
     */

  }, {
    key: "del",
    value: function del(options) {
      return _fetch["default"].axios(_objectSpread(_objectSpread({}, options), {}, {
        method: _settings._httpType.DELETE
      }));
    }
    /**
     * put方法请求
     * @param {Object} options 
     * @description url:String 请求地址
     * @description params:Object 即将与请求一起发送的 URL 参数
     * @description data:Object 作为请求主体被发送的数据
     * @description instance:Object 外部传入的axios实例，默认使用内部创建，无特殊需求不得在外部创建多余实例
     * @description expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
     */

  }, {
    key: "put",
    value: function put(options) {
      return _fetch["default"].axios(_objectSpread(_objectSpread({}, options), {}, {
        method: _settings._httpType.PUT
      }));
    }
    /**
     * put方法请求
     * @param {Object} options 
     * @description url:String 请求地址
     * @description params:Object 即将与请求一起发送的 URL 参数
     * @description data:Object 作为请求主体被发送的数据
     * @description instance:Object 外部传入的axios实例，默认使用内部创建，无特殊需求不得在外部创建多余实例
     * @description expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
     */

  }, {
    key: "patch",
    value: function patch(options) {
      return _fetch["default"].axios(_objectSpread(_objectSpread({}, options), {}, {
        method: _settings._httpType.PATCH
      }));
    }
  }]);

  return Http;
}();

exports["default"] = Http;