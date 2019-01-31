import axios from './axios'
import api from './interface'

export default {
  install: (Vue, options) => {
    // 挂载实例
    Vue.prototype.$axios = axios
    Vue.prototype.$api = api
  }
}
