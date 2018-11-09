'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api', //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          '^/doc': '/doc', //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          '^/guide': '/guide' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/doc': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/doc': '/doc', //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/guide': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/guide': '/guide' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/manageCenter': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/manageCenter': '/manageCenter' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/users': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/users': '/users' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/setting': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/setting': '/setting' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  test: {
    proxyTable: {
      '/api': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api', //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          '^/doc': '/doc', //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          '^/guide': '/guide' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/doc': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/doc': '/doc', //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/guide': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/guide': '/guide' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/manageCenter': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/manageCenter': '/manageCenter' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/users': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/users': '/users' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/setting': {
        target: 'http://localhost:3000', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/setting': '/setting' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      }
    },
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
