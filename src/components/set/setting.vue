<template>
    <el-container class="setting">
        <el-header class="settingHeader " style="height: 30px">
            <path-bar :pathData="pathStr" @pathLinkTo="pathLinkTo"></path-bar>
        </el-header>
        <el-main class="settingMain">

        </el-main>
    </el-container>
</template>
<script>
    import axios from 'axios'
    import interfaceUrl from '../../lib/interface'
    import PathBar from '../bar/PathBar.vue'
    import doc from '../docView/DocView.vue'
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
                viewDescription:"",
                isManageBox: true,
                isDocView: false,
                isDocEdit: false,
                docData: {},
                showSetProjectDialog:false
            }
        },
        components: {
            //在#app元素内，注册组件
            'path-bar': PathBar,
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
                        if (name == manageCenterName) {
                            this.pathStr = "";
                        } else {
                            var index = this.pathStr.indexOf(name) + name.length;
                            this.pathStr = this.pathStr.substring(0, index);
                        }
                    })
                }else {
                    flag=true;
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
            },
            //视图改变事件
            handleViewChange(event){
                this.viewDescription=event.viewDescription;
            },
            handleAddItem(){
                this.showSetProjectDialog=true;
            },
            handleAddProjectDialogClose(){
                this.showSetProjectDialog=false;
            },
            handleAddProjectSuccess(){
                this.$refs[this.viewType].updateView()
            }
        },
        mounted() {
//
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
    .setting {
        border: none;
    }

    .manger-box {
        width: 920px;
        margin: 0 auto;
        padding: 20px;
        .path-bar {
            margin: 5px 0px;
        }
        .manger-operation-box{
            .el-row{
                float: right;
            }
            .view-description-box{
                float: left;
                display: inline-block;
            }
        }
    }

    .settingHeader {
        line-height: 30px;
    }

    .settingMain {
        border: none;
        padding-top: 0px;
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
