// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import VueQuillEditor from 'vue-quill-editor'
import appRouter from './router/appRouter.js'
import axios from './lib/axios'
import store from './store/store.js'
import utils from './lib/utils'
// require styles
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/font-icon/iconfont.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import lib from '@/lib'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueCookie)
Vue.use(axios)
Vue.use(lib)
Vue.use(VueQuillEditor /* { default global options } */)
Vue.config.productionTip = false
window.utils = utils
utils.bind()
/* eslint-disable no-new */
const router = appRouter.router
// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
