### 描述
针对clipboard.js做封装

### 基本用法
```vue
<template>
  <div>  
  <el-input v-model="value">
    <template slot="append">
      <el-button 
        slot="append" 
        icon="el-icon-copy-document" 
        v-clipboard:text="value"
        v-clipboard:success="onSuccess"
        v-clipboard:error="onError"
      ></el-button>
    </template>
  </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 'm-ui clipboard',
    }
  },
  methods: {
    onSuccess() {
      this.$message.success('copy success, try paste')
    },
    onError() {
      this.$message.error('copy error');
    }
  }
}
</script>
```

### 指定元素
```vue
<template>
  <div>
    <p id="test-element" style="font-size: 20px; color: #E6A23C">
      这是一段测试文本
    </p>
    <el-button 
      type="primary"
      size="small"
      v-clipboard:target="'#test-element'"
      v-clipboard:success="onSuccess"
      v-clipboard:error="onError"
    >复制</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    onSuccess() {
      this.$message.success('此次复制包括样式, 可以在富文本编辑器里尝试粘贴')
    },
    onError() {
      this.$message.error('copy error');
    }
  }
}
</script>
```

### $copyText
```vue
<template>
  <div>
    <el-button 
      type="primary"
      size="small"
      @click="onClick1"
    >点击复制文本</el-button>
    <el-button 
      type="primary"
      size="small"
      @click="onClick2"
    >点击复制节点</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    onClick1() {
      this.$copyText("这是复制的文本")
        .then(() => {
          this.$message.success("复制文本成功");
        })
    },
    onClick2() {
      this.$copyText({
        target: '#test-element'
      }).then((e) => {
        this.$message.success('复制节点成功');
      })
    }
  }
}
</script>
```

---

### 指令参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| text | 需要复制的文本 | string | --- | --- |
| target | 需要复制的元素，填入选择器即可 | string | --- | --- |
| action | 复制或剪切 | string | copy/cut | copy |
| success |  成功的回调 | function | --- | --- |
| error |  失败的回调 | function | --- | --- |

### tips
1. action必须在text或target前
2. text或target可以省略，省略则先当做选择器查找元素，没有此元素则认为是text

