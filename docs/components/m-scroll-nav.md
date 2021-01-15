### 描述
滚动导航

### 基本用法
```vue
<template>
  <div class="scroll-nav-container">
    <m-scroll-nav
      :navs="navs"
      container=".scroll-nav-container"
      @change="onNavChange"
    >
      <p 
        v-for="p in navs"
        :key="p.title"
      >{{p.title}}</p>
    </m-scroll-nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navs: [
        {title: "文章1"},
        {title: "文章2"},
        {title: "文章3"},
        {title: "文章4"},
      ]
    }
  },
  methods: {
    onNavChange(config, index) {
      console.log('on nav change', config, index);
    }
  }
}
</script>
<style>
.scroll-nav-container {
  height: 400px;
  overflow: auto;
}
.scroll-nav-container p { 
  border: 1px solid;
  height: 200px;
}
</style>
```

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| menus | 菜单列表 | Array | --- | --- |
| navMode | 菜单的模式 | String | horizontal/vertical | horizontal |
| sticky | 是否吸附 | Boolean | --- | true |
| stickyTop | 吸附顶部距离 | String/Number | --- | 0 |
| navStyle | 菜单样式 | Object | --- | --- |
| navClass | 菜单类名 | String/Object/Array | --- | --- |
| container | 滚动容器 | String | --- | .main-container |


---

### Slots
default, 内容

---

### Events

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| change | 当前导航改变 | navConfig, index |


---

### Methods

无
