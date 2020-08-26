### 安装
1. package.json添加依赖
```json
{
  "dependencies": {
    "m-ui": "git+https://git.mingchao.com/git/zhangguoyun/m-ui.git"
  }
}
```
2. npm install 安装依赖
3. .babelrc 命名为babel.config.json


### 使用
```ts
import MUI from "m-ui";

Vue.use(MUI);
```

### 注意：
1. 使用前请先引入element-ui
2. m-ui当前不输出构建版本，依赖本地构建，请确保本地安装好sass，lodash
