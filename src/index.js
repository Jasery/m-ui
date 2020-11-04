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
import MEditableText from "./m-editable-text/MEditableText.vue";
import MQueryForm from "./m-query-form/MQueryForm.vue";
import MRichEditor from "./m-rich-editor/MRichEditor.vue";
import MLayout from "./m-layout/MLayout.vue";
import MProTable from "./m-pro-table/MProTable.vue";
import request from "./request";
import MEllipsis from "./m-ellipsis/MEllipsis.vue";

import "./style/util.scss";

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
  MTable,
  MEditableText,
  MQueryForm,
  MRichEditor,
  MLayout,
  MProTable,
  request,
  MEllipsis
};

export default {
  install(Vue, options) {
    Vue.component(MSelect.name, MSelect);
    Vue.component(MDatePicker.name, MDatePicker);
    Vue.component(MCheckboxGroup.name, MCheckboxGroup);
    Vue.use(Auth, options?.auth);
    Vue.component(MPagination.name, MPagination);
    Vue.component(MTable.name, MTable);
    Vue.component(MEditableText.name, MEditableText);
    Vue.component(MQueryForm.name, MQueryForm);
    Vue.component(MRichEditor.name, MRichEditor);
    Vue.component(MLayout.name, MLayout);
    Vue.component(MProTable.name, MProTable);
    Vue.component(MEllipsis.name, MEllipsis);

    Vue.use(MDirectives);
    Vue.use(Clipboard);
  }
};
