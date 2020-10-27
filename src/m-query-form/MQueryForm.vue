<template>
  <el-form
    class="m-query-form"
    v-bind="$attrs"
    inline
    size="small"
    label-width="100px"
    :model="model"
    ref="form"
  >
    <el-row :gutter="10">
      <el-col
        v-for="(item, index) in filterFormItems()"
        :key="index"
        :span="colSpan"
        v-show="isFormItemShow(index)"
      >
        <v-node :content="item"></v-node>
      </el-col>
      <el-col :span="colSpan" :offset="colSpan * btnContainerOffset">
        <el-form-item label="" class="btn ta-r">
          <el-button @click="onReset">重置</el-button>
          <el-button :loading="submitLoading" type="primary" @click="onSumit"
            >查询</el-button
          >
          <el-button v-if="collapseable" type="text" @click="onCollapse">
            {{ collapse ? "展开" : "收起" }}
            <i
              :class="{
                'el-icon-arrow-down': collapse,
                'el-icon-arrow-up': !collapse
              }"
            ></i>
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/lib/utils/resize-event";

export default {
  name: "MQueryForm",
  props: {
    model: Object,
    collapseable: {
      type: Boolean,
      default: true
    },
    defaultCollapse: {
      type: Boolean,
      default: true
    },
    submitLoading: Boolean
  },
  components: {
    VNode: {
      functional: true,
      render: (h, ctx) => ctx.props.content
    }
  },
  data() {
    return {
      collapse: this.defaultCollapse && this.collapseable,
      col: 3
    };
  },
  computed: {
    colSpan() {
      return 24 / this.col;
    },
    btnContainerOffset() {
      let colCount = this.collapse
        ? this.col - 1
        : this.filterFormItems().length;
      return this.col - (colCount % this.col) - 1;
    }
  },
  mounted() {
    this.formResize = () => {
      this.onFormResize();
    };
    addResizeListener(this.$refs.form.$el, this.formResize);
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.form.$el, this.formResize);
    delete this.formResize;
  },
  methods: {
    onCollapse() {
      this.collapse = !this.collapse;
      this.$emit("collapse", this.collapse);
    },

    // computed not work
    filterFormItems() {
      return (this.$slots.default || []).filter(item => item.tag);
    },

    isFormItemShow(index) {
      if (index < this.col - 1) {
        return true;
      }
      return !this.collapse;
    },

    onFormResize() {
      let { width } = this.$refs.form.$el.getBoundingClientRect();
      if (width < 500) {
        this.col = 1;
      } else if (width < 950) {
        this.col = 2;
      } else if (width < 1500) {
        this.col = 3;
      } else {
        this.col = 4;
      }
    },

    onReset() {
      this.$refs.form.resetFields();
    },

    onSumit() {
      this.$emit("submit", this.model);
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .el-form-item {
  width: 100%;
  .el-form-item__content {
    width: calc(100% - 100px);
    & > .el-input,
    & > .el-date-editor,
    & > .el-select {
      width: 100%;
    }
  }
  &.btn {
    .el-form-item__content {
      width: 100%;
    }
  }
}
</style>
