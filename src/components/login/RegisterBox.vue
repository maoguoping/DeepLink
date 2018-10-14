<template>
  <div class="register-box">
    <div class="logo-box">
      <div class="logo-box-content clearfix">
        <img src="../../lib/assets/img/DeepLink.png" alt="">
        <span>DeepLink</span>
      </div>

    </div>
    <div class="title-box">
      注册DeepLink,创造你的世界
    </div>
      <el-form ref="registerForm" :model="form"  :rules="rules" label-width="70px" @submit.native.prevent>
        <el-form-item label="用户名" prop="account">
          <el-input v-model="form.account" placeholder="4到16位（字母，数字，下划线，减号）" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="form.password" type="password"  autocomplete="new-password" placeholder="最少6位，同时包含大写字母、小写字母、数字"></el-input>
        </el-form-item>
        <el-form-item label="密保问题" prop="passwordQes" >
          <el-input v-model="form.passwordQes"  autocomplete="new-password" placeholder="用于保护密码的问题"></el-input>
        </el-form-item>
        <el-form-item label="密保答案" prop="passwordAns" >
          <el-input v-model="form.passwordAns"  autocomplete="new-password" placeholder="密码保护问题答案"></el-input>
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
  import axios from 'axios'
  import md5 from 'md5'
  import interfaceUrl from '../../lib/interface'
  import validator from './validator'
  export default {
    name: "registerBox",
    data(){
      const  validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账户'));
        } else {
          callback();
        }
      };
      const  validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        form:{
          account:'',
          password:'',
          passwordQes:'',
          passwordAns:''
        },
        isDisable:false,
        rules: {
          account: [
            {validator: validator.usenamePattern, trigger: 'blur'},
          ],
          password:[
            {validator: validator.passwordPattern, trigger: 'blur'},
          ],
          passwordQes: [
            {validator: validator.passwordQesPattern, trigger: 'blur'},
          ],
          passwordAns:[
            {validator: validator.passwordAnsPattern, trigger: 'blur'},
          ]
        },
      }
    },
    methods:{
      /**
       * 切换到登录
       */
      login(){
        this.$emit('change','login');
      },
      /**
       * 提交注册信息
       */
      register(){
        this.$refs.registerForm.validate(valid =>{
          valid && this.$axios.post(interfaceUrl.users.register, {
            username:this.form.account,
            password:md5(this.form.password),
            passwordQes:this.from.passwordQes,
            passwordAns:md5(this.from.passwordAns),
          }).then(res => {
            //将用户信息放入localStorage
            localStorage.setItem('username',res.username);
            localStorage.setItem('token',res.token);
            this.$store.commit('userStatus',{username:res.username});
            this.$store.commit('userToken',res.token);
            //输出状态
            this.$router.push({
              path:'/'
            })
          }).catch(err =>{
            this.$message.error(err.message)
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
.register-box{
  box-sizing: border-box;
  width: 432px;
  height: 500px;
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
      display: inline-block;
      img{
        height: inherit;
        float: left;
      }
      span{
        display: inline-block;
        height: 70px;
        line-height: 70px;
        margin-left: 20px;
        font-weight: bold;
        font-size: 30px;
        float: left;
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
      li{
        float:left;
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
