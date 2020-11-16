### 描述
增强型form

### 基本用法
```vue
<template>
  <div>
    <m-form
      :model="model"
      :fields="fields"
      ref="form"
    >
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
    <div><el-button type="primary" @click="onValid">校验</el-button></div>
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
        born: null
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
        label: "性别",
        prop: "gender",
        rules: [{required: true, message: '请选择性别'}],
        slotName: "gender"
      }, {
        label: "出生日期",
        prop: "born",
        component: 'm-date-picker'
      }]
    }
  },
  methods: {
    onValid() {
      this.$refs.form.validate();
    }
  }
}
</script>
<style>
</style>
```
---

### Props
兼容`el-form`，并新增以下prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| fields | 表格的列，详细见以下表格 | array | --- | --- |

#### fields
fields 里面的元素数据格式兼容`el-form-item`的props，并新增以下字段

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| labelSlotName | 对应el-form-item的label slot的名字 | string | --- | --- |
| slotName | 用对应el-form-item的默认 slot的名字 | string | --- | --- |
| compnent | 表单组件，根据prop自动绑定值 | string \| object | --- | --- |
| compnentProps | 表单组件的props | Object  | --- | --- |
---

### Events
同`el-form`

---

### Slots
同`el-form`

---

### Methods
同`el-form`，新增以下

| 方法名 | 说明 | 参数 |
| :---- | :---- | :---- |
| getElForm | 获取el-form组件实例| --- |