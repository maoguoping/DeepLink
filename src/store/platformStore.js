import  axios from '../lib/axios'
import  interfaceUrl from '../lib/interface'
export default {
  state:{
    isLogin:false,
    token:localStorage.getItem('token')||'',
    currentUser:{username:localStorage.getItem('username')}||null,
    userInfo:{
      roleId:''
    }
  },
  getters:{
    isAdmin(state){
      let roleId = state.userInfo.roleId;
      return roleId == 0;
    }
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
    },
    /**
     *
     * @param state
     * @param userInfo
     */
    userInfo(state,userInfo){
      state.userInfo=userInfo;
    }
  },
  actions:{
    setUser({commit},user){
      commit('userStatus',user)
    },
    setToken({commit},token){
      commit('userToken',token)
    },
    setUserInfo({commit}){
      axios.get(interfaceUrl.users.loginStatus,{}).then((res)=>{
        console.log('init');
        commit('userInfo',res.userInfo);
      }).catch(e =>{
          console.log(e);
      })

    }
  }
}
