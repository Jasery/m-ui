### 描述
表格过滤表单

### 基本用法
```vue
<template>
  <div>  
    <m-query-form
      :model="form"
      @submit="onSubmit"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动性质" porp="type">
        <el-checkbox-group 
          v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </m-query-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        type: [],
        resource: '',
      },
      tyepOptions: [{
        label: '美食/餐厅线上活动',
        value: 'online'
      }, {
        label: '地推活动',
        value: 'online'
      }],
      
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
      :model="model" 
      :collapseable="false"
      :submit-loading="loading"
      @submit="fetch"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <m-select 
          v-model="model.sex"
          :options="sexOptions"
        ></m-select>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <m-checkbox-group
          v-model="model.grade"
          :options="gradeOptions"
        ></m-checkbox-group>
      </el-form-item>
    </m-query-form>
    <m-table 
      :data="data" 
      :columns="columns"
      :table-loading="loading"
      @page-change="fetch"
    ></m-table>
  </div>
</template>
<script>
import Mockjs from "mockjs"
const request = (query) => {
  console.log('query', query);
  return new Promise(resolve => {
    setTimeout(() => {
      let mock = Mockjs.mock({
        "data|5-10": [{
          name: "@first",
          "gender|+1": ["male", "female"],
          "age|1-100": 100
        }]
      });
      resolve(mock);
    }, 1000)
  })
}
const sexOptions = [
  {
    label: '男',
    value: 1
  }, 
  {
    label: '女',
    value: 2
  }, 
  {
    label: '其他',
    value: 3
  }
]
const gradeOptions = [
  {
    label: '一年级',
    value: 1
  }, 
  {
    label: '二年级',
    value: 2
  }
]
export default {
  data() {
    return {
      model: {
        name: '',
        sex: null,
        grade: []
      },
      loading: false,
      data: [],
      sexOptions,
      gradeOptions,
      columns: [{
        label: "姓名",
        prop: "name"
      }, {
        label: "性别",
        prop: "gender"
      }, {
        label: "年龄",
        prop: "age"
      }],
    }
  },
  mounted() {
    this.fetch(this.model);
  },
  methods: {
    fetch(query) {
      this.loading = true;
      request(query).then(res => {
        this.loading = false;
        this.data = res.data;
      })
    }
  }
}
</script>
```

### Props

兼容 `el-form` 的props，部分已设置不需要再次设置，新增以下props


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| collapseable | 是否可折叠 | boolean | --- | true |
| defaultCollapse | 默认是否折叠 | boolean | --- | true |
| submitLoading | 提交按钮的loading | boolean | --- | fasle |

---

### Slots
请使用`el-form-item`作为slot，此组件会自动布局和折叠

---

### Events

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| submit | 提交事件 | model |

---

### Methods
无
