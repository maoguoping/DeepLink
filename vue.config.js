const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const cdn = {
  js: [
    'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.3/vuex.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/vue-lazyload/1.3.3/vue-lazyload.js',
    'https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js'
  ]
}
// const rootUrl = 'http://localhost:3000'
const rootUrl = 'http://localhost:3000'
module.exports = {
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: config => {
    /* 添加分析工具 */
    if (isProduction) {
      // 添加cdn
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
      if (process.env.npm_config_report) {
        config.plugin('webpack-bundle-analyzer').use(
          require('webpack-bundle-analyzer').BundleAnalyzerPlugin
        ).end()
      }
    }
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config.optimization.splitChunks({
      cacheGroups: {
        common: {
          name: 'chunk-common', // 打包后的文件名
          chunks: 'initial', //
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          reuseExistingChunk: true
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        elementUi: {
          name: 'element-ui',
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          chunks: 'initial',
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    })

  // 或者
  // 修改它的选项：
  // config.plugin('prefetch').tap(options => {
  //   options[0].fileBlacklist = options[0].fileBlacklist || []
  //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
  //   return options
  // })
  },
  devServer: {
    open: false,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: rootUrl, // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api', // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          '^/doc': '/doc', // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          '^/guide': '/guide' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
        // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/userManage/add’即可 代理后地址栏显示/
        }
      },
      '/doc': {
        target: rootUrl, // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/doc': '/doc' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
        // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/userManage/add’即可 代理后地址栏显示/
        }
      },
      '/guide': {
        target: rootUrl, // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/guide': '/guide' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
        // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/userManage/add’即可 代理后地址栏显示/
        }
      },
      '/manageCenter': {
        target: rootUrl, // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/manageCenter': '/manageCenter' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
        // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/userManage/add’即可 代理后地址栏显示/
        }
      },
      '/users': {
        target: rootUrl, // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/users': '/users' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
        // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/userManage/add’即可 代理后地址栏显示/
        }
      },
      '/setting': {
        target: rootUrl, // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/setting': '/setting' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
        // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/userManage/add’即可 代理后地址栏显示/
        }
      }
    }
  },
  configureWebpack: (config) => {
    if (isProduction) {
    // 为生产环境修改配置...
      config.mode = 'production'
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-lazyload': 'VueLazyload',
        'axios': 'axios'
      }
      config.optimization.minimizer.map((arg) => {
        const option = arg.options.terserOptions.compress
        option.drop_console = true // 打开开关
        return arg
      })
      return {
        module: {
          rules: [
            {
              test: /\.js$/,
              include: path.resolve('src'),
              use: [
                'thread-loader'
                // your expensive loader (e.g babel-loader)
              ]
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              use:[
                {
                  loader: 'url-loader',
                  options: {
                    limit: 10000
                  }
                }
              ]
            }
          ]
        },
        plugins: [
          new BundleAnalyzerPlugin(),
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            // 匹配文件名
            threshold: 10240,
            // 对超过10k的数据进行压缩
            deleteOriginalAssets: false
          // 是否删除原文件
          })
        ]
      }
    }
  },
  css: {
  // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: { }
  }
}
