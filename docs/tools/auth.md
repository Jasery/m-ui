### 说明
权限服务，支持路由及节点元素鉴权，约定权限信息格式如下：
```json
{
  "moduleA": {
    "subModuleA": {
    "permission1": true,
      "permission2": false
    },
    "subModuleB": false
  },
  "moduleB": false
}
```


### 使用
```vue
<template>
  <div class="container">
    <div class="module">
      <el-button type="success" v-auth="['module1.permission1']">Button1</el-button>
      <el-button type="primary" v-auth="['module1.permission2']">Button2</el-button>
      <el-button type="warning" v-auth="['module1.permission3']">Button3</el-button>
      <el-button type="danger" v-auth="['module1.permission4']">Button4</el-button>
    </div>
    <div class="module" v-auth:scope="'module2'">
      <el-button type="success" v-auth:scope v-auth="['permission1']">Button1</el-button>
      <el-button type="primary" v-auth:scope v-auth="['permission2']">Button2</el-button>
      <el-button type="warning" v-auth:scope v-auth="['permission3']">Button3</el-button>
      <el-button type="danger" v-auth:scope v-auth="['permission4']">Button4</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      authData: {
        module1: {
          permission1: true,
          permission2: true,
          permission3: false,
          permission4: true
        },
        module2: {
          permission1: true,
          permission3: true,
          permission4: false
        }
      }
    }
  },
  mounted() {
    this.$auth.setAuth(this.authData);
  },
  methods: {}
}
</script>
<style scope>
.container {
  display: flex;
  flex-direction: column;
}
.container .module {
  display: flex;
  margin-bottom: 10px;
}
</style>
```


### 拦截路由
使用
```ts
import {routerAuth} from 'm-ui';

const routes = [
  {
    path: '/welcome',
    component: Welcome,
    auth: 'module1.welcome'
  },
  {
    path: '/setting',
    component: Setting,
    auth: 'module2.setting'
  }
]

new VueRouter({
  // 后面的参数表示没有权限时的重定向
  routes: routerAuth(routes, '/403')
});
```
> 注意：这里子路由的权限路径也要写全路径，不是相对路径

> 补充：如需多个权限或的关系，传入一个数组即可，如果还不能满足可传一个回调，会接收鉴权服务($auth)作为参数，返回boolean值表示有没有权限


### 页面元素控制v-auth指令
```html
<!-- 接收一个数组作为参数，权限路径作为元素 -->
<button v-auth="['moduleA.subModuleB.permission1']">按钮</button>

<!-- 多个权限值表示或的关系 -->
<button 
  v-auth="['moduleA.subModuleB.permission1', 'moduleA.subModuleB.permission2']"
>按钮</button>

<!-- 如需多个权限值与的关系，请加多个指令 -->
<button 
  v-auth="['moduleA.subModuleB.permission1']"
  v-auth="['moduleA.subModuleB.permission2']"
>按钮</button>


<!-- 当只有一个权限值时，可以直接传递字符串 -->
<button v-auth="'moduleA.subModuleB.permission2'">按钮</button>

<!-- scope -->
<!-- 当权限路径过长时，可以添加scope指定权限范围 -->
<div class="container" v-auth:scope="'moduleB.subModuleA'">
    <!-- 等同于 v-auth="'moduleB.subModuleA.permission1'" -->
    <button v-auth:scope v-auth="'permission1'">按钮1</button>
    <button v-auth:scope v-auth="'permission2'">按钮2</button>

    <!-- scope不起效果 -->
    <button v-auth="'permission3'">按钮3</button>

    <div class="wrap" v-auth:scope="'moduleA'">
        <!-- 等同于 v-auth="'moduleA.permission3'" -->
        <button v-auth:scope v-auth="'permission3'">按钮4</button>
    </div>
</div>
<!-- 注意 -->
<!-- 1. 要使用权限范围，必须添加v-auth:scope  -->
<!-- 2. 每个scope必须指定绝对路径 -->
<!-- 3. v-auth:scope 必须写到前面，并且只会找到最近一层指定了scope值的父节点作为范围 -->
<!-- 4. 添加了scope的元素，会等于默认给这个元素加上scope的值作为权限值 -->
<!-- 5. 避免scope跟权限值写到不同组件 -->
<!-- 6. 其他更复杂的场景请使用$auth -->
```


### $auth服务接口
1. setAuth(authData: Object): void
设置权限信息，
2. checkAuth(authKey: string): boolean
检查权限，返回true表示有权限
3. subscribe(context: any, func: Function): void
订阅，权限信息有更新会触发方法，把$auth作为参数传入，如果设置过权限信息则会立即调用一次
4. unsubscribe(context: any, func: Function): void
取消订阅，不传func则取消掉context上所有的订阅
5. hasSetAuth(): boolean
检查是否已经设置过权限信息
