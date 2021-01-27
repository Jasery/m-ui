### 描述
带二次确认的el-button

### 基本用法
```vue
<template>
  <div>
    <m-confirm-button
      :msg="msg"
      type="primary"
      @confirm="onConfirm"
      @cancel="onCancel"
    >确认</m-confirm-button>
    
    <m-confirm-button
      :msg="msg"
      force-confirm
      type="danger"
      @confirm="onConfirm"
      @cancel="onCancel"
    >强确认</m-confirm-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '这里是确认信息'
    }
  },
  methods: {
    onConfirm() {
      this.$message.success("操作成功");
    },
    onCancel() {
      console.log("取消操作");
    }
  }
}
</script>
```

### Props
兼容[el-button](https://element.eleme.cn/#/zh-CN/component/button)，新增以下

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| msg | 提示内容 | string | --- | --- |
| tipsType | 提示的类型 | string | success/info/warning/error | warning |
| forceConfirm | 是否是强提示 | Boolean | --- | false |
| confirmButtonText | 确认按钮文本 | string | --- | 确定 |
| cancelButtonText | 取消按钮文本 | string | --- | 取消 |

---

### Slots
同[el-button](https://element.eleme.cn/#/zh-CN/component/button)

---

### Events
取消了原本的click事件

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| confirm | 确认事件 | --- |
| cancel | 取消事件 | --- |


---

### Methods
无
