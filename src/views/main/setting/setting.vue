<template>
  <el-container class="setting">
    <el-header class="settingHeader " style="height: 30px">
      设置菜单
    </el-header>
    <el-container>
      <el-aside width="220px">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1" @open="handleOpen">
                <template slot="title">
                  <i class="iconfont icon-user"></i>
                  <span>用户设置</span>
                </template>
                <el-menu-item-group >
                  <el-menu-item index="1-1" @click="handleClick('1-1')">用户管理</el-menu-item>
                  <el-menu-item index="1-2" @click="handleClick('1-2')">角色管理</el-menu-item>
                  <el-menu-item index="1-3" @click="handleClick('1-3')">权限管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="iconfont icon-control"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="handleClick('2-1')">通知管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="settingMain">
        <component :is="settingCom"></component>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import userManage from './user/userManage'
const settingName = '设置'
export default {
  name: 'manage-center',
  data () {
    return {
      docId: '1519187825477',
      currentItem: {},
      listItems: [],
      pathStr: '设置',
      activeNames: [],
      viewType: 'listView',
      viewDescription: '',
      isManageBox: true,
      isDocView: false,
      isDocEdit: false,
      docData: {},
      showSetProjectDialog: false,
      settingCom: 'userManage'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClick (e) {
      console.log(e)
    }
  },
  components: {
    userManage
    // 在#app元素内，注册组件
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped type="text/scss">
  .setting {
    border: none;
  }

  .manger-box {
    width: 920px;
    margin: 0 auto;
    padding: 20px;
  }

  .settingHeader {
    line-height: 30px;
    margin-bottom: 20px;
  }

  .settingMain {
    border: none;
    padding-top: 0px;
    padding-bottom: 0px;
    /*overflow-y: scroll;*/
  }

  .blur {
    -webkit-filter: blur(10px); /* Chrome, Opera */
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
  }
</style>
