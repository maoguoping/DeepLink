// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
Vue.config.productionTip = false;
/* eslint-disable no-new */
Vue.use(VueRouter);
import Guide from './components/guide/Guide.vue'
import Doc from './components/doc/Doc.vue'
import DocIndex from './components/doc/DocIndex.vue'
import HeaderBar from './components/HeaderBar.vue'
const routes = [
    {path:'/',component:DocIndex},
    { path: '/index', component: DocIndex },
    { path: '/doc', component: Doc }
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
