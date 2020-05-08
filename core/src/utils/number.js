/**
 * @author weilan
 * @time 2020.05.07
 * @description 依赖big.js处理js数字运算的精度问题
 */
import Big from "big.js"

class WlNumber {
  /**
   * @name 实例化bigjs
   * @param {Number|String} val 
   */
  constructor(val) {
    this._val = new Big(val);
  }

  /**
   * @name 加
   * @param {Number|String} val 要加的值
   */
  plus(val) {
    this._val = this._val.plus(val);
    return this._val;
  }

  /**
   * @name 减
   * @param {Number|String} val 要减的值
   */
  minus(val) {
    this._val = this._val.minus(val);
    return this._val;
  }

  /**
   * @name 乘
   * @param {Number|String} val 要乘的值
   */
  times(val) {
    this._val = this._val.times(val);
    return this._val;
  }

  /**
   * @name 除以
   * @param {Number|String} val 要除以的值
   */
  div(val) {
    this._val = this._val.div(val);
    return this._val;
  }

  /**
   * @name 取余
   * @param {Number|String} val 要除以的值
   */
  mod(val) {
    this._val = this._val.mod(val);
    return this._val;
  }

  /**
   * @name 取绝对值
   * @param {Number|String} val 取绝对值的值
   */
  abs() {
    this._val = this._val.abs();
    return this._val;
  }

  /**
   * @name 大于
   * @param {Number|String} val 取比较的值
   * @returns Boolean
   */
  gt(val) {
    return this._val.gt(val);
  }

  /**
   * @name 大于等于
   * @param {Number|String} val 取比较的值
   * @returns Boolean
   */
  gte(val) {
    return this._val.gte(val);
  }

  /**
   * @name 小于
   * @param {Number|String} val 取比较的值
   * @returns Boolean
   */
  lt(val) {
    return this._val.lt(val);
  }

  /**
   * @name 小于等于
   * @param {Number|String} val 取比较的值
   * @returns Boolean
   */
  lte(val) {
    return this._val.lte(val);
  }

  /**
   * @name 将数据转化为数字类型，如果不可转化则返回0
   * @param {*} val 
   */
  static toNumber(val) {
    return Number(val) || 0
  }
}

export default WlNumber;