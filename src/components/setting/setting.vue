<template>
  <el-container class="setting">
    <el-header class="settingHeader " style="height: 30px">
    </el-header>
    <el-main class="settingMain">
      设置
    </el-main>
  </el-container>
</template>
<script>
  import axios from 'axios'
  import interfaceUrl from '../../lib/interface'
  const settingName = "设置"
  export default {
    name: 'manage-center',
    data() {
      return {
        docId: '1519187825477',
        currentItem: {},
        listItems: [],
        pathStr: "设置",
        activeNames: [],
        viewType: "listView",
        viewDescription:"",
        isManageBox: true,
        isDocView: false,
        isDocEdit: false,
        docData: {},
        showSetProjectDialog:false
      }
    },
    methods: {},
    components: {
      //在#app元素内，注册组件
    },
    mounted() {

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
