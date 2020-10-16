<template>
    <div class="main">
      <header-bar class="header"></header-bar>
      <div class="wrapper">
      <div class="wrapper-main">
      <el-container>
      <el-container>
      <el-main>
      <router-view></router-view>
      </el-main>
      </el-container>
      </el-container>
      </div>
      </div>
    </div>
</template>

<script>
// 使用ES6特性引入 localstorage 储存脚本，命名为 Storage

// ES6语法，相当于
// new Vue({})
import { bus } from '@/bus/bus'
import HeaderBar from '@/components/bar/headerBar/HeaderBar.vue'
export default {
  name: 'mainView',
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item),
      msg: 'Type name and mark who is student',
      mainPath: 'index',
      path: window.location.pathname
    }
  },
  components: {
    // // 在#app元素内，注册组件
    'header-bar': HeaderBar
  },
  mounted () {
    var app = this
    bus.$on('docChangeTo', function (e) {
      app.mainPath = '1000'
    })
    bus.$on('gotoIndex', function (e) {
      app.mainPath = 'index'
    })
  },
  methods: {
    loginStatus () {
      this.$store.dispatch('setUserInfo')
    },
    getPageAcceessList () {
      this.$store.dispatch('getPageAcceessList')
    }
  }
}
</script>
<style lang="scss" scoped>
  /*width: 100%;*/
  /*height: 100%;*/
  /*display: inline-block;*/
  .header{
    position: fixed;
    z-index: 10;
  }
  //总布局
  .wrapper {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    top: 122px;
    bottom: 0px;
    left: auto;
    background: #f6f6f6;
    //中心布局
    .wrapper-main {
      width: 1024px;
      height: 100%;
      margin: 0 auto;
      & > .el-container {
        box-sizing: border-box;
        height: 100%;
        border-right:1px solid #eee;
        border-left:1px solid #eee;
        .el-main {
          background: #fff;
          box-shadow: 0 1px 3px rgba(26,26,26,.1);
        }
        /*border: 1px solid #eee;*/
        aside {
          width: 300px;
          height: 100%;
          background-color: #ffffff;
        }
        section {
          & > .el-main{
            /*overflow: visible;*/
          }
        }
      }
    }
  }
</style>
