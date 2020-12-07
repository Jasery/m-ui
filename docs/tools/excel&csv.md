### 说明
Excel及Csv的导出

### 用法
```vue
<template>
  <div class="container">
    <el-button type="primary" @click="excel">导出Excel</el-button>
    <el-button type="primary" @click="csv">导出Csv</el-button>
  </div>
</template>

<script>
import Mockjs from "mockjs"
import { exportExcel, exportCsv } from "m-ui";

const mock = Mockjs.mock({
  "data|10-30": [{
    name: "@first",
    "gender|+1": ["male", "female"],
    "age|1-100": 100
  }],
});
const columns = [{
  label: '姓名',
  prop: 'name'
}, {
  label: '性别',
  prop: 'gender'
}, {
  label: '年龄',
  prop: 'age'
}]
const data = mock.data;

export default {
  methods: {
    excel() {
      exportExcel({
        data, 
        columns, 
        filename: '我的表格', 
        title: "这是标题", 
        merges: ["A1", "C1"]
      }, () => {
        console.log('export excel success')
      })
    },

    csv() {
      exportCsv({data, columns, filename: '我的数据'}, () => {
        console.log('export csv success')
      })
    }
  }
}
</script>
```

### 方法


| 方法名 | 说明 | 参数 |
| :---- | :---- | :---- |
| exportExcel | 导出Excel | (options, callback) |
| exportCsv | 导出Csv | (options, callback) |


#### options格式

| 字段 | 说明 |
| :---- | :---- |
| data | 需要导出的数据 |
| columns |需要导出的列，格式{label: '', prop: ''} |
| filename | 导出的文件名 |
| title | 标题，仅excel |
| merges | 合并单元格，仅excel |

