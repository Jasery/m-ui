<template>
  <div class="main">
    <m-pro-table
      ref="proTable"
      :columns="columns"
      :fetch="fetch"
      :fixed-bottom="24"
      :query-model="query"
      :query-fields="queryFields"
      show-refresh
      column-setting
      column-cache-key="table-columnn-key"
      show-fullscreen
      title="我的表格"
    >
      <template v-slot:tools>
        <el-button size="small" type="primary" @click="onCreate"
          >新增</el-button
        >
        <el-button size="small" type="danger" @click="onDelete">删除</el-button>
      </template>
      <template v-slot:gender="{ row }">
        <span :class="row.gender">{{ row.gender }}</span>
      </template>
      <template v-slot:opreation="{ row }">
        <el-button size="small" type="primary" @click="onEdit(row)"
          >编辑</el-button
        >
      </template>
    </m-pro-table>
    <m-dialog-form
      :visible.sync="dialogVisible"
      :fields="dialogFormFields"
      :title="dialogTitle"
      :default-model="defaultItem"
      :model-value="editItem"
      :create-fn="createItem"
      :update-fn="updateItem"
      size="small"
      @saved="() => $refs.proTable.fetchData()"
    >
    </m-dialog-form>
  </div>
</template>

<script>
import Mockjs from "mockjs";
import { MUtils } from "m-ui";

export default {
  name: "table",
  data() {
    return {
      columns: [
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "性别",
          prop: "gender",
          slotName: "gender"
        },
        {
          label: "年龄",
          prop: "age",
          formatter: row => row.age + "岁"
        },
        {
          label: "出生日期",
          prop: "born",
          headerTips: "十位时间戳"
        },
        {
          label: "操作",
          prop: "opreation",
          slotName: "opreation"
        }
      ],
      query: {
        name: "",
        gender: null,
        age: null,
        born: []
      },
      queryFields: [
        {
          label: "姓名",
          prop: "name",
          component: "el-input"
        },
        {
          label: "性别",
          prop: "gender",
          component: "m-select",
          componentProps: {
            options: [
              {
                label: "男",
                value: 1
              },
              {
                label: "女",
                value: 2
              }
            ]
          }
        },
        {
          label: "年龄",
          prop: "age",
          component: "el-input",
          componentProps: {
            type: "number"
          }
        },
        {
          label: "出生",
          prop: "born",
          component: "m-date-picker",
          componentProps: {
            type: "daterange"
          }
        }
      ],
      dialogFormFields: [
        {
          label: "姓名",
          prop: "name",
          component: "el-input",
          rules: [{ required: true, message: "请输入姓名" }]
        },
        {
          label: "性别",
          prop: "gender",
          component: "m-select",
          componentProps: {
            class: "w-100",
            options: [
              {
                label: "男",
                value: 1
              },
              {
                label: "女",
                value: 2
              }
            ]
          },
          rules: [{ required: true, message: "请选择性别" }]
        },
        {
          label: "年龄",
          prop: "age",
          component: "el-input",
          componentProps: {
            type: "number"
          }
        },
        {
          label: "出生",
          prop: "born",
          component: "m-date-picker",
          componentProps: {
            class: "w-100"
          }
        }
      ],
      dialogVisible: false,
      editItem: null,
      defaultItem: {
        name: "",
        gender: null,
        age: null,
        born: null
      }
    };
  },
  computed: {
    dialogTitle() {
      return this.editItem ? "编辑" : "新增";
    }
  },
  methods: {
    fetch(query) {
      console.log("fetch", query);
      let mock = Mockjs.mock({
        total: 300,
        "data|30": [
          {
            name: "@first",
            "gender|+1": ["male", "female"],
            "age|1-100": 100,
            "born|1000000000-2000000000": 1000000000
          }
        ]
      });
      return new Promise(resolve => {
        setTimeout(() => {
          let res = {
            ret: 0,
            msg: "success",
            data: {
              data: [],
              total: 300
            }
          };
          if (query.pageNum <= 10) {
            res.data = mock;
          }
          resolve(res);
        }, 3000 * Math.random());
      });
    },
    onEdit(row) {
      this.editItem = row;
      this.dialogVisible = true;
    },
    onCreate() {
      this.editItem = null;
      this.dialogVisible = true;
    },
    onDelete() {
      let selection = this.$refs.proTable.getSelection();
      if (!selection.length) {
        this.$message.error("请选择要删除的数据");
      } else {
        this.$message.success("删除成功");
        this.$refs.proTable.fetchData();
      }
    },
    async createItem() {
      await MUtils.delay(1000);
      return Mockjs.mock("@integer");
    },
    async updateItem() {
      await MUtils.delay(1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  padding: 24px;
}
</style>
