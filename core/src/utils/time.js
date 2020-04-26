/**
 * @author weilan
 * @time 2020.04.23
 * @description 时间操作方法
 */
import dayJs from "dayjs"
import { _timeUnit } from '../config/settings';

export default class Time {
  /**
   * 时间类实例化
   * @param {*} date 时间
   * @param {*} format 格式
   */
  constructor(date = null, format = null) {
    this.__date__ = date;
    this.__format__ = format;
  }

  /**
   * 将时间格式转化为dayjs格式
   * @param {*} date 时间
   */
  dayjs(date) {
    this.__date__ = dayJs(date);
    return this.__date__;
  }

  /**
   * 格式化时间
   * @param {*} format 格式
   */
  format(format) {
    return this.__date__?.format?.(format)
  }

  /**
   * 时间相加
   * @param {*} num 要加的时间
   * @param {*} unit 要加的时间的单位
   */
  add(num, unit = _timeUnit.Second) {
    return this.__date__?.add?.(num, unit)
  }

  /**
   * 时间相减
   * @param {*} num 要加的时间
   * @param {*} unit 要加的时间的单位
   */
  subtract(num, unit = _timeUnit.Second) {
    return this.__date__?.subtract?.(num, unit)
  }

  /**
   * 时间比较，是否之前
   * @param {*} startDate 开始时间
   * @param {*} endDate 结束时间
   * @param {*} unit 时间单位默认秒
   */
  static isBefore(startDate, endDate, unit = _timeUnit.Second) {
    return this.dayjs(startDate).isBefore(endDate, unit);
  }

  /**
   * 计算时差
   * @param {*} startDate 开始时间
   * @param {*} endDate 结束时间
   * @param {*} unit 时间单位默认秒
   */
  static diff(startDate, endDate, unit = _timeUnit.Second) {
    return this.dayjs(endDate).diff(startDate, unit);
  }
}
