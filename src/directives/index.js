import fixBottom from "./fix-bottom";
import margin from "./margin";
import padding from "./padding";
import color from "./color";
import bgColor from "./bgColor";

export default {
  install(Vue) {
    Vue.directive("fix-bottom", fixBottom);
    Vue.directive("margin", margin);
    Vue.directive("padding", padding);
    Vue.directive("color", color);
    Vue.directive("bgColor", bgColor);
  }
};
