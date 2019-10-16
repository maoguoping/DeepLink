<template>
  <div class="rightEditDialog">
    <el-dialog
      :title="type=='add'?'新增权限':'编辑权限'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <div>
        <el-form :inline="true" label-width="80px" :model="rightInfo">
          <el-form-item label="权限名:">
            <el-input v-model="rightInfo.rightName" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="权限id:">
            <el-input v-model="rightInfo.rightId" style="width: 150px" :disabled="type == 'edit'"></el-input>
          </el-form-item>
          <el-form-item label="权限描述:">
            <el-input v-model="rightInfo.description" type="textarea" style="width: 400px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="saveFun">保 存</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'set-project-dialog',
  props: {
    // 显示隐藏
    value: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true,
      default: () => 'add'
    },
    data: {
      type: Object,
      required: true,
      default: () => {
        return {
          rightName: '',
          rightId: '',
          description: ''
        }
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      rightInfo: {
        rightId: '',
        rightName: '',
        description: ''
      }
    }
  },
  computed: {},
  methods: {

    /**
       * 关闭窗口回调
       * @return {Void}
       */
    handleClose () {
      this.$emit('close')
    },
    /**
       * 保存窗口数据
       * @param {function} 回调函数
       * @return {Void}
       */
    saveFun () {
      let { rightName, rightId } = this.rightInfo
      if (rightName === '') {
        this.$message.warning('权限名不能为空！')
      } else if (rightId === '') {
        this.$message.warning('权限id不能为空！')
      } else {
        this.$axios.post(this.$api.setting.checkRightExist, {
          rightInfo: JSON.stringify({ rightName, rightId }),
          type: this.type
        }).then(res => {
          if (res.data.list.length > 0 && this.type === 'add') {
            this.$message.warning('权限以及权限id不可重复！')
          } else {
            console.log(this.type)
            if (this.type === 'add') {
              this.addRight()
            } else {
              this.updateRight()
            }
          }
        }).catch(e => {
          console.log(e)
        })
      }
    },
    /**
     * 新增权限
     * @return {Void}
     */
    addRight () {
      this.$axios.post(this.$api.setting.addRight, {
        rightInfo: JSON.stringify(this.rightInfo)
      }).then(res => {
        this.$emit('update', this.type)
      }).catch(e => {
        console.log(e)
      })
    },
    /**
     * 修改权限
     * @return {Void}
     */
    updateRight () {
      this.$axios.post(this.$api.setting.updateRight, {
        rightInfo: JSON.stringify(this.rightInfo)
      }).then(res => {
        this.$emit('update', this.type)
      }).catch(e => {
        console.log(e)
      })
    },
    /**
       * 用户名更改回调
       * @param {String} username 用户名
       * @return {Void}
       */
    changeUsername (username) {
      this.userInfo.username = username
    },
    /**
       * 用户昵称更改回调
       * @param {String} userTickName 用户名
       * @return {Void}
       */
    changeUserTickName (userTickName) {
      this.userInfo.userTickName = userTickName
    },
    /**
       * 用户权限更改回调
       * @param {String} rightId 用户权限id
       * @return {Void}
       */
    changeRole (rightId) {
      this.userInfo.rightId = rightId
    },
    /**
       * 加载权限下拉列表
       * @return {void}
       */
    getRoleListDic () {
      this.$axios.get(this.$api.api.getRoleListDic, {}).then(res => {
        this.roleList = res.data
        console.log(this.roleList)
      }).catch(e => {
        console.log(e)
      })
    }
  },
  mounted () {
    this.getRoleListDic()
  },
  watch: {
    value (newVal) {
      if (this.type === 'add') {
        this.rightInfo = {
          rightId: '',
          rightName: '',
          description: ''
        }
      }
      this.dialogVisible = newVal
    },
    data (newVal) {
      console.log(newVal)
      let { rightId, rightName, description } = newVal
      this.rightInfo = {
        rightId, rightName, description
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped type="text/scss">
  .rightEditDialog {
    .info-title {
      font-size: 16px;
      font-weight: bold;
    }
    .content-box {
      padding: 20px;
      display: flex;
      justify-content: flex-start;
      .pic-box {
        display: inline-block;
        width: 60px;
        height: 60px;
        background-color: #3a8ee6;
      }
      .info-box {
        display: inline-block;
        width: 385px;
        padding: 0 20px;
        ul {
          li {
            height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: flex-start;
            label {
              font-weight: bold;
            }
          ;
            .name-block {
              display: inline-block;
              width: 190px;
              .name-block-content {
                display: inline-block;
                width: 120px;
              }
            }
          }
        }
      }
      .info-label {
        font-size: 14px;
        font-weight: bold;
      }
      .info-detail {
        margin-left: 15px;
      }
    }
  }
</style>
