<template>
        <el-container class="mangerCenter">
            <el-header class="mangerCenterHeader " style="height: 30px">
                <path-bar :pathData="pathStr" @pathLinkTo="pathLinkTo"></path-bar>
            </el-header>
            <el-main class="mangerCenterMain">
                <div v-if="isManageBox" class="manger-box">
                    <div>
                        <el-collapse v-model="activeNames" @change="handleChange">
                            <el-collapse-item name="1">
                                <template slot="title">
                                    一致性 Consistency<i class="header-icon el-icon-info"></i>
                                </template>
                                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    <div class="manger-content">
                        <!--<list-view :viewData="listItems" :pathStr="pathStr" @viewRead="readView"></list-view>-->
                        <list-view :pathStr="pathStr" @viewRead="readView"></list-view>
                    </div>
                </div>
                <doc-view v-if="isDocView" :docId="docId">
                </doc-view>
            </el-main>
        </el-container>
</template>
<script>
    import axios from 'axios'
    import interfaceUrl from '../../lib/interface'
    import PathBar from '../bar/PathBar.vue'
    import ListView from './ListView.vue'
    import doc from '../docView/DocView.vue'
    const manageCenterName="管理中心"
    export default {
        name: 'manage-center',
        data() {
            return {
                docId: '1519187825477',
                currentItem: {},
                listItems: [],
                pathStr: "管理中心",
                activeNames: [],
                viewType: "listView",
                isManageBox: true,
                isDocView: false
            }
        },
        components: {
            //在#app元素内，注册组件
            'path-bar': PathBar,
            'list-view': ListView,
            'doc-view': doc,
        },
        methods: {
            isViewDisplay: function (type) {
                if (type == this.viewType) {
                    return true;
                } else {
                    return false;
                }
            },
            readView: function (item) {
                if (item.type == 'doc') {
                    this.isManageBox = false;
                    this.isDocView = true;
                    this.docId = item.id;
                    this.pathStr = item.path
                } else {
                    this.pathStr = item.path;
                }

            },
            pathLinkTo: function (name) {
                if(name==manageCenterName){
                    this.pathStr="";
                }else {
                    var index=this.pathStr.indexOf(name)+name.length;
                    this.pathStr=this.pathStr.substring(0,index);
                }
                if(this.isDocView){
                    this.isManageBox = true;
                    this.isDocView = false;
                }
            },
            handleChange(val) {
            }
        },
        mounted: function () {
            var query = this.$route.query;
            if (query.type == 'doc') {
                this.isManageBox = false;
                this.isDocView = true;
                this.pathStr = query.path;
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .mangerCenter{
        border: none;
    }
    .manger-box {
        width: 920px;
        margin: 0 auto;
        padding: 20px;
        .path-bar {
            margin: 5px 0px;
        }
    }
    .mangerCenterHeader{
        line-height: 30px;
    }
    .mangerCenterMain{
        border: none;
        padding-top: 30px;
        padding-bottom: 0px;
        /*overflow-y: scroll;*/
    }
    .blur {
        -webkit-filter: blur(10px); /* Chrome, Opera */
        -moz-filter: blur(10px);
        -ms-filter: blur(10px);
        filter: blur(10px);
    }
</style>