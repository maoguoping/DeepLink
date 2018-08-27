<template>
    <el-container class="mangerCenter">
        <el-header class="mangerCenterHeader " style="height: 30px">
            <path-bar ref="pathBar" :beforeChange="beforePathChange" @pathLinkTo="pathLinkTo"></path-bar>
        </el-header>
        <el-main class="mangerCenterMain">
            <div v-if="isManageBox" class="manger-box">
                <div class="manger-operation-box">
                    <div class="view-description-box">{{viewDescription}}</div>
                    <el-row>
                        <el-button type="primary" icon="el-icon-plus" circle @click="handleAddItem"></el-button>
                        <el-button v-if="!isMainList" type="info" icon="el-icon-info" circle @click="handleShowInfo"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="handleMulDelete"></el-button>
                    </el-row>
                </div>
                <div class="manger-content">
                    <list-view ref="listView" @viewRead="readView" @edit="handleEditItem" @delete="handleDelete" @on-change="handleViewChange"  @mulSection="handleMulSection"></list-view>
                </div>
            </div>
            <doc-view v-if="isDocView" :docId="docId" @editDoc="editDoc">
            </doc-view>
        </el-main>
        <set-project-dialog v-model="showSetProjectDialog" :data="setProjectDialogData" @close="handlesetProjectDialogClose" @success="handleAddProjectSuccess"></set-project-dialog>
        <setModuleDialog v-model="showSetModuleDialog" :data="setModuleDialogData" @close="handleSetModuleDialogClose" @success="handleSetModuleSuccess"></setModuleDialog>
        <listInfoDialog v-if="!isMainList" v-model="showListInfoDialog" @close="showListInfoDialog=false"></listInfoDialog>
        <docEditDialog v-model="showDocEditDialog" :data="editData"></docEditDialog>
    </el-container>
