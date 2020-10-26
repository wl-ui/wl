"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _wlCore = require("wl-core");

var _settings = require("../config/settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 导入配置项

/**
 * @method 配置请求拦截器
 * @param {Object} instance axios实例
 * @param {Function} requestInterceptorSuccessCb 非必填 请求拦截器成功回调，必须返回一个config对象
 */
var _configRequestInterceptor = function _configRequestInterceptor(instance, requestInterceptorSuccessCb) {
  instance.interceptors.request.use(function (config) {
    if (requestInterceptorSuccessCb) {
      var _config = requestInterceptorSuccessCb(config);

      if (!_wlCore.DataType.isObject(_config)) {
        throw Error('requestInterceptorSuccessCb必须返回一个config对象');
      }

      return _config;
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });
};
/**
 * @method 配置响应拦截器
 * @param {Object} instance axios实例
 * @param {Function} responseInterceptorSuccessCb 非必填 响应拦截器成功回调，必须返回一个response对象
 * @param {Function} responseInterceptorErrorCb 非必填 响应拦截器失败回调，必须返回一个response对象
 * @param {Number} retry 非必填 请求失败自动重试次数 默认2
 * @param {Number} retryDelay 非必填 请求失败自动重试时间间隔 默认1000ms 
 */


var _configResponseInterceptor = function _configResponseInterceptor(instance, responseInterceptorSuccessCb, responseInterceptorErrorCb, retry, retryDelay) {
  // 自动重试机制
  instance.defaults.retry = retry;
  instance.defaults.retryDelay = retryDelay; // 响应拦截器

  instance.interceptors.response.use(function (res) {
    if (responseInterceptorSuccessCb) {
      var _res = responseInterceptorSuccessCb(res);

      if (!_wlCore.DataType.isObject(_res)) {
        throw Error('responseInterceptorSuccessCb必须返回一个response对象');
      }

      return _res;
    }

    return res;
  }, function (err) {
    var _errres$status, _errres$config$url, _errres$config;

    var config = err.config;
    var errres = err.response;
    var err_type = (_errres$status = errres === null || errres === void 0 ? void 0 : errres.status) !== null && _errres$status !== void 0 ? _errres$status : 0; // 收集错误信息

    switch (err_type) {
      case 400:
        err.message = "请求无效";
        break;

      case 401:
        err.message = "由于长时间未操作，登录已超时，请重新登录";
        break;

      case 403:
        err.message = "拒绝访问";
        break;

      case 404:
        err.message = "\u8BF7\u6C42\u5730\u5740\u51FA\u9519: ".concat((_errres$config$url = errres === null || errres === void 0 ? void 0 : (_errres$config = errres.config) === null || _errres$config === void 0 ? void 0 : _errres$config.url) !== null && _errres$config$url !== void 0 ? _errres$config$url : '/');
        break;

      case 405:
        err.message = "\u672A\u6388\u6743";
        break;

      case 408:
        err.message = "请求超时";
        break;

      case 500:
        err.message = "服务器内部错误";
        break;

      case 501:
        err.message = "服务未实现";
        break;

      case 502:
        err.message = "网关错误";
        break;

      case 503:
        err.message = "服务不可用";
        break;

      case 504:
        err.message = "网关超时";
        break;

      case 505:
        err.message = "HTTP版本不受支持";
        break;

      default:
        err.message = "网络波动，请重试";
    } // If config does not exist or the retry option is not set, reject


    if (!config || !config.retry) return Promise.reject(err); // Set the variable for keeping track of the retry count

    config.__retryCount = config.__retryCount || 0; // Check if we've maxed out the total number of retries

    if (config.__retryCount >= config.retry) {
      // 自定义重复请求后失败的回调
      if (responseInterceptorErrorCb) {
        var _res = responseInterceptorErrorCb(err);

        if (!_wlCore.DataType.isObject(err === null || err === void 0 ? void 0 : err.config)) {
          throw Error('responseInterceptorErrorCb必须返回一个err包含{config,response}');
        }

        return Promise.reject(_res);
      } // Reject with the error


      return Promise.reject(err);
    } // Increase the retry count


    config.__retryCount += 1; // Create new promise to handle exponential backoff

    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    }); // Return the promise in which recalls axios to retry the request

    return backoff.then(function () {
      if (config.baseURL) {
        config.url = config.url.replace(config.baseURL, "");
      }

      return instance(config);
    });
  });
};

