// app路由处理
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import Login from '../views/login/Login.vue'
import MainView from '../views/main/MainView.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      name: '/',
      path: '/',
      meta: { requireAuth: true, isLogin: false },
      children: [
        {
          name: '/',
          path: '/',
          meta: { requireAuth: true, isLogin: false },
          props: (route) => ({ query: route.query.q }),
          component: () => import('../views/main/index/index.vue')
        },
        {
          name: '/index',
          path: '/index',
          meta: { requireAuth: true, isLogin: false },
          props: (route) => ({ query: route.query.q }),
          component: () => import('../views/main/index/index.vue')
        },
        {
          name: 'manageCenter',
          path: '/manageCenter',
          meta: { requireAuth: true, isLogin: false },
          props: (route) => ({ query: route.query.q }),
          component: () => import('../views/main/manageCenter/manageCenter.vue')
        },
        {
          name: 'dataCenter',
          path: '/dataCenter',
          meta: { requireAuth: true, isLogin: false },
          props: (route) => ({ query: route.query.q }),
          component: () => import('../views/main/dataCenter/dataCenter.vue')
        },
        {
          name: 'setting',
          path: '/setting',
          meta: { requireAuth: true, isLogin: false },
          props: (route) => ({ query: route.query.q }),
          component: () => import('../views/main/setting/index.vue')
        },
        { name: 'doc', path: '/doc', meta: { requireAuth: true, isLogin: false } }
      ],
      component: MainView
    },
    { path: '/login', meta: { requireAuth: false, isLogin: true }, component: Login }
  ]
})
router.beforeEach(async (to, from, next) => {
	console.log('路由beforeEach', to, from)
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 是否登录
    if (!store.state.platform.token) {
      // 未登录
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else {
			// 已登录且有权限
			let userId = store.state.platform.userInfo.userId
			console.log('userInfo', store.state.platform.userInfo)
			if(!userId) {
				await store.dispatch('setUserInfo')
			}
			let pageAccessList = store.state.platform.pageAccessList
			if (pageAccessList.length === 0) {
				console.log('需要重新加载pageAccessList')
				await store.dispatch('getPageAcceessList')
				pageAccessList = store.state.platform.pageAccessList
			}
			let commonPath = [
				'/', '/index', '/manageCenter', '/dataCenter', '/login'
			]
			if (commonPath.includes(to.path)) {
				next()
			} else {
				let accessPage = pageAccessList.find(item => item.path === to.path)
				if (accessPage) {
					next()
				} else {
					console.log(`没有${to.path}权限`)
					await store.dispatch('logout', () => {
						next({
							path: '/login',
							query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
						})
					})
				}
			}
    }
  } else if (to.meta.isLogin && store.state.platform.token) { // 已经登录页面跳转登录页后返回首页
    next({
      path: '/',
      query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  } else {
    // 无需登录
    next()
  }
})
// const getComponentByPath = (path) => {
//   let res = null
//   res = componentConfig[path] ? componentConfig[path] : null
//   return res
// }
export default {
  // getComponentByPath: getComponentByPath,
  router
}
