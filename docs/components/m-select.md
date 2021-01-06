### 描述
简化用法，传递一个选项列表即可

### 基本用法
```vue
<template>
  <div>
    <m-select 
      v-model="value" 
      :options="options" 
      placeholder="请选择"
      @change="onChange"
    ></m-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: null,
      options: [{
        label: '选项1',
        value: 1
      }, {
        label: '选项2',
        value: 2
      }, {
        label: '选项3',
        value: 3
      }]
    }
  },
  methods: {
    onChange(value) {
      console.log('on change', value)
    }
  }
}
</script>
```
---

### Props
兼容`el-select`，并新增以下prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | : ---- | 
| options | 下拉的选项 | Array | --- | --- |
| labelKey | options的元素作为label显示的key | string | --- | label |
| valueKey | options的元素作为value的key | string | --- | value |
| disabledKey | 禁用选项的key | string | --- | disabled |

另外，调整以下默认值

| 参数 | 默认值 |
| :---- | :---- |
| size | small |
| clearable | true |
| filterable | true |

---

### Events
同`el-select`

---

### Slots
同`el-select`，default slot 跟options同时存在的话，default solt的选项会在最前面

---

### Methods
同`el-select`
