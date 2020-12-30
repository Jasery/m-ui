### 描述
增强型form

### 基本用法
```vue
<template>
  <div class="login-container">
    <m-login
      captcha-url="http://madminc-guide-debug.mingchao.com/captcha"
      :login-handle="loginHandle"
      @success="onSuccess"
    ></m-login>
  </div>
</template>
<script>
import { MUtils } from "m-ui";
export default {
  methods: {
    loginHandle(loginData) {
      console.log('loginData', loginData)
      // login
      return MUtils.delay(1000)
        .then(() => ({
          ret: Math.random() > 0.5 ? 0 : 1,
          errcount: 5,
          msg: Math.random() > 0.5 ? '密码错误' : '验证码错误' ,
          data: {
            username: 'MyName',
            uid: 10010
          }
        }))
    },
    onSuccess() {
      this.$message.success("登录成功，跳转主页")
    }
  }
}
</script>
<style>
.login-container {
  width: 300px;
  margin: auto;
}
</style>
```
---

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| title | 标题 | String | --- | 系统登录 |
| captchaUrl | 验证码url | String | --- | /captcha |
| loginHandle | 登录方法，返回登录结果 | Function | --- | --- |
| encryptPassword | 是否加密密码 | Boolean | --- | true |


### Events

| 事件名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| success | 登录成功 | 登录成功返回的数据 |

---

### Slots
无

---

### Methods
无
