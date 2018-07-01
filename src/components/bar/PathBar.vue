<template>
  <div class="path-bar">
    <div class="breadcrumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in pathChange(pathStr)" :key="item">
          <a @click="pathLinkTo(item)">{{item}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!--{{pathData}}-->
      <!--{{docStr}}-->
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  const manageCenterName = "管理中心"
  export default {
    name: 'path-bar',
    props: {
      //路径切换之前
      beforeChange: {
        type: Function,
        required: false,
        default: () => {
          return true;
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      state() {
        return this.$store.state;
      },
      //获取路径信息
      pathStr() {
        return this.$store.state.manageCenterStore.manageCenterPath;
      },
      docPath() {
        let pathStr = this.pathStr;
        let docPath = [];
        if (pathStr) {
          docPath = pathStr.split("/");
          docPath[0] = "管理中心";
        } else {
          docPath = ["管理中心"]
        }
        return docPath;
      }
    },
    created: function () {
    },
    methods: {
      ...mapMutations([
        "changeManageCenterPath"
      ]),
      /**
       *路径识别
       * @param pathStr
       */
      changePath(name){
        let path = ""
        if (name != manageCenterName) {
          let index = this.pathStr.indexOf(name) + name.length;
          path = this.pathStr.substring(0, index)
        }
        this.changeManageCenterPath(path);
      },
      /**
       *路径字符串转路径数组
       * @param pathStr
       */
      pathChange(pathStr) {
        let docPath = []
        if (this.pathStr) {
          docPath = this.pathStr.split("/");
          docPath[0] = "管理中心";
        } else {
          docPath = ["管理中心"];
        }
        return docPath
      },
      /**
       * 从组件内部调用链接地址切换
       * @param item
       */
      pathLinkTo(name) {
        //链接是否可以点击默认为
        if (this.beforeChange(name)) {
          this.changePath(name);
          this.$emit('pathLinkTo', name);
        }
      },
      /**
       * 从父组件调用链接地址切换
       * @param name
       */
      changePathTo(name){
        this.changePath(name);
        this.$emit('pathLinkTo',name);
      }
    },
    mounted() {


    },
  }
</script>

<style lang="scss" scoped type="text/scss">
  .path-bar {
    .breadcrumb-box {
      margin: 8px 0px;
    }
  }

  a {
    text-decoration: none;
  }
</style>
