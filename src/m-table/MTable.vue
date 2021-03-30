<template>
  <div class="m-table">
    <el-table
      :class="elTableClass"
      ref="table"
      v-el-table-infinite-scroll="load"
      :height="tableHeight"
      :header-row-class-name="headerRowClass"
      :infinite-scroll-disabled="noMore"
      :infinite-scroll-distance="infiniteScrollDistance"
      :infinite-scroll-immediate="false"
      v-bind="$attrs"
      v-on="$listeners"
      v-loading="tableLoading"
    >
      <slot></slot>
      <el-table-column
        v-for="(col, index) in columns"
        :key="index"
        v-bind="getColumnProps(col)"
      >
        <template
          v-if="col.headerSlotName || col.headerTips"
          v-slot:header="scope"
        >
          <slot
            v-if="col.headerSlotName"
            :name="col.headerSlotName"
            v-bind="scope"
          ></slot>
          <span v-if="col.headerTips">
            {{ col.label }}
            <el-tooltip :content="col.headerTips" placement="top">
              <i class="el-icon-info cur-p"></i>
            </el-tooltip>
          </span>
        </template>
        <template v-if="col.slotName" v-slot:default="scope">
          <slot :name="col.slotName" v-bind="scope"></slot>
        </template>
        <template v-else-if="col.component" v-slot:default="scope">
          <component
            :is="col.component"
            v-bind="{ ...scope, ...col.componentProps }"
            v-on="col.componentEvents"
          ></component>
        </template>
      </el-table-column>
      <template #append>
        <div v-if="noMore" v-padding="20" style="text-align: center">
          没有更多了
        </div>
        <div
          v-else
          v-show="scrollLoading"
          v-loading="scrollLoading"
          style="height:50px"
        ></div>
      </template>
      <template #empty>
        <div class="empty-container">
          <img :src="emptySvg" alt="no data" width="250" />
          <span>{{ $attrs["empty-text"] || "暂无数据" }}</span>
        </div>
      </template>
    </el-table>
    <m-pagination
      v-if="pagination"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      v-on="{
        'update:pageSize': value => $emit('update:pageSize', value),
        'update:currentPage': value => $emit('update:currentPage', value),
        'page-change': (currentPage, pageSize) =>
          $emit('page-change', currentPage, pageSize),
        'size-change': value => $emit('size-change', value),
        'current-change': value => $emit('current-change', value)
      }"
    ></m-pagination>
  </div>
</template>

<script>
import _ from "lodash";
import ElTableInfiniteScroll from "el-table-infinite-scroll";
import MPagination from "../m-pagination/MPagination";
import padding from "../directives/padding";
import { isNumber, isFunction, removeKeys } from "../utils";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/lib/utils/resize-event";

import emptySvg from "../assets/image/empty.svg";

