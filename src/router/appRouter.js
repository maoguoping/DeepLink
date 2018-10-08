// app路由处理
import Vue from 'vue'
import VueRouter from 'vue-router'
import Doc from '../components/main/docView/DocView.vue'
import Login from '../components/login/Login.vue'
import MainView from '../components/main/MainView.vue'

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      name: '/',
      path: '/',
      children:[
        { name:'/index',path: '/index',props: (route) => ({ query: route.query.q }) },
        { name:'manageCenter',path: '/manageCenter',props: (route) => ({ query: route.query.q })},
        { name:'dataCenter',path: '/dataCenter',props: (route) => ({ query: route.query.q }) },
        { name:'setting',path: '/setting',props: (route) => ({ query: route.query.q }) },
        { name:'doc',path: '/doc'}
      ],
      component:MainView
    },
    {path: '/login', component: Login},
    // { name:'/',path: '/' ,props: (route) => ({ query: route.query.q }) },
    // { name:'/login',path: '/login'},
    // { name:'/index',path: '/index',props: (route) => ({ query: route.query.q }) },
    // { name:'manageCenter',path: '/manageCenter',props: (route) => ({ query: route.query.q })},
    // { name:'dataCenter',path: '/dataCenter',props: (route) => ({ query: route.query.q }) },
    // { name:'setting',path: '/setting',props: (route) => ({ query: route.query.q }) },
    // { name:'doc',path: '/doc'}
  ]
});
const componentConfig = {
  '/': (resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/main/index/index.vue'))
    }, "/index")
  },
  '/login': (resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/login/Login.vue'))
    }, "/login")
  },
  '/index': (resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/main/index/index.vue'))
    }, "/index")
  },
  '/manageCenter': (resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/main/manageCenter/manageCenter.vue'))
    }, "/manageCenter")
  },
  '/dataCenter': (resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/main/dataCenter/dataCenter.vue'))
    }, "/dataCenter")
  },
  '/setting': (resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/setting/setting.vue'))
    }, "/setting")
  },
  '/doc': (resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/main/docView/DocIndex.vue'))
    }, "/doc")
  }
};
const getComponentByPath = (path) => {
  let res = null;
  res = componentConfig[path] ? componentConfig[path] : null;
  return res;
}
export default {
  getComponentByPath: getComponentByPath,
  router
}
