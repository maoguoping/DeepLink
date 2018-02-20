// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import 'bootstrap/js/modal.js'
import 'bootstrap/js/dropdown.js'
import 'bootstrap/js/tooltip.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'summernote'
import 'summernote/dist/lang/summernote-zh-CN.js'
import 'summernote/dist/summernote.css'
Vue.config.productionTip = false;
/* eslint-disable no-new */
Vue.use(VueRouter);
Vue.use(ElementUI);
import Guide from './components/guide/Guide.vue'
import Doc from './components/doc/Doc.vue'
import DocIndex from './components/doc/DocIndex.vue'
import DocEdit from './components/doc/DocEdit.vue'
import HeaderBar from './components/HeaderBar.vue'
const routes = [
    {path:'/',component:DocIndex},
    { path: '/index', component: DocIndex },
    { name:'doc',path: '/doc', component: Doc },
    { name:'mangerCenter',path: '/mangerCenter', component: Doc },
    { name:'edit',path:'/edit',component:DocEdit}
]
const router=new VueRouter({
    mode: 'history',
    routes:routes
});
new Vue({
  el:'#app',
  router,
  template: '<App/>',
  components: { App }
});