export default {
  name: "MTable",
  inheritAttrs: false,
  props: {
    pagination: Boolean,
    currentPage: Number,
    pageSize: Number,
    total: Number,
    tableLoading: Boolean,
    columns: Array,
    infiniteScroll: Boolean,
    infiniteScrollDistance: {
      type: Number,
      default: 150
    },
    scrollLoading: Boolean,
    noMore: Boolean,
    fixedBottom: Number,
    height: {
      type: [Number, String],
      default: "auto"
    },
    headerRowClassName: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "default",
      validator(val) {
        return ["default", "middle", "small"].includes(val);
      }
    },
    perfectScroll: Boolean,
    scrollContainer: {
      type: String,
      default: ".main-container"
    },
    topSummary: {
      type: Boolean,
      default: true
    }
  },
  components: {
    MPagination
  },
  directives: {
    ElTableInfiniteScroll,
    padding
  },
  data() {
    return {
      tableHeight: this.height,
      emptySvg
    };
  },
  computed: {
    headerRowClass() {
      return this.headerRowClassName + " m-table-header";
    },
    isFixedBottom() {
      return isNumber(this.fixedBottom);
    },
    elTableClass() {
      let tableClass = ["size-" + this.size];
      if (this.$attrs["show-summary"] !== false && this.topSummary) {
        tableClass.push(["top-summary"]);
      }
      return tableClass;
    }
  },
  watch: {
    noMore: "updateInfiniteScrollAttr",
    infiniteScrollDistance: "updateInfiniteScrollAttr",
    height() {
      this.tableHeight = this.height;
    },
    fixedBottom: "setTableHeight",
    "$attrs.data": "setTableHeight",
    columns: "setTableHeight"
  },
  mounted() {
    this.bodyWrapper = this.$el.querySelector(".el-table__body-wrapper");
    if (this.isFixedBottom) {
      this.initFixedBottom();
    }
    if (this.perfectScroll) {
      this.initPerfectScrollBar();
    }
  },
  methods: {
    load() {
      if (this.infiniteScroll && !this.scrollLoading && !this.tableLoading) {
        this.$emit("scroll-load");
      }
    },

    // fix v-el-table-infinite-scroll bug
    updateInfiniteScrollAttr() {
      let wrapper = this.bodyWrapper;
      if (wrapper) {
        wrapper.setAttribute(
          "infinite-scroll-disabled",
          this.infiniteScrollDisabled
        );
        wrapper.setAttribute(
          "infinite-scroll-distance",
          this.infiniteScrollDistance
        );
      }
    },

    getElTable() {
      return this.$refs.table;
    },

    setTableHeight() {
      if (!this.isFixedBottom) {
        this.tableHe = this.height;
        return;
      }
      this.$nextTick(() => {
        let { top } = this.$refs.table.$el.getBoundingClientRect();
        this.tableHeight =
          window.innerHeight - top - this.fixedBottom + Math.random();
      });
    },

    getColumnProps(col) {
      let formatter = col.formatter;
      if (
        !col.slotName &&
        !col.component &&
        col.prop &&
        col.formatEmpty !== false
      ) {
        // 设置空值占位符
        formatter = (row, column, cellValue, index) => {
          if (isFunction(col.formatter)) {
            return col.formatter(row, column, cellValue, index);
          }
          if (cellValue === undefined || cellValue === null) {
            return col.emptyText || "---";
          }
          return cellValue;
        };
      }
      return {
        ...removeKeys(col, [
          "slotName",
          "headerSlotName",
          "component",
          "componentProps",
          "componentEvents"
        ]),
        formatter
      };
    },

    initPerfectScrollBar() {
      this.bodyWrapper.style.overflow = "hidden";
      let ps = new PerfectScrollbar(this.bodyWrapper);
      let scrollContainer = document.querySelector(this.scrollContainer);
      let handler = () => {
        const railX = this.$el.querySelector(".ps__rail-x");
        const railXHeight = railX.clientHeight;
        const tBodyRect = this.bodyWrapper.getBoundingClientRect();
        const windowBottomTop =
          window.innerHeight -
          tBodyRect.top -
          railXHeight +
          this.bodyWrapper.scrollTop;
        const tBodyBottomTop =
          this.bodyWrapper.scrollTop + tBodyRect.height - railXHeight;
        let top = _.min([tBodyBottomTop, windowBottomTop]);
        railX.style.top = `${top}px`;
      };
      handler = _.throttle(handler, 10);
      if (scrollContainer) {
        scrollContainer.addEventListener("scroll", handler);
      }
      this.bodyWrapper.addEventListener("scroll", handler);
      addResizeListener(this.$el, handler);
      this.$on("hook:updated", () => {
        ps.update();
      });
      this.$on("hook:beforeDestroy", () => {
        removeResizeListener(this.$el, handler);
        if (scrollContainer) {
          scrollContainer.removeEventListener("scroll", handler);
        }
        ps.destroy();
        ps = null;
      });
    },

    initFixedBottom() {
      let onResize = _.throttle(this.setTableHeight.bind(this), 10);
      window.addEventListener("resize", onResize);
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("resize", onResize);
      });
      this.$nextTick(onResize);
    }
  }
};
</script>

<style lang="scss" scoped>
.m-table {
  ::v-deep .el-table {
    .m-table-header th {
      background-color: #fafafa !important;
      color: #000;
    }
    .empty-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &.size-middle {
      td {
        padding: 8px 0;
      }
    }
    &.size-small {
      td {
        padding: 4px 0;
        .cell {
          line-height: 20px;
        }
      }
    }
    .ps__rail-x,
    .ps__rail-y {
      opacity: 0.6 !important;
    }
    &.top-summary {
      display: flex;
      flex-direction: column;
      .el-table__body-wrapper {
        order: 1;
      }
      .el-table__footer-wrapper {
        th.gutter {
          background-color: #f1f1f1;
        }
      }
    }
  }
}
</style>
