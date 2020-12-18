### 描述
对事件显示的封装

### 基本用法
```vue
<template>
  <div>
    <div>
      <span>传递时间戳：</span>
      <m-time :value="value1"></m-time>
    </div>
    <div>
      <span>传递Date对象：</span>
      <m-time :value="value2"></m-time>
    </div>
    <div>
      <span>只显示日期：</span>
      <m-time :value="value1" date-only></m-time>
    </div>
    <div>
      <span>自定义格式：</span>
      <m-time :value="value2" format="YY/MM/DD HH:mm"></m-time>
    </div>
    <div>
      <span>距离现在时长：</span>
      <m-time :value="value1" relative></m-time>
    </div>
  </div>
</template>
<script>
import { MUtils } from "m-ui";
export default {
  data() {
    return {
      value1: MUtils.dateToUnix(new Date) - 1000,
      value2: new Date
    }
  }
}
</script>
```
### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| value | 时间值 | Number/Date | --- | --- |
| dateOnly | 只显示日期 | Boolean | --- | false |
| format | 格式 | string | --- | --- |
| relative | 是否是相对时间 | boolean | --- | false |
