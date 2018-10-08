import Vue from 'vue'
import vuex from 'vuex'
import headerBar from '../components/bar/headerBar/headerBarStore'
import manageCenterStore from '../components/main/manageCenter/manageCenterStore'
Vue.use(vuex);
export default {
  modules: {
    headerBar: headerBar,
    manageCenterStore:manageCenterStore
  }
}
