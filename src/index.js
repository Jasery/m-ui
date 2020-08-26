import MSelect from "./m-select/MSelect.vue";
import MDatePicker from "./m-date-picker/MDatePicker.vue";
import Auth, { routerAuth, AuthObserver } from "./auth";
import MCheckboxGroup from "./m-checkbox-group/MCheckboxGroup.vue";
import BaseEnum from "./base-enum";
import MUtils from "./utils";
import MPagination from "./m-pagination/MPagination.vue";
import fixBottom from "./fix-bottom/fix-bottom";
import chainWebpack from "./config/chain-webpack";

export {
  MSelect,
  MDatePicker,
  Auth,
  AuthObserver,
  routerAuth,
  MCheckboxGroup,
  BaseEnum,
  MUtils,
  MPagination,
  chainWebpack
};

export default {
  install(Vue, options) {
    Vue.component(MSelect.name, MSelect);
    Vue.component(MDatePicker.name, MDatePicker);
    Vue.component(MCheckboxGroup.name, MCheckboxGroup);
    Vue.use(Auth, options?.auth);
    Vue.component(MPagination.name, MPagination);

    Vue.directive("fix-bottom", fixBottom);
  }
};
