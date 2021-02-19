<template>
  <div class="m-ellipsis">
    <span>
      <span :key="keyIndex" ref="content">{{ text }}</span>
      <span v-show="collapse">
        {{ ellipsisText
        }}<el-link v-show="showCollapse" @click="toggle">
          展开
          <i class="el-icon-caret-bottom"></i>
        </el-link>
      </span>
    </span>
    <el-link v-show="showCollapse && !collapse" @click="toggle">
      收起
      <i class="el-icon-caret-top"></i>
    </el-link>
  </div>
</template>
<script>
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/lib/utils/resize-event";
export default {
  name: "MEllipsis",
  props: {
    text: String,
    maxHeight: {
      type: Number,
      default: 50
    },
    ellipsisText: {
      type: String,
      default: "..."
    },
    collapseable: {
      type: Boolean,
      default: true
    },
    defaultCollaspe: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      keyIndex: 0,
      oversize: false,
      collapse: this.defaultCollaspe
    };
  },
  computed: {
    showCollapse() {
      return this.collapseable && this.oversize;
    }
  },
  watch: {
    text: "init",
    maxHeight: "init"
  },
  mounted() {
    this.init();
    addResizeListener(this.$el, this.resizeHandle);
  },
  beforeDestroy() {
    removeResizeListener(this.$el, this.resizeHandle);
  },
  methods: {
    init() {
      this.oversize = !this.isFits();
      if (this.oversize && this.collapse) {
        this.truncate();
      }
    },
    truncate() {
      this.$nextTick(() => {
        const $content = this.$refs.content;
        let text = this.text;
        while (!this.isFits()) {
          let endIndex = text.length - 1;
          if (this.$el.offsetHeight > this.maxHeight * 3) {
            endIndex = Math.floor(text.length / 2);
          }
          $content.innerText = text = text.substring(0, endIndex);
        }
      });
    },
    isFits() {
      return this.$el.offsetHeight <= this.maxHeight;
    },
    toggle() {
      this.collapse = !this.collapse;
      if (this.collapse) {
        this.truncate();
      } else {
        this.keyIndex++;
      }
    },
    resizeHandle() {
      if (this.oversize && this.collapse) {
        this.truncate();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-ellipsis {
  word-break: break-all;
  .el-link {
    font-size: 0.6em;
  }
}
</style>
