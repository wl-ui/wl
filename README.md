# wl
项目架构方案之路

## List
1. wl-core 框架无关核心层级工具类

2. wl-http 基于axios封装的请求类

3. wl-baseui 基础ui组件

4. wl-vue vue通用基础封装 

> 下列说明中 export 内的方法名，均可 import { xx } from 'wl-core' 导入使用

## wl-core

无框架依赖的核心层及工具层封装

### array
提供有关数组的操作方法 Function
```js
export {
  valInDeep, // 从树形数据中递归筛选目标值
  flattenDeep, // 将树形数据向下递归为一维数组
  flattenDeepParents, // 将树形数据向上将此支线递归为一维数组
  regDeepParents, // 根据条件递归祖先元素
  arrayToTree, // 将数组转化成树结构
  patchTreeChain, // 如果数据里缺少树枝节点，则根据parents和自增长id补全整条树链，输出数据调用上部arrToTree函数组装成完整的树
  locationAfterDelete, // 数组删除后重新定位
  splicParentsUntil, // 从坐标值拼接指定字段到祖先元素
  intersectionBy, // 根据数组2内的元素，通过match字段匹配数组1内的完整内容组成的数据
  deepClone, // 深拷贝
  getMax, // 筛选出数组中最大值
  getMin, // 筛选出数组中最小值
  autoPositionAfterDelete, // 重写的一维数组删除数据后自动定位
};
```

### event
提供对浏览器事件的封装 Function
```js
export {
  throttle, // 节流函数
  debounce // 防抖函数
}
```

### Storage
提供对Storage操作的类，包括local和session两种 Class
```js
export {
  Storage
}
```
均为静态方法，可直接调用。它包括有：
```js
Storage.set('key','value','type[local|session]') // 将键值存入本地存储
Storage.get('key','type[local|session]') // 根据key取本地存储数据
Storage.remove('key','type[local|session]') // 根据key删除本地存储数据
Storage.had('key','type[local|session]') // 根据key查询本地存储中是否存在key的实例
Storage.clear('type[local|session]') // 清空本地存储
Storage.count('type[local|session]') // 获取存储库里存储实例个数
```

### Time
提供对时间操作的类 Class
```js
export {
  Time
}
```
主要用于对时间进行两次及以上操作的情况！对于时间格式化，在wl-vue中提供了time过滤器
1. 使用需要先实例化，全部方法如下：
```js
const timer = new Time('2020-02-14', 'YYYY/MM/DD');

timer.dayjs(date) // 将时间格式转化为dayjs格式（实例化时已经自动调用了此方法）
timer.format(format) // 格式化时间
timer.add(num, unit) // 时间加上数量，要加的时间数量，数量的时间单位
timer.subtract(num, unit) // 时间减去数量，要加的时间数量，数量的时间单位
timer.isBefore(date, unit) // 时间是否在date之前，要比较的时间，时间的单位
timer.diff(date, unit) // 计算时差，要减的日期，时间计算时间的单位
```
2. 静态方法可直接调用
```js
Time.quickFormat(new Date(), 'YYYY/MM/DD')
Time.init(new Date())
```

### Type
提供判断数据类型的类 Class
```js
export {
  DataType
}
```
均为静态方法，可直接调用。它包括有：
```js
DataType.isObject(data) // 是否对象
DataType.isEmptyObject(data) // 是否空对象
DataType.isArray(data) // 是否数组
DataType.isEmptyArray(data) // 是否空数组
```

### validate
数据验证
```js
export {
  vaPhone, // el手机格式校验
  regPhone, // 正则手机格式校验
  isNum, // 验证数字
  isInteger, // 验证整数
  validate, // 整体表单验证
}

```
### WlNumber
提供精确数字计算的类 Class
```js
export {
  WlNumber
}
```

```js
const beginNum = new WlNumber(1);
// 以下返回big数据，可以使用toString()或to.Fixed()转化
beginNum.plus(2) // 加
beginNum.minus(2) // 减
beginNum.times(2) // 乘
beginNum.div(2) // 除以
beginNum.mod(2) // 取余
beginNum.abs() // 取绝对值
// 以下返回Boolean值
beginNum.gt(2) // 大于
beginNum.gte(2) // 大于等于
beginNum.lt(2) // 小于
beginNum.lte(2) // 小于等于
```
静态方法
```js
WlNumber.toNumber(val) // 返回转化后的bumber型值，不可转化的返回0
```

## wl-http

通信层封装

### 1. 实例化http：__http__.js

```js
import Http from "wl-http"

const options = {
  axios: null, // 是否使用外部axios实例，无特殊情况禁止使用
  options: {
    retry: 2, //Number 请求失败自动重连次数 默认2
    retryDelay: 1000, // 请求失败自动重连时间间隔 默认1000ms
    withCredentials: true, // Boolean 开启请求跨域 默认true
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }, // Object 请求头配置 默认"Content-Type": "application/json;charset=UTF-8"
    timeout: 5000, // Number 请求超时时间 默认5000
    baseURL: '' // String 请求地址前缀 默认''
    expand: {} // 其他需要扩展的配置项 other axios 支持的config字段
  }, // 以上字段均有默认值，正常情况下 此options 无需提供
  requestInterceptorSuccessCb:()=>{}, // 非必填 请求拦截器成功回调，必须返回一个config对象
  responseInterceptorSuccessCb:()=>{}, // 非必填 响应拦截器成功回调，必须返回一个response对象
  responseInterceptorErrorCb:()=>{}, // 非必填 响应拦截器失败回调，必须返回一个response对象
}, // 实例化http可选配置项 均为非必填项

const http = new Http(options);

export default http;
```

### 2. 在具体的api文件中使用：user.js
```js
import http from "__http__.js"

const getMenuApi = (params) => http.get({
  url:'',
  params
})

const addUserApi = (data) => http.post({
  url:'',
  data
})

export {
  getMenuApi,
  addUserApi
}
```

### 3. 在vue文件中最终调用
```js
import {addUserApi} from "@/api/user.js"

methods: {
  addUser(){
    const _data = {
      name: 'weilan',
      des: '前端架构师'
    }
    addUserApi(_data).then( ({data})=>{
      ...
    })
  }
}
```

### 4. Http类提供 get，post，all，del，put，patch 共6中方法

## wl-baseui

基础ui库，不包含复杂组件，完整组件库见wlui

```js
import WlBaseUi from "wl-base-ui"

Vue.use(WlBaseUi)

// 下为详细列表
{
  WlAdd, // 防抖按钮
  WlContainer, // 页面视图盒子
  WlContextMenu, // 右键扩展组件
  WlFadeIn, // 右侧滑入组件
  WlInput, // 带校验的输入框组件
  WlScroll, // 滚动条美化组件
  WlTable, // 表格组件
  WlTableDynamic, // 动态表格组件
}
```

## wl-vue

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
