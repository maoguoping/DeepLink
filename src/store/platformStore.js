export default {
  state:{
    isLogin:false,
    token:localStorage.getItem('token')||'',
    currentUser:{username:localStorage.getItem('username')}||null
  },
  mutations:{
    /**
     * 更改用户状态信息
     * @param state
     * @param user
     */
    userStatus(state,user){
      if(user){
        state.currentUser = user;
        state.isLogin =true;
      }else if(user === null){
        //登出清空localStorage
        localStorage.setItem('username','');
        localStorage.setItem('token','');
        state.currentUser=null;
        state.isLogin=false;
        state.token='';
      }
    },
    /**
     *
     * @param state
     * @param token
     */
    userToken(state,token){
      state.token=token;
    }
  },
  actions:{
    setUser({commit},user){
      commit('userStatus',user)
    },
    setToken({commit},token){
      commit('userToken',token)
    }
  }
}
