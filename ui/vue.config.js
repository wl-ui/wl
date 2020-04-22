
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
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/css/variables.scss";`
      }
    }
  }
};
