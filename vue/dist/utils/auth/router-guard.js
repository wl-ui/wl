"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _wlCore = require("wl-core");

var _vaAuth = _interopRequireDefault(require("./va-auth"));

var _asyncRoutes2 = _interopRequireDefault(require("./async-routes"));

var _settings = require("../../config/settings");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// 路由守卫配置项

/**
 * 注册路由守卫
 * @param {*} router router实例
 * @param {*} store vuex实例
 * @param {*} routeOptions 注册路由配置项 下为详细注解
 * @description  tokenKey: 'token', // 存储在local中的token的key
 * @description dispatchSetToken: 'app/setToken', // store设置token的actions命名空间
 * @description dispatchSetMenu: 'menu/setMenu', // store设置菜单的actions命名空间
 * @description dispatchSetPermissions: 'menu/setPermissions', // store设置按钮权限码的actions命名空间
 * @description pathLogin: '/login', // 登录页的 router path
 * @description pathLogged: '/index', // 已登录后 再进登录页要重定向的 router path
 * @description apiFn: ()={}, // 获取菜单数据的api函数
 * @description vaJwtExpiredFn: ()={}, // 自定义校验jwt是否过期的函数
 * @param {*} menuOptions 菜单数据解析为路由数据配置项
 * @param {*} nextRoutes 需要登录后插入的 非后台返回的 路由列表
 */
var registerRouteGuard = function registerRouteGuard(router, store, routeOptions, menuOptions, nextRoutes) {
  if (!_wlCore.DataType.isObject(routeOptions)) throw Error('routeOptions 必须是一个对象！');

  var _option = _objectSpread(_objectSpread({}, _settings._routeGuardOptions), routeOptions);

  if (!(_option === null || _option === void 0 ? void 0 : _option.apiFn)) throw Error('apiFn lost！缺少获取菜单数据的api函数！');
  router.beforeEach(function (to, from, next) {
    // 检查是否存在登录状态
    var _jwt = _wlCore.Storage.get(_option.tokenKey); // 存在登陆状态


    if (_jwt && _jwt != 'undefined') {
      // 第一次打开页面token过期进入登陆页
      if (_vaAuth["default"].vaJwtExpired(_jwt, _option.vaJwtExpiredFn)) {
        store.dispatch(_option.dispatchSetToken, '');

        _wlCore.Storage.remove(_option.tokenKey);

        next({
          path: _option.pathLogin
        });
        return;
      } // 没过期自动登录


      store.dispatch(_option.dispatchSetToken, _jwt); // 判断当前用户是否已拉取权限菜单

      if (store.getters.menu.length === 0) {
        _option.apiFn().then(function (_ref) {
          var data = _ref.data;

          var _menu = data.data || [];
          /*  */


          var _asyncRoutes = (0, _asyncRoutes2["default"])(_menu, nextRoutes, menuOptions),
              routes = _asyncRoutes.routes,
              permissions = _asyncRoutes.permissions,
              menuList = _asyncRoutes.menuList;

          router.addRoutes(routes); // 推入异步路由

          store.dispatch(_option.dispatchSetMenu, _menu); // 将菜单数据存入store

          store.dispatch(_option.dispatchSetMenuList, menuList); // 将菜单一维化数据存入store

          store.dispatch(_option.dispatchSetPermissions, permissions); // 将权限码数据存入store

          next(_objectSpread(_objectSpread({}, to), {}, {
            replace: true
          }));
        })["catch"]();

        return;
      } // 已登录状态 去往登录页时自动重定向至配置页 其他跳转正常进行


      to.path === _option.pathLogin ? next(_option.pathLogged) : next();
      return;
    } // 无登录状态时 可进入白名单页面  去其他页面则重定向至登陆


    to.path === _option.pathLogin || to.meta.withoutAuth ? next() : next({
      path: _option.pathLogin
    });
  });
};

var _default = registerRouteGuard;
exports["default"] = _default;