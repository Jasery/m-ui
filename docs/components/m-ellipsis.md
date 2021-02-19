### 描述
文本过长自动处理省略号

### 基本用法
```vue
<template>
  <m-ellipsis :text="text" :max-height="50" :collapseable="true" :default-collaspe="true">
  </m-ellipsis>
</template>
<script>
export default {
  data() {
    return {
      text: '富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善、'.repeat(10)
    }
  }
}
</script>
```

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| text | 文本内容 | String | --- | --- |
| maxHeight | 最大高度，超出则折叠 | Number | --- | 50 |
| ellipsisText | 省略文本 | String | --- | ... |
| collapseable | 是否可以折叠展开 | Boolean | --- | true |
| defaultCollaspe | 默认折叠 | Boolean | --- | true |

---

### Slots
无

---

### Events
无

---

### Methods

无
