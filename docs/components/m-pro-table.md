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
      :query-fields="queryFields"
      title="我的表格"
      show-refresh
      show-fullscreen
      show-size
      column-setting
      :field-config="{
        pageNum: 'pageNum',
        total: 'total',
      }"
      :table-props="{'default-sort': {prop: 'id', order: 'descending'}}"
    >
      <template v-slot:tools>
        <el-button size="mini" type="primary" @click="onCreate">新增</el-button>
        <el-button size="mini" type="danger" @click="onDelete">删除</el-button>
      </template>
      <template v-slot:gender="{row}">
        <span :class="row.gender">{{row.gender}}</span>
      </template>
      <template v-slot:opreation="{row}">
        <el-button size="small" type="text" @click="onClick(row)">访问</el-button>
        <el-button size="small" type="text" @click="onClick(row)">编辑</el-button>
        <el-button size="small" class="c-danger" type="text" @click="onClick(row)">删除</el-button>
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
        prop: "name",
        sortable: true
      }, {
        label: "性别",
        prop: 'gender',
        slotName: "gender"
      }, {
        label: "年龄",
        prop: 'age',
        formatter: (row) => row.age + "岁"
      }, {
        label: "出生日期",
        prop: 'born',
        headerTips: '十位时间戳'
      }, {
        label: '操作',
        prop: 'opreation',
        slotName: 'opreation'
      }],
      query: {
        name: '',
        gender: null,
        age: null
      },
      queryFields: [{
        label: 'name',
        prop: 'name',
        component: 'el-input'
      }, {
        label: 'gender',
        prop: 'gender',
        component: 'm-select',
        componentProps: {
          options: [
            {label: 'male', value: 'male'}, 
            {label: 'female', value: 'female'}
          ]
        }
      }, {
        label: 'age',
        prop: 'age',
        component: 'el-input',
        componentProps: {
          type: "Number"
        }
      }]
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
      this.$message.success('点击：' + row.name)
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
只保留了部分[m-table](#/Components/m-table)的props，定制内容太多的话请直接用[m-table](#/Components/m-table)

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| fetch | 查询方法， | Function | --- | --- |
| queryModel | 查询的数据，用于查询表单构建及查询方法参数传递 | Object | --- | --- |
| title | 标题 | String | --- | --- |
| columns | 同m-table的columns | Array | --- | --- |
| pageType | 分页类型 | String | pagination/scroll/none | pagination |
| height | m-table的height | Number | --- | --- |
| fixedBottom | m-table的fixedBottom | Number | --- | --- |
| showSelection | 表格是否显示勾选列 | Boolean | --- | true |
| tableProps | m-table的props透传 | Object | --- | --- |
| tableListeners | m-table的事件透传 | Object | --- | --- |
| queryFormProps | m-query-form的props透传 | Object | --- | --- |
| queryFields | m-query-form的fields，参考[m-query-form](#/Components/m-query-form) | Array | --- | --- |
| fieldConfig | 约定的字段配置 | Object | --- | --- |
| pageSize | 分页大小 | Number | --- | 30 |
| showRefresh | 是否显示刷新按钮 | Boolean | --- | false |
| columnSetting | 是否列设置 | Boolean | --- | false |
| columnCacheKey | 列设置缓存key | String | --- | --- |
| showFullscreen | 是否显示全屏按钮 | Boolean | --- | false |
| showSize | 是否切换尺寸按钮 | Boolean | --- | false |


---

### 一些约定
- props里面的fetch方法，约定公共参如下，其他字段则由queryModel定义，约定字段可由`fieldConfig`配置
```json
{
  "pageNum": 1,
  "page": 30,
  "orderBy": "name",
  "order": "descending" // "ascending"
}
```

- fetch返回的数据约定如下

```json
{
  "total": 123,
  "data": [{}, {}, {}]
}
```

---

### Events
同[m-table](#/Components/m-table)，并新增以下

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| selection-chagne | 勾选事件 | selection |

---

### Slots
| slot名称 | 说明 |
| :---- | :---- |
| query | 查询表单，规则参考[m-query-form](#/Components/m-query-form) |
| table | [m-table](#/Components/m-table) 的default slot |
| tools | 标题右侧的操作按钮位置 |
| query-tools | 查询栏的按钮位置 |

---

### Methods

| 方法名 | 说明 | 参数 |
| :---- | :---- | :---- |
| getSelection | 获取选中的数据 | --- |
| fetchData | 请求数据 | resetPage是否重置页码 |
