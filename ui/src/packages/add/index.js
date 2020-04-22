import Add from "./index.vue";

Add.install = function (Vue) {
  Vue.component(Add.name, Add);
};

export default Add;