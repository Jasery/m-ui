const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, "site", "examples"),
  publicPath: isProduction ? "/mcwebfe-deps/m-ui/pages/examples" : "/examples",
  pages: {
    index: {
      entry: "examples/main.js"
    }
  }
};
