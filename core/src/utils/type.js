/**
 * @author weilan
 * @description 类型检查基础类
 * @time 2020.04.20
 */
export default class DataType {
  /**
   * @method 检测当前目标是否为对象
   * @param {*} item 
   */
  static isObject(item) {
    return Object.prototype.toString.call(item) === "[object Object]";
  }

  /**
   * @method 检测当前目标是否为空对象
   * @param {*} item 
   */
  static isEmptyObject(item) {
    return this.isObject(item) && Object.keys(item).length === 0;
  }

  /**
   * @method 检测当前目标是否为数组
   * @param {*} item 
   */
  static isArray(item) {
    return Array.isArray(item);
  }

  /**
   * @method 检测当前目标是否为空数组
   * @param {*} item 
   */
  static isEmptyArray(item) {
    return this.isArray(item) && item.length === 0;
  }
}