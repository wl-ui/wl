
import WlContainer from "./wl-container";
import WlContextmenu from "./wl-contextmenu";
import WlTable from "./wl-table";
import WlScroll from "./wl-scroll";
import WlAdd from "./wl-add";
import WlFadein from "./wl-fadein";
import WlTableReport from "./wl-table-report";
import WlInput from "./wl-input";

const components = [WlContainer, WlContextmenu, WlTable, WlScroll, WlAdd, WlFadein, WlTableReport, WlInput];


const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  WlContainer,
  WlContextmenu,
  WlTable,
  WlScroll,
  WlAdd,
  WlFadein,
  WlTableReport,
  WlInput
};