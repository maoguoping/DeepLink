// app路由处理
import Vue from 'vue'
import VueRouter from 'vue-router'
import Doc from '../components/docView/DocView.vue'
Vue.use(VueRouter);
const router=new VueRouter({
  // mode: 'history',
  routes:[
    { name:'/',path: '/' ,props: (route) => ({ query: route.query.q }) },
    { name:'/index',path: '/index',props: (route) => ({ query: route.query.q }) },
    { name:'manageCenter',path: '/manageCenter',props: (route) => ({ query: route.query.q })},
    { name:'dataCenter',path: '/dataCenter',props: (route) => ({ query: route.query.q }) },
    { name:'setting',path: '/setting',props: (route) => ({ query: route.query.q }) },
    { name:'doc',path: '/doc'}
  ]
});
console.log(typeof router.afterEach)
const componentConfig={
  '/':(resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/index/index.vue'))
    }, "/index")
  },
  '/index':(resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/index/index.vue'))
    }, "/index")
  },
  '/manageCenter':(resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/manageCenter/manageCenter.vue'))
    }, "/manageCenter")
  },
  '/dataCenter':(resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/dataCenter/dataCenter.vue'))
    }, "/dataCenter")
  },
  '/setting':(resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/setting/setting.vue'))
    }, "/setting")
  },
  '/doc':(resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/docView/DocIndex.vue'))
    }, "/doc")
  }
};
const getComponentByPath=(path)=>{
  let res=null;
  res=componentConfig[path]?componentConfig[path]:null;
  return res;
}
export default {
  getComponentByPath:getComponentByPath,
  router
}
