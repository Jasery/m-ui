### 描述
异常页用于对页面特定的异常状态进行反馈。通常，它包含对错误状态的阐述，并向用户提供建议或操作，避免用户感到迷失和困惑。

### 基本用法
```vue
<template>
  <div>
    <m-checkbox-group
      v-model="type"
      :options="types"
      single
      button-style
    ></m-checkbox-group>
    <m-exception :type="type"></m-exception>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 'browser',
      types: [
        {label: '403', value: '403'},
        {label: '404', value: '404'},
        {label: '500', value: '500'},
        {label: 'browser', value: 'browser'},
      ]
    }
  },
  methods: {}
}
</script>
```

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| type | 异常类型 | string | 403/404/500/browser | 500 |
| title | 标题 | string | --- | 根据类型显示 |
| desc | 描述 | string | --- | 根据类型显示 |
| img | 错误图片 | string | --- | 根据类型显示 |
| redirect | 返回按钮的跳转路径 | string | --- | / |
| btnText | 按钮文本 | string | --- | 返回首页|


---

### Slots
default, 按钮的位置

---

### Events
无


---

### Methods

无
