const path = require("path");

module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, "site", "examples"),
  publicPath: "/mcwebfe-deps/m-ui/pages/examples",
  pages: {
    "mcwebfe-deps/m-ui/pages/examples": {
      entry: "examples/main.js"
    }
  }
};
