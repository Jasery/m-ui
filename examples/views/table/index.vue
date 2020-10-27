<template>
  <div class="main">
    <m-pro-table
      ref="proTable"
      :columns="columns"
      :fetch="fetch"
      :fixed-bottom="10"
      :query-model="query"
      title="我的表格"
    >
      <template v-slot:query>
        <el-form-item label="name" prop="name">
          <el-input v-model="query.name"></el-input>
        </el-form-item>
        <el-form-item label="gender" prop="gender">
          <m-select
            v-model="query.gender"
            :options="[
              { label: 'male', value: 'male' },
              { label: 'female', value: 'female' }
            ]"
          >
          </m-select>
        </el-form-item>
        <el-form-item label="age" prop="age">
          <el-input v-model="query.age" type="number"></el-input>
        </el-form-item>
        <el-form-item label="born" prop="born">
          <m-date-picker v-model="query.born" type="daterange"></m-date-picker>
        </el-form-item>
      </template>
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
        <el-button size="small" type="primary" @click="onClick(row)"
          >点击</el-button
        >
      </template>
    </m-pro-table>
  </div>
</template>

<script>
import Mockjs from "mockjs";
export default {
  data() {
    return {
      columns: [
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "性别",
          slotName: "gender"
        },
        {
          label: "年龄",
          formatter: row => row.age + "岁"
        },
        {
          label: "出生日期",
          prop: "born"
        },
        {
          label: "操作",
          slotName: "opreation"
        }
      ],
      query: {
        name: "",
        gender: null,
        age: null,
        born: []
      }
    };
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
    onClick(row) {
      this.$message.success("查看详情-" + row.name);
    },
    onCreate() {
      this.$message.success("to create form");
    },
    onDelete() {
      let selection = this.$refs.proTable.getSelection();
      if (!selection.length) {
        this.$message.error("请选择要删除的数据");
      } else {
        this.$message.success("删除成功");
        this.$refs.proTable.fetchData();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  padding: 10px;
}
</style>
