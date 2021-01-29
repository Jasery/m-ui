<template>
  <div class="field-item">
    <div class="content">
      <component
        :is="component"
        :index="index"
        v-bind="componentProps"
        v-on="componentEvents"
        :value="arrayValue[index]"
        @input="val => $emit('update', val, index)"
        ref="comp"
      ></component>
    </div>
    <div class="btn">
      <el-button
        v-if="index === 0 && !emptiable"
        type="primary"
        icon="el-icon-plus"
        circle
        @click="() => $emit('add')"
      ></el-button>
      <el-button
        v-else
        type="danger"
        icon="el-icon-minus"
        circle
        @click="() => $emit('remove', index)"
      ></el-button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "MArrayFormItem",
  props: {
    index: Number,
    field: Object,
    component: [String, Object],
    componentProps: Object,
    componentEvents: Object,
    arrayValue: Array,
    emptiable: Boolean
  },
  methods: {
    validator(rule, value, callback) {
      let comp = this.getFieldComponent();
      if (comp && _.isFunction(comp.validator)) {
        comp.validator(rule, value, callback);
      } else {
        callback();
      }
    },
    getFieldComponent() {
      let comp = this.$refs.comp;
      if (!comp) {
        comp = this.$slots.default;
      }
      if (Array.isArray(comp)) {
        comp = comp[0];
      }
      return comp;
    },

    onInput(val, index) {
      console.log("input", val, this.arrayValue);
      this.$set(this.arrayValue, index, val);
    }
  }
};
</script>

<style lang="scss" scoped>
.field-item {
  display: flex;
  align-items: center;
  .content {
    flex: auto;
    margin-right: 10px;
  }
}
</style>
