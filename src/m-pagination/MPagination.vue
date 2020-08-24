<template>
  <el-pagination
    class="m-pagination"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      'size-change': onSizeChange,
      'current-change': onCurrentChange
    }"
    :background="background"
    :layout="layout"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :current-page="currentPage"
  >
    <slot></slot>
  </el-pagination>
</template>

<script>
export default {
  name: "MPagination",
  props: {
    layout: {
      type: String,
      default: "total, prev, pager, next, sizes, jumper"
    },
    pageSizes: {
      type: Array,
      default() {
        return ["30", "50", "100"];
      }
    },
    pageSize: {
      type: Number,
      default: 30
    },
    currentPage: {
      type: Number,
      required: true
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSizeChange(size) {
      this.$emit("size-change", size);
      this.$emit("page-change", this.currentPage, size);
    },

    onCurrentChange(current) {
      this.$emit("current-change", current);
      this.$emit("page-change", current, this.pageSize);
    }
  }
};
</script>

<style lang="scss" scoped>
.m-pagination {
  text-align: right;
}
</style>
