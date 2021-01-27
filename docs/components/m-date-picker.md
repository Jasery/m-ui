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

---

### Slots
同[el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)

---

### Events
同[el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)

---

### Methods

同[el-date-picker](https://element.eleme.cn/#/zh-CN/component/date-picker)
