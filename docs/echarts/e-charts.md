## 描述
echarts的基础封装

## 使用
```ts
import Echarts from "m-ui/src/echarts";

// 由于echarts体积过大，需自己手动引入
Vue.use(Echarts);
```

> 注意：echarts需要自己本地安装，且版本需为5.0以上

## 基本用法

```vue
<template>
  <div>
    <el-button size="small" @click="showLoading">loading</el-button>
    <el-switch
      v-model="theme"
      active-text="主题light"
      active-value="light"
      inactive-text="主题dark"
      inactive-value="dark"
      >
    </el-switch>
    <e-charts 
      style="height: 500px;margin-top: 20px;"
      :loading="loading"
      :theme="theme"
      :options="options"
      ></e-charts>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      theme: "light",
      options: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  methods: {
    showLoading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
}

</script>
```

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| options | echart配置，参考[echarts](https://echarts.apache.org/zh/option.html) | Object | --- | --- |
| loading | loading | Boolean | --- | --- |
| theme | 主题 | String/Object | --- | --- |
| initOptions | 初始化选项 | Object | --- | --- |
| autoresize | 自动resize | Boolean | --- | --- |
| watchShallow | 浅监听 | Boolean | --- | --- |

---

### Slots
无

---

### Events
参考[事件](https://echarts.apache.org/zh/api.html#events)


---

### Methods
参考[echartsInstance](https://echarts.apache.org/zh/api.html#echartsInstance)
