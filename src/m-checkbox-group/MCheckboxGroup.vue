<template>
  <div class="m-checkbox-group">
    <el-radio-group
      v-if="single"
      v-bind="$attrs"
      v-on="$listeners"
      :size="size"
    >
      <slot></slot>
      <component
        v-for="item in options"
        :key="item[valueKey]"
        :is="buttonStyle ? 'el-radio-button' : 'el-radio'"
        :label="item[valueKey]"
        :disabled="item[disabledKey]"
      >
        {{ item[labelKey] }}
      </component>
    </el-radio-group>
    <el-checkbox-group v-else :size="size" v-bind="$attrs" v-on="$listeners">
      <slot></slot>
      <component
        v-for="item in options"
        :key="item[valueKey]"
        :is="buttonStyle ? 'el-checkbox-button' : 'el-checkbox'"
        :label="item[valueKey]"
        :disabled="item[disabledKey]"
      >
        {{ item[labelKey] }}
      </component>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "MCheckboxGroup",
  inheritAttrs: false,
  props: {
    single: Boolean,
    options: {
      type: Array
    },
    size: {
      type: String,
      default: "small"
    },
    buttonStyle: {
      type: Boolean,
      default: false
    },
    labelKey: {
      type: String,
      default: "label"
    },
    valueKey: {
      type: String,
      default: "value"
    },
    disabledKey: {
      type: String,
      default: "disabled"
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
::v-deep .el-checkbox-button {
  .el-checkbox-button__inner:after {
    content: "";
    position: absolute;
    right: 1px;
    top: -2px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid;
    border-left-color: #e0e0e0;
    transform: rotate(-45deg);
    border-radius: 2px;
  }
}
</style>
