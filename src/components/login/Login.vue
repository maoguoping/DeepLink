<template>
  <div class="login">
    <div class="bg-pic">
        <LoginBox></LoginBox>
    </div>
  </div>
</template>

<script>
  import LoginBox from './LoginBox.vue'
  export default {
    name: "login",
    components:{
      LoginBox
    }
  }
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  .bg-pic{
    background-color: #101f3c;
    background:url(../../lib/assets/img/login_bg.jpg)  no-repeat center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items:Center;
    .login-box{
      z-index: 1;
      background: hsla(0,0%,100%,.8);
    }
  }
}
</style>
