const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve("../backend/fe"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3030/api",
        changeOrigin: true,
        pathRewrite: {
          "^api": "",
        },
      },
    },
  },
});
