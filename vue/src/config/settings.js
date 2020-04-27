// 菜单数据字段配置项

const _menuDataOptions = {
  url: 'url', // 前端地址栏路由 将映射真实文件路径 映射规则：import(`@/views${url}/index.vue`)
  name: 'routerName', // 命名路由 
  meta: 'meta', // 路由元数据
  children: 'children', // 子菜单字段
  permissions: 'permissions', // 按钮权限字段
  path404: 'error/404'
}

const _routeGuardOptions = {
  tokenKey: 'token', // 存储在local中的token的key
  dispatchSetToken: 'app/setToken', // store设置token的actions命名空间
  dispatchSetMenu: 'menu/setMenu', // store设置菜单的actions命名空间
  dispatchSetMenuList: 'menu/setMenuList', // store设置一维菜单的actions命名空间
  dispatchSetPermissions: 'menu/setPermissions', // store设置按钮权限码的actions命名空间
  pathLogin: '/login', // 登录页的 router path
  pathLogged: '/index', // 已登录后 再进登录页要重定向的 router path
  apiFn: null, // 获取菜单数据的api函数
  vaJwtExpiredFn: null, // 自定义校验jwt是否过期的函数
}

// 实例化vue配置项
const _vueOptions = {
  mount: '#app'
}

export {
  _menuDataOptions,
  _routeGuardOptions,
  _vueOptions
}