<template>
  <div class="m-table">
    <el-table
      ref="table"
      v-el-table-infinite-scroll="load"
      :header-row-class-name="headerRowClass"
      :infinite-scroll-disabled="noMore"
      :infinite-scroll-distance="infiniteScrollDistance"
      :infinite-scroll-immediate="false"
      v-bind="$attrs"
      v-on="$listeners"
      v-loading="tableLoading"
    >
      <el-table-column
        v-for="(col, index) in columns"
        :key="index"
        v-bind="col"
      >
        <template v-if="col.headerSlotName" v-slot:header="scope">
          <slot :name="col.headerSlotName" v-bind="scope"></slot>
        </template>
        <template v-if="col.slotName" v-slot:default="scope">
          <slot :name="col.slotName" v-bind="scope"></slot>
        </template>
        <template v-else-if="col.compnent" v-slot:default="scope">
          <compnent :is="col.component" v-bind="scope"></compnent>
        </template>
      </el-table-column>
      <slot></slot>
      <template #append>
        <div v-if="noMore" v-padding="20" style="text-align: center">
          没有更多了
        </div>
        <div v-else v-loading="scrollLoading" style="height:50px"></div>
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
    fixedBottom: Boolean,
    height: {
      type: [Number, String],
      default: "auto"
    },
    headerRowClassName: {
      type: String,
      default: ""
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
      tableHeight: this.height
    };
  },
  computed: {
    headerRowClass() {
      return this.headerRowClassName + " m-table-header";
    }
  },
  watch: {
    noMore: "updateInfiniteScrollAttr",
    infiniteScrollDistance: "updateInfiniteScrollAttr",
    height() {
      this.tableHeight = this.height;
    },
    "$attrs.data": function() {
      this.$nextTick(() => {
        this.setTableHeight();
      });
    }
  },
  mounted() {
    if (this.fixedBottom) {
      let onResize = _.throttle(this.setTableHeight.bind(this));
      window.addEventListener("resize", onResize);
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("resize", onResize);
      });
      this.$nextTick(onResize);
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
      let wrapper = this.$refs?.table.$el.querySelector(
        ".el-table__body-wrapper"
      );
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
      let { top } = this.$refs.table.$el.getBoundingClientRect();
      this.tableHeight =
        window.innerHeight - top - this.fixedBottom + Math.random();
    }
  }
};
</script>

<style lang="scss">
.m-table-header th {
  background-color: #fafafa !important;
}
</style>