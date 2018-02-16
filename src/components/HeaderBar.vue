<template>
    <div class="headerbar-box clearfix">
         <div class="logo-box fl">
             内容管理平台
         </div>
        <ul class="tabs fr clearfix" v-model="activeName" >
            <li class="tabs-panel" v-for="(tab,index) in tabList"   @click="handleClick(tab)">
                <span class="panel-name">{{tab.name}}</span>
                <transition name="slide-fade">
                    <span class="panel-underline"v-show="tabActiveIndex==index"></span>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
    import {bus} from '../bus/bus.js'
    export default {
        name: 'header-bar',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                activeName: 'second',
                tabList:[
                    {
                        name:"首页",
                        path:"/index",
                        index:0
                    },
                    {
                        name:"管理中心",
                        path:"/mangerCenter",
                        index:1
                    },
                    {
                        name:"数据中心",
                        path:"/dataCenter",
                        index:2
                    },
                    {
                        name:"设置",
                        path:"/set",
                        index:3
                    }
                ],
               tabActiveIndex:0
            }
        },
        created:function () {
        },
        methods:{
            handleClick(e) {
                var tabClass=this.tabClass,
                     path=e.path,
                     index=e.index;
                this.tabActiveIndex=index;
                this.$router.push({path: path});
//                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .headerbar-box{
        width: 100%;
        height: 59px;
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
        cursor:pointer;
        .tabs{
            display: inline-block;
            margin-top: 10px;
            margin-right: 50px;
            .tabs-panel{
                display:inline-block;
                float: left;
                height: 40px;
                line-height: 40px;
                margin: 0px 20px;
                position: relative;
                .panel-name{
                    display: inline-block;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    margin-top:7px;
                }
                .panel-underline{
                    display: inline-block;
                    width: 100%;
                    height: 3px;
                    background-color: #1a75ff;
                    position: absolute;
                    top:38px;
                }
            }
        }
    }
</style>