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
    <el-tree
      :props="props"
      :data="authInfo"
      node-key="name"
      show-checkbox
      default-expand-all
      :default-checked-keys="['btn1', 'btn2', 'btn3', 'btn4']"
      ref="tree"
      @check-change="handleCheckChange"
    >
    </el-tree>
    <div class="module" v-auth="['module1']">
      <h2>module1</h2>
      <div class="btn-container">
        <el-button 
          size="small" 
          type="primary"
          v-auth="['module1.btn1']"
        >btn1</el-button>
        <el-button 
          size="small" 
          type="danger"
          v-auth="['module1.btn2']"
        >btn2</el-button>
      </div>
    </div>
    <div class="module" v-auth:scope="'module2'">
      <h2>module2</h2>
      <div class="btn-container">
        <el-button 
          size="small" 
          type="success"
          v-auth:scope
          v-auth="'btn3'"
        >btn3</el-button>
        <el-button 
          size="small" 
          type="warning"
          v-auth:scope
          v-auth="'btn4'"
        >btn4</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "children"
      },
      authInfo: [{
        name: 'module1',
        checked: true,
        children: [
          { name: 'btn1', checked: true }, 
          { name: 'btn2', checked: true }
        ]
      }, {
        name: 'module2',
        checked: true,
        children: [
          { name: 'btn3', checked: true }, 
          { name: 'btn4', checked: true }
        ]
      }]
    }
  },
  mounted() {
    this.$auth.setAuth(this.authData);
  },
  methods: {
    handleCheckChange(node, checked, childChecked) {
      node.checked = checked || childChecked;
      let authData = this.getAuth(this.authInfo);
      console.log(authData);
      this.$auth.setAuth(authData);
    },

    getAuth(nodes) {
      return nodes.reduce((acc, cur) => {
        if(!cur.checked) {
          acc[cur.name] = false
        } else if (cur.children) {
          acc[cur.name] = this.getAuth(cur.children);
        } else {
          acc[cur.name] = true;
        }
        return acc;
      }, {});
    }
  }
}
</script>
<style scope>
.container {
  display: flex;
  flex-direction: column;
}
.container .module {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
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


### $auth方法

| 方法名称 | 说明 | 参数 |
| :---- | :---- | :---- |
| setAuth | 设置权限信息 | authData：权限树 |
| checkAuth | 检查权限，返回true表示有权限 | authKey：权限值 |
| subscribe | 订阅，权限信息有更新会触发方法，把$auth作为参数传入，如果设置过权限信息则会立即调用一次 | context: 当前上下文， func:方法 |
| unsubscribe | 取消订阅，不传func则取消掉context上所有的订阅 | context: 当前上下文， func:方法 |
| hasSetAuth | 检查是否已经设置过权限信息 | --- |

