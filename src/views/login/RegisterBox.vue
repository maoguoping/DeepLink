<template>
  <div class="register-box">
    <div class="logo-box">
      <div class="logo-box-content clearfix">
        <img src="@/assets/img/DeepLink.png" alt="">
        <span>DeepLink</span>
      </div>

    </div>
    <div class="title-box">
      注册DeepLink,创造你的世界
    </div>
      <el-form ref="registerForm" :model="form"  :rules="rules" label-width="70px" @submit.native.prevent>
        <el-form-item label="用户名" prop="account">
          <el-input v-model="form.account" placeholder="4到16位（字母，数字，下划线，减号）" auto-complete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="form.password" type="password"  auto-complete="new-password" placeholder="最少6位，同时包含大写字母、小写字母、数字"></el-input>
        </el-form-item>
        <el-form-item label="密码确认" prop="passwordConfirm" >
          <el-input v-model="form.passwordConfirm" type="password"  auto-complete="new-password" placeholder="最少6位，同时包含大写字母、小写字母、数字"></el-input>
        </el-form-item>
        <el-form-item label="密保问题" prop="passwordQes" >
          <el-input v-model="form.passwordQes"  auto-complete="new-password" placeholder="用于保护密码的问题"></el-input>
        </el-form-item>
        <el-form-item label="密保答案" prop="passwordAns" >
          <el-input v-model="form.passwordAns"  auto-complete="new-password" placeholder="密码保护问题答案"></el-input>
        </el-form-item>
      </el-form>
    <div class="btn-box">
      <el-button type="primary" style="width:100%" :disabled="isDisable" @click="register">注册</el-button>
      <ul class="btn-list clearfix">
        <li >注册即同意《用户协议》</li>
        <li @click="login">登录</li>
      </ul>
      <p class="info-box">
        <span>@2018 gpmao</span> <a href="github.com/maoguoping">github.com/maoguoping</a>
      </p>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import validator from './validator'
export default {
  name: 'registerBox',
  data () {
    return {
      form: {
        account: '',
        password: '',
        passwordConfirm: '',
        passwordQes: '',
        passwordAns: ''
      },
      isDisable: false,
      rules: {
        account: [
          { validator: validator.usenamePattern, trigger: 'blur' }
        ],
        password: [
          { validator: validator.passwordPattern, trigger: 'blur' }
        ],
        passwordConfirm: [
          { validator: this.passwordConfirmPattern, trigger: 'blur' },
          { validator: validator.passwordPattern, trigger: 'blur' }
        ],
        passwordQes: [
          { validator: validator.passwordQesPattern, trigger: 'blur' }
        ],
        passwordAns: [
          { validator: this.passwordAnsConfirmPattern, trigger: 'blur' },
          { validator: validator.passwordAnsPattern, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
       * 切换到登录
       */
    login () {
      this.$emit('change', 'login')
    },
    /**
       * 提交注册信息
       */
    register () {
      this.$refs.registerForm.validate(valid => {
        valid && this.$axios.post(this.$api.users.register, {
          username: this.form.account,
          password: md5(this.form.password),
          passwordQes: this.form.passwordQes,
          passwordAns: md5(this.form.passwordAns)
        }).then(res => {
          if (res.registerSuccess) {
            this.$message.success(res.message)
            this.$emit('change', 'login')
          } else {
            this.$message.warning(res.message)
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
      })
    },
    /**
       * 密码确认校验
       * @param rule
       * @param value
       * @param callback
       */
    passwordConfirmPattern (rule, value, callback) {
      if (value !== this.form.password) {
        callback(new Error('密码必须一致'))
      } else {
        callback()
      }
    },
    /**
       * 密保答案确认校验
       * @param rule
       * @param value
       * @param callback
       */
    passwordAnsConfirmPattern (rule, value, callback) {
      if (value === this.form.password) {
        callback(new Error('密保答案与问题不能相同'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-box{
  box-sizing: border-box;
  width: 432px;
  height: 550px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  .logo-box{
    height: 70px;
    text-align: center;
    margin-bottom: 5px;
    .logo-box-content{
      height: inherit;
      display: flex;
      justify-content: center;
      img{
        height: inherit;
      }
      span{
        display: inline-block;
        height: 70px;
        line-height: 70px;
        margin-left: 20px;
        font-weight: bold;
        font-size: 30px;
      }
    }

  }
  .title-box{
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
  }
  .btn-box{
    .btn-list{
      margin: 10px 0;
      display: flex;
      justify-content: center;
      li{
        font-size: 12px;
        width: 50%;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .info-box{
    font-size: 10px;
    text-align: center;
    color: #8c939d;
    a{
      color: #8c939d;
    }
  }
}
</style>
