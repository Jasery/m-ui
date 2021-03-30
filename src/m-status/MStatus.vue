<template functional>
  <span :class="['m-status', props.type]">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "MStatus",
  props: {
    type: {
      type: String,
      default: "primary",
      validator(val) {
        return ["success", "info", "warning", "danger", "primary"].includes(
          val
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";

.m-status {
  display: inline-flex;
  align-items: center;
  line-height: 1;
  cursor: default;
  & + .m-status {
    margin-left: 10px;
  }
  &::before {
    content: "";
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    margin-right: 5px;
  }
  &.primary::before {
    background-color: $colorBrand;
  }
  &.success::before {
    background-color: $colorSuccess;
  }
  &.info::before {
    background-color: $colorInfo;
  }
  &.warning::before {
    background-color: $colorWarning;
  }
  &.danger::before {
    background-color: $colorDanger;
  }
}
</style>
