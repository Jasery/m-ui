### 描述
表格过滤表单

### 基本用法
```vue
<template>
  <div>  
    <m-checkbox-group
      class="mg-b-12"
      v-model="props"
      :options="options"
    ></m-checkbox-group>
    <m-query-form
      :model="form"
      :fields="fields"
      :show-submit="props.includes('submit')"
      :show-reset="props.includes('reset')"
      @submit="onSubmit"
    >
      <template v-if="props.includes('tools')" v-slot:tools>
        <el-button type="success" size="small">自定义</el-button>
      </template>
    </m-query-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      props: ["reset", "submit", "tools"],
      options: [{
        label: '重置按钮',
        value: 'reset'
      }, {
        label: '查询按钮',
        value: 'submit'
      }, {
        label: '自定义',
        value: 'tools'
      }],
      form: {
        name: '',
        region: '',
        type: [],
        resource: '',
      },
      fields: [{
        label: '活动名称',
        prop: 'name',
        component: 'el-input'
      }, {
        label: '活动区域',
        prop: 'region',
        component: 'm-select',
        componentProps: {
          placeholder: '请选择活动区域',
          options: [{
            label: '上海',
            value: 'shanghai'
          }, {
            label: '北京',
            value: 'beijing'
          }]
        }
      }, {
        label: '特殊资源',
        prop: 'resource',
        component: 'm-checkbox-group',
        componentProps: {
          single: true,
          options: [{
            label: '线上品牌商赞助',
            value: 'online'
          }, {
            label: '线下场地免费',
            value: 'offline'
          }]
        }
      }, {
        label: '活动性质',
        prop: 'type',
        component: 'm-checkbox-group',
        componentProps: {
          options: [{
            label: '美食/餐厅线上活动',
            value: 'online'
          }, {
            label: '地推活动',
            value: 'offline'
          }]
        }
      }]
      
    }
  },
  methods: {
    onSubmit(query) {
      console.log('query', query);
      this.$message.success("submit event");
    }
  }
}
</script>
```

### 结合table
```vue
<template>
  <div>
    <m-query-form
      class="mg-b-12"
      :model="model"
      :default-collapse="false"
      :submit-loading="loading"
      :fields="fields"
      @submit="fetch"
    >
    </m-query-form>
    <m-table
      :data="data"
      :columns="columns"
      :table-loading="loading"
      height="400px"
      @page-change="fetch"
    ></m-table>
  </div>
</template>
<script>
import Mockjs from "mockjs";
const request = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let mock = Mockjs.mock({
        "data|5-10": [
          {
            name: "@first",
            "gender|+1": ["male", "female"],
            "age|1-100": 100,
          },
        ],
      });
      resolve(mock);
    }, 1000);
  });
};
const sexOptions = [
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
  {
    label: "其他",
    value: 3,
  },
];
const gradeOptions = [
  {
    label: "一年级",
    value: 1,
  },
  {
    label: "二年级",
    value: 2,
  },
];
export default {
  data() {
    return {
      model: {
        name: "",
        sex: null,
        grade: [],
      },
      loading: false,
      data: [],
      fields: [
        {
          label: "姓名",
          prop: "name",
          component: "el-input",
        },
        {
          label: "性别",
          prop: "gender",
          component: "m-select",
          componentProps: {
            options: sexOptions,
          },
        },
        {
          label: "年级",
          prop: "grade",
          component: "m-checkbox-group",
          componentProps: {
            options: gradeOptions,
          },
        },
      ],
      columns: [
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "性别",
          prop: "gender",
        },
        {
          label: "年龄",
          prop: "age",
        },
      ],
    };
  },
  mounted() {
    this.fetch(this.model);
  },
  methods: {
    fetch(query) {
      this.loading = true;
      request(query).then((res) => {
        this.loading = false;
        this.data = res.data;
      });
    },
  },
};
</script>

```

### Props

兼容 [el-form](https://element.eleme.cn/#/zh-CN/component/form) 的props，部分已设置不需要再次设置，新增以下props


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| collapseable | 是否可折叠 | Boolean | --- | true |
| defaultCollapse | 默认是否折叠 | Boolean | --- | true |
| submitLoading | 提交按钮的loading | Boolean | --- | fasle |
| fields | 表单的字段列表，参考 [m-form](#/Components/m-form) | Array | --- | --- |
| show-submit | 是否显示提交按钮 | Boolean | --- | true |
| show-reset | 是否显示重置按钮 | Boolean | --- | true |

---

### Slots

| 名称 | 说明 |
| :---- | :---- |
| default | 请使用`el-form-item`作为slot，此组件会自动布局和折叠|
| tools | 按钮区域的slot |

---

### Events

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| submit | 提交事件 | model |
| collapse | 折叠事件 | collapse |

---

### Methods
无
