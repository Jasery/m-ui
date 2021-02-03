## 描述
对折线图的常用场景的封装，简化使用的API，只要按照约定的格式拼装好数据进行传递即可，让这类业务场景更多的去关注数据而不是echart的配置。复杂场景请直接使用`<e-charts>`

### 基本用法
```vue
<template>
  <div>
    <e-pie-charts 
      style="height: 500px;"
      :data="chartData"
      :config="config"
    ></e-pie-charts>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        title: '我的图表',
        name: '销量',
        toolbox: ["saveAsImage"],
        legendMap: {}
      },
      chartData: [{
        name: '衬衫',
        value: 5,
      }, {
        name: '羊毛衫',
        value: 20,
      }, {
        name: '雪纺衫',
        value: 36
      }, {
        name: '裤子',
        value: 10
      }, {
        name: '高跟鞋',
        value: 10
      }, {
        name: '袜子',
        value: 20
      }]
    }
  }
}
</script>
```


### 对象类型数据
```vue
<template>
  <div>
    <e-pie-charts 
      style="height: 500px;"
      :data="chartData"
      :config="config"
    ></e-pie-charts>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      config: {
        title: '我的图表',
        name: '销量',
        legendMap: {
          shirt: '衬衫',
          sweater: '羊毛衫',
          chiffon: '雪纺衫',
          trousers: '裤子',
          // highHeelsShoes: '高跟鞋',
          // socks: '袜子'
        }
      },
      chartData: {
        shirt: _.random(10, 100),
        sweater: _.random(10, 100),
        chiffon: _.random(10, 100),
        trousers: _.random(10, 100),
        highHeelsShoes: _.random(10, 100),
        socks: _.random(10, 100),
      }
    }
  }
}
</script>
```

### Props
继承自`e-charts`，并新增以下

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| config | 配置 | Object | --- | --- |
| data | 数据 | Array/Object | --- | --- |
| options | echarts配置，最终会跟组件生成的配置合并 | Object | --- | --- |

---

#### data数据格式
1. 传递列表，如示例
```json
[
  {name: name1, value: value1},
  ...
]
```
2. 传递对象，通过`legendMap`设置字段的名称
```json
{
  key1: value1,
  key2: value2
}
```

#### config字段
| 字段 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| name  | name | String | --- | --- |
| legendMap  | 字段映射 | Object | --- | --- |
| toolbox | 工具箱 | Array | ["saveAsImage", "restore", "dataView", "dataZoom"] | --- |
| tooltip | 提示 | Boolean | --- | true |
| selectedMode | 选中模式 | String/Boolean | single/multiple/boolean | single |
| seriesConfig  | series配置 | Object | --- | --- |
| radius  | 半径 | String | --- | 60% |
