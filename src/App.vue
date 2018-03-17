<template>
    <div id="DeepLink">
        <header-bar class="header" ></header-bar>
        <div class="wrapper">
            <div class="wrapper-main">
                <!--<div class="left-area">-->
                    <!--<guide></guide>-->
                <!--</div>-->
                <!--<div class="main-area">-->
                    <!--<router-view></router-view>-->
                    <!--&lt;!&ndash;<docView-index v-if="mainPath=='index'"></docView-index>&ndash;&gt;-->
                    <!--&lt;!&ndash;<docView v-else></docView>&ndash;&gt;-->
                <!--</div>-->
                <el-container>
                    <el-aside>
                        <guide></guide>
                    </el-aside>
                    <el-container>
                        <el-main>
                            <router-view></router-view>
                        </el-main>
                    </el-container>
                </el-container>
            </div>
        </div>
    </div>
</template>

<script>
    //使用ES6特性引入 localstorage 储存脚本，命名为 Storage

    //ES6语法，相当于
    //new Vue({})
    import {bus} from './bus/bus'
    import Guide from './components/guide/Guide.vue'
    import Doc from './components/docView/DocView.vue'
    import DocIndex from './components/docView/DocIndex.vue'
    import HeaderBar from './components/bar/HeaderBar.vue'
    export default {
        name: 'app',//name属性作为组件名称，全局 ID 自动作为组件的 name
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                tableData: Array(20).fill(item),
                msg: 'Type name and mark who is student',
                mainPath: 'index',
                path: window.location.pathname
            }
        },
        components: {
            //在#app元素内，注册组件
            'header-bar': HeaderBar,
            'doc-index': DocIndex,
            'doc': Doc,
            'guide':Guide
        },
        mounted: function () {
            var app = this;
            bus.$on('docChangeTo', function (e) {
                app.mainPath = '1000';
            });
            bus.$on('gotoIndex', function (e) {
                app.mainPath = 'index';
            });
        }
    }
</script>
<style lang="scss" type="text/scss">
    @import "../static/css/base.css";

    html {
        overflow: hidden;
        height: 100%;
    }

    .app {
        background-color: #999;
        height: 100%;
    }

    #DeepLink {
        width: 100%;
        height: 100%;
        display: inline-block;
        //头部
        /*.header {*/
            /*width: 100%;*/
            /*height: 100px;*/
        /*}*/
        //总布局
        .wrapper {
            width: 100%;
            margin: 0 auto;
            position: absolute;
            top: 59px;
            bottom: 0px;
            left: auto;
            //中心布局
            .wrapper-main {
                width: 1366px;
                height: 100%;
                margin: 0 auto;
                .el-container{
                   height:100%;
                    border: 1px solid #eee;
                    aside {
                        width:300px;
                        background-color: #ffffff;
                    }
                    section{
                        width:1066px;
                    }
                }
            }
        }
    }
</style>