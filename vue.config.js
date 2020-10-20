const path = require("path");

module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, "site", "examples"),
  publicPath: "/examples",
  pages: {
    examples: {
      entry: "examples/main.js"
    }
  }
};
