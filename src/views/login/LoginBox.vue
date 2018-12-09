<template>
  <div class="login-box">
    <div class="logo-box">
      <div class="logo-box-content clearfix">
        <img src="../../assets/img/DeepLink.png" alt="">
        <span>DeepLink</span>
      </div>
    </div>
    <div class="title-box">
      登录DeepLink,创造你的世界
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
      <el-button type="primary" style="width:100%" @click="login" :disabled="isDisable">登录</el-button>
      <ul class="btn-list clearfix">
        <li>忘记密码</li>
        <li @click="register">注册</li>
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
  import md5 from 'md5'
  export default {
    name: "loginBox",
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
       * 登录
       */
      login(){
        console.log(md5(this.form.password));
        this.$refs.loginForm.validate(valid =>{
          valid && this.$axios.post(interfaceUrl.users.login, {
            username:this.form.account,
            password:md5(this.form.password),
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
            this.$message.error(err.message||'错误')
          });
        });
      },
      /**
       * 切换到注册
       */
      register(){
        this.$emit('change','register');
      }
    }
  }
</script>

<style lang="scss" scoped>
.login-box{
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
    margin-top: 10px;
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
