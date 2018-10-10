/**
 * @file Axios的Vue插件（添加全局请求/响应拦截器）
 */

// https://github.com/mzabriskie/axios
import axios from 'axios'

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';

  return config
});

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  const data = response.data;

// 根据返回的code值来做不同的处理（和后端约定）
//   switch (data.code) {
//     case '0':
//       // 举例
//       // exp: 修复iPhone 6+ 微信点击返回出现页面空白的问题
//       if (isIOS()) {
//         // 异步以保证数据已渲染到页面上
//         setTimeout(() => {
//           // 通过滚动强制浏览器进行页面重绘
//           document.body.scrollTop += 1
//         }, 0)
//       }
//       // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
//       return data;
//     default:
//   }
  return data;
  // 若不是正确的返回code，且已经登录，就抛出错误
  const err = new Error(data.description);

  err.data = data;
  err.response = response;

  throw err
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误';
        break;

      case 401:
        err.message = err.response.data.message;
        break;

      case 403:
        err.message = '拒绝访问';
        break;

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`;
        break;

      case 408:
        err.message = '请求超时';
        break;

      case 500:
        err.message = '服务器内部错误';
        break;

      case 501:
        err.message = '服务未实现';
        break;

      case 502:
        err.message = '网关错误';
        break;

      case 503:
        err.message = '服务不可用';
        break;

      case 504:
        err.message = '网关超时';
        break;

      case 505:
        err.message = 'HTTP版本不受支持';
        break;

      default:
    }
  }
  return Promise.reject(err)
});
axios.install = (Vue) => {
  Vue.prototype.$axios = axios
};
export default axios
