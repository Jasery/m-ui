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
同`m-form`，并新增以下

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| input | 元素改变 | value|


---

### Methods

| 方法名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| validate | 校验 | --- |
