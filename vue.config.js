module.exports = {
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  baseUrl: '/',
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api', // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          '^/doc': '/doc', // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          '^/guide': '/guide' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/doc': {
        target: 'http://localhost:3000', // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/doc': '/doc' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/guide': {
        target: 'http://localhost:3000', // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/guide': '/guide' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/manageCenter': {
        target: 'http://localhost:3000', // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/manageCenter': '/manageCenter' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/users': {
        target: 'http://localhost:3000', // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/users': '/users' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      '/setting': {
        target: 'http://localhost:3000', // 设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/setting': '/setting' // 这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      }
    }
  }
};
