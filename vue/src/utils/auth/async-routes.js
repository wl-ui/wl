/**
 * @author weilan
 * @time 2020.03.09
 * @description 整理需要登录后异步推入的路由
 */
import { flattenDeep, DataType } from "wl-core"
// import routeMap from "./map-router"
import { _menuDataOptions } from "../../config/settings"

/**
 * 异步推入鉴权路由 要求必须存在@/views/layout/index.vue主体视图盒子和/index首页路径
 * @param {Array} data 菜单数据
 * @param {Array} nextRoutes 需要登录后插入的 非后台返回的 路由列表
 * @param {Object} options 菜单数据解析为路由数据配置项 下面是字段及默认值说明
 * @description url: 'url', // 前端地址栏路由 将映射真实文件路径 映射规则：import(`@/views${url}/index.vue`)
 * @description name: 'routerName', // 命名路由 
 * @description meta: 'meta', // 路由元数据
 * @description children: 'children', // 子菜单字段
 * @description permissions: 'permissions', // 按钮权限字段
 * @description path404: 'error/404' // 404路径
 * @description mapPathFn: ()=>{} // 路由映射文件路径函数
 * @returns {Object} {routes: 整理好的异步路由router.addRoutes()即可, permissions: 权限code码}
 */
const asyncRoutes = (data, nextRoutes, options) => {
  if (!DataType.isObject(options)) throw Error('options 必须是一个对象！');
  let _options = { ..._menuDataOptions, ...options }
  if (!_options.mapPathFn) throw Error('options 内必须有路由映射真实路径方法 mapPathFn！');
  // 主视图路由
  let userRouter = {
    path: "/layout",
    name: "layout",
    component: () => import('@/views/layout/index.vue'),
    redirect: '/index',
    children: []
  };
  // 创建路由盒子
  let routerBox = [];
  // 创建权限码数组
  let permissions = [];
  // 将菜单数据处理为一维函数
  let menu = flattenDeep(data, _options.children);
  // 处理路由映射真实路径，放在封装里babel之后就失效了，暂时不提供这个公共方法，在每个项目里写一遍吧
  // let routeMapFile = _options.mapPathFn ? _options.mapPathFn : routeMap;
  // 遍历处理路由 
  menu.forEach(item => {
    let _url = item[_options.url];
    if (!_url) return;
    try {
      let routerItem = {
        path: _url, // 路由路径名
        name: item[_options.name], // 命名路由 用于配合菜单简洁跳转
        meta: item[_options.meta], // 路由元信息 定义路由时即可携带的参数，可用来管理每个路由的按钮操作权限
        component: _options.mapPathFn(item) // 路由映射真实视图路径
      };
      // 将所有权限码收集存入store
      let _permissions = item[_options.permissions];
      if (DataType.isArray(_permissions)) permissions.push(..._permissions);
      routerBox.push(routerItem);
    } catch (err) {
      throw Error('路由映射规则为：@/views${url}/index.vue', err);
    }
  });
  // 推入需要异步加载的，非服务端获取的功能性页面
  routerBox.push(...nextRoutes);
  userRouter.children = routerBox;
  let errorBox = {
    path: "*",
    redirect: _options.path404
  };

  return {
    routes: [userRouter, errorBox],
    menuList: menu,
    permissions
  }
}

export default asyncRoutes