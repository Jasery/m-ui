import fixBottom from "./fix-bottom";
import margin from "./margin";
import padding from "./padding";
import color from "./color";
import bgColor from "./bgColor";
import height from "./height";
import width from "./width";

export default {
  install(Vue) {
    Vue.directive("fix-bottom", fixBottom);
    Vue.directive("margin", margin);
    Vue.directive("padding", padding);
    Vue.directive("color", color);
    Vue.directive("bgColor", bgColor);
    Vue.directive("height", height);
    Vue.directive("width", width);
  }
};
