/**
 * @author weilan
 * @time 2020.04.23
 * @description 用户身份校验类
 */
import { Time } from "wl-core"

export default class VaJwt {
  /**
   * 截取jwt中有效载荷部分
   * @param {*} jwt 
   */
  static extractJwtPayload(jwt) {
    if (!jwt) throw Error('缺少jwt！');
    let jwt_split = jwt.split('.');
    if (jwt_split.length !== 3) throw Error('jwt格式不正确！');
    return jwt_split[1];
  }

  /**
   * 简单解析未特殊加密的payload部分
   * @param {*} jwt 
   */
  static payloadAtob(jwt) {
    let jwt_payload = this.extractJwtPayload(jwt);
    let decodedData = window.atob(jwt_payload);
    return JSON.parse(decodedData);
  }

  /**
   * 检验jwt是否过期
   * @param {String} jwt 
   * @param {Function} vaCb 自定义验证函数，返回Boolean true表示过期
   */
  static vaJwtExpired(jwt, vaCb) {
    let exp = this.payloadAtob(jwt).exp * 1000;
    if (vaCb) {
      return vaCb(exp)
    }
    let _time = new Time(exp);
    return _time.isBefore(new Date());
  }

  /**
   * 监测浏览器tab页切换立即校验账号
   * @param {Function} cb 检测到切换后的回调函数  
   */
  static vaVisibilityChange(cb) {
    window.addEventListener("visibilitychange", cb)
  }
}