/**
 * @author weilan
 * @description axios通信类封装
 * @time 2020.04.20
 */

import axios from "axios"; // 导入axios库
import { DataType } from "wl-core" // 导入wl基础核心库
import { _httpOptions, _httpCode } from "../config/settings"; // 导入配置项

/**
 * @method 配置请求拦截器
 * @param {*} instance axios实例
 * @param {*} requestInterceptorSuccessCb 非必填 请求拦截器成功回调，必须返回一个config对象
 */
const _configRequestInterceptor = (instance, requestInterceptorSuccessCb) => {
  instance.interceptors.request.use(config => {
    if (requestInterceptorSuccessCb) {
      const _config = requestInterceptorSuccessCb(config);
      if (!DataType.isObject(_config)) {
        throw Error('requestInterceptorSuccessCb必须返回一个config对象')
      }
      return _config;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  })
}

/**
 * @method 配置响应拦截器
 * @param {*} instance axios实例
 * @param {*} responseInterceptorSuccessCb 非必填 响应拦截器成功回调，必须返回一个response对象
 * @param {*} responseInterceptorErrorCb 非必填 响应拦截器失败回调，必须返回一个response对象
 * @param {*} retry 非必填 请求失败自动重试次数 默认2
 * @param {*} retryDelay 非必填 请求失败自动重试时间间隔 默认1000ms 
 */
const _configResponseInterceptor = (instance, responseInterceptorSuccessCb, responseInterceptorErrorCb, retry, retryDelay) => {
  // 自动重试机制
  instance.defaults.retry = retry;
  instance.defaults.retryDelay = retryDelay;
  // 响应拦截器
  instance.interceptors.response.use(
    res => {
      if (responseInterceptorSuccessCb) {
        const _res = responseInterceptorSuccessCb(res);
        if (!DataType.isObject(_res)) {
          throw Error('responseInterceptorSuccessCb必须返回一个response对象')
        }
        return _res;
      }
      return res;
    },
    err => {
      let config = err.config;
      let errres = err.response;
      let err_type = errres?.status ?? 0;
      // 收集错误信息
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
          err.message = `请求地址出错: ${errres?.config?.url ?? '/'}`;
          break;

        case 405:
          err.message = `未授权`;
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
      }

      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(err);

      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0;
      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // 自定义重复请求后失败的回调
        if (responseInterceptorErrorCb) {
          const _res = responseInterceptorErrorCb(err);
          if (!DataType.isObject(err)) {
            throw Error('responseInterceptorErrorCb必须返回一个response对象')
          }
          return Promise.reject(_res);;
        }
        // Reject with the error
        return Promise.reject(err);
      }

      // Increase the retry count
      config.__retryCount += 1;

      // Create new promise to handle exponential backoff
      let backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, config.retryDelay || 1);
      });

      // Return the promise in which recalls axios to retry the request
      return backoff.then(() => {
        return instance(config);
      });
    }
  );
}

export default class Fetch {
  /**
   * @method 创建axios实例
   * @param {*} param0 配置项
   * @description retry:Number 请求失败自动重连次数 默认2
   * @description retryDelay:Number 请求失败自动重连时间间隔 默认1000ms
   * @description withCredentials:Boolean 开启请求跨域 默认true
   * @description headers:Object 请求头配置 默认"Content-Type": "application/json;charset=UTF-8"
   * @description timeout:Number 请求超时时间 默认5000
   * @description baseURL:String 请求地址前缀 默认''
   * @description expand:Object 其他需要扩展的配置项 other
   * @param {*} requestInterceptorSuccessCb 非必填 请求拦截器成功回调，必须返回一个config对象
   * @param {*} responseInterceptorSuccessCb 非必填 响应拦截器成功回调，必须返回一个response对象
   * @param {*} responseInterceptorErrorCb 非必填 响应拦截器失败回调，必须返回一个response对象
   */
  static create({
    retry = _httpOptions.retry,
    retryDelay = _httpOptions.retryDelay,
    withCredentials = _httpOptions.withCredentials,
    headers = _httpOptions.headers,
    timeout = _httpOptions.timeout,
    baseURL = _httpOptions.baseURL,
    ...expand
  }, requestInterceptorSuccessCb, responseInterceptorSuccessCb, responseInterceptorErrorCb) {
    // 整理配置项
    const _options = {
      baseURL,
      withCredentials,
      headers,
      timeout,
      ...expand
    }
    // 创建axios实例
    const _http = axios.create(_options);
    // 注册请求拦截器
    _configRequestInterceptor(_http, requestInterceptorSuccessCb);
    // 注册响应拦截器
    _configResponseInterceptor(_http, responseInterceptorSuccessCb, responseInterceptorErrorCb, retry, retryDelay);
    return _http;
  }

  /**
   * 通过向 axios 传递相关配置来创建单个请求
   * @param {*} param0 
   */
  static axios({
    url,
    method = _httpOptions.method,
    baseURL = _httpOptions.baseURL,
    transformRequest,
    transformResponse,
    headers,
    params,
    timeout,
    withCredentials,
    auth,
    responseType,
    ...expand
  } = {}) {

  }
}