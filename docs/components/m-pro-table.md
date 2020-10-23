### 描述
表格常见应用场景的集成，在表格的基础上分装了查询和分页

### 基本用法
```vue
<template>
  <div class="container">
    <m-pro-table
      ref="proTable"
      :columns="columns"
      :fetch="fetch"
      :height="400"
      :query-model="query"
      title="我的表格"
    >
      <template v-slot:query>
        <el-form-item label="name" prop="name">
          <el-input v-model="query.name"></el-input>
        </el-form-item>
        <el-form-item label="gender" prop="gender">
          <m-select v-model="query.gender"
            :options="[
              {label: 'male', value: 'male'}, 
              {label: 'female', value: 'female'}
            ]"
          >
          </m-select>
        </el-form-item>
        <el-form-item label="age" prop="age">
          <el-input v-model="query.age" type="number"></el-input>
        </el-form-item>
      </template>
      <template v-slot:tools>
        <el-button size="small" type="primary" @click="onCreate">新增</el-button>
        <el-button size="small" type="danger" @click="onDelete">删除</el-button>
      </template>
      <template v-slot:gender="{row}">
        <span :class="row.gender">{{row.gender}}</span>
      </template>
      <template v-slot:opreation="{row}">
        <el-button size="small" type="primary" @click="onClick(row)">点击</el-button>
      </template>
    </m-pro-table>
  </div>
</template>
<script>
import Mockjs from "mockjs"

export default {
  data() {
    return {
      columns: [{
        label: "姓名",
        prop: "name"
      }, {
        label: "性别",
        slotName: "gender"
      }, {
        label: "年龄",
        formatter: (row) => row.age + "岁"
      }, {
        label: "出生日期",
        prop: 'born'
      }, {
        label: '操作',
        slotName: 'opreation'
      }],
      query: {
        name: '',
        gender: null,
        age: null
      }
    }
  },
  methods: {
    fetch(query) {
      console.log('fetch', query)
      let mock = Mockjs.mock({
        total: 300,
        "data|30": [{
          name: "@first",
          "gender|+1": ["male", "female"],
          "age|1-100": 100,
          "born|1000000000-2000000000": 1000000000,
        }]
      });
      return new Promise(resolve => {
        setTimeout(() => {
          let res = {
            ret: 0,
            msg: 'success',
            data: {
              data: [],
              total: 300
            }
          }
          if (query.pageNum <= 10) {
            res.data = mock;
          }
          resolve(res)
        }, 3000 * Math.random())
      })
    }, 
    onClick(row) {
      this.$message.success('查看详情-' + row.name)
    },
    onCreate() {
      this.$message.success("to create form")
    },
    onDelete() {
      let selection = this.$refs.proTable.getSelection();
      if(!selection.length) {
        this.$message.error("请选择要删除的数据")
      } else {
        this.$message.success("删除成功")
        this.$refs.proTable.fetchData();
      }
    }
  }
}
</script>
<style scope>
.container {
  background-color: #eee;
  padding: 5px;
}
.male {
  color: #67C23A;
}
.female {
  color: #F56C6C;
}
</style>
```

---

### Props
只保留了部分`m-table`的props，定制内容太多的话请直接用`m-table`

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| fetch | 查询方法， | Function | --- | --- |
| queryModel | 查询的数据，用于查询表单构建及查询方法参数传递 | Object | --- | --- |
| title | 标题 | string | --- | --- |
| columns | 同m-table的columns | Array | --- | --- |
| pageType | 分页类型 | string | pagination/scroll | pagination |
| height | m-table的height | number | --- | --- |
| fixBottom | m-table的fixBottom | number | --- | --- |
| showSelection | 表格是否显示勾选列 | boolean | --- | true |
| tableProps | m-table的props透传 | Object | --- | --- |

---

### 一些约定
- props里面的fetch方法，约定参数里面有pageSize及pageNum作为分页，其他字段则由fetchModel定义
- fetch返回的数据约定如下

```json
{
  "total": 123,
  "data": [{}, {}, {}]
}
```

---

### Events
同`el-table`，包含`m-pagination`的事件，并新增以下

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| selection-chagne | 勾选事件 | selection |

---

### Slots
| slot名称 | 说明 |
| :---- | :---- |
| query | 查询表单，规则参考`m-query-form` |
| table | `m-table` 的default slot |
| tools | 标题右侧的操作按钮位置 |

---

### Methods

| 方法名 | 说明 | 参数 |
| :---- | :---- | :---- |
| getSelection | 获取选中的数据 | --- |
| fetchData | 请求数据 | resetPage是否重置页码 |
