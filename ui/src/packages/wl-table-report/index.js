import WlTableReport from "./index.vue";

WlTableReport.install = function (Vue) {
  Vue.component(WlTableReport.name, WlTableReport);
};

export default WlTableReport;