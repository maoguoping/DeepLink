<template>
    <div id="DeepLink">
        <header-bar class="header" ></header-bar>
        <div class="wrapper">
            <div class="wrapper-main">
                <div class="left-area">
                    <guide></guide>
                </div>
                <div class="main-area">
                    <doc-index v-show="mainPath=='index'"></doc-index>
                    <doc v-show="mainPath!='index'"></doc>
                </div>
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
    import Doc from './components/doc/Doc.vue'
    import DocIndex from './components/doc/DocIndex.vue'
    import HeaderBar from './components/HeaderBar.vue'

    export default {
        name: 'app',//name属性作为组件名称，全局 ID 自动作为组件的 name
        data() {
            return {
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
        .header {
            width: 100%;
            height: 100px;
        }
        //总布局
        .wrapper {
            width: 100%;
            margin: 0 auto;
            position: absolute;
            top: 100px;
            bottom: 0px;
            left: auto;
            //中心布局
            .wrapper-main {
                width: 1366px;
                height: 100%;
                margin: 0 auto;
                //左区域
                .left-area {
                    float: left;
                    width: 366px;
                }
                //主区域
                .main-area {
                    float: left;
                    width: 960px;
                    height: 100%;
                    padding: 0 20px;
                }
            }
        }
    }

</style>