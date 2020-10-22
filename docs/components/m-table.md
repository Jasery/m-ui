### 描述
增强型table，封装了分页以及滚动加载

### 基本用法
```vue
<template>
  <div>
    <m-table :data="data" :columns="columns">
      <template v-slot:gender={row}>
        <span :class="row.gender">{{row.gender}}</span>
      </template>
    </m-table>
  </div>
</template>
<script>
import Mockjs from "mockjs"
let mock = Mockjs.mock({
  "data|1-10": [{
    name: "@first",
    "gender|+1": ["male", "female"],
    "age|1-100": 100
  }]
});
export default {
  data() {
    return {
      data: mock.data,
      columns: [{
        label: "姓名",
        prop: "name"
      }, {
        label: "性别",
        slotName: "gender"
      }, {
        label: "年龄",
        formatter: (row) => row.age + "岁"
      }]
    }
  }
}
</script>
<style>
.male {
  color: #67C23A;
}
.female {
  color: #F56C6C;
}
</style>
```
---

### 分页
```vue
<template>
  <div>
    <m-table 
      :data="data" 
      :columns="columns"
      pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      :table-loading="loading"
      :height="400"
      @page-change="fetch"
    ></m-table>
  </div>
</template>
<script>
import Mockjs from "mockjs"
const request = (currentPage, pageSize) => {
  console.log({currentPage, pageSize});
  return new Promise(resolve => {
    setTimeout(() => {
      let mock = Mockjs.mock({
        "data|10-30": [{
          name: "@first",
          "gender|+1": ["male", "female"],
          "age|1-100": 100
        }],
        "total|100-1000": 1000
      });
      resolve(mock);
    }, 1000)
  })
}

export default {
  data() {
    return {
      data: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      columns: [{
        label: "姓名",
        prop: "name"
      }, {
        label: "性别",
        prop: "gender"
      }, {
        label: "年龄",
        prop: "age"
      }],
      loading: false
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.loading = true;
      request(this.currentPage, this.pageSize).then(res => {
        this.loading = false;
        this.total = res.total;
        this.data = res.data;
      })
    }
  }
}
</script>
```


### 滚动加载
```vue
<template>
  <div>
    <m-table 
      :data="data" 
      :columns="columns"
      :table-loading="loading"
      infinite-scroll
      :scroll-loading="scrollLoading"
      :no-more="noMore"
      :height="400"
      @scroll-load="scrollLoad"
      @page-change="fetch"
    ></m-table>
  </div>
</template>
<script>
import Mockjs from "mockjs"
const request = (currentPage) => {
  console.log({currentPage});
  return new Promise(resolve => {
    setTimeout(() => {
      if(currentPage >= 4) {
        resolve({data: []})
      }
      let mock = Mockjs.mock({
        "data|10-20": [{
          name: "@first",
          "gender|+1": ["male", "female"],
          "age|1-100": 100
        }],
        "total|100-1000": 1000
      });
      resolve(mock);
    }, 1000)
  })
}

export default {
  data() {
    return {
      data: [],
      currentPage: 1,
      columns: [{
        type: "index"
      },{
        label: "姓名",
        prop: "name"
      }, {
        label: "性别",
        prop: "gender"
      }, {
        label: "年龄",
        prop: "age"
      }],
      loading: false,
      scrollLoading: false,
      noMore: false
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.loading = true;
      this.currentPage = 1;
      request(this.currentPage).then(res => {
        this.loading = false;
        this.data = res.data;
      })
    },
    scrollLoad() {
      this.scrollLoading = true;
      request(this.currentPage + 1).then(res => {
        this.scrollLoading = false;
        this.currentPage++;
        if(res.data.length > 0) {
          this.data = this.data.concat(res.data);
        } else {
          this.noMore = true;
        }
      })
    }
  }
}
</script>
```




### Props
兼容`el-table`，并新增以下prop

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| pagination | 是否启用分页 | Boolean | --- | false |
| currentPage | 传递给m-pagination，支持sync | number | --- | --- |
| pageSize | 传递给m-pagination，支持sync | number | --- | --- |
| total | 传递给m-pagination | number | --- | --- |
| tableLoading | 表格区域loading | boolean | --- | false |
| infiniteScroll | 开启滚动加载，可以监听scroll-load事件 | boolean | --- | false |
| infiniteScrollDistance | 触发滚动加载距离 | number | --- | 150 |
| scrollLoading | 滚动加载loading | boolean | --- | false |
| noMore | 滚动加载的完毕标识为 | boolean | --- | false |
| fixedBottom | 固定底部距离 | number | --- | --- |
| columns | 表格的列，详细见以下表格 | array | --- | --- |

#### columns
columns 里面的元素数据格式兼容`el-table-column`的props，并新增以下字段

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| headerSlotName | 用作这一列的header slot的名字 | string | --- | --- |
| slotName | 用作这一列的默认 slot的名字 | string | --- | --- |
| compnent | 用于此列的组件，会把相应的属性传递 | string \| object | --- | --- |

---

### Events
同`el-table`，包含`m-pagination`的事件，并新增以下

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| scroll-load | 滚动加载触发事件 | --- |


---

### Slots
无

---

### Methods

| 方法名 | 说明 | 参数 |
| :---- | :---- | :---- |
| getElTable | 获取el-table组件实例，以调用其方法 | --- |
