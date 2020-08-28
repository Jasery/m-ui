import fixBottom from "./fix-bottom";
import margin from "./margin";
import padding from "./padding";

export default {
  install(Vue) {
    Vue.directive("fix-bottom", fixBottom);
    Vue.directive("margin", margin);
    Vue.directive("padding", padding);
  }
};
