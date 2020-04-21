import WlTable from "./index.vue";

WlTable.install = function (Vue) {
  Vue.component(WlTable.name, WlTable);
};

export default WlTable;