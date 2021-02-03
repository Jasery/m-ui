import ECharts from "./ECharts.vue";
import ELineCharts from "./ELineCharts.vue";
import EPieCharts from "./EPieCharts.vue";

export default {
  install(Vue) {
    Vue.component(ECharts.name, ECharts);
    Vue.component(ELineCharts.name, ELineCharts);
    Vue.component(EPieCharts.name, EPieCharts);
  }
};
