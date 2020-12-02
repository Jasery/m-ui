<template>
  <el-popover popper-class="table-column-setting" :width="200">
    <el-card>
      <div slot="header" class="dp-f items-center justify-between">
        <span>列设置</span>
        <el-button type="text" class="f-r" @click="reset">重置</el-button>
      </div>
      <div class="column-conatiner" ref="columnContainer">
        <div
          v-for="col in columnSetting"
          :key="col.prop + col.label"
          class="column-item"
        >
          <i class="drag-handle el-icon-more"></i>
          <i class="drag-handle el-icon-more"></i>
          <el-checkbox
            :value="col.checked"
            @input="value => onColChange(col, value)"
          >
            {{ col.label }}
            <el-tooltip v-if="col.tips" :content="col.tips" placement="top">
              <i class="el-icon-info cur-p"></i>
            </el-tooltip>
          </el-checkbox>
        </div>
      </div>
    </el-card>
    <i class="el-icon-setting fs-22 cur-p mg-l-8" slot="reference"></i>
  </el-popover>
</template>

<script>
import { getLocalStore, setLocalStore } from "../utils";
import sortable from "sortablejs";

export default {
  name: "TableColumnSetting",
  inheritAttrs: false,
  props: {
    columns: Array,
    cacheKey: String
  },
  data() {
    return {
      columnSetting: []
    };
  },
  watch: {
    columns() {}
  },
  mounted() {
    this.initColumnSetting();
  },
  methods: {
    initColumnSetting() {
      if (!this.columns || !Array.isArray(this.columns)) {
        return;
      }
      let cache = getLocalStore(this.cacheKey);
      if (cache && Array.isArray(cache)) {
        this.columnSetting = cache.filter(item =>
          this.columns.find(col => col.prop === item.prop)
        );
      } else {
        this.columnSetting = this.getSettingsByCols(this.columns);
      }
      this.initSortable();
      this.change();
    },
    onColChange(col, checked) {
      col.checked = checked;
      this.change();
    },

    initSortable() {
      sortable.create(this.$refs.columnContainer, {
        animation: 300,
        onEnd: event => {
          let { newIndex, oldIndex } = event;
          if (newIndex !== oldIndex) {
            let data = this.columnSetting;
            const targetRow = data.splice(oldIndex, 1)[0];
            data.splice(newIndex, 0, targetRow);
            this.change();
            this.$nextTick(() => {
              this.initSortable();
            });
          }
          this.change();
        }
      });
    },

    change() {
      let noIncludeCols = this.columns.reduce((noIncluds, col, index) => {
        if (!this.columnSetting.find(item => item.prop === col.prop)) {
          noIncluds.push({
            index,
            col
          });
        }
        return noIncluds;
      }, []);
      if (noIncludeCols.length) {
        for (const item of noIncludeCols) {
          this.columnSetting.splice(
            item.index,
            0,
            this.getSettingByCol(item.col)
          );
        }
      }
      let displayCols = this.columnSetting
        .filter(item => item.checked)
        .map(item => this.columns.find(col => col.prop === item.prop));
      if (this.cacheKey) {
        setLocalStore(this.cacheKey, this.columnSetting);
      }
      this.$emit("change", displayCols);
    },
    getSettingByCol(col) {
      return {
        prop: col.prop,
        label: col.label,
        tips: col.headerTips,
        checked: true
      };
    },
    getSettingsByCols(columns) {
      return columns.map(this.getSettingByCol);
    },

    reset() {
      this.columnSetting = this.getSettingsByCols(this.columns);
      this.change();
    }
  }
};
</script>
<style lang="scss">
.table-column-setting {
  padding: 0;
  .el-card__header {
    padding: 0 10px;
  }
  .el-card__body {
    padding: 5px 0;
  }
  .column-conatiner {
    .column-item {
      cursor: pointer;
      margin: 5px 0;
      .drag-handle {
        cursor: move;
        color: #999;
        transform: rotate(90deg) translateY(-8px);
        & + .drag-handle {
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
