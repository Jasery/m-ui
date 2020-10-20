### 描述
工具指令，动态设置元素的color或background-color

### 基本用法

```vue
<template>
  <div>
    <div class="block">
      <div class="item" v-color="color">
        {{color}}
      </div>
      <div class="item" v-bg-color="bgColor">
        {{bgColor}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: "red",
      bgColor: "#aaa"
    }
  }
}
</script>
<style scope>
.block .item {
  width: 100px;
  height: 100px;
  margin: 10px;
}
</style>
```

