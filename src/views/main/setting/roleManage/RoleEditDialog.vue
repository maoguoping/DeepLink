<template>
  <div class="roleEditDialog">
    <el-dialog
      :title="type=='add'?'新增角色':'编辑角色'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <div>
        <el-form :inline="true" label-width="80px" :model="roleInfo">
          <el-form-item label="角色名:">
            <el-input v-model="roleInfo.roleName" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="角色id:">
            <el-input v-model="roleInfo.roleId" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="角色描述:">
            <el-input v-model="roleInfo.description" type="textarea" style="width: 400px"></el-input>
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
import EditText from '@/components/modules/EditText'

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
      default: ()=> 'add'
    },
    data: {
      type: Object,
      required: true,
      default: () => {
        return {
          roleName: '',
          roleId: '',
          description: ''
        }
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      roleInfo:{
        roleId: '',
        roleName: '',
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
      let { roleName, roleId } = this.roleInfo
      if (roleName === '') {
        this.$message.warning('角色名不能为空！')
      } else if (roleId === '') {
        this.$message.warning('角色id不能为空！')
      } else {
        this.$axios.post(this.$api.setting.checkRoleExist, {
          roleInfo: JSON.stringify({ roleName, roleId }) }).then(res => {
          if(res.data.list.length > 0 && this.type === 'add'){
            this.$message.warning('角色以及角色id不可重复！')
          } else {
            this.$emit('update')
          }
        }).catch(e => {
          console.log(e)
        })
      }
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
       * 用户角色更改回调
       * @param {String} roleId 用户角色id
       * @return {Void}
       */
    changeRole (roleId) {
      this.userInfo.roleId = roleId
    },
    /**
       * 加载角色下拉列表
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
      this.dialogVisible = newVal
    },
    data (newVal) {
      console.log(newVal)
      this.userInfo = newVal
    }
  },
  components: {
    EditText
  }
}
</script>

<style lang="scss" scoped type="text/scss">
  .roleEditDialog {
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
