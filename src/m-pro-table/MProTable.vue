<template>
  <div class="m-pro-table">
    <div v-if="$slots.query || queryFields" class="query-form-wrapper">
      <m-query-form
        :model="queryModel"
        :submitLoading="loading"
        :fields="queryFields"
        @submit="fetchData"
        @collapse="onQueryFormCollapse"
      >
        <slot name="query"></slot>
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
        </div>
      </div>
      <m-table
        ref="mTable"
        :data="tableData"
        :pagination="isPagination"
        :infinite-scroll="isScroll"
        :scroll-loading="scrollLoading"
        :noMore="noMore"
        :fixed-bottom="tableFixedBottom"
        :height="height"
        :columns="columns"
        :page-size="pageSize"
        :current-page="pageNum"
        :table-loading="loading"
        :total="total"
        @page-change="onPageChange"
        @scroll-load="onScrollLoad"
        @selection-change="onSelectionChange"
        @sort-change="onSortChange"
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
import { isUndefined, isNumber } from "../utils";

const defaultFieldConfig = {
  data: "data",
  pageSize: "pageSize",
  pageNum: "pageNum",
  total: "total",
  order: "order",
  orderBy: "orderBy"
};

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
    fixedBottom: Number,
    showSelection: {
      type: Boolean,
      default: true
    },
    tableProps: Object,
    queryFields: Array,
    fieldConfig: {
      type: Object,
      default() {
        return {};
      }
    }
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
      selection: [],
      orderBy: undefined,
      order: undefined,
      fieldDic: Object.assign({}, defaultFieldConfig, this.fieldConfig)
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
    },
    tableFixedBottom() {
      if (isNumber(this.fixedBottom)) {
        return this.isPagination ? this.fixedBottom + 50 : this.fixedBottom;
      }
      return null;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(resetPage) {
      this.loading = true;
      this.noMore = false;
      let pageNum = this.pageNum;
      if (resetPage) {
        pageNum = 1;
      }

      console.log("fieldDIc", this.fieldDic);

      return this.getData({
        ...this.queryModel,
        [this.fieldDic.pageNum]: pageNum,
        [this.fieldDic.pageSize]: this.pageSize,
        [this.fieldDic.order]: this.order,
        [this.fieldDic.orderBy]: this.orderBy
      })
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
      this.fetchData(this.isScroll);
    }
  }
};
</script>

<style lang="scss" scoped>
.m-pro-table {
  .query-form-wrapper {
    padding: 16px;
    background-color: #fff;
    margin-bottom: 20px;
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
      h1 {
        font-size: 16px;
        margin: 0;
      }
    }
  }
}
</style>
