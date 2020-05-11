import Vue from 'vue'
import FastClick from 'fastclick' // 移动端click事件解决方案
import VueCookie from 'vue-cookie' // cookie操作库
import VueLazyLoad from 'vue-lazyload' // 图片懒加载库
import selfFilters from '../filters' // 导入默认过滤器
import selfDirectives from '../directives' // 导入默认指令
import registerRouteGuard from "../auth" // 导入鉴权系统
import { _vueOptions } from "../../config/settings"
import { DataType } from "wl-core"

/**
 * vue 实例化函数
 * @param {Object} param0 配置项 下为详细注解 
 * @desc {Object} 必须 root 当前应用的根组件 一般是app.vue
 * @desc {Object} 必须 router router实例
 * @desc {Object} 必须 store store实例
 * @desc {Object}  options 实例化vue配置项 下为详细注解
 * @description fastclick 默认false 是否启用移动端快速点击插件
 * @description cookie 默认false 是否启用cookie操作插件
 * @description lazyOptions 默认null 启用图片懒加载插件时的配置项
 * @description filters 默认[] 过滤器数组 格式为 {name:"", rule: ()=>{}}
 * @description directives 默认[] 指令数组 格式为 {name:"", rule: ()=>{}}
 * @description plugins 默认[] 插件数组 [wlui, el-input] 可以直接Vue.use()的插件数组
 * @description fncBeforeVue 实例化vue前可执行的回调函数 fncBeforeVue(vue){... 你的逻辑}
 * @description auth 是否需要鉴权系统，如果不需要，后续参数无需再传
 * @desc {Object}  routeOptions 路由守卫配置项 下为详细注解
 * @description tokenKey: 'token', // 存储在local中的token的key
 * @description dispatchSetToken: 'app/setToken', // store设置token的actions命名空间
 * @description dispatchSetMenu: 'menu/setMenu', // store设置菜单的actions命名空间
 * @description dispatchSetPermissions: 'menu/setPermissions', // store设置按钮权限码的actions命名空间
 * @description pathLogin: '/login', // 登录页的 router path
 * @description pathLogged: '/index', // 已登录后 再进登录页要重定向的 router path
 * @description apiFn: ()=>{}, // 获取菜单数据的api函数
 * @description vaJwtExpiredFn: ()=>{}, // 自定义校验jwt是否过期的函数
 * @desc {Object}: menuOptions 菜单数据解析为路由数据配置项 下为详细注解
 * @description url: 'url', // 前端地址栏路由 将映射真实文件路径 映射规则：import(`@/views${url}/index.vue`)
 * @description name: 'routerName', // 命名路由 
 * @description meta: 'meta', // 路由元数据
 * @description children: 'children', // 子菜单字段
 * @description permissions: 'permissions', // 按钮权限字段
 * @description path404: 'error/404' // 404路径
 * @desc nextRoutes 需要登录后插入的 非后台返回的 路由列表
 * @param {String} mount 默认#app 要挂载的dom节点id
 * @returns vm 初始化后的vue实例
 */
const render = ({ root, router, store, options = {}, routeOptions = {}, menuOptions = {}, nextRoutes = [] } = {}, mount = _vueOptions.mount) => {
  // 检查必要条件
  if (!root || !router || !store) {
    throw Error('创建vue实例至少需要有{root, router, store}字段');
  }
  // 检查 render 配置项是否是对象格式
  if (!DataType.isObject(options)) {
    throw Error('options必须是对象格式');
  }
  // 提取render配置参数
  const { fastclick = false, cookie = false, auth = true, lazyOptions, plugins = [], filters = [], directives = [], fncBeforeVue } = options;
  // 检查指令和过滤器格式
  if (!DataType.isArray(filters) || !DataType.isArray(directives) || !DataType.isArray(plugins)) {
    console.error('filters、directives、plugins需要是数组格式！')
  }
  // 为Vue注册全局过滤器
  let _filters = selfFilters.concat(filters);
  _filters.map(item => Vue.filter(item.name, item.rule));
  // 为Vue注册全局指令
  let _directives = selfDirectives.concat(directives);
  _directives.map(item => Vue.directive(item.name, item.rule(store)));
  // 为Vue注册全局组件
  plugins.map(item => Vue.use(item));
  // 解决移动端的300ms延迟问题(默认不启用)
  fastclick && FastClick.attach(document.body);
  // 是否使用VueCookie(默认不启用)
  cookie && Vue.use(VueCookie);
  // 启动图片懒加载(默认不启用)
  DataType.isObject(lazyOptions) && Vue.use(VueLazyLoad, lazyOptions);
  // 在实例化vue前 可传入回调函数自定义逻辑
  fncBeforeVue && fncBeforeVue(Vue);
  // 执行鉴权系统
  auth && registerRouteGuard(router, store, routeOptions, menuOptions, nextRoutes);
  // 阻止启动生产消息
  Vue.config.productionTip = false;
  // 实例化vue
  const vm = new Vue({
    router,
    store,
    render: h => h(root)
  }).$mount(mount);
  return vm;
}

export default render;