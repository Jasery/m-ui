const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const fs = require("fs");

const componentDir = path.resolve("./docs/components");
const components = fs.readdirSync(componentDir).map(p => ({
  name: path.basename(p, ".md"),
  content: path.resolve(componentDir, p)
}));

const sections = [
  {
    name: "Guide",
    content: path.resolve("./docs/guide.md")
  },
  {
    name: "Components",
    sectionDepth: 2,
    sections: components
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
