<template>
  <el-select
    :value="value"
    :size="size"
    :clearable="clearable"
    :filterable="filterable"
    ref="select"
    v-bind="$attrs"
    v-on="$listeners"
    class="m-select"
  >
    <slot></slot>
    <el-option
      v-for="item in options"
      :key="item[valueKey]"
      :value="item[valueKey]"
      :label="item[labelKey]"
      :disabled="item[disabledKey]"
    ></el-option>
    <slot name="after"></slot>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
  </el-select>
</template>

<script>
export default {
  name: "MSelect",
  props: {
    value: [Number, String, Array],
    options: Array,
    valueKey: {
      type: String,
      default: "value"
    },
    labelKey: {
      type: String,
      default: "label"
    },
    disabledKey: {
      type: String,
      default: "disabled"
    },
    size: {
      type: String,
      default: "small"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    focus() {
      return this.$refs.select?.focus();
    },

    blur() {
      return this.$refs.select?.blur();
    }
  }
};
</script>

<style lang="scss" scoped></style>
