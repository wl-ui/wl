
import Container from "./container";
import ContextMenu from "./context-menu";
import Table from "./table";
import Scroll from "./scroll";
import Add from "./add";
import FadeIn from "./fade-in";
import TableDynamic from "./table-dynamic";
import Input from "./input";

const components = [Container, ContextMenu, Table, Scroll, Add, FadeIn, TableDynamic, Input];


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
  Container,
  ContextMenu,
  Table,
  Scroll,
  Add,
  FadeIn,
  TableDynamic,
  Input
};