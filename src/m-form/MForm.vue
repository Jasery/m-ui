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
      v-for="(field, index) in fields"
      :key="field.prop"
      v-bind="getFormItemProps(field)"
      :class="{ 'item-group': !!field.group }"
    >
      <template v-if="field.labelSlotName" v-slot:label>
        <slot :name="field.labelSlotName"></slot>
      </template>
      <template>
        <slot
          v-if="field.slotName"
          :name="field.slotName"
          :index="index"
          :prop="field.prop"
          :value="model[field.prop]"
        ></slot>
        <component
          v-else-if="field.component"
          :is="field.component"
          v-bind="field.componentProps"
          v-on="field.componentEvents"
          v-model="model[field.prop]"
          :ref="field.prop"
        ></component>
      </template>
      <el-form-item
        v-for="fieldItem in field.group"
        :key="fieldItem.prop"
        v-bind="getFormItemProps(fieldItem)"
      >
        <template v-if="fieldItem.labelSlotName" v-slot:label>
          <slot :name="fieldItem.labelSlotName"></slot>
        </template>
        <template>
          <slot
            v-if="fieldItem.slotName"
            :name="fieldItem.slotName"
            :index="index"
            :prop="field.prop"
            :value="model[field.prop]"
            :ref="fieldItem.prop"
          ></slot>
          <component
            v-else-if="fieldItem.component"
            :is="fieldItem.component"
            v-bind="fieldItem.componentProps"
            v-on="fieldItem.componentEvents"
            v-model="model[fieldItem.prop]"
            :ref="fieldItem.prop"
          ></component>
        </template>
      </el-form-item>
    </el-form-item>
    <slot name="append"></slot>
  </el-form>
</template>

<script>
import Vue from "vue";
import { removeKeys, isFunction } from "../utils";
import ValidMixins from "../utils/valid-mixins";

export default {
  name: "MForm",
  mixins: [ValidMixins],
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
     *  componentEvents: {},
     *  group: []
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
        let formItemProps = removeKeys(field, [
          "slotName",
          "labelSlotName",
          "component",
          "componentProps",
          "componentEvents",
          "group"
        ]);

        if (!field.rules) {
          const validator = (rule, value, callback) => {
            let comp = this.$refs[field.prop];
            if (!comp && field.slotName) {
              comp = this.$slots[field.slotName];
            }
            if (Array.isArray(comp)) {
              comp = comp[0];
            }
            if (comp?.context && comp.context instanceof Vue) {
              comp = comp.context;
            }
            if (comp && isFunction(comp.validator)) {
              comp.validator(rule, value, callback);
            } else {
              callback();
            }
          };
          formItemProps.rules = [{ validator }];
        }

        return formItemProps;
      }
    };
  },

  computed: {},

  watch: {
    model: {
      handler(value) {
        this.$emit("input", value);
      },
      deep: true
    }
  },

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

<style lang="scss" scoped>
.item-group {
  margin-bottom: 0;
  ::v-deep & > .el-form-item__content {
    margin-left: 0 !important;
    display: flex;
    & > .el-form-item {
      flex: auto;
    }
  }
}
</style>
