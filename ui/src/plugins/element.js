import Vue from 'vue'
import { Button, Row, Col, Loading, Input, Scrollbar } from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Scrollbar)
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$ELEMENT = { size: 'small' };
