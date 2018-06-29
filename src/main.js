// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
import  appRouter from './router/appRouter.js'
import store from './router/store.js'
// require styles
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.config.productionTip = false
/* eslint-disable no-new */
const router=appRouter.router;
const Store=store;
console.log(Store);
const app=new Vue({
  el:'#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