</template>
<script>
    import axios from 'axios'
    import {mapMutations} from 'vuex';
    import interfaceUrl from '../../lib/interface'
    import PathBar from '../bar/PathBar.vue'
    import ListView from './ListView.vue'
    import doc from '../docView/DocView.vue'
    import docEditDialog from './dialog/docEditDialog.vue'
    import setProjectDialog from './dialog/setProjectDialog.vue'
    import setModuleDialog from './dialog/setModuleDialog.vue'
    import listInfoDialog from './dialog/listInfoDialog.vue'
    const manageCenterName = "管理中心"
    export default {
        name: 'manage-center',
        data() {
            return {
                docId: '1519187825477',
                currentItem: {},
                listItems: [],
                activeNames: [],
                selectionList:[],
                viewType: "listView",
                viewDescription:"",
                isManageBox: true,
                isDocView: false,
                isDocEdit: false,
                docData: {},
                viewData:{},
                //设置项目弹窗显示数据
                setProjectDialogData:{
                  type:'add',
                  name:"",
                  description:""
                },
                setModuleDialogData:{
                  type:'add',
                  name:"",
                  description:""
                },
                showSetProjectDialog:false,//设置项目弹窗显示隐藏
                showSetModuleDialog:false,//设置
                showListInfoDialog:false,//列表信息显示
                showDocEditDialog:false,
                editData:{
                  id:"",
                  title: '',
                  path:'',
                  tags: [],
                  text: '123'
                }
            }
        },
       computed:{
        //获取路径信息
         pathStr(){
            return this.$store.state.manageCenterStore.manageCenterPath;
          },
         isMainList(){
           return this.$store.state.manageCenterStore.manageCenterPathId === '';
         }
        },
        components: {
            //在#app元素内，注册组件
            'path-bar': PathBar,
            'list-view': ListView,
            'doc-view': doc,
            'set-project-dialog':setProjectDialog,
            setModuleDialog,
            listInfoDialog,
            docEditDialog
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
          /**
           * 面包屑跳转拦截
           * @param pathId {String} 路径id
           * @param pathName  {String} 路径文本
           */
          beforePathChange(pathId,pathName){
            let flag = false;
            if (this.isDocView) {
              flag = true;
            } else if (this.isDocEdit) {
              this.$confirm('确定离开?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
//                flag = true;
                //调用子组件的路径改变函数
                this.$refs.pathBar.changePathTo(pathId,pathName);
              });
            } else {
              flag = true;
            }
            return flag
          },
          /**
           * 面包屑跳转
           * @param name
           */
          pathLinkTo(name) {
            if (this.isDocView) {
              this.isManageBox = true;
              this.isDocView = false;
            } else if (this.isDocEdit) {
                this.isManageBox = true;
                this.isDocView = false;
                this.isDocEdit = false;
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
          handleMulSection(selection){
            this.selectionList=selection;
          },
          //视图改变事件
          handleViewChange(event) {
            this.viewDescription = event.viewDescription;
          },
          handleAddItem() {
            if(this.isMainList){
              this.setProjectDialogData = {
                type: 'add',
                name: "",
                description: ""
              };
              this.showSetProjectDialog = true;
            }else {
              this.setModuleDialogData = {
                type: 'add',
                name: "",
                description: ""
              };
              this.showSetModuleDialog = true;
            }

          },
          /**
           * 子组件编辑回调函数
           * @param item
           */
          handleEditItem(item) {
            if(this.isMainList){
              this.setProjectDialogData = {
                type: 'edit',
                id: item.id,
                name: item.name,
                description: item.description
              }
              this.showSetProjectDialog = true;
            }else {
              this.setModuleDialogData = {
                type: 'edit',
                id:item.id,
                name: item.name,
                description: item.description,
                typeId:item.typeId
              };
              this.showSetModuleDialog = true;
            }

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
              if(this.isMainList){
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
              }else {
                axios.post(interfaceUrl.manageCenter.deleteModule, {
                  info: JSON.stringify({
                    moduleId: item.id
                  })
                }).then(res => {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  this.$refs[this.viewType].updateView()
                });
              }

            })
          },
          /**
           * 批量删除回调函数
           */
          handleMulDelete(){
              if(this.selectionList.length==0){
                this.$message({
                  message:"请选择至少一条",
                  type: 'warning'
                });
              }else {
                let list=this.selectionList.map(item =>{
                  return item.id;
                });
                this.$confirm('确定删除?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  if(this.isMainList){
                    axios.post(interfaceUrl.manageCenter.deleteProject, {
                      info: JSON.stringify({
                        projectId: list
                      })
                    }).then(res => {
                      this.$message({
                        message: '删除成功',
                        type: 'success'
                      });
                      this.$refs[this.viewType].updateView()
                    });
                  }else {
                    axios.post(interfaceUrl.manageCenter.deleteModule, {
                      info: JSON.stringify({
                        moduleId: list
                      })
                    }).then(res => {
                      this.$message({
                        message: '删除成功',
                        type: 'success'
                      });
                      this.$refs[this.viewType].updateView()
                    });
                  }
                })
              }
          },
          /**
           * 查看列表信息
           * @return {Void}
           */
          handleShowInfo(){
            this.showListInfoDialog=true
          },
          //关闭项目新增编辑弹窗
          handlesetProjectDialogClose() {
            this.showSetProjectDialog = false
          },
          handleAddProjectSuccess() {
            this.$refs[this.viewType].updateView()
          },
          //关闭模块新增编辑弹窗
          handleSetModuleDialogClose() {
            this.showSetModuleDialog = false;
          },
          handleSetModuleSuccess() {
            this.$refs[this.viewType].updateView()
          },
        },
        mounted() {
            var query = this.$route.query;
            if (query.type == 'doc') {
                this.isManageBox = false;
                this.isDocView = true;
//                this.pathStr = query.path;
                this.changeManageCenterPath({
                  pathId:query.pathId,
                  pathName:query.path
                });
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
                this.changeManageCenterPath({
                  pathId:query.pathId,
                  pathName:query.path
                });
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
