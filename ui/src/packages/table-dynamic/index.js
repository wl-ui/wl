import TableDynamic from "./index.vue";

TableDynamic.install = function (Vue) {
  Vue.component(TableDynamic.name, TableDynamic);
};

export default TableDynamic;