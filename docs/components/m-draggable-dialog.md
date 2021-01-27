### 描述
可拖拽的dialog，同时支持最小最大化及修改尺寸

### 基本用法
```vue
<template>
  <div>
    <el-button @click="dialogVisible = true">显示</el-button>
    <el-button @click="$message('hello')">msg</el-button>
    <m-draggable-dialog
      :visible.sync="dialogVisible"
      title="draggable dialog"
    >
      <div>
        <div class="block">内容1</div>
        <div class="block">内容2</div>
      </div>
    </m-draggable-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {}
}
</script>
<style scoped>
.block {
  height: 100px;
  margin: 10px;
}
</style>
```

### Props
保留[m-dialog](#/Components/m-dialog)的props，新增以下

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| maxable | 是否可以最大化 | boolean | --- | true |
| minable | 是否可以最小化 | boolean | --- | true |
| resizeable | 是否可以修改尺寸 | boolean | --- | true |
| minPos | 最小化的位置 | Object | --- | {top: 100, left:100} |
| minimumSize | 最小尺寸 | Object | --- | {width:200, height:200} |


---

### Slots
同[m-dialog](#/Components/m-dialog)

---

### Events
同[m-dialog](#/Components/m-dialog)，并新增以下

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| min | 最小化 | --- |
| max | 最大化 | --- |
| resize | 尺寸变化 | --- |

---

### Methods

同[m-dialog](#/Components/m-dialog)
