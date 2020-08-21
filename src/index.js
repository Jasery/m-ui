import MSelect from "./m-select/MSelect.vue";
import MDatePicker from "./m-date-picker/MDatePicker.vue";
import Auth, { routerAuth, AuthObserver } from "./auth";
import MCheckboxGroup from "./m-checkbox-group/MCheckboxGroup.vue";
import BaseEnum from "./base-enum";
import MUtils from "./utils";

export {
  MSelect,
  MDatePicker,
  Auth,
  AuthObserver,
  routerAuth,
  MCheckboxGroup,
  BaseEnum,
  MUtils
};

export default {
  install(Vue, options) {
    Vue.component(MSelect.name, MSelect);
    Vue.component(MDatePicker.name, MDatePicker);
    Vue.component(MCheckboxGroup.name, MCheckboxGroup);
    Vue.use(Auth, options?.auth);
  }
};
