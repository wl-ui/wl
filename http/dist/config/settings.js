"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._httpCode = exports._httpType = exports._httpOptions = void 0;
// 基础配置项
var _httpOptions = {
  baseURL: '',
  // api的base_url
  retry: 2,
  retryDelay: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
  timeout: 5000,
  // request timeout
  method: 'post' // 默认请求方法

}; // http类型

exports._httpOptions = _httpOptions;
var _httpType = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
}; // 后台状态码

exports._httpType = _httpType;
var _httpCode = {
  ok: 200,
  err: 300,
  noAuth: 401
};
exports._httpCode = _httpCode;