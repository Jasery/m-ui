import MSelect from "./m-select/MSelect.vue";
import MDatePicker from "./m-date-picker/MDatePicker.vue";
import Auth, { routerAuth, AuthObserver } from "./auth";
import MCheckboxGroup from "./m-checkbox-group/MCheckboxGroup.vue";
import BaseEnum from "./base-enum";
import * as MUtils from "./utils";
import MPagination from "./m-pagination/MPagination.vue";
import MDirectives from "./directives";
import MTable from "./m-table/MTable.vue";
import Clipboard from "./clipboard";

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
  MDirectives,
  MTable
};

export default {
  install(Vue, options) {
    Vue.component(MSelect.name, MSelect);
    Vue.component(MDatePicker.name, MDatePicker);
    Vue.component(MCheckboxGroup.name, MCheckboxGroup);
    Vue.use(Auth, options?.auth);
    Vue.component(MPagination.name, MPagination);
    Vue.component(MTable.name, MTable);

    Vue.use(MDirectives);
    Vue.use(Clipboard);
  }
};
