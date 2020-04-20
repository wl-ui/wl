/**
 * @author weilan
 * @description axios通信类封装
 * @time 2020.04.20
 */

import axios from "axios";
import { _httpOptions } from "../config/settings";

/**
 * @method 配置请求拦截器
 * @param {*} instance axios实例
 * @param {*} requestInterceptorSuccessCb 请求拦截器成功回调，必须返回一个config对象
 */
const _configRequestInterceptor = (instance, requestInterceptorSuccessCb) => {
  instance.interceptors.request.use(config => {
    if (requestInterceptorSuccessCb) {
      const _config = requestInterceptorSuccessCb(config);
      return _config;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  })
}

export default class Fetch {
  /**
   * @method 创建axios实例
   * @param {*} param0 配置项
   * @description retry:Number 请求失败自动重连次数
   * @description retryDelay:Number 请求失败自动重连时间间隔
   * @description withCredentials:Boolean 开启请求跨域
   * @description headers:Object 请求头配置
   * @description timeout:Number 请求超时时间
   * @description baseURL:String 请求超时时间
   * @description expand:Object 其他需要扩展的配置项
   */
  static create({
    retry = _httpOptions.retry,
    retryDelay = _httpOptions.retryDelay,
    withCredentials = _httpOptions.withCredentials,
    headers = _httpOptions.headers,
    timeout = _httpOptions.timeout,
    baseURL = _httpOptions.baseURL,
    ...expand
  }) {
    const _options = {
      baseURL,
      withCredentials,
      headers,
      timeout,
      ...expand
    }
    const _http = axios.create(_options);
    return _http;
  }
}