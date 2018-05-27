<template>
    <el-container class="dataCenter">
        <el-header class="dataCenterHeader " style="height: 30px">
        </el-header>
        <el-main class="dataCenterMain">
              数据中心
        </el-main>
    </el-container>
</template>
<script>
    import axios from 'axios'
    import interfaceUrl from '../../lib/interface'
    const dataCenterName = "数据中心"
    export default {
        name: 'manage-center',
        data() {
            return {
                docId: '1519187825477',
                currentItem: {},
                listItems: [],
                pathStr: "数据中心",
                activeNames: [],
                viewType: "listView",
                viewDescription:"",
                isManageBox: true,
                isDocView: false,
                isDocEdit: false,
                docData: {},
                showAddProjectDialog:false
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
    .dataCenter {
        border: none;
    }

    .manger-box {
        width: 920px;
        margin: 0 auto;
        padding: 20px;
    }

    .dataCenterHeader {
        line-height: 30px;
    }

    .dataCenterMain {
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
