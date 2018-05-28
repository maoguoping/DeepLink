<template>
    <div class="headerbar-box clearfix">
         <div class="logo-box">
           <img class="logo-pic" src="../../lib/assets/img/DeepLink.png" alt="">
           <label>DeepLink</label>
         </div>
        <div class="tab-box">
          <div class="content">
            <ul class="tabs fr clearfix" v-model="activeName" >
              <li class="tabs-panel" v-for="(tab,index) in tabList"   @click="handleClick(tab)">
                <span class="panel-name">{{tab.name}}</span>
                <transition name="slide-fade">
                  <span class="panel-underline"v-show="activeName==tab.path"></span>
                </transition>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '../../bus/bus.js'
    export default {
        name: 'header-bar',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                activeName: 'index',
                tabList:[
                    {
                      name:"首页",
                      path:"/index",
                      index:0
                    },
                    {
                        name:"管理中心",
                        path:"/manageCenter",
                        index:2
                    },
                    {
                        name:"数据中心",
                        path:"/dataCenter",
                        index:3
                    },
                    {
                        name:"设置",
                        path:"/setting",
                        index:4
                    }
                ],
               tabActiveIndex:0
            }
        },
        methods:{
            handleClick(e) {
                this.activeName=e.path;
                this.$router.push({path: e.path,params:'2018022001'});
            }
        },
        mounted(){
           let path=this.$route.path;
           this.activeName=(path=='/')?'/index':path;
        },
        watch:{
            $route(newVal){
              let path=this.$route.path;
              this.activeName=(path=='/')?'/index':path;
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .headerbar-box{
        width: 100%;
        height: 118px;
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
        background-color: #ffffff;
        cursor:pointer;
        text-align: center;
        .logo-box{
            display: inline-block;
            width: 1347px;
            font-size: 24px;
            font-weight: bold;
            line-height: 59px;
            .logo-pic{
              display: inline-block;
              float: left;
              height: 59px;
              margin-left: 15px;
              margin-right: 20px;
            }
            label{
              float: left;
            }
        };
        .tab-box{
          display:block;
          height: 59px;
          background-color: #5d9aff;
          .content{
            display: inline-block;
            height: 59px;
            width: 1347px;
            .tabs{
              display: inline-block;
              margin-top: 10px;
              .tabs-panel{
                display:inline-block;
                float: left;
                height:33px;
                line-height: 40px;
                margin: 0px 20px;
                position: relative;
                .panel-name{
                  display: block;
                  width: 100%;
                  height: 30px;
                  font-size: 16px;
                  line-height: 30px;
                  margin-top:7px;
                  color: #ffffff;
                }
                .panel-underline{
                  display: block;
                  width: 100%;
                  height: 3px;
                  background-color: #ffffff;
                  position: absolute;
                  top:38px;
                }
              }
            }
          }
        }
    }
</style>
