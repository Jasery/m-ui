import MSelect from "./m-select/MSelect.vue";

export { MSelect };

export default {
  install(Vue) {
    Vue.component(MSelect.name, MSelect);
  }
};
