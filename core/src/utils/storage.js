/**
 * @author weilan
 * @description 浏览器存储函数
 * @time 2020.04.20
 */

import { _storageType } from '../config/settings';
import dataType from './type';

/**
 * @method 基础判断
 * @param storageType 存储类型
 * @param encryptType 加密类型
 */
const _core = (storageType = _storageType.local, encryptType) => {
  if (!encryptType) {
    return { storage: storageType === _storageType.local ? localStorage : sessionStorage }
  }
}

export default class Storage {
  /**
   * @method 将键值存入本地存储
   * @param {*} key 键
   * @param {*} value 值
   * @param {*} type 类型 默认storageType.Local
   * @param {*} encrypt 加密配置项
   */
  static set(key, value, type, encrypt) {
    const { storage } = _core(type);
    let _processed_value = dataType.isObject(value) || dataType.isArray(value) ? JSON.stringify(value) : value;
    storage.setItem(key, _processed_value);
  }

  /**
   * @method 根据key取本地存储数据
   * @param {*} key 键
   * @param {*} type 类型 默认storageType.Local
   * @param {*} encrypt 加密配置项
   */
  static get(key, type, encrypt) {
    const { storage } = _core(type);
    let _stoarge_value = storage.getItem(key);
    try {
      return JSON.parse(_stoarge_value);
    } catch (err) {
      return _stoarge_value;
    }
  }

  /**
   * @method 根据key删除本地存储数据
   * @param {*} key 键
   * @param {*} type 类型 默认storageType.Local
   */
  static remove(key, type) {
    const { storage } = _core(type);
    storage.removeItem(key)
  }

  /**
   * @method 清空本地存储
   * @param {*} type 类型 默认storageType.Local
   */
  static clear(type) {
    const { storage } = _core(type);
    storage.clear();
  }

  /**
   * @method 根据key查询本地存储中是否存在key的实例
   * @param {*} key 键
   * @param {*} type 类型 默认storageType.Local
   */
  static had(key, type) {
    const { storage } = _core(type);
    return key in storage;
  }

  /**
   * @method 获取存储库里存储实例个数
   * @param {*} type 
   */
  static count(type) {
    const { storage } = _core(type);
    return storage.length
  }
}