"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _fastclick = _interopRequireDefault(require("fastclick"));

var _vueCookie = _interopRequireDefault(require("vue-cookie"));

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _filters2 = _interopRequireDefault(require("../filters"));

var _directives2 = _interopRequireDefault(require("../directives"));

var _auth = _interopRequireDefault(require("../auth"));

var _settings = require("../../config/settings");

var _wlCore = require("wl-core");

// 移动端click事件解决方案
// cookie操作库
// 图片懒加载库
// 导入默认过滤器
// 导入默认指令
// 导入鉴权系统

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
var render = function render() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      root = _ref.root,
      router = _ref.router,
      store = _ref.store,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      _ref$routeOptions = _ref.routeOptions,
      routeOptions = _ref$routeOptions === void 0 ? {} : _ref$routeOptions,
      _ref$menuOptions = _ref.menuOptions,
      menuOptions = _ref$menuOptions === void 0 ? {} : _ref$menuOptions,
      _ref$nextRoutes = _ref.nextRoutes,
      nextRoutes = _ref$nextRoutes === void 0 ? [] : _ref$nextRoutes;

  var mount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings._vueOptions.mount;

  // 检查必要条件
  if (!root || !router || !store) {
    throw Error('创建vue实例至少需要有{root, router, store}字段');
  } // 检查 render 配置项是否是对象格式


  if (!_wlCore.DataType.isObject(options)) {
    throw Error('options必须是对象格式');
  } // 提取render配置参数


  var _options$fastclick = options.fastclick,
      fastclick = _options$fastclick === void 0 ? false : _options$fastclick,
      _options$cookie = options.cookie,
      cookie = _options$cookie === void 0 ? false : _options$cookie,
      _options$auth = options.auth,
      auth = _options$auth === void 0 ? true : _options$auth,
      lazyOptions = options.lazyOptions,
      _options$plugins = options.plugins,
      plugins = _options$plugins === void 0 ? [] : _options$plugins,
      _options$filters = options.filters,
      filters = _options$filters === void 0 ? [] : _options$filters,
      _options$directives = options.directives,
      directives = _options$directives === void 0 ? [] : _options$directives,
      fncBeforeVue = options.fncBeforeVue; // 检查指令和过滤器格式

  if (!_wlCore.DataType.isArray(filters) || !_wlCore.DataType.isArray(directives) || !_wlCore.DataType.isArray(plugins)) {
    console.error('filters、directives、plugins需要是数组格式！');
  } // 为Vue注册全局过滤器


  var _filters = _filters2["default"].concat(filters);

  _filters.map(function (item) {
    return _vue["default"].filter(item.name, item.rule);
  }); // 为Vue注册全局指令


  var _directives = _directives2["default"].concat(directives);

  _directives.map(function (item) {
    return _vue["default"].directive(item.name, item.rule(store));
  }); // 为Vue注册全局组件


  plugins.map(function (item) {
    return _vue["default"].use(item);
  }); // 解决移动端的300ms延迟问题(默认不启用)

  fastclick && _fastclick["default"].attach(document.body); // 是否使用VueCookie(默认不启用)

  cookie && _vue["default"].use(_vueCookie["default"]); // 启动图片懒加载(默认不启用)

  _wlCore.DataType.isObject(lazyOptions) && _vue["default"].use(_vueLazyload["default"], lazyOptions); // 在实例化vue前 可传入回调函数自定义逻辑

  fncBeforeVue && fncBeforeVue(_vue["default"]); // 执行鉴权系统

  auth && (0, _auth["default"])(router, store, routeOptions, menuOptions, nextRoutes); // 阻止启动生产消息

  _vue["default"].config.productionTip = false; // 实例化vue

  var vm = new _vue["default"]({
    router: router,
    store: store,
    render: function render(h) {
      return h(root);
    }
  }).$mount(mount);
  return vm;
};

var _default = render;
exports["default"] = _default;