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
      let colCount = this.filterFormItems().length;
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
    },
    filterFormItems() {
      let formItems = (this.$slots.default || []).filter(item => item.tag);
      if (this.collapse) {
        return formItems.slice(0, 2);
      }
      return formItems;
    },

    onFormResize() {
      let { width } = this.$refs.form.$el.getBoundingClientRect();
      if (width < 500) {
        this.col = 1;
      } else if (width < 750) {
        this.col = 2;
      } else {
        this.col = 3;
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
  }
  &.btn {
    .el-form-item__content {
      width: 100%;
    }
  }
}
</style>
