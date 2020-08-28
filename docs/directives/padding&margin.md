### 描述
工具指令，动态设置元素的padding或margin

### 基本用法

```vue
<template>
  <div>
    <div class="block" v-padding="padding">
      <div class="item" v-margin="margin"></div>
      <div class="item" v-margin:l="margin*2"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      padding: 20,
      margin: 20
    }
  }
}
</script>
<style scope>
.block .item {
  width: 100px;
  height: 100px;
  background-color: #409eff;
}
</style>
```

### 参数
可添加参数指定方向，不传默认full

| 参数 | 说明 |
| :---- | :---- |
| f/full | 四面 |
| l/left | 左 |
| r/right | 右 |
| t/top | 上 |
| b/bottom | 下 |
| h/horizontal | 左右 |
| v/vertical | 上下 |
