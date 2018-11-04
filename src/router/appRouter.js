// app路由处理
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import Login from '../components/login/Login.vue'
import MainView from '../components/main/MainView.vue'

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      name: '/',
      path: '/',
      meta: {requireAuth: true, isLogin: false},
      children: [
        {
          name: '/index',
          path: '/index',
          meta: {requireAuth: true, isLogin: false},
          props: (route) => ({query: route.query.q})
        },
        {
          name: 'manageCenter',
          path: '/manageCenter',
          meta: {requireAuth: true, isLogin: false},
          props: (route) => ({query: route.query.q})
        },
        {
          name: 'dataCenter',
          path: '/dataCenter',
          meta: {requireAuth: true, isLogin: false},
          props: (route) => ({query: route.query.q})
        },
        {
          name: 'setting',
          path: '/setting',
          meta: {requireAuth: true, isLogin: false},
          props: (route) => ({query: route.query.q})
        },
        {name: 'doc', path: '/doc', meta: {requireAuth: true, isLogin: false},}
      ],
      component: MainView
    },
    {path: '/login', meta: {requireAuth: false, isLogin: true},component: Login}
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
      return resolve(require('../components/main/setting/setting.vue'))
    }, "/setting")
  },
  '/doc': (resolve) => {
    require.ensure([], () => {
      return resolve(require('../components/main/docView/DocIndex.vue'))
    }, "/doc")
  }
};
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    //是否登录
    if (!store.state.platform.token) {
      //未登录
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
      //已登录
      next()
    }
  } else if (to.meta.isLogin && store.state.platform.token) {//已经登录页面跳转登录页后返回首页
    next({
      path: '/',
      query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  } else {
    //无需登录
    next();
  }
});
const getComponentByPath = (path) => {
  let res = null;
  res = componentConfig[path] ? componentConfig[path] : null;
  return res;
}
export default {
  getComponentByPath: getComponentByPath,
  router
}
