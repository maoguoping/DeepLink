import Vue from 'vue'
import Vuex from 'vuex'
import platform from './platformStore'
import headerBar from './headerBarStore'
import manageCenterStore from '../views/main/manageCenter/manageCenterStore'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    a: 'ss'
  },
  modules: {
    platform: platform,
    headerBar: headerBar,
    manageCenterStore: manageCenterStore
  }
})
