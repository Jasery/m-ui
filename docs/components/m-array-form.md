### 描述
对数组类型的表单输入的封装

### 基本用法
```vue
<template>
  <div>
    <m-array-form
      v-model="array"
      component="el-input"
      :rules="[{ required: true, message: '必填' }]"
      item-default-value=""
    >
    </m-array-form>
    {{ array }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      array: []
    }
  },
  methods: {
  }
}
</script>
```
### 复杂场景
```vue
<template>
  <div>
    <el-button type="primary" size="small" @click="add">添加</el-button>
    <m-array-form
      v-model="arrayModel"
      :item-default-value="defaultItem"
      emptiable
      ref="arrayForm"
      :component="component"
    >
    </m-array-form>
    <div class="ta-r">
      <el-button type="primary" size="small" @click="submit">提交</el-button>
    </div>
    {{ arrayModel }}
  </div>
</template>
<script>
const personComponent = {
  template: `
<div>
  <div class="fs-18">人物{{index+1}}</div>
  <m-form
    :fields="formFields"
    :model="value"
    @input="value => $emit('input', value)"
    ref="mForm"
  ></m-form>
</div>
  `,
  props: {
    value: Object,
    index: Number
  },
  data() {
    return {
      formFields: [{
        label: '姓名',
        prop:'name',
        component: 'el-input',
        rules: [{ required: true, message: '姓名是必填项' }]
      }, {
        label: '性别',
        prop: 'gender',
        component: 'm-select',
        componentProps: {
          style: {
            width: '100%'
          },
          options: [{
            label: '男',
            value: 1
          }, {
            label: '女',
            value: 2
          }]
        }
      }, {
        label: '年龄',
        prop: 'age',
        component: 'el-slider',
        componentProps: {
          'show-input': true
        }
      }]
    }
  },
  methods: {
    validate() {
      return this.$refs.mForm.validate()
    }
  }
}
export default {
  data() {
    return {
      arrayModel: [{
        name: 'm-ui',
        gender: 2,
        age: 22
      }],
      defaultItem: {
        name: '',
        gender: 1,
        age: 18
      },
      component: personComponent
    }
  },
  methods: {
    add() {
      this.$refs.arrayForm.addItem();
    },
    submit() {
      let comps = this.$refs.arrayForm.getFieldComponents()
      Promise.all(comps.map(item => item.validate()))
        .then((valids) => {
          if(valids.every(v => v)) {
            this.$message.success("校验通过")
          }
        })
    }
  }
}
</script>
```

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| value | 值 | Array | --- | --- |
| itemDefaultValue | 数组元素的默认值 | any | --- | --- |
| rules | 校验 | Array | --- | --- |
| component | 元素的表单组件 | string/object | --- | --- |
| componentProps | 组件props | Object | --- | --- |
| componentEvents | 组件事件 | Object | --- | --- |


---

### Slots
列表组件

---

### Events
同[m-form](#/Components/m-form)，并新增以下

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| input | 元素改变 | value|


---

### Methods

| 方法名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| validate | 校验 | --- |
| addItem | 加一项 | --- |
| removeItem | 移除一项 | index |
