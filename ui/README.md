# wl-baseui

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
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
