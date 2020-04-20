"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._storageType = exports._httpType = void 0;
// 基础配置项
// http类型
var _httpType = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
}; // 存储类型

exports._httpType = _httpType;
var _storageType = {
  Local: 'local',
  Session: 'session'
};
exports._storageType = _storageType;