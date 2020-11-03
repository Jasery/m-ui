### 说明
对请求的封装

### 用法
```ts
import { request } from "m-ui";

// 设置配置
const config = {
  // axios config
}
request.setConfig(config)


// 设置请求头
function getHeader() {
  // do something
  return { 
    key: 'value'
  }
}
request.setGlobalHeader(getHeader)


// 设置拦截器
request.addRequestInterceptor(function(config) {
  console.log('before request', config);
  return config;
});

request.addResponseInterceptor(function(response) {
  console.log('after request', response)
  if(response.status === 400) {
    showLoginDialog();
  }
  return response;
});


// 发起请求
request.get('/api1')
  .then(res => {
    if (res.ret === 0) {
      console.log(res.data)
    } else {
      showError(res.msg)
    }
  })
  .catch(err => {
    showError(err.message || err)
  })
```

### 方法

| 方法名 | 说明 | 参数 |
| :---- | :---- | :---- |
| setConfig | 设置axios配置 | config |
| setGlobalHeader | 设置全局头部 | func |
| addRequestInterceptor | 添加请求拦截 | 同axios.interceptors.request.use |
| addResponseInterceptor | 添加响应拦截 | 同axios.interceptors.response.use |
| request | 请求方法 | 同axios.request |
| get | get请求 |  |
| del | del请求 |  |
| patch | patch请求 |  |
| put | put请求 |  |
| post | post请求 |  |

