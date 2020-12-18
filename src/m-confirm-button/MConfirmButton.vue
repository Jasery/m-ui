<template>
  <div class="dp-ib">
    <el-popconfirm
      v-if="!forceConfirm"
      :title="msg"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
      :icon="'el-icon-' + tipsType"
      :icon-color="iconColor"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <el-button slot="reference" v-bind="$attrs">
        <slot></slot>
      </el-button>
    </el-popconfirm>
    <el-button v-else v-bind="$attrs" @click="onClick">
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "MConfirmButton",
  props: {
    msg: String,
    tipsType: {
      type: String,
      default: "warning",
      validator(val) {
        return ["success", "info", "warning", "error"].includes(val);
      }
    },
    confirmButtonText: {
      type: String,
      default: "确定"
    },
    cancelButtonText: {
      type: String,
      default: "取消"
    },

    forceConfirm: Boolean
  },
  data() {
    return {
      confirmVisible: false
    };
  },
  computed: {
    iconColor() {
      let colors = {
        success: "#67C23A",
        warning: "#E6A23C",
        danger: "#F56C6C",
        info: "#909399"
      };
      return colors[this.tipsType];
    }
  },
  methods: {
    onClick() {
      this.$confirm(this.msg, "提示", {
        confirmButtonText: this.confirmButtonText,
        cancelButtonText: this.cancelButtonText,
        type: this.tipsType
      })
        .then(this.onConfirm)
        .catch(this.onCancel);
    },

    onConfirm() {
      this.$emit("confirm");
    },

    onCancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="scss" scoped></style>
