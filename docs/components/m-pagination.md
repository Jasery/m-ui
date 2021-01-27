### 描述
设置了默认值和样式的分页组件

### 基本用法
```vue
<template>
  <div>  
    <m-pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      @page-change="onPageChange"
    ></m-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 30,
      total: 1000
    }
  },
  methods: {
    onPageChange(currentPage, pageSize) {
      console.log('on page change:');
      console.log('currentPage', currentPage)
      console.log('pageSize', pageSize)
    }
  }
}
</script>
```

---

### Props
同[el-pagination](https://element.eleme.cn/#/zh-CN/component/pagination)

---

### Slots
同[el-pagination](https://element.eleme.cn/#/zh-CN/component/pagination)

---

### Events
同[el-pagination](https://element.eleme.cn/#/zh-CN/component/pagination)
新增以下事件

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| page-change | 页码或分页大小有变化时触发 | 两个参数，第一个当前页面，第二个分页大小 |

---

### Methods

无
