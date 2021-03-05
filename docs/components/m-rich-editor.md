### 描述
对富文本编辑器wangeditor的封装

> 由于组件体积过大，现在已拆分成独立的仓库，详情见[m-rich-editor](https://git.mingchao.com/mcwebfe-deps/m-rich-editor)


### 基本用法

```vue
<template>
  <div>
    <m-rich-editor 
      v-model="text"
      server-host="http://common-server.com"
    ></m-rich-editor>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: ""
    }
  },
  methods: {}
}
</script>
```


### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| value | 内容 | String | --- | --- |
| height | 编辑器高度 | Number | --- | 500 |
| disabled | 是否禁用 | Boolean | --- | fasle |
| uploadPath |  文件上传url | String | --- | --- |
| memus | 菜单列表 | Array | 参考官方文档 | --- |
| editorOptions | editor其他配置 | Object | 参考官方文档 | --- |
| wordConvertUrl | word文档转换地址 | String | --- | --- |
| serverHost | 外部服务地址 | String | --- | --- |
| ext | 自定义参数 | Object | --- | --- |

---

### Slots
无

---

### Events

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| change | 内容改变 | 修改的内容 |

---


### Methods

| 方法名 | 说明 | 参数 |
| :---- | :---- | :---- |
| getEditor | 获取editor实例 | --- |


