### 描述
动态设置元素的高度，使元素底部也浏览器底部保持固定距离

### 基本用法

```html
<template>
  <div>
    <div v-fix-bottom="20" class="fix-item">
      content
    </div>
    <p>尝试调节浏览器大小</p>
  </div>
</template>
<script>
export default {
}
</script>
<style scope>
.fix-item {
  position: fixed;
  top: 10px;
  right: 0;
  width: 200px;
  border: 1px solid #82aaff;
}
</style>
```

### 注意
此指令的作用元素不能出现在带滚动条的容器内（不过主要应用场景也是为了屏蔽滚动条）
