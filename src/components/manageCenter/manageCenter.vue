<template>
    <el-container class="mangerCenter">
        <el-header class="mangerCenterHeader " style="height: 30px">
            <path-bar @pathLinkTo="pathLinkTo"></path-bar>
        </el-header>
        <el-main class="mangerCenterMain">
            <div v-if="isManageBox" class="manger-box">
                <div class="manger-operation-box">
                    <div class="view-description-box">{{viewDescription}}</div>
                    <el-row>
                        <el-button type="primary" icon="el-icon-plus" circle @click="handleAddItem"></el-button>
                        <el-button type="info" icon="el-icon-message" circle ></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </el-row>
                </div>
                <div class="manger-content">
                    <list-view ref="listView"  @viewRead="readView" @edit="handleEditItem" @delete="handleDelete" @on-change="handleViewChange"></list-view>
                </div>
            </div>
            <doc-view v-if="isDocView" :docId="docId" @editDoc="editDoc">
            </doc-view>
            <doc-edit v-model="isDocEdit" :data="docData" @close="closeEdit">
            </doc-edit>
        </el-main>
        <set-project-dialog v-model="showSetProjectDialog" :data="setProjectDialogData" @close="handleAddProjectDialogClose" @success="handleAddProjectSuccess"></set-project-dialog>
    </el-container>
</template>
<script>
    import axios from 'axios'
    import {mapMutations} from 'vuex';
    import interfaceUrl from '../../lib/interface'
    import PathBar from '../bar/PathBar.vue'
    import ListView from './ListView.vue'
    import doc from '../docView/DocView.vue'
    import docEdit from '../docView/DocEdit.vue'
    import addProjectDialog from './dialog/setProjectDialog.vue'

    const manageCenterName = "管理中心"
    export default {
        name: 'manage-center',
        data() {
            return {
                docId: '1519187825477',
                currentItem: {},
                listItems: [],
                activeNames: [],
                viewType: "listView",
                viewDescription:"",
                isManageBox: true,
                isDocView: false,
                isDocEdit: false,
                docData: {},
                //设置项目弹窗显示数据
                setProjectDialogData:{
                  type:'add',
                  name:"",
                  description:""
                },
                showSetProjectDialog:false,//设置项目弹窗显示隐藏
            }
        },
       computed:{
        //获取路径信息
         pathStr(){
            return this.$store.state.manageCenterStore.manageCenterPath;
          }
        },
        components: {
            //在#app元素内，注册组件
            'path-bar': PathBar,
            'list-view': ListView,
            'doc-view': doc,
            'doc-edit': docEdit,
            'set-project-dialog':addProjectDialog
        },
        methods: {
          ...mapMutations([
            "changeManageCenterPath"
          ]),
          isViewDisplay(type) {
            if (type == this.viewType) {
              return true;
            } else {
              return false;
            }
          },
          /**
           * 子组件查看回调函数
           * @param item
           */
          readView(item) {
            if (item.type == 'doc') {
              this.isManageBox = false;
              this.isDocView = true;
              this.docId = item.id;
            }
          },
          pathLinkTo(name) {
            let flag = false;
            const changePath=()=>{
              let path=""
              if (name != manageCenterName) {
                let index = this.pathStr.indexOf(name) + name.length;
                path=this.pathStr.substring(0, index)
              }
              this.changeManageCenterPath(path);
            };
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
                changePath()
              })
            } else {
              flag = true;
            }
            if (flag) {
              changePath()
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
          handleViewChange(event) {
            this.viewDescription = event.viewDescription;
          },
          handleAddItem() {
            this.setProjectDialogData = {
              type: 'add',
              name: "",
              description: ""
            },
              this.showSetProjectDialog = true;
          },
          /**
           * 子组件编辑回调函数
           * @param item
           */
          handleEditItem(item) {
            this.setProjectDialogData = {
              type: 'edit',
              id: item.id,
              name: item.name,
              description: item.description
            },
              this.showSetProjectDialog = true;
          },
          /**
           * 子组件删除回调函数
           * @param item
           */
          handleDelete(item) {
            this.$confirm('确定删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              axios.post(interfaceUrl.manageCenter.deleteProject, {
                info: JSON.stringify({
                  projectId: item.id
                })
              }).then(res => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.$refs[this.viewType].updateView()
              });
            })
          },
          handleAddProjectDialogClose() {
            this.showSetProjectDialog = false;
          },
          handleAddProjectSuccess() {
            this.$refs[this.viewType].updateView()
          }
        },
        mounted() {
            var query = this.$route.query;
            if (query.type == 'doc') {
                this.isManageBox = false;
                this.isDocView = true;
//                this.pathStr = query.path;
                this.changeManageCenterPath(query.path);
            }
        }
        ,
         watch:{
            $route() {
              var query = this.$route.query;
              if (query.type == 'doc') {
                this.isManageBox = false;
                this.isDocView = true;
//                this.pathStr = query.path;
                this.changeManageCenterPath(query.path);
              }
          }
        },
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

    .mangerCenterHeader {
        line-height: 30px;
    }

    .mangerCenterMain {
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
