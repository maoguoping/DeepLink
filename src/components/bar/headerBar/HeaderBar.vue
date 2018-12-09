<template>
  <div class="headerbar-box clearfix">
    <div class="logo-box">
      <img class="logo-pic" src="../../../assets/img/DeepLink.png" alt="">
      <label>DeepLink</label>
      <div class="user-box">
        <el-dropdown class="user-dropdown" @command="userDropDown">
          <span class="el-dropdown-link user-pic">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item></el-dropdown-item>
            <el-dropdown-item command="center">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
    <div class="tab-box">
      <div class="content">
        <ul class="tabs clearfix" v-model="activeName">
          <li class="tabs-panel" v-for="(tab,index) in tabList" v-if= "tab.display" @click="handleClick(tab)">
            <span class="panel-name">{{tab.name}}</span>
            <transition name="slide-fade">
              <span class="panel-underline" v-show="activeName==tab.path"></span>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import interfaceUrl from '../../../lib/interface'
  export default {
    name: 'header-bar',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        activeName: this.$store.state.headerBarCurrentMenu,
        // tabList:[],
        tabActiveIndex: 0
      }
    },
    computed:{
      isAdmin(){
        return this.$store.getters.isAdmin;
      },
      tabList(){
        return [
          {
            name: "设置",
            path: "/setting",
            index: 4,
            display:this.isAdmin
          },
          {
            name: "数据中心",
            path: "/dataCenter",
            index: 3,
            display:true
          },
          {
            name: "管理中心",
            path: "/manageCenter",
            index: 2,
            display:true
          },
          {
            name: "首页",
            path: "/index",
            index: 0,
            display:true
          }
        ];
      }
    },
    methods: {
      /**
       * tab页点击事件
       * @param e {Obj} 点击事件
       */
      handleClick(e) {
        this.$store.commit('changeHeaderBarCurrentMenu', e.path);
        this.$router.push({path: e.path, params: '2018022001'});
      },
      /**
       * 用户头像下拉框回调
       * @param command {String} 指令
       */
      userDropDown(command){
        if(command==='logout'){
          this.logout();
        }
      },
      /*
       * 退出登录
       */
      logout(){
        this.$axios.post(interfaceUrl.users.logout).then(res => {
          this.$store.dispatch('setUser',null);
          this.$store.dispatch('setToken','');
          localStorage.setItem('username',null);
          localStorage.setItem('token','');
          this.$router.push({
            path:'/login'
          })
        }).catch(err =>{
          this.$message.error(err.message)
        });
      }
    },
    mounted() {
      let path = this.$route.path;
      this.activeName = (path == '/') ? '/index' : path;
    },
    watch: {
      $route(newVal) {
        let path = this.$route.path;
        this.activeName = (path == '/') ? '/index' : path;
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  .headerbar-box {
    width: 100%;
    height: 118px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    cursor: pointer;
    text-align: center;
    .logo-box {
      display: inline-block;
      width: 1347px;
      font-size: 24px;
      font-weight: bold;
      line-height: 59px;
      .logo-pic {
        display: inline-block;
        float: left;
        height: 59px;
        margin-left: 15px;
        margin-right: 20px;
      }
      .user-box {
        display: inline-block;
        height: 40px;
        width: 120px;
        float: right;
        margin-top: 10px;
        .user-dropdown{
          float: right;
          height: 40px;
          .user-pic {
            display: inline-block;
            height: 40px;
            width: 40px;
            border-radius: 20px;
            background-color: #3a8ee6;
          }
        }
      }
      label {
        float: left;
      }
    }
  ;
    .tab-box {
      display: block;
      height: 59px;
      background-color: #5d9aff;
      .content {
        display: inline-block;
        height: 59px;
        width: 1347px;
        .tabs {
          /*display: inline-block;*/
          width: 100%;
          margin-top: 10px;
          .tabs-panel {
            display: inline-block;
            float: right;
            height: 33px;
            line-height: 40px;
            margin: 0px 20px;
            position: relative;
            .panel-name {
              display: block;
              width: 100%;
              height: 30px;
              font-size: 16px;
              line-height: 30px;
              margin-top: 7px;
              color: #ffffff;
            }
            .panel-underline {
              display: block;
              width: 100%;
              height: 3px;
              background-color: #ffffff;
              position: absolute;
              top: 38px;
            }
          }
        }
      }
    }
  }
</style>
