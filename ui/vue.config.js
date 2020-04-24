
module.exports = {
  devServer: {
    hot: true,
    open: true,
    disableHostCheck: false,
    overlay: {
      warnings: false,
      errors: true
    },
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      'element-ui': 'Element',
    }
  },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/css/variables.scss";`
      }
    }
  }
};
