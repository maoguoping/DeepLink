<template>
  <div class="userEditDialog">
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <div>
        <div class="base-info">
          <label class="info-title">基本信息</label>
          <div class="content-box clearfix">
            <div class="pic-box"></div>
            <div class="info-box">
              <ul>
                <li>
                  <label>用户id：</label>
                  <span>{{userInfo.userId}}</span>
                </li>
                <li class="clearfix">
                    <span class="name-block clearfix">
                      <label>用户名：</label>
                      <span class="name-block-content"><EditText v-model="userInfo.username"
                                                                 @on-change="changeUsername"></EditText></span>
                    </span>
                  <span class="name-block clearfix">
                      <label>用户昵称：</label>
                      <span class="name-block-content"><EditText v-model="userInfo.userTickName"
                                                                 @on-change="changeUserTickName"></EditText></span>
                    </span>
                </li>
              </ul>

            </div>
          </div>
        </div>
        <div class="role-info">
          <label class="info-title">角色信息：</label>
          <div class="content-box clearfix">
            <label class="info-label">用户角色:</label>
            <span class="info-detail">
                     <el-select v-model="userInfo.roleId" placeholder="请选择" style="width: 210px"  @change="changeRole">
                        <el-option
                          v-for="item in roleList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                          style="width: 210px">
                        </el-option>
                      </el-select>
                  </span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="saveFun">保 存</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script>
import EditText from '../modules/EditText'

export default {
  name: 'set-project-dialog',
  props: {
    // 显示隐藏
    value: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true,
      default: () => {
        return {
          username: '',
          userId: '',
          userTickName: '',
          roleId: ''
        }
      }
    }
  }, username: '',
  userId: '',
  userTickName: '',
  roleId: '',
  data () {
    return {
      dialogVisible: false,
      nameBlockStatus: 0,
      tickNameBlockStatus: 0,
      userInfo: this.data,
      roleList: []
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
      let { userId, username, userTickName, roleId } = this.userInfo
      if (username === '') {
        this.$message.warning('用户名不能为空！')
      } else if (userTickName === '') {
        this.$message.warning('用户昵称不能为空！')
      } else {
        this.$axios.post(this.$api.setting.saveUserInfo, {
          userInfo: JSON.stringify({ userId, username, userTickName, roleId }) }).then(res => {
          this.$message.success('修改用户信息成功！')
          this.$emit('update')
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
  .userEditDialog {
    .info-title {
      font-size: 16px;
      font-weight: bold;
    }
    .content-box {
      padding: 20px;
      .pic-box {
        display: inline-block;
        float: left;
        width: 60px;
        height: 60px;
        background-color: #3a8ee6;
      }
      .info-box {
        display: inline-block;
        float: left;
        width: 385px;
        padding: 0 20px;
        ul {
          li {
            height: 30px;
            line-height: 30px;
            label {
              font-weight: bold;
              float: left;
            }
          ;
            .name-block {
              display: inline-block;
              width: 190px;
              float: left;
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
