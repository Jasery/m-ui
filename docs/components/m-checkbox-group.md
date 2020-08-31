### 描述
结合`el-checkbox-group`和`el-radio-group`，简化用法

### 基本用法
```vue
<template>
  <div class="container">  
    <m-checkbox-group
      v-model="value1"
      :options="options"
      @change="onChange"
    ></m-checkbox-group>
    <m-checkbox-group
      v-model="value2"
      :options="options"
      single
      @change="onChange"
    ></m-checkbox-group>
    <m-checkbox-group
      v-model="value1"
      :options="options"
      button-style
      @change="onChange"
    ></m-checkbox-group>
    <m-checkbox-group
      v-model="value2"
      :options="options"
      button-style
      single
      @change="onChange"
    ></m-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: [1, 2],
      value2: 1,
      options: [{
        label: "选项1",
        value: 1,
      }, {
        label: "选项2",
        value: 2,
      }, {
        label: "选项3",
        value: 3,
      }, {
        label: "选项4",
        value: 4,
      }]
    }
  },
  methods: {
    onChange(value) {
      console.log('onChange', value);
    }
  }
}
</script>
<style scope>
.container {
  display: flex;
  row-gap: 10px;
  flex-direction: column;
}
</style>
```

---

### Props
兼容`el-checkbox-group`，新增以下prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| options | 选项列表 | Array | --- | --- |
| labelKey | options的元素作为label显示的key | string | --- | label |
| valueKey | options的元素作为value的key | string | --- | value |
| disabledKey |  options的元素禁用的key | string | --- | disabled |
| single | 是否是单选 | boolean |  | false |
| buttonStyle | 是否是按钮样式 | boolean | --- | false |

调整以下默认值

| 参数 | 默认值 |
| :---- | :---- |
| size | small |

---

### Slots
同`el-checkbox-group`或`el-radio-group`

---

### Events
同`el-checkbox-group`或`el-radio-group`

---

### Methods

无
