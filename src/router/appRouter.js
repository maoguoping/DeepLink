// app路由处理
import Vue from 'vue'
import VueRouter from 'vue-router'
import Doc from '../components/docView/DocView.vue'
import DocEdit from '../components/docView/DocEdit.vue'
Vue.use(VueRouter);
const router=new VueRouter({
  // mode: 'history',
  routes:[
    { name:'/',path: '/' ,props: (route) => ({ query: route.query.q }) },
    { name:'/index',path: '/index',props: (route) => ({ query: route.query.q }) },
    { name:'manageCenter',path: '/manageCenter',props: (route) => ({ query: route.query.q })},
    { name:'dataCenter',path: '/dataCenter',props: (route) => ({ query: route.query.q }) },
    { name:'setting',path: '/setting',props: (route) => ({ query: route.query.q }) },
    { name:'doc',path: '/doc'},
    { name:'edit',path:'/edit'}
  ]
});
const componentConfig={
  '/': (resolve)=> void(require(['../components/index/index.vue'], resolve)),
  '/index': (resolve)=> void(require(['../components/index/index.vue'], resolve)),
  '/manageCenter': (resolve)=> void(require(['../components/manageCenter/manageCenter.vue'], resolve)),
  '/dataCenter': (resolve)=> void(require(['../components/dataCenter/dataCenter.vue'], resolve)),
  '/setting': (resolve)=> void(require(['../components/setting/setting.vue'], resolve)),
  'doc':Doc,
  'edit':DocEdit
}
const getComponentByPath=(path)=>{
  let res=null;
  res=componentConfig[path]?componentConfig[path]:null;
  return res;
}
export default {
  getComponentByPath:getComponentByPath,
  router:router
}
