### 说明
对文件下载的封装

### 用法
```ts
export default {
  methods: {
    onClick() {
      // url
      this.$download("path/to/your/file")

      // content
      this.$download({
        content: "text content", // or File/Blob
        filename: "myfile.txt"
      });

      // post
      this.$download({
        url: "path/to/your/file",
        method: "post",
        data: {
          param1: "value1",
          param2: "value2",
        }
      });
    }
  }
}
```


### options

| 字段 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- | 
| url | 下载的文件路径 | String | --- | --- |
| filename | 指定文件名，优先使用服务端返回的文件名 | String | --- | --- |
| content | 已有内容做成文件下载的形式保存 | String/Bolb | --- | --- |
| method | 请求方法 | String | get/post | --- |
| data | 请求参数，post会以FormData形式提交，不是字符串字段会转为json |  Object | --- | --- |

