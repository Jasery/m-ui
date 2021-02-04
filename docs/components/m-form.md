### 描述
增强型form

### 基本用法
```vue
<template>
  <div>
    <m-form
      :model="model"
      :fields="fields"
      @input="onChange"
    >
    </m-form>
    <div>{{model}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        name: '',
        age: 0,
      },
      fields: [{
        label: "姓名",
        prop: "name",
        rules: [{required: true, message: '姓名不能为空'}],
        component: 'el-input',
        componentProps: {
          placeholder: '请输入姓名',
          clearable: true
        }
      }, {
        label: "年龄",
        prop: "age",
        component: 'el-slider',
        componentProps: {
          showInput: true
        }
      }]
    }
  },
  methods: {}
}
</script>
```


### 字段用slot传递
```vue
<template>
  <div>
    <m-form
      :model="model"
      :fields="fields"
    >
      <template #genderLabel>
        <span>
          <el-tooltip content="这是提示" placement="top">
            <i class="el-icon-info cur-p"></i>
          </el-tooltip>
          性别
        </span>
      </template>
      <template #gender>
        <m-checkbox-group
          single
          v-model="model.gender"
          :options="[{
            label: '男',
            value: 1
          }, {
            label: '女',
            value: 2
          }]"
        ></m-checkbox-group>
      </template>
    </m-form>
    <div>{{model}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        name: '',
        gender: null,
      },
      fields: [{
        label: "姓名",
        prop: "name",
        rules: [{required: true, message: '姓名不能为空'}],
        component: 'el-input',
        componentProps: {
          placeholder: '请输入姓名',
          clearable: true
        }
      }, {
        prop: "gender",
        rules: [{required: true, message: '请选择性别'}],
        slotName: "gender",
        labelSlotName: 'genderLabel'
      }]
    }
  },
  methods: {}
}
</script>
```


### 自定义组件
```vue
<template>
  <div>
    <m-form
      :model="model"
      :fields="fields"
    >
    </m-form>
    <div>{{model}}</div>
  </div>
</template>
<script>
const CustomInput = {
  template: `
<template>
  <el-input v-bind="$attrs" v-on="$listeners" placeholder="自定义input" />
</template>
  `,
  methods: {
    validator(rule, value, callback) {
      if(value && value.length > 20) {
        callback()
      } else {
        callback(new Error("长度必须大于20"))
      }
    }
  }
}
export default {
  data() {
    return {
      model: {
        name: '',
        other: '',
      },
      fields: [{
        label: "姓名",
        prop: "name",
        rules: [{required: true, message: '姓名不能为空'}],
        component: 'el-input',
        componentProps: {
          placeholder: '请输入姓名',
          clearable: true
        }
      }, {
        prop: "other",
        label: '其他',
        component: CustomInput
      }]
    }
  },
  methods: {}
}
</script>
```
> 提示：在自定义组件里面如果定义了`validator`方法会被作为校验方法



### 多列布局
```vue
<template>
  <div>
    <m-form
      :model="model"
      :fields="fields"
    >
    </m-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        name: '',
        email: '',
        bio: '',
        tag: ''
      },
      fields: [
        { 
          group: [{
            label: '姓名',
            prop: 'name',
            component: 'el-input'
          }, {
            label: '邮箱',
            prop: 'email',
            component: 'el-input'
          }]
        },
        {
          group: [{
            label: '简介',
            prop: 'bio',
            component: 'el-input'
          }, {
            label: '标签',
            prop: 'tag',
            component: 'el-input'
          }]
        }
      ]
    }
  },
  methods: {}
}
</script>
<style>
</style>
```


---

### Props
兼容[el-form](https://element.eleme.cn/#/zh-CN/component/form)，并新增以下prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| fields | 表格的列，详细见以下表格 | array | --- | --- |

#### fields
fields 里面的元素数据格式兼容[el-form-item](https://element.eleme.cn/#/zh-CN/component/form)的props，并新增以下字段

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| labelSlotName | 对应el-form-item的label slot的名字 | string | --- | --- |
| slotName | 用对应el-form-item的默认 slot的名字 | string | --- | --- |
| compnent | 表单组件，根据prop自动绑定值 | string \| object | --- | --- |
| compnentProps | 表单组件的props | Object  | --- | --- |
| group | 嵌套选项，字段相同，多个item并列布局 | Array  | --- | --- |

---

### Events
同[el-form](https://element.eleme.cn/#/zh-CN/component/form)，新增以下

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| input | 有输入变化 | model值 |

---

### Slots
| 名称 | 说明 |
| :---- | :---- |
| deafult | 默认内容，在fields内容之前 |
| append | 在fields内容之后 |

---

### Methods
同[el-form](https://element.eleme.cn/#/zh-CN/component/form)，新增以下

| 方法名 | 说明 | 参数 |
| :---- | :---- | :---- |
| getElForm | 获取el-form组件实例| --- |

