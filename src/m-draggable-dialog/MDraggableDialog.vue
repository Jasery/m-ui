<template>
  <m-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :class="[
      'm-draggable-dialog',
      { min: isMin, max: isMax, 'no-user-select': moving }
    ]"
    :show-close="false"
    :easy-close="easyClose"
    append-to-body
    :lock-scroll="false"
    @open="onOpen"
    @closed="onClosed"
    ref="dialog"
  >
    <template #title>
      <div class="dp-f justify-between">
        <span>{{ dialogTitle }}</span>
        <span class="btns">
          <i
            v-show="!isMin && !isMax && minable"
            class="icon el-icon-minus"
            @click.stop="onMin"
          ></i>
          <i
            v-show="!isMin && !isMax && maxable"
            class="icon el-icon-full-screen"
            @click.stop="onMax"
          ></i>
          <i
            v-show="isMin || isMax"
            class="icon el-icon-copy-document"
            @click.stop="onReset"
          ></i>
          <i
            v-if="showClose"
            class="icon el-icon-close"
            @click.stop="() => $emit('update:visible', false)"
          ></i>
        </span>
      </div>
    </template>
    <div class="dialog-content">
      <slot></slot>
    </div>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </m-dialog>
</template>

<script>
import MDialog from "../m-dialog/MDialog.vue";
import { isNumber, isString } from "../utils";
import _ from "lodash";
import PopupManager from "element-ui/lib/utils/popup/popup-manager";

