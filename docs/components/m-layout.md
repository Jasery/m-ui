### 描述
布局组件

### 基本用法
```vue
<template>
  <m-layout height="500px"
    :show-header="headerShow"
    :show-aside.sync="asideShow"
    :collapse.sync="collapse"
    :menus="menus"
  >
    <template #header>
      <div class="header"> header content </div>
    </template>
    <template>
      <div class="content">
        main content
      </div>
    </template>
  </m-layout>
</template>
<script>
const menus = [{
  title: "memu1",
  index: 'menu1',
  icon: 'el-icon-location'
}, {
  title: '主菜单',
  index: 'main1',
  icon: 'el-icon-user',
  submenus: [{
    title: '子菜单1',
    index: 'sub1',
  }, {
    title: '子菜单2',
    index: 'sub2'
  }]
}]

export default {
  data() {
    return {
      headerShow: true,
      asideShow: true,
      collapse: false,
      menus
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scope>
.header {
  width: 100%;
  height: 100%;
}
.header {
  color: #ccc;
}
.aside {
  border-top: 1px solid forestgreen;
  color: #ccc;
}
.block {
  height: 100px;
  width: 100px;
  background-color: yellow;
  margin: 10px;
}
</style>
```
---

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| height | 容器高度 | number/string | --- | 100vh |
| collapse | 侧边栏折叠，可用 .sync | boolean | --- | false |
| showAside | 是否显示侧边栏，可用 .sync | boolean | --- | true |
| showHeader | 是否显示头部 | boolean | --- | true |
| animate | 是否动画 | boolean | --- | true |
| themeColor | 主题颜色，header和aside的背景颜色 | string | --- | #373d41 |
| menus | 菜单，元素格式参考下表 | array | --- | --- |
| menuDefaultActive | el-menu的default-active | string | --- | --- |
| menuConfig | el-menu的props | Object | --- | --- |
| showCollapseIcon | 是否显示侧边栏折叠icon | boolean | --- | true |
| showAsideToggleTag | 是否显示侧边栏拖拉icon | boolean | --- | false |

#### menus元素数据结构

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| icon | 菜单图标 | string | --- | --- |
| index | 菜单路径 | string | --- | --- |
| title | 菜单标题 | string | --- | --- |
| disabled | 是否禁用 | boolean | --- | --- |
| submenus | 子菜单列表，数据格式相同 | array | --- | --- |

---

### Events

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| menu-select | el-menu的select事件 | 参考el-menu |


---

### Slots
| 名称 | 说明 |
| :---- | :---- |
| header | 头部 | 
| aside | 侧边栏 | 
| default | 内容 |

---

### Methods

无

---

### 补充sass变量

| 变量名 | 说明 |
| :---- | :---- |
| $asideWidth | 侧边栏宽度 | 
| $asideCollapseWidth | 侧边栏折叠宽度 | 
| $headerHeight | 头部高度 |
| $colorBrand | 主颜色 |