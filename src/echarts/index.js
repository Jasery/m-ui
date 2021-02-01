import ECharts from "./ECharts.vue";

export default {
  install(Vue) {
    Vue.component(ECharts.name, ECharts);
  }
};
