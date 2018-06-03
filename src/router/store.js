import Vue from 'vue'
import vuex from 'vuex'
import headerBar from '../components/bar/headerBar/headerBarStore'
import manageCenterStore from '../components/manageCenter/manageCenterStore'
Vue.use(vuex);
export default new vuex.Store({
  modules: {
    headerBar: headerBar,
    manageCenterStore:manageCenterStore
  }
})
