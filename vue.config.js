const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  lintOnSave: false,  
  css: {
    loaderOptions: {
      sass: {
        // 支持多个scss样式文件，
        //老版本sass-loader的options参数名为data,
        //新版本sass-loader把data改为了prependData
        prependData: `@import "@/assets/css/global.scss";`
      }
    }
  },
  devServer: {
    https: false,
    proxy: {
      '/repair': {
        target: 'http://101.35.153.193:8001',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  },
})
