import MSelect from "./m-select/MSelect.vue";
import MDatePicker from "./m-date-picker/MDatePicker.vue";

export { MSelect, MDatePicker };

export default {
  install(Vue) {
    Vue.component(MSelect.name, MSelect);
    Vue.component(MDatePicker.name, MDatePicker);
  }
};
