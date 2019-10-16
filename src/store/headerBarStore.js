export default {
  state: {
    headerBarCurrentMenu: '/index'
  },
  mutations: {
    changeHeaderBarCurrentMenu (state, path) {
      state.headerBarCurrentMenu = path
    }
  }
}
