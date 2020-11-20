<template>
  <el-form
    ref="form"
    v-bind="$attrs"
    v-on="$listeners"
    :size="size"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :model="model"
  >
    <slot></slot>
    <el-form-item
      v-for="field in fields"
      :key="field.prop"
      v-bind="getFormItemProps(field)"
    >
      <template v-if="field.labelSlotName" v-slot:label>
        <slot :name="field.labelSlotName"></slot>
      </template>
      <template>
        <slot v-if="field.slotName" :name="field.slotName"></slot>
        <component
          v-else-if="field.component"
          :is="field.component"
          v-bind="field.componentProps"
          v-on="field.componentEvents"
          v-model="model[field.prop]"
        ></component>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import { removeKeys } from "../utils";

export default {
  name: "MForm",
  props: {
    size: {
      type: String,
      default: "small"
    },
    labelPosition: {
      type: String,
      default: "right"
    },
    labelWidth: {
      type: [String, Number],
      default: "100px"
    },
    model: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
    /**
     * [{
     *  label: '',
     *  prop: '',
     *  rules: [],
     *  ...otherFormItemProps,
     *  slotName: '',
     *  labelSlotName: '',
     *  component: '',
     *  componentProps: {},
     *  componentEvents: {}
     * }]
     */
    fields: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      getFormItemProps(field) {
        return removeKeys(field, [
          "slotName",
          "labelSlotName",
          "component",
          "componentProps"
        ]);
      }
    };
  },

  computed: {},

  mounted() {},
  methods: {
    validate() {
      return this.$refs.form?.validate();
    },
    validateField() {
      return this.$refs.form?.validateField();
    },
    resetFields() {
      return this.$refs.form?.resetFields();
    },
    clearValidate() {
      return this.$refs.form?.clearValidate();
    },
    getElForm() {
      return this.$refs.form;
    }
  }
};
</script>

<style lang="scss" scoped></style>