var Fetch = /*#__PURE__*/function () {
  function Fetch() {
    _classCallCheck(this, Fetch);

    // this.__successCode__ = _httpCode.ok;
    this.__http__ = null;
  }
  /**
   * @method 创建axios实例
   * @param {Object} param0 配置项
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
   * @returns 返回创建后的axios实例
   */


  _createClass(Fetch, null, [{
    key: "create",
    value: function create() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$retry = _ref.retry,
          retry = _ref$retry === void 0 ? _settings._httpOptions.retry : _ref$retry,
          _ref$retryDelay = _ref.retryDelay,
          retryDelay = _ref$retryDelay === void 0 ? _settings._httpOptions.retryDelay : _ref$retryDelay,
          _ref$withCredentials = _ref.withCredentials,
          withCredentials = _ref$withCredentials === void 0 ? _settings._httpOptions.withCredentials : _ref$withCredentials,
          _ref$headers = _ref.headers,
          headers = _ref$headers === void 0 ? _settings._httpOptions.headers : _ref$headers,
          _ref$timeout = _ref.timeout,
          timeout = _ref$timeout === void 0 ? _settings._httpOptions.timeout : _ref$timeout,
          _ref$baseURL = _ref.baseURL,
          baseURL = _ref$baseURL === void 0 ? _settings._httpOptions.baseURL : _ref$baseURL,
          expand = _objectWithoutProperties(_ref, ["retry", "retryDelay", "withCredentials", "headers", "timeout", "baseURL"]);

      var requestInterceptorSuccessCb = arguments.length > 1 ? arguments[1] : undefined;
      var responseInterceptorSuccessCb = arguments.length > 2 ? arguments[2] : undefined;
      var responseInterceptorErrorCb = arguments.length > 3 ? arguments[3] : undefined;

      // 处理类内部successCode
      // this._successCode = successCode ?? _httpCode.ok;
      // 整理配置项
      var _options = _objectSpread({
        baseURL: baseURL,
        withCredentials: withCredentials,
        headers: headers,
        timeout: timeout
      }, expand); // 创建axios实例


      var _http = _axios["default"].create(_options); // 注册请求拦截器


      _configRequestInterceptor(_http, requestInterceptorSuccessCb); // 注册响应拦截器


      _configResponseInterceptor(_http, responseInterceptorSuccessCb, responseInterceptorErrorCb, retry, retryDelay);

      this.__http__ = _http;
      return _http;
    }
    /**
     * 通过向 axios 传递相关配置来创建单个请求
     * @param {Object} param0 
     * @description url:String 请求地址
     * @description method:String 请求方法类型 默认post
     * @description params:Object 即将与请求一起发送的 URL 参数
     * @description data:Object 作为请求主体被发送的数据
     * @description instance:Object 外部传入的axios实例，默认使用内部创建，无特殊需求不得在外部创建多余实例
     * @description expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
     */

  }, {
    key: "axios",
    value: function axios() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          url = _ref2.url,
          _ref2$method = _ref2.method,
          method = _ref2$method === void 0 ? _settings._httpOptions.method : _ref2$method,
          params = _ref2.params,
          data = _ref2.data,
          instance = _ref2.instance,
          expand = _objectWithoutProperties(_ref2, ["url", "method", "params", "data", "instance"]);

      // 废弃 返回一个新的promise，注意：此promise将把http错误和与create axios时
      // 整理请求参数
      var _options = _objectSpread({
        url: url,
        method: method,
        params: params,
        data: data
      }, expand); // 处理请求并直接返回_http()


      var _http = instance ? instance() : this.__http__;

      return _http(_options);
    }
    /**
     * 执行多个并发请求
     * @param {Array} list axios Promise 对象
     */

  }, {
    key: "all",
    value: function all(list) {
      if (!_wlCore.DataType.isArray(list)) {
        throw Error('必须传入一个数组！');
      }

      return this.__http__.all(list);
    }
  }]);

  return Fetch;
}();

exports["default"] = Fetch;