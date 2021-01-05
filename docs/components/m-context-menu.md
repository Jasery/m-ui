### 描述
鼠标右键上下文菜单

### 基本用法
```vue
<template>
  <div>
    <m-context-menu
      :menus="menus"
      @command="onCommand"
    >
      <div class="box">
        点击右键试试
      </div>
    </m-context-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          title: 'menu1',
          command: 'menu1',
        },
        {
          title: "menu2",
          menus: [{
            title: 'menu3',
            command: 'menu3',
          }, {
            title: 'menu4',
            command: 'menu4',
            line: true,
          }, {
            title: 'menu5',
            command: 'menu5',
            disabled: true
          }]
        }
      ]
    }
  },
  methods: {
    onCommand(command) {
      console.log('onCommand', command)
    }
  }
}
</script>
<style scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: yellow;
}
</style>

```

### Props
兼容`el-button`，新增以下

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| menus | 菜单配置, 格式如下 | Array | --- | --- |


#### menu格式

| 字段 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| title | 标题 | String | --- | --- |
| command | 命令 | String | --- | --- |
| menus | 子菜单列表 | Array | --- | --- |
| line | 底线 | Boolean | --- | --- |
| disabled | 是否禁用 | boolean | --- | --- |

---

### Slots
default

---

### Events

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| command | 选择事件，传递menu的command字段 | --- |


---

### Methods
无
