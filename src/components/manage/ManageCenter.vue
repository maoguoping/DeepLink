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
            <doc-view v-if="isDocView" :docId="docId" @editDoc="editDoc">
            </doc-view>
            <doc-edit v-model="isDocEdit" :data="docData" @close="closeEdit">
            </doc-edit>
        </el-main>
    </el-container>
</template>
<script>
    import axios from 'axios'
    import interfaceUrl from '../../lib/interface'
    import PathBar from '../bar/PathBar.vue'
    import ListView from './ListView.vue'
    import doc from '../docView/DocView.vue'
    import docEdit from '../docView/DocEdit.vue'

    const manageCenterName = "管理中心"
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
                isDocView: false,
                isDocEdit: false,
                docData: {}
            }
        },
        components: {
            //在#app元素内，注册组件
            'path-bar': PathBar,
            'list-view': ListView,
            'doc-view': doc,
            'doc-edit': docEdit
        },
        methods: {
            isViewDisplay(type) {
                if (type == this.viewType) {
                    return true;
                } else {
                    return false;
                }
            },
            readView(item) {
                if (item.type == 'doc') {
                    this.isManageBox = false;
                    this.isDocView = true;
                    this.docId = item.id;
                    this.pathStr = item.path
                } else {
                    this.pathStr = item.path;
                }

            },
            pathLinkTo(name) {
                var flag = false;
                if (this.isDocView) {
                    flag = true;
                    this.isManageBox = true;
                    this.isDocView = false;
                } else if (this.isDocEdit) {
                    this.$confirm('确定离开?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        flag = true;
                        this.isManageBox = true;
                        this.isDocView = false;
                        this.isDocEdit = false;
                    })
                }
                if (flag) {
                    if (name == manageCenterName) {
                        this.pathStr = "";
                    } else {
                        var index = this.pathStr.indexOf(name) + name.length;
                        this.pathStr = this.pathStr.substring(0, index);
                    }
                }
            },
            editDoc(docData) {
                this.isDocView = false;
                this.isDocEdit = true;
                this.docData = docData;
            },
            closeEdit() {
                this.isDocView = true;
                this.isDocEdit = false;
            },
            handleChange(val) {
            }
        },
        mounted() {
            var query = this.$route.query;
            if (query.type == 'doc') {
                this.isManageBox = false;
                this.isDocView = true;
                this.pathStr = query.path;
            }
        }
        ,
        beforeRouteLeave(to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`;
            if (this.isDocEdit) {
                this.$confirm('确定离开?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 选择确定
                    next()
                })
            } else {
                next();
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .mangerCenter {
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

    .mangerCenterHeader {
        line-height: 30px;
    }

    .mangerCenterMain {
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