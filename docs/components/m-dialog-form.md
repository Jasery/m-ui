### 描述
对常见创建编辑类型的弹窗的封装，基于`m-dialog`和`m-form`

### 基本用法
```vue
<template>
  <div>
    <el-button type="primary" @click="create">新增</el-button>
    <el-button type="primary" @click="edit">编辑</el-button>
    <m-dialog-form
      :visible.sync="visible"
      :title="title"
      :fields="fields"
      :default-model="defaultModel"
      :model-value="editItem"
      :create-fn="createFn"
      :update-fn="updateFn"
    >
      <template v-slot:field2="{ model }">
        <el-input v-model="model.field2" placeholder="input from slot "></el-input>
      </template>
    </m-dialog-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      editItem: null,
      fields: [{
        label: 'field1',
        prop: 'field1',
        component: 'el-input'
      }, {
        label: 'field2',
        prop: 'field2',
        slotName: 'field2'
      }, {
        label: 'field3',
        prop: 'field3',
        component: 'el-input'
      }],
      defaultModel: {
        field1: '1',
        field2: '2',
        field3: '3'
      }
    }
  },
  computed: {
    title() {
      return this.editItem ? "编辑" : "新增";
    }
  },
  methods: {
    create() {
      this.editItem = null;
      this.visible = true;
    },
    edit() {
      this.editItem = {
        field1: 'field1',
        field2: 'field2',
        field3: 'field3'
      };
      this.visible = true;
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    createFn(model) {
      console.log('create-fn', model);
      return this.delay(1000);
    },
    updateFn(model) {
      console.log('update-fn', model);
      return this.delay(1000);
    }
  }
}
</script>
```

### Props
保留[m-dialog](#/Components/m-dialog)的props，新增以下

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| fields | 表单字段 | Array | 参考[m-dialog](#/Components/m-dialog) | --- |
| defaultModel | 新增时的默认model | Object | --- | --- |
| modelValue | 编辑的model | Object | --- | --- |
| formProps | [m-form](#/Components/m-form)的props | Object | --- | --- |
| createFn | 创建方法,model作为参数，返回Promise | Function | --- | --- |
| updateFn | 更新方法,model作为参数，返回Promise | Function | --- | --- |


---

### Slots
同[m-form](#/Components/m-form)

---

### Events
同[m-dialog](#/Components/m-dialog)，并新增以下

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| saved | 创建或更新完成 | createFn或updateFn的返回值 |


---

### Methods

| 方法名 | 说明 | 
| :---- | :---- | 
| getElForm | 获取组件内的`el-form` |
