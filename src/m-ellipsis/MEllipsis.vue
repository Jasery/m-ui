<template>
  <span
    class="m-ellipsis"
    :class="isMultiLine ? 'multi-ellipsis' : 'ellipsis'"
    :style="{ '-webkit-line-clamp': lines }"
  >
    <el-tooltip v-if="tooltip" effect="dark" placement="top">
      <template #content>
        <div class="tooltip" :style="{ maxWidth: getElWidth() }">
          <slot></slot>
        </div>
      </template>
      <span><slot></slot></span>
    </el-tooltip>
    <slot v-else></slot>
  </span>
</template>

<script>
export default {
  name: "MEllipsis",
  props: {
    tooltip: Boolean,
    lines: {
      type: Number,
      default: 1
    }
  },
  computed: {
    isMultiLine() {
      return this.lines > 1;
    }
  },
  methods: {
    getElWidth() {
      if (this.$el) {
        return this.$el.getBoundingClientRect().width + "px";
      }
      return "0";
    }
  }
};
</script>

<style lang="scss" scoped>
.multi-ellipsis {
  -webkit-box-orient: vertical;
  position: relative;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
