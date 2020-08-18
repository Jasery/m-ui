const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

const sections = [
  {
    name: "Components",
    sections: [
      {
        name: "hello m-ui",
        sectionDepth: 2,
        content: path.resolve("./docs/hello-mui.md")
      }
    ]
  }
];

module.exports = {
  styleguideDir: "docs",
  pagePerSection: true,
  ribbon: {
    url: "https://gitlab.mingchao.com/zhangguoyun/m-ui"
  },
  sections,
  require: ["./styleguide"],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader"
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"]
        },
        {
          test: /\.sass$/,
          loaders: ["vue-style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(woff2?|eot|[ot]tf)(\?.*)?$/,
          loader: "file-loader"
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
};
