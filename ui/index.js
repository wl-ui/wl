
import FtContainer from "./ft-container/";
import FtContextmenu from "./ft-contextmenu/";
import FtTable from "./ft-table/";
import FtScroll from "./ft-scroll/";
import FtAdd from "./ft-add/";
import FtFadein from "./ft-fadein/";
import FtTableReport from "./ft-table-report/";
import FtInput from "./ft-input/";

const components = [FtButton, FtContainer, FtContextmenu, FtTable, FtScroll, FtAdd, FtFadein, FtTableReport, FtInput];


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
  FtButton,
  FtContainer,
  FtContextmenu,
  FtTable,
  FtScroll,
  FtAdd,
  FtFadein,
  FtTableReport,
  FtInput
};