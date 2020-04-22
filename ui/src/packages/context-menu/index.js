import ContextMenu from "./index.vue";

ContextMenu.install = function (Vue) {
  Vue.component(ContextMenu.name, ContextMenu);
};

export default ContextMenu;