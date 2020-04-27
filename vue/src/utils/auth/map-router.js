/**
 * @author weilan
 * @time 2020.04.26
 * @description 将路由映射到真实路径，babel之后会失效，将这句代码在每个项目中复制，也可修改映射规则
 */

module.exports = path => () => import(`@/views${path}/index.vue`);