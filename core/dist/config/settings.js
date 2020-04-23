"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._timeUnit = exports._storageType = void 0;
// 基础配置项
// 存储类型
var _storageType = {
  Local: 'local',
  Session: 'session'
}; // 时间单位 大小写不敏感 支持负数和缩写

exports._storageType = _storageType;
var _timeUnit = {
  Year: 'year',
  // Y 年
  Quarter: 'quarter',
  // Q 季度
  Month: 'month',
  // M 月
  Week: 'week',
  // W 周
  Day: 'day',
  // d 天
  Hour: 'hour',
  // h 时
  Minute: 'minute',
  // m 分
  Second: 'second' // s 秒

};
exports._timeUnit = _timeUnit;