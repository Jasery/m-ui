<template>
  <div :class="['m-pro-table', { fullscreen: isFullscreen }]">
    <div v-if="$slots.query || queryFields" class="query-form-wrapper">
      <m-query-form
        :model="queryModel"
        :submitLoading="loading"
        :fields="queryFields"
        v-bind="queryFormProps"
        @submit="fetchData"
        @collapse="onQueryFormCollapse"
      >
        <slot name="query"></slot>
        <template v-slot:tools>
          <slot name="query-tools"></slot>
        </template>
      </m-query-form>
    </div>
    <div class="table-wrapper">
      <div class="table-title-conatiner">
        <div>
          <slot name="title">
            <h1>{{ title }}</h1>
          </slot>
        </div>
        <div class="tools">
          <slot name="tools"></slot>
          <el-tooltip v-if="showRefresh" content="刷新" placement="top">
            <i
              class="el-icon-refresh fs-22 mg-l-8 cur-p"
              @click="fetchData"
            ></i>
          </el-tooltip>
          <el-dropdown
            v-if="showSize"
            trigger="click"
            @command="size => (tableSize = size)"
          >
            <el-tooltip content="密度" placement="top">
              <i class="el-icon-d-caret fs-22 mg-l-8 cur-p"></i>
            </el-tooltip>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in sizes"
                :key="item.size"
                :command="item.size"
                >{{ item.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <table-column-setting
            v-if="columnSetting"
            :columns="columns"
            :cache-key="columnCacheKey"
            @change="onColumnChange"
          ></table-column-setting>
          <el-tooltip v-if="showFullscreen" content="全屏" placement="top">
            <i
              class="el-icon-full-screen fs-22 mg-l-8 cur-p"
              @click="onFullScreen"
            ></i>
          </el-tooltip>
        </div>
      </div>
      <m-table
        ref="mTable"
        :data="tableData"
        :pagination="isPagination"
        :infinite-scroll="isScrollPagination"
        :scroll-loading="scrollLoading"
        :noMore="noMore"
        :fixed-bottom="tableFixedBottom"
        :height="height"
        :columns="displayColumns"
        :page-size="pageSize"
        :current-page="pageNum"
        :table-loading="loading"
        :total="total"
        :size="tableSize"
        @page-change="onPageChange"
        @scroll-load="onScrollLoad"
        @selection-change="onSelectionChange"
        @sort-change="onSortChange"
        v-bind="tableProps"
        v-on="tableListeners"
      >
        <template v-if="showSelection">
          <el-table-column type="selection"></el-table-column>
        </template>
        <slot name="table"></slot>
        <template v-for="slotName in tableSlots" v-slot:[slotName]="rowData">
          <slot :name="slotName" v-bind="rowData"></slot>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script>
import MTable from "../m-table/MTable";
import MQueryForm from "../m-query-form/MQueryForm";
import { isUndefined, isNumber } from "../utils";
import TableColumnSetting from "./TableColumnSetting.vue";
import _ from "lodash";

const defaultFieldConfig = {
  data: "data",
  pageSize: "pageSize",
  pageNum: "page",
  total: "total",
  order: "order",
  orderBy: "orderBy"
};

export default {
  name: "MProTable",
  components: {
    MTable,
    MQueryForm,
    TableColumnSetting
  },
  props: {
    fetch: Function,
    title: String,
    columns: {
      type: Array,
      validator(val) {
        if (val.some(item => !item.prop)) {
          console.error("column 必须包含prop字段");
          return false;
        }
        return true;
      }
    },
    queryModel: Object,
    pageType: {
      type: String,
      default: "pagination",
      validate(val) {
        return ["pagination", "scroll", "none"].includes(val);
      }
    },
    height: [Number, String],
    fixedBottom: Number,
    showSelection: {
      type: Boolean,
      default: true
    },
    tableProps: Object,
    tableListeners: Object,
    queryFields: Array,
    fieldConfig: {
      type: Object,
      default() {
        return {};
      }
    },
    pageSize: {
      type: Number,
      default: 30
    },
    showRefresh: Boolean,
    columnSetting: Boolean,
    columnCacheKey: String,
    showFullscreen: Boolean,
    showSize: Boolean,
    queryFormProps: Object
  },
  data() {
    return {
      loading: false,
      tableData: [],
      pageNum: 1,
      scrollLoading: false,
      noMore: false,
      total: 0,
      selection: [],
      orderBy: _.get(this.tableProps, "default-sort.prop"),
      order: _.get(this.tableProps, "default-sort.order"),
      fieldDic: Object.assign({}, defaultFieldConfig, this.fieldConfig),
      displayColumns: this.columns,
      isFullscreen: false,
      tableSize: _.get(this.tableProps, "size", "default"),
      sizes: [
        { label: "默认", size: "default" },
        { label: "中等", size: "middle" },
        { label: "紧凑", size: "small" }
      ]
    };
  },
  computed: {
    isPagination() {
      return this.pageType === "pagination";
    },
    isScrollPagination() {
      return this.pageType === "scroll";
    },
    isNoPagination() {
      return this.pageType === "none";
    },
    tableSlots() {
      return this.columns.reduce((acc, cur) => {
        if (cur.slotName) {
          acc.push(cur.slotName);
        }
        if (cur.headerSlotName) {
          acc.push(cur.headerSlotName);
        }
        return acc;
      }, []);
    },
    tableFixedBottom() {
      let paginationHeight = 50;
      if (this.isFullscreen) {
        return this.isPagination ? paginationHeight : 0;
      }
      if (isNumber(this.fixedBottom)) {
        return this.isPagination
          ? this.fixedBottom + paginationHeight
          : this.fixedBottom;
      }
      return null;
    }
  },
  mounted() {
    this.fetchData();
    const fullscreenHandle = event => {
      if (event.key === "Escape") {
        this.isFullscreen = false;
      }
    };
    document.addEventListener("keydown", fullscreenHandle);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", fullscreenHandle);
    });
  },
  methods: {
    fetchData(resetPage) {
      this.loading = true;
      this.noMore = false;
      let pageNum = this.pageNum;
      if (resetPage) {
        pageNum = 1;
      }

      let query = {
        ...this.queryModel,
        [this.fieldDic.order]: this.order,
        [this.fieldDic.orderBy]: this.orderBy
      };
      if (!this.isNoPagination) {
        query[this.fieldDic.pageNum] = pageNum;
        query[this.fieldDic.pageSize] = this.pageSize;
      }

      return this.getData(query)
        .then(data => {
          this.total = data[this.fieldDic.total];
          this.tableData = data[this.fieldDic.data];
          this.selection = [];
          this.pageNum = pageNum;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getData(query) {
      return this.fetch(query)
        .then(res => {
          if (isUndefined(res.ret) && isUndefined(res.code)) {
            return res;
          }
          let code = res.ret ?? res.code;
          if (code !== 0) {
            return Promise.reject(res.msg);
          }
          return res.data;
        })
        .catch(err => {
          let msg = err.message || err;
          this.$message?.error(err.message || err);
          return Promise.reject(msg);
        });
    },

    onPageChange(currentPage, pageSize) {
      this.pageNum = currentPage;
      this.pageSize = pageSize;
      this.fetchData();
    },

    onScrollLoad() {
      this.scrollLoading = true;
      this.getData({
        ...this.queryModel,
        [this.fieldDic.pageNum]: this.pageNum + 1,
        [this.fieldDic.pageSize]: this.pageSize,
        [this.fieldDic.order]: this.order,
        [this.fieldDic.orderBy]: this.orderBy
      })
        .then(data => {
          this.pageNum++;
          let scrollData = data[this.fieldDic.data];
          if (!scrollData?.length) {
            this.noMore = true;
          } else {
            this.tableData.push(...scrollData);
          }
        })
        .finally(() => {
          this.scrollLoading = false;
        });
    },

    onSelectionChange(selection) {
      this.selection = selection;
      this.$emit("selection-chagne", selection);
    },

    getSelection() {
      return this.selection;
    },

    async onQueryFormCollapse() {
      await this.$nextTick();
      this.$refs.mTable.setTableHeight();
    },

    onSortChange({ prop, order }) {
      if (!order) {
        this.order = undefined;
        this.orderBy = undefined;
      } else {
        this.orderBy = prop;
        this.order = order;
      }
      this.fetchData(this.isScrollPagination);
    },

    onColumnChange(columns) {
      this.displayColumns = columns;
    },

    onFullScreen() {
      this.isFullscreen = !this.isFullscreen;
      if (this.isFullscreen) {
        this.$message.info("按Esc即可退出全屏模式");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.m-pro-table {
  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #eee;
  }
  .query-form-wrapper {
    padding: 16px;
    background-color: #fff;
    margin-bottom: 16px;
  }
  .table-wrapper {
    background-color: #fff;
    .m-table {
      padding: 0 16px;
      margin-top: 10px;
    }
    .table-title-conatiner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      padding: 16px;
      .tools {
        display: flex;
        align-items: center;
      }
      h1 {
        font-size: 16px;
        margin: 0;
      }
    }
  }
}
</style>
