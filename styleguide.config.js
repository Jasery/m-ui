const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const fs = require("fs");

const getDocs = dir =>
  fs.readdirSync(dir).map(p => ({
    name: path.basename(p, ".md"),
    content: path.resolve(dir, p)
  }));

const components = getDocs(path.resolve("./docs/components"));
const tools = getDocs(path.resolve("./docs/tools"));
const directives = getDocs(path.resolve("./docs/directives"));

const sections = [
  {
    name: "Guide",
    content: path.resolve("./docs/guide.md")
  },
  {
    name: "Components",
    sectionDepth: 2,
    sections: components
  },
  {
    name: "Directives",
    sectionDepth: 2,
    sections: directives
  },
  {
    name: "Tools",
    sectionDepth: 2,
    sections: tools
  }
];

module.exports = {
  styleguideDir: "site",
  pagePerSection: true,
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
          test: /\.scss$/,
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
