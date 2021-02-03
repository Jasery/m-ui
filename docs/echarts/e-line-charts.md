## 描述
对折线图的常用场景的封装，简化使用的API，只要按照约定的格式拼装好数据进行传递即可，让这类业务场景更多的去关注数据而不是echart的配置。复杂场景请直接使用`<e-charts>`

### 基本用法
```vue
<template>
  <div>
    <e-line-charts 
      style="height: 500px;"
      :data="chartData"
      :config="config"
    ></e-line-charts>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        title: '我的图表',
        xAxisKey: 'type',
        toolbox: ["saveAsImage", "restore", "dataView", "dataZoom"],
        dataZoomX: true,
        legendMap: {
          sales: '销量',
          output: '产量'
        },
      },
      chartData: [{
        type: '衬衫',
        sales: 5,
        output: 10,
      }, {
        type: '羊毛衫',
        sales: 20,
        output: 15
      }, {
        type: '雪纺衫',
        sales: 36,
        output: 25
      }, {
        type: '裤子',
        sales: 10,
        output: 5
      }, {
        type: '高跟鞋',
        sales: 10,
        output: 15
      }, {
        type: '袜子',
        sales: 20,
        output: 35
      }]
    }
  }
}
</script>
```


### 多个y轴
```vue
<template>
  <div>
    <e-line-charts 
      style="height: 500px;"
      :data="chartData"
      :config="config"
    ></e-line-charts>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        title: '我的图表',
        xAxisKey: 'type',
        legendMap: {
          sales: '销量',
          output: '产量'
        },
        yAxisConfig: [{
          key: 'sales',
          name: '销售额',
          formatter: '{value}万'
        }, {
          key: 'output',
          name: '产量',
          formatter: '{value}吨'
        }]
      },
      chartData: [{
        type: '衬衫',
        sales: 5,
        output: 10,
      }, {
        type: '羊毛衫',
        sales: 20,
        output: 15
      }, {
        type: '雪纺衫',
        sales: 36,
        output: 25
      }, {
        type: '裤子',
        sales: 10,
        output: 5
      }, {
        type: '高跟鞋',
        sales: 10,
        output: 15
      }, {
        type: '袜子',
        sales: 20,
        output: 35
      }]
    }
  }
}
</script>
```

### 柱状图
```vue
<template>
  <div>
    <e-line-charts 
      style="height: 500px;"
      :data="chartData"
      :config="config"
    ></e-line-charts>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        title: '我的图表',
        xAxisKey: 'type',
        legendMap: {
          sales: '销量',
          output: '产量'
        },
        barKeys: ['output']
      },
      chartData: [{
        type: '衬衫',
        sales: 5,
        output: 10,
      }, {
        type: '羊毛衫',
        sales: 20,
        output: 15
      }, {
        type: '雪纺衫',
        sales: 36,
        output: 25
      }, {
        type: '裤子',
        sales: 10,
        output: 5
      }, {
        type: '高跟鞋',
        sales: 10,
        output: 15
      }, {
        type: '袜子',
        sales: 20,
        output: 35
      }]
    }
  }
}
</script>
```

### 时间轴
```vue
<template>
  <div>
    <e-line-charts 
      style="height: 500px;"
      :data="chartData"
      :config="config"
    ></e-line-charts>
  </div>
</template>
<script>
let base = +new Date(1988, 9, 3);
let oneDay = 24 * 3600 * 1000;
let value = Math.round(Math.random() * 300);
let data = {[base]: [[base, value]]};
for (let i = 1; i < 2000; i++) {
    let now = +new Date(base += oneDay);
    value = Math.round((Math.random() - 0.5) * 20 + value);
    data[now] = [now,value];
}

export default {
  data() {
    return {
      config: {
        title: '时间轴',
        xAxisConfig: {
          type: 'time',
          boundaryGap: false
        },
        seriesConfig: {
          symbol: 'none'
        },
        dataZoomX: true
      },
      chartData: data
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
1. 传递列表，如示例，然后通过config中的`xAxisKey`字段配置横坐标字段，`legendMap`配置对应纵坐标以及名称
```json
[
  {key1: value1, key2: value2},
  ...
]
```
2. 传递对象，此时可以不用传递`xAxisKey`，组件使用对象的key作为横坐标，依然可以通过`legendMap`配置纵坐标，这种数据格式不能保证key的顺序
```json
{
  key1: {field1:value1},
  key2: {field1:value2}
}
```

#### config字段
| 字段 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| xAxisKey | 横坐标key | String | --- | --- |
| xAxisConfig | 横坐标配置| Object | --- | --- |
| yAxisConfig | 纵坐标配置,key、name、formatter | Array/Object | --- | --- |
| toolbox | 工具箱， | Array | ["saveAsImage", "restore", "dataView", "dataZoom"] | --- |
| tooltip | 提示 | Boolean | --- | true |
| axisPointer | 坐标轴指示器配置项 | Boolean/String | --- | --- |
| dataZoomX | 缩放组件x轴 | Boolean | --- | --- |
| dataZoomY | 缩放组件y轴 | Boolean | --- | --- |
| barKeys  | 显示为柱状图的key | Array | --- | --- |
| seriesConfig  | series配置 | Object | --- | --- |
