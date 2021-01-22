### 安装
1. package.json添加依赖
```json
{
  "dependencies": {
    "m-ui": "git+https://git.mingchao.com/git/mcwebfe-deps/m-ui.git#v0.0.9"
  }
}
```
2. npm install 安装依赖
3. .babelrc 命名为babel.config.json
4. vue.config.js添加配置
```ts
const muiChainWebpack = require("m-ui/config/chain-webpack");
module.exports = {
  chainWebpack: config => {
    muiChainWebpack(config);
  },
}
```


### 使用
```ts
import MUI from "m-ui";

// 全局引用
Vue.use(MUI);

// 按需引用
import {MForm, MSelect} from "m-ui";
export default {
  components: {
    MForm,
    MSelect
  }
}

```

### 更新
1. 更新package.json中m-ui的tag后缀
2. 重新安装npm install
3. 检查ChangeLog看是否有不兼容更新

### 贡献指南
- 提交规范使用Angular规范，参考[Commit message 和 Change log 编写指南 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- 终端推荐使用`commitizen`，`IDEA`推荐`Git Commit Template`，`VS Code`推荐`VSCode Conventional Commits`


### 注意：
1. 使用前请先引入element-ui，依赖2.13.2版本以上的element-ui
2. m-ui当前不输出构建版本，依赖本地构建，请确保本地安装好sass，lodash
