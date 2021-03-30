### 描述
聊天记录

### 基本用法
```vue
<template>
  <div>
    <m-chat-record
      :data="records"
    ></m-chat-record>
  </div>
</template>
<script>
export default {
  data() {
    return {
      records: [{
        content: '今天天气怎么样？',
        type: 'text',
        time: Date.now(),
        position: 'left',
        nickName: 'ta的昵称'
      }, {
        content: {
          url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        },
        type: 'image',
        time: Date.now(),
        position: 'right',
        nickName: '我的昵称'
      }]
    }
  },
  methods: {
  }
}
</script>
<style scope>
</style>
```

---


### 自定义内容组件
```vue
<template>
  <div>
    <m-chat-record
      :data="records"
      :custom-component="customComponent"
    ></m-chat-record>
  </div>
</template>
<script>
export default {
  data() {
    return {
      records: [{
        content: '今天天气怎么样？',
        type: 'text',
        time: Date.now(),
        position: 'left',
        nickName: 'ta的昵称'
      }, {
        content: {
          url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        },
        type: 'image',
        time: Date.now(),
        position: 'right',
        nickName: '我的昵称'
      }],
      customComponent: {
        text: {
          props: {
            content: String,
            config: Object
          },
          template: `
            <span style="color: red;">{{this.content}}</span>
          `
        },
        image: {
          props: {
            content: Object,
            config: Object
          },
          template: `
            <img :src="content.url" style="width: 100px; filter: blur(3px)" />
          `
        }
      }
    }
  },
  methods: {
  }
}
</script>
<style scope>
</style>
```

---
### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| data | 聊天记录数据，约定数据格式如下`Record字段` | Array | --- | --- |
| customComponent | 自定义消息内容组件，已内置了普通文本跟图片的显示组件 | Object | --- | --- |
| leftBgColor | 左边的聊天气泡背景颜色 | String | --- | #ccc |
| rightBgColor | 右边的聊天气泡背景颜色 | String | --- | #9eea6a |

#### Record字段
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| type | 消息类型，对应`customComponent`传递的组件，内置`text`和`image` | String | --- | --- |
| content | 消息内容，格式自定义，会传递给自定义组件 | Any | --- | --- |
| avatar | 头像 | String | --- | --- |
| nickName | 昵称 | String | --- | --- |
| time | 时间，可传Date对象或13位时间戳 | Date/Number | --- | --- |
| position | 位置 | String | left/right | --- |
| showNickName | 是否显示昵称 | Boolean | --- | --- |
| showAvatar | 是否显示头像 | Boolean | --- | --- |
| showTime | 是否显示时间 | Boolean | --- | --- |

---

### Slots
无

---

### Events
无

---

### Methods

无
