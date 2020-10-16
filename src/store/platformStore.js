import axios from '../lib/axios'
import interfaceUrl from '../lib/interface'
import router from '../router/appRouter'
export default {
  state: {
    isLogin: false,
    token: localStorage.getItem('token') || '',
    currentUser: { username: localStorage.getItem('username') } || null,
    userInfo: {
      createTime: '',
      lastLoginTime: '',
      loginCount: 0,
      roleId: 1,
      roleName: '',
      status: '',
      userId: '',
      userTickName: '',
      username: ''
    },
    pageAccessList: []
  },
  getters: {
    isAdmin (state) {
      let roleId = state.userInfo ? state.userInfo.roleId : 1
      return roleId === 0
    }
  },
  mutations: {
    /**
     * 更改用户状态信息
     * @param state
     * @param user
     */
    userStatus (state, user) {
      if (user) {
        state.currentUser = user
        state.isLogin = true
      } else if (user === null) {
        // 登出清空localStorage
        localStorage.setItem('username', '')
        localStorage.setItem('token', '')
        state.currentUser = null
        state.isLogin = false
        state.token = ''
      }
    },
    /**
     *
     * @param state
     * @param token
     */
    userToken (state, token) {
      state.token = token
    },
    /**
     *
     * @param state
     * @param userInfo
     */
    userInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setPageAcceessList (state, list) {
      console.log('setPageAcceessList', list)
      state.pageAccessList = list
    },
    clearUserInfo (state) {
      state.userInfo = {
        createTime: '',
        lastLoginTime: '',
        loginCount: 0,
        roleId: 1,
        roleName: '',
        status: '',
        userId: '',
        userTickName: '',
        username: ''
      }
    }
  },
  actions: {
    setUser ({ commit }, user) {
      commit('userStatus', user)
    },
    setToken ({ commit }, token) {
      commit('userToken', token)
    },
    async setUserInfo ({ commit }) {
      let res = await axios.get(interfaceUrl.users.loginStatus, {})
      commit('userInfo', res.userInfo)
    },
    async getPageAcceessList ({ commit, state }) {
      let res = await axios.post(interfaceUrl.users.getPageAcceessList, {
        userId: state.userInfo.userId
      })
      console.log(res)
      commit('setPageAcceessList', res.data)
    },
    async logout ({ commit }, callback) {
      let res = null
      try {
        await axios.post(interfaceUrl.users.logout)
        commit('userStatus', '')
        commit('userToken', '')
        commit('clearUserInfo')
        commit('setPageAcceessList', [])
        localStorage.setItem('username', null)
        localStorage.setItem('token', '')
        res = { success: true, message: '推出成功' }
      } catch (err) {
        res = { success: false, message: err.message }
      }
      if (callback && typeof callback === 'function') {
        callback(res)
      } else {
        if (res.success) {
          router.push({
            path: '/login'
          })
        }
      }
    }
  }
}
