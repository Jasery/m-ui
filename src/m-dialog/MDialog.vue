<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :width="dialogWidth"
    :close-on-click-modal="easyClose"
    :close-on-press-escape="easyClose"
    :title="title"
    class="m-dialog"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot v-if="$slots.footer" name="footer"></slot>
      <span v-else-if="showFooter">
        <el-button size="small" @click="onCancel">{{ cancelText }}</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="confirmLoading"
          @click="onConfirm"
        >
          {{ confirmText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { isNumber } from "../utils";
export default {
  name: "MDialog",
  props: {
    showFooter: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "middle",
      validate(value) {
        return ["large", "middle", "small"].includes(value);
      }
    },
    easyClose: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number]
    },
    title: String
  },
  data() {
    return {};
  },
  computed: {
    dialogWidth() {
      if (this.width) {
        return isNumber(this.width) ? this.width + "px" : this.width;
      }
      let sizes = {
        // TODO:
        large: "1080px",
        middle: "750px",
        small: "520px"
      };
      return sizes[this.size];
    }
  },
  methods: {
    onCancel() {
      this.$emit("cancel");
      this.$emit("update:visible", false);
    },
    onConfirm() {
      this.$emit("confirm");
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}
::v-deep .el-dialog__footer {
  border-top: 1px solid #eee;
}
::v-deep .el-dialog__body {
  padding: 20px;
}
</style>
