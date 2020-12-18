### 描述
添加状态显示

### 基本用法
```vue
<template>
  <div>
    <m-status>Primary</m-status>
    <m-status type="success">Success</m-status>
    <m-status type="info">Info</m-status>
    <m-status type="warning">Warning</m-status>
    <m-status type="danger">Danger</m-status>
  </div>
</template>
<script>
export default { }
</script>
```
---

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | : ---- | 
| type | 类型 | string | primary/success/warning/info/error | primary |

---
