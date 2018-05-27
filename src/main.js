// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import  router from './router/appRouter.js'
// require styles
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(ElementUI);
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el:'#app',
  router,
  template: '<App/>',
  components: { App }
});
