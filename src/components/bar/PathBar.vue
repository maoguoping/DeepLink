<template>
  <div class="path-bar">
    <div class="breadcrumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in pathData" :key="item.value">
          <a @click="pathLinkTo(index)">{{item.label}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Utils from '@/lib/utils.js'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
export default {
  name: 'path-bar',
  props: {
    // 路径切换之前
    beforeChange: {
      type: Function,
      required: false,
      default: () => {
        return true
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      pathStr: state => state.manageCenterStore.manageCenterPath,
      pathId: state => state.manageCenterStore.manageCenterPathId,
      pathData: state => state.manageCenterStore.manageCenterPathInfo
    })
  },
  created: function () {
  },
  methods: {
    ...mapMutations([
      'changeManageCenterPath'
    ]),
    /**
       *路径字符串转路径数组
       * @param pathStr
       */
    pathChange (pathStr) {
      let docPath = []
      if (this.pathStr) {
        docPath = this.pathStr.split('/')
        docPath[0] = '管理中心'
      } else {
        docPath = ['管理中心']
      }
      return docPath
    },
    /**
       * 从组件内部调用链接地址切换
       * @param index {Number}
       */
    pathLinkTo (index) {
      let pathId = ''

      let pathName = ''
      if (index === 0) {
        pathName = '管理中心'
      } else {
        this.pathData.slice(1, index + 1).forEach(item => {
          pathId += `/${item.value}`
          pathName += `/${item.label}`
        })
      }
      // 链接是否可以点击默认为
      if (this.beforeChange(pathName)) {
        this.changeManageCenterPath({
          pathId: pathId,
          pathName: pathName,
          type: 1
        })
        this.$router.push({
          path: '/manageCenter',
          query: {
            pathId: Utils.pathStrEncode(pathId),
            path: Utils.pathStrEncode(encodeURI(pathName)),
            type: 1
          }
        })
        this.$emit('pathLinkTo', { pathId: pathId, pathName: pathName, type: 1 })
      }
    },
    /**
       * 从父组件调用链接地址切换
       * @param pathId {String} 路径id
       * @param pathName  {String} 路径文本
       */
    changePathTo (pathId, pathName) {
      this.changeManageCenterPath({
        pathId: pathId,
        pathName: pathName
      })
      this.$router.push({
        path: '/manageCenter',
        query: {
          pathId: Utils.pathStrEncode(pathId),
          path: Utils.pathStrEncode(pathName)
        }
      })
      this.$emit('pathLinkTo', name)
    }
  },
  mounted () {

  },
  watch: {

  },
  components: {
    'el-breadcrumb': Breadcrumb,
    'el-breadcrumb-item': BreadcrumbItem
  }
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