export default {
  name: "MDraggableDialog",
  components: {
    MDialog
  },
  props: {
    title: String,

    minPos: {
      type: Object,
      default() {
        return {
          top: 100,
          left: 100
        };
      },
      validator(val = {}) {
        return isNumber(val.top) && isNumber(val.left);
      }
    },

    top: {
      type: [String, Number],
      default: "15vh"
    },

    maxable: {
      type: Boolean,
      default: true
    },

    minable: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    resizeable: {
      type: Boolean,
      default: true
    },
    minimumSize: {
      type: Object,
      default() {
        return { width: 200, height: 200 };
      },
      validator(val) {
        return isNumber(val.width) && isNumber(val.height);
      }
    },
    easyClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogOriginPos: {},
      mouseDownPos: {},
      dialogMouseDownPos: {},
      dialogStyle: {},
      contentHeight: 0,
      contentOriginHeight: 0,
      isMin: false,
      isMax: false,
      moving: false
    };
  },

  computed: {
    dialogTitle() {
      if (this.title && this.isMin && this.title.length > 10) {
        return this.title.substring(0, 15) + "...";
      }
      return this.title;
    }
  },

  watch: {
    dialogStyle: {
      deep: true,
      handler(val) {
        if (!this.dialog) {
          return;
        }
        this.dialog.style.top = this.getStyleVal(val.top);
        this.dialog.style.left = this.getStyleVal(val.left);
        this.dialog.style.width = this.getStyleVal(val.width);
      }
    },
    contentHeight() {
      if (this.content) {
        this.content.style.height = this.contentHeight + "px";
      }
    }
  },

  mounted() {
    if (this.$attrs.visible) {
      this.onOpen();
    }
  },

  methods: {
    initDom() {
      if (this.hasInitDom) {
        return;
      }
      this.header = this.$el.querySelector(".el-dialog__header");
      this.content = this.$el.querySelector(".el-dialog__body");
      this.dialog = this.$el.querySelector(".el-dialog");
      const dialogRect = this.dialog.getBoundingClientRect();
      this.dialogStyle = {
        top: this.top,
        left: (window.innerWidth - dialogRect.width) / 2,
        width: dialogRect.width
      };
      this.dialogOriginPos = dialogRect;
      const contentRect = this.content.getBoundingClientRect();
      this.contentHeight = contentRect.height;

      if (this.resizeable) {
        let resizeThumb = document.createElement("div");
        resizeThumb.classList.add("resize-thumb");
        this.dialog.appendChild(resizeThumb);
        this.initResizeEvent(resizeThumb);
      }

      this.hasInitDom = true;
    },
    initEvent() {
      if (this.hasInitEvent) {
        return;
      }
      this.header.addEventListener("mousedown", this.onHeaderMouseDown);
      this.$once("hook:beforeDestroy", () => {
        this.header.removeEventListener("mousedown", this.onHeaderMouseDown);
      });
      this.hasInitEvent = true;
    },

    onHeaderMouseDown(e) {
      this.moving = true;
      document.body.style.cursor = "move";
      this.dialogMouseDownPos = this.dialog.getBoundingClientRect();
      if (!this.isMin && !this.isMax) {
        this.dialogOriginPos = this.dialogMouseDownPos;
      }
      this.mouseDownPos = {
        x: e.pageX,
        y: e.pageY
      };
      document.addEventListener("mousemove", this.documentMousemoveHandle);
      let onMouseup = () => {
        this.moving = false;
        document.body.style.cursor = "";
        document.removeEventListener("mousemove", this.documentMousemoveHandle);
        document.removeEventListener("mouseup", onMouseup);
      };
      document.addEventListener("mouseup", onMouseup);
    },

    documentMousemoveHandle(e) {
      if (this.isMax) {
        return;
      }
      let targetLeft =
        e.pageX - this.mouseDownPos.x + this.dialogMouseDownPos.left;
      let targetTop =
        e.pageY - this.mouseDownPos.y + this.dialogMouseDownPos.top;

      let maxLeft = window.innerWidth - this.dialogOriginPos.width;
      let maxTop = window.innerHeight - this.dialogOriginPos.height;
      this.dialogStyle.left = _.clamp(targetLeft, 0, maxLeft);
      this.dialogStyle.top = _.clamp(targetTop, 0, maxTop);
    },

    getStyleVal(val) {
      return isString(val) ? val : val + "px";
    },

    onOpen() {
      this.$nextTick(() => {
        this.initDom();
        this.initEvent();
      });
    },
    onMin() {
      this.dialogOriginPos = this.dialog.getBoundingClientRect();
      this.dialogStyle.top = this.minPos.top;
      this.dialogStyle.left = this.minPos.left;
      this.isMin = true;
      this.closeModal();
      this.$emit("min");
      this.$emit("resize");
    },
    onMax() {
      this.dialogOriginPos = this.dialog.getBoundingClientRect();
      this.isMax = true;
      document.addEventListener("keyup", this.escKeyupHandle);
      this.$emit("max");
      this.$emit("resize");
    },

    escKeyupHandle(e) {
      if (e.key === "Escape") {
        this.onReset();
      }
    },

    onReset() {
      if (this.isMax && this.isMin) {
        this.$emit("resize");
      }
      if (this.isMax) {
        document.removeEventListener("keyup", this.escKeyupHandle);
      } else if (this.isMin && this.$attrs.visible) {
        this.showModal();
      }
      this.isMax = false;
      this.isMin = false;
      this.dialogStyle = {
        left: this.dialogOriginPos.left,
        top: this.dialogOriginPos.top,
        width: this.dialogOriginPos.width
      };
    },

    onClosed() {
      if (this.isMax || this.isMin) {
        this.onReset();
      }
    },

    initResizeEvent(target) {
      let mousedownHandle = e => {
        document.body.style.cursor = "nw-resize";
        this.moving = true;
        this.resizeMouseDownPos = {
          x: e.pageX,
          y: e.pageY
        };
        this.dialogOriginWidth = this.dialog.getBoundingClientRect().width;
        this.contentOriginHeight = this.content.getBoundingClientRect().height;

        document.addEventListener("mousemove", this.resizeMouseMoveHandle);

        let mouseupHandle = () => {
          document.body.style.cursor = "";
          this.moving = false;
          document.removeEventListener("mouseup", mouseupHandle);
          document.removeEventListener("mousemove", this.resizeMouseMoveHandle);
        };
        document.addEventListener("mouseup", mouseupHandle);
      };
      target.addEventListener("mousedown", mousedownHandle);
      this.$once("hook:beforeDestroy", () => {
        target.removeEventListener("mousedown", mousedownHandle);
      });
    },

    resizeMouseMoveHandle(e) {
      let pageX = Math.min(e.pageX, window.innerWidth);
      let pageY = Math.min(e.pageY, window.innerHeight);
      let targetWidth =
        pageX - this.resizeMouseDownPos.x + this.dialogOriginWidth;
      let targetHeight =
        pageY - this.resizeMouseDownPos.y + this.contentOriginHeight;
      this.contentHeight = Math.max(targetHeight, this.minimumSize.height);
      this.dialogStyle.width = Math.max(targetWidth, this.minimumSize.width);
      this.$emit("resize");
    },
    getElDialogIns() {
      return this.$refs.dialog.$children[0];
    },
    closeModal() {
      PopupManager.closeModal(this.getElDialogIns()["_popupId"]);
    },
    showModal() {
      PopupManager.openModal(
        this.getElDialogIns()["_popupId"],
        PopupManager.zIndex
      );
      this.$el.style.zIndex = PopupManager.zIndex + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.m-draggable-dialog {
  overflow: hidden;
  &.no-user-select {
    user-select: none;
  }
  ::v-deep .el-dialog {
    position: absolute;
    top: 15vh;
    left: 50vw;
    margin: 0 !important;
    .resize-thumb {
      position: absolute;
      width: 20px;
      height: 20px;
      bottom: -10px;
      right: -10px;
      cursor: nw-resize;
      z-index: 2008;
    }
    .el-dialog__header {
      cursor: move;
    }
    .el-dialog__body {
      box-sizing: border-box;
    }
  }
  &.max {
    ::v-deep .el-dialog {
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      .resize-thumb {
        display: none;
      }
      .el-dialog__body {
        flex: auto;
      }
    }
  }
  &.min {
    ::v-deep .el-dialog {
      width: 300px !important;
      .el-dialog__body {
        display: none;
      }
      .el-dialog__footer {
        display: none;
      }
    }
  }
  .btns > .icon {
    cursor: pointer;
    font-size: 22px;
    margin-left: 10px;
    &:hover {
      color: #409eff;
    }
  }
  .dialog-content {
    overflow: auto;
    width: 100%;
    height: 100%;
  }
}
</style>
