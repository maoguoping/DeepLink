// app路由处理
import Vue from 'vue'
import VueRouter from 'vue-router'
import Doc from '../components/docView/DocView.vue'
import DocEdit from '../components/docView/DocEdit.vue'
Vue.use(VueRouter);
//首页路由
const index=Vue.component('index', function (resolve) {
  require(['../components/index/index.vue'], resolve)
});
//管理中心路由
const manageCenter=Vue.component('manageCenter', function (resolve) {
  require(['../components/manageCenter/manageCenter.vue'], resolve)
});
//数据中心路由
const dataCenter=Vue.component('dataCenter', function (resolve) {
  require(['../components/dataCenter/dataCenter.vue'], resolve)
});
//设置路由
const setting=Vue.component('setting', function (resolve) {
  require(['../components/setting/setting.vue'], resolve)
});
const router=new VueRouter({
  // mode: 'history',
  routes:[
    { name:'/',path: '/', component: index ,props: (route) => ({ query: route.query.q }) },
    { name:'/index',path: '/index', component: index ,props: (route) => ({ query: route.query.q }) },
    { name:'manageCenter',path: '/manageCenter', component: manageCenter ,props: (route) => ({ query: route.query.q }) },
    { name:'dataCenter',path: '/dataCenter', component: dataCenter ,props: (route) => ({ query: route.query.q }) },
    { name:'setting',path: '/setting', component: setting ,props: (route) => ({ query: route.query.q }) },
    { name:'doc',path: '/doc', component: Doc },
    { name:'edit',path:'/edit',component:DocEdit}
  ]
});
export default router
