### 描述
把`el-date-picker`绑定的值转为常用的10位时间戳

### 基本用法
```vue
<template>
  <div>  
    <m-date-picker
      v-model="value1"
      @change="onChange1"
    ></m-date-picker>
    <br />
    <m-date-picker
      v-model="value2"
      type="datetimerange"
      picker-options
      @change="onChange2"
    ></m-date-picker>
  </div>
</template>
<script>
const getUnix = () => Math.floor(Date.now() / 1000)
export default {
  data() {
    return {
      value1: getUnix(),
      value2: [getUnix() - 1000, getUnix() + 1000]
    }
  },
  methods: {
    onChange1(value) {
      console.log('onChange1', value);
    },
    onChange2(value) {
      console.log('onChange2', value);
    }
  }
}
</script>
```

---

### Props
同[el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)，不过由于转换了绑定值，`value-format`属性会失效

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| pickerOptions |当前时间日期选择器特有的选项参考下表, 同`el-date-picker`, 传true设置内置选项 | Object/Boolean | --- | --- |

---

### Slots
同[el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)

---

### Events
同[el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)

---

### Methods

同[el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)
