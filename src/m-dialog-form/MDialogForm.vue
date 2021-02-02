<template>
  <m-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :confirm-loading="loading"
    :easey-close="false"
    @open="onOpen"
    @confirm="onConfirm"
  >
    <m-form :fields="fields" :model="model" v-bind="formProps" ref="form">
      <slot></slot>
      <slot
        v-for="slot in slots"
        :name="slot"
        :slot="slot"
        :model="model"
      ></slot>
      <slot name="append" slot="append"></slot>
    </m-form>
  </m-dialog>
</template>

<script>
import _ from "lodash";
import MDialog from "../m-dialog/MDialog.vue";
import MForm from "../m-form/MForm.vue";

export default {
  name: "MDialogForm",
  components: { MDialog, MForm },
  inheritAttrs: false,
  props: {
    fields: Array,
    defaultModel: Object,
    modelValue: Object,
    createFn: {
      type: Function,
      default: () => () => {}
    },
    updateFn: {
      type: Function,
      default: () => () => {}
    },
    formProps: Object
  },
  data() {
    return {
      model: {},
      loading: false
    };
  },
  computed: {
    slots() {
      return this.fields
        .map(f => _.compact([f.slotName, f.labelSlotName]))
        .flat();
    }
  },
  methods: {
    onConfirm() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          let fn = this.modelValue ? this.updateFn : this.createFn;
          this.loading = true;
          let fnRes = fn(this.model);
          if (fnRes?.then) {
            fnRes
              .then(res => {
                this.$emit("saved", res);
                this.$emit("update:visible", false);
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            this.loading = false;
            this.$emit("saved", fnRes);
            this.$emit("update:visible", false);
          }
        }
      });
    },
    onOpen() {
      if (this.modelValue) {
        this.model = _.cloneDeep(this.modelValue);
      } else {
        this.model = _.cloneDeep(this.defaultModel);
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },

    getElForm() {
      return this.$refs.form;
    }
  }
};
</script>

<style lang="scss" scoped></style>
