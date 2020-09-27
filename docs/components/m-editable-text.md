### 描述
可编辑显示文本

### 基本用法
```vue
<template>
  <div>  
    <m-editable-text 
      :value="text"
      placeholder="这里是可以编辑的区域"
      @save="onSave"
    ></m-editable-text>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "点击我试试"
    }
  },
  methods: {
    onSave(value) {
      this.$message.success("修改成功");
      this.text = value;
    }
  }
}
</script>
```

### 添加校验
```vue
<template>
  <div>  
    <m-editable-text 
      :value="num"
      :rules="rules"
      placeholder="请输入一个整数"
      @save="onSave"
      @validate="onValidate"
    ></m-editable-text>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: "",
      rules: [
        { required: true, message: "修改内容不能为空" },
        { pattern: /^[0-9]+$/, message: "请输入一个整数" }
      ]
    }
  },
  methods: {
    onSave(value) {
      if (value === this.num) {
        return;
      }
      this.$message.success("修改成功");
      this.num = value;
    }, 
    onValidate(error) {
      if (error) {
        this.$message.error(error);
      }
    }
  }
}
</script>
```

### 多行编辑
```vue
<template>
  <div>  
    <m-editable-text 
      :value="text"
      multi-line
      placeholder="多行编辑"
      @save="onSave"
    ></m-editable-text>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "可换行文本\n下一行"
    }
  },
  methods: {
    onSave(value) {
      this.$message.success("修改成功");
      this.text = value;
    }
  }
}
</script>
```

---

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| value | 内容 | string | --- | --- |
| multiLine | 是否多行编辑 | boolean | --- | false |
| disabled | 是否禁用 | boolean | --- | fasle |
| rules |  校验规则，用法同el-form-item | Array | --- | --- |
| placeholder | placeholder | string | --- | --- |

---

### Slots
无

---

### Events

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| save | 修改确认 | 修改的内容 |
| validate | 校验 | 错误消息，校验通过则传null |

---

### Methods
无
