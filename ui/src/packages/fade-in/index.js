import FadeIn from "./index.vue";

FadeIn.install = function (Vue) {
  Vue.component(FadeIn.name, FadeIn);
};

export default FadeIn;