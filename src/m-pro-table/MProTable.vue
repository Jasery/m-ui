<template>
  <div class="m-pro-table">
    <div v-if="$slots.query" class="query-form-wrapper">
      <m-query-form
        :model="queryModel"
        :submitLoading="loading"
        @submit="fetchData"
      >
        <slot name="query"></slot>
      </m-query-form>
    </div>
    <div class="table-wrapper">
      <div class="table-title-conatiner">
        <h1>{{ title }}</h1>
        <div class="tools">
          <slot name="tools"></slot>
        </div>
      </div>
      <m-table
        :data="tableData"
        :pagination="isPagination"
        :infinite-scroll="isScroll"
        :scroll-loading="scrollLoading"
        :noMore="noMore"
        :fixed-bottom="fixBottom"
        :height="height"
        :columns="columns"
        :page-size="pageSize"
        :current-page="pageNum"
        :table-loading="loading"
        :total="total"
        @page-change="onPageChange"
        @scroll-load="onScrollLoad"
        @selection-change="onSelectionChange"
        v-bind="tableProps"
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
import { isUndefined } from "../utils";

export default {
  name: "MProTable",
  components: {
    MTable,
    MQueryForm
  },
  props: {
    fetch: Function,
    title: String,
    columns: Array,
    queryModel: Object,
    pageType: {
      type: String,
      default: "pagination",
      validate(val) {
        return val === "pagination" || val === "scroll";
      }
    },
    height: [Number, String],
    fixBottom: Number,
    showSelection: {
      type: Boolean,
      default: true
    },
    tableProps: Object
  },
  data() {
    return {
      loading: false,
      tableData: [],
      pageSize: 30,
      pageNum: 1,
      scrollLoading: false,
      noMore: false,
      total: 0,
      selection: []
    };
  },
  computed: {
    isPagination() {
      return this.pageType === "pagination";
    },
    isScroll() {
      return this.pageType === "scroll";
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
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(resetPage) {
      this.loading = true;
      this.noMore = false;
      if (resetPage) {
        this.pageNum = 1;
      }
      return this.getData({
        ...this.queryModel,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(data => {
          this.total = data.total;
          this.tableData = data.data;
          this.selection = [];
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
          this.$message.error(err.message || err);
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
        pageSize: this.pageSize,
        pageNum: this.pageNum + 1
      })
        .then(data => {
          this.pageNum++;
          if (!data.data?.length) {
            this.noMore = true;
          } else {
            this.tableData.push(...data.data);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.m-pro-table {
  .query-form-wrapper {
    padding: 16px;
    background-color: #fff;
  }
  .table-wrapper {
    background-color: #fff;
    margin-top: 20px;
    padding: 0 16px;
    .table-title-conatiner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1 {
        margin: 20px 0;
      }
    }
  }
}
</style>
