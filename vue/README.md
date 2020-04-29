# wl-vue

vue基础层封装

### 1. 使用render函数创建vue实例：render.js

```js
import { render } from "wl-vue"
import App from "./App.vue";
import router from "./router";
import store from "./store";

const options = {
  root: App, // 必须 当前应用的根组件 一般是app.vue
  router: router, // 必须  router实例
  store: store, // 必须  store实例
  options: { // options 实例化vue配置项 下为详细注解
    fastclick: false, // 默认false 是否启用移动端快速点击插件
    cookie: false, // 默认false 是否启用vue-cookie操作插件
    lazyOptions: {}, // 默认null 启用图片VueLazyLoad懒加载插件时的配置项, 不传表示不启用
    filters: [], // 默认[] 过滤器数组 格式为 {name:"", rule: ()=>{}} 内置有date，dateTime时间格式化过滤器
    directives: [], // 默认[] 指令数组 格式为 {name:"", rule: ()=>{}} 内置有v-auth鉴权指令
    plugins: [], // 默认[] 插件数组 [wlui, el-input] 可以直接Vue.use()的插件数组
    fncBeforeVue: ()=>{}, // 实例化vue前可执行的回调函数 fncBeforeVue(vue){... 你的逻辑}
    auth: true, // 默认true 是否需要鉴权系统，如果不需要，后续参数无需再传
  }, 
  routeOptions:{ // 路由守卫配置项 用于前端鉴权及异步路由 下为详细注解
    tokenKey: 'token', // 存储在local中的token的key
    dispatchSetToken: 'app/setToken', // store设置token的actions命名空间 默认'app/setToken'
    dispatchSetMenu: 'menu/setMenu', // store设置菜单的actions命名空间 默认'menu/setMenu'
    dispatchSetMenuList: 'menu/setMenuList', // store设置一维菜单的actions命名空间
    dispatchSetPermissions: 'menu/setPermissions', // store设置按钮权限码的actions命名空间 默认'menu/setPermissions'
    pathLogin: '/login', // 登录页的 router path 默认'/login'
    pathLogged: '/index', // 已登录后 再进登录页时自动重定向的 router path 默认'/index'
    apiFn: ()=>{}, // **必须** 获取菜单数据的api函数，返回值为一个promise
    vaJwtExpiredFn: ()=>{}, // 自定义校验jwt是否过期的函数 默认为比较jwt携带过期时间与当前时间比较，单位秒，传入表示自定义过期规则
  },
  menuOptions:{ // 菜单数据解析为路由数据配置项 下为详细注解
    url: 'url', // 前端地址栏路由 将映射真实文件路径 映射规则：import(`@/views${url}/index.vue`)
    name: 'routerName', // 命名路由 
    meta: 'meta', // 路由元数据
    children: 'children', // 子菜单字段
    permissions: 'permissions', // 按钮权限字段
    path404: 'error/404' // 404路径,
    mapPathFn: (item) => {} // 路由映射文件路径方法 必填
  },
  nextRoutes:[] // 需要登录后插入的、非后台返回的路由列表 默认[] 
}
const mount = "#app"; // 非必选 vue挂载dom 默认为#app

// 实例化vue
const vueRender = () => render(options, mount);

export default vueRender;
```

### 2. 在main.js内实例化vue
下面是 最少 & 必须 的配置项：
```js
import { render } from "wl-vue"
import App from "./App.vue";
import store from "./store";
import router from "./router";
import nextRoutes from "./router/next-router"
import routeMap from "./router/map-router"
import { getMenuApi } from "./api/menu"

// 声明鉴权需要的参数
const routeOptions = {
  apiFn: getMenuApi
}

// 声明菜单解析为路由所需参数
const menuOptions = {
  mapPathFn: (item) => routeMap(item.url)
}

// 导出手动实例化vue函数
const vueRender = () => render({ root: App, router, store, routeOptions, nextRoutes, menuOptions });

export default vueRender;
```

### 3. 注意事项

1. 注意：菜单数据映射为路由数据默认你有一个layout路由且默认重定向至`/index`如下, 其他菜单路由均挂载在layout的children内
```js
  let userRouter = {
    path: "/layout",
    name: "layout",
    component: () => import('@/views/layout/index.vue'),
    redirect: '/index',
    children: []
  };
```
2. 注意：路由的映射规则如下：
```js
component: () => import(`@/views${url}/index.vue`)
```
3. 注意：因为在封装里路由映射文件会找不到，因此需要在每个项目里传入一个映射方法
src/router/map-router.js
```js
module.exports = path => () => import(`@/views${path}/index.vue`);
```

4. 注意：路由守卫检查store中是否已经存在用户菜单指定为：
```js
store.getters.menu
```

### 4. 其他方法
```js
import { VaJwt } from "wl-vue"

// VaJwt是一个验证和解析未加密jwt的类，提供了许多静态方法
// console.log(VaJwt) 打印查看
// 静态方法无需实例化可直接使用，例：
const payload = VaJwt.payloadAtob(jwt);
// 解析jwt中有效载荷内的数据
```