### 描述
对`el-dialog`的增强，默认添加footer

### 基本用法
```vue
<template>
  <div>  
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <m-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :confirm-loading="loading"
      @confirm="onConfirm"
    >
      <span>这是一段信息</span>
    </m-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false
    }
  },
  methods: {
    onConfirm() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.dialogVisible = false;
        this.$message.success("修改成功")
      }, 1000)
    }
  }
}
</script>
```

### Props
保留`el-dialog`的props，新增以下

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| size | 弹框尺寸 | string | large/middle/small | middle |
| showFooter | 是否显示脚部 | boolean | --- | true |
| cancelText | 取消按钮文本 | string | --- | 取消 |
| confirmText | 确认按钮文本 | string | --- | 确认 |
| confirmLoading | 确认按钮loading | boolean | --- | false |
| easyClose | 点击遮罩或按esc关闭弹框 | boolean | --- | true|


---

### Slots
同`el-dialog`

---

### Events
同`el-dialog`，并新增以下

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| confirm | 确认按钮点击事件 | --- |
| cancel | 取消按钮点击事件 | --- |


---

### Methods

同`el-dialog`
