<template>
  <div class="register-box">
    <div class="logo-box">
      <div class="logo-box-content clearfix">
        <img src="../../lib/assets/img/DeepLink.png" alt="">
        <span>DeepLink</span>
      </div>
    </div>
    <el-form ref="loginForm" :model="form"  :rules="rules" label-width="60px" @submit.native.prevent>
      <el-form-item label="用户名" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button type="primary" style="width:100%" :disabled="isDisable">注册</el-button>
      <ul class="btn-list clearfix">
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
  import interfaceUrl from '../../lib/interface'
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
          password:''
        },
        isDisable:false,
        rules: {
          account: [
            {validator: validateAccount, trigger: 'blur'},
          ],
          password:[
            {validator: validatePassword, trigger: 'blur'},
          ]
        },
      }
    },
    methods:{
      /**
       * 切换到注册
       */
      login(){
        this.$emit('change','login');
      }
    }
  }
</script>

<style lang="scss" scoped>
.register-box{
  box-sizing: border-box;
  width: 432px;
  height: 350px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  .logo-box{
    height: 70px;
    text-align: center;
    margin-bottom: 20px;
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
