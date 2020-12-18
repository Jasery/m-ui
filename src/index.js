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
import MLayout from "./m-layout/MLayout.vue";
import MProTable from "./m-pro-table/MProTable.vue";
import request from "./request";
import MEllipsis from "./m-ellipsis/MEllipsis.vue";
import MDialog from "./m-dialog/MDialog.vue";
import MException from "./m-exception/MException.vue";
import MForm from "./m-form/MForm.vue";
import { setConfig } from "./utils/config";
import MDialogForm from "./m-dialog-form/MDialogForm.vue";
import { exportExcel, exportCsv } from "./data-export";
import MArrayForm from "./m-array-form/MArrayForm.vue";
import MDraggableDialog from "./m-draggable-dialog/MDraggableDialog.vue";
import MViewTags from "./m-view-tags/MViewTags.vue";
import MConfirmButton from "./m-confirm-button/MConfirmButton.vue";

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
  MLayout,
  MProTable,
  request,
  MEllipsis,
  MDialog,
  MException,
  MForm,
  MDialogForm,
  exportExcel,
  exportCsv,
  MArrayForm,
  MDraggableDialog,
  MViewTags,
  MConfirmButton
};

export default {
  install(Vue, options) {
    setConfig(options);
    Vue.component(MSelect.name, MSelect);
    Vue.component(MDatePicker.name, MDatePicker);
    Vue.component(MCheckboxGroup.name, MCheckboxGroup);
    Vue.component(MPagination.name, MPagination);
    Vue.component(MTable.name, MTable);
    Vue.component(MEditableText.name, MEditableText);
    Vue.component(MQueryForm.name, MQueryForm);
    Vue.component(MLayout.name, MLayout);
    Vue.component(MProTable.name, MProTable);
    Vue.component(MEllipsis.name, MEllipsis);
    Vue.component(MDialog.name, MDialog);
    Vue.component(MException.name, MException);
    Vue.component(MForm.name, MForm);
    Vue.component(MDialogForm.name, MDialogForm);
    Vue.component(MArrayForm.name, MArrayForm);
    Vue.component(MDraggableDialog.name, MDraggableDialog);
    Vue.component(MViewTags.name, MViewTags);
    Vue.component(MConfirmButton.name, MConfirmButton);

    Vue.use(Auth);
    Vue.use(MDirectives);
    Vue.use(Clipboard);
  }
};
