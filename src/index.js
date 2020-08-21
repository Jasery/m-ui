import MSelect from "./m-select/MSelect.vue";
import MDatePicker from "./m-date-picker/MDatePicker.vue";
import Auth, { routerAuth, AuthObserver } from "./auth";

export { MSelect, MDatePicker, Auth, AuthObserver, routerAuth };

export default {
  install(Vue, options) {
    Vue.component(MSelect.name, MSelect);
    Vue.component(MDatePicker.name, MDatePicker);
    Vue.use(Auth, options?.auth);
  }
};
