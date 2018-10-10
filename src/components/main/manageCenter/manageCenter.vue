<template>
    <el-container class="mangerCenter">
        <el-header class="mangerCenterHeader " style="height: 30px">
            <PathBar ref="pathBar" :beforeChange="beforePathChange" @pathLinkTo="pathLinkTo"></PathBar>
        </el-header>
        <el-main class="mangerCenterMain">
            <div v-if="isManageBox" class="manger-box">
                <div class="manger-operation-box">
                    <div class="view-description-box">{{viewDescription}}</div>
                    <el-row>
                        <el-button type="primary" icon="el-icon-plus" circle @click="handleAddItem"></el-button>
                        <el-button v-if="!isMainList" type="info" icon="el-icon-info" circle @click="handleShowInfo"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="handleMulDelete"></el-button>
                        <el-button   icon="el-icon-share" circle @click="handleShareBtn"></el-button>
                    </el-row>
                </div>
                <div class="manger-content">
                    <ListView ref="listView" :default-load="defaultLoad" @viewRead="readView" @edit="handleEditItem" @delete="handleDelete" @on-change="handleViewChange"  @mulSection="handleMulSection"></ListView>
                </div>
            </div>
            <Element v-if="isElement"></Element>
        </el-main>
        <SetProjectDialog v-model="showSetProjectDialog" :data="setProjectDialogData" @close="handlesetProjectDialogClose" @success="handleAddProjectSuccess"></SetProjectDialog>
        <SetModuleDialog v-model="showSetModuleDialog" :data="setModuleDialogData" @close="handleSetModuleDialogClose" @success="handleSetModuleSuccess"></SetModuleDialog>
        <ListInfoDialog v-if="!isMainList" v-model="showListInfoDialog" @close="showListInfoDialog=false"></ListInfoDialog>
        <DocEditDialog v-model="showDocEditDialog" :data="editData"></DocEditDialog>
        <ShareQRCodeDialog v-model="showShareTip" :url="currentUrl" @close="showShareTip=false"></ShareQRCodeDialog>
    </el-container>
</template>
<script>
    import {mapMutations} from 'vuex';
    import interfaceUrl from '../../../lib/interface'
    import Utils from '@/lib/utils.js'
    import PathBar from '../../bar/PathBar.vue'
    import ListView from './ListView.vue'
    import Element from './element/Element.vue'
    import doc from '../docView/DocView.vue'
    import DocEditDialog from './dialog/docEditDialog.vue'
    import SetProjectDialog from './dialog/setProjectDialog.vue'
    import SetModuleDialog from './dialog/setModuleDialog.vue'
    import ListInfoDialog from './dialog/listInfoDialog.vue'
    import ShareQRCodeDialog from './dialog/shareQRCodeDialog'
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
                isElement:false,
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
                showShareTip:false,//分享tip显示隐藏
                editData:{
                  id:"",
                  title: '',
                  path:'',
                  tags: [],
                  text: '123'
                },
                defaultLoad:false,
                currentUrl:window.location.href
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
            PathBar,
            ListView,
            SetProjectDialog,
            SetModuleDialog,
            ListInfoDialog,
            DocEditDialog,
            ShareQRCodeDialog,
            Element
        },
        methods: {
          ...mapMutations([
            "changeManageCenterPath"
          ]),
          /**
           * 子组件查看回调函数
           * @param item
           */
          readView(item) {
            if (item.type == '1') {
              this.isManageBox = false;
              this.isDocView = false;
              this.isElement = true;
            }
          },
          /**
           * 面包屑跳转拦截
           * @param pathId {String} 路径id
           * @param pathName  {String} 路径文本
           */
          beforePathChange(pathId,pathName){
            let flag = false;
            if (this.isElement) {
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
            if(this.isElement){
              this.isElement = false;
              this.isManageBox = true;
            }
          },
          /**
           * 多选回调
           * @param {Array} selection 选择列表
           * @return {void}
           */
          handleMulSection(selection){
            this.selectionList=selection;
          },
          /**
           * 视图改变事件
           * @param {Object} event
           * @return {void}
           */
          handleViewChange(event) {
            this.viewDescription = event.viewDescription;
          },
          /**
           * 添加按钮回调
           * @return {void}
           */
          handleAddItem() {
            let setObj ={
              type: 'add',
              name: '',
              description: ''
            }
            if(this.isMainList){
              this.setProjectDialogData = setObj;
              this.showSetProjectDialog = true;
            }else {
              this.setModuleDialogData = setObj;
              this.showSetModuleDialog = true;
            }

          },
          /**
           * 子组件编辑回调函数
           * @param {Object} item
           * @return {void}
           */
          handleEditItem(item) {
            let setObj = {
              type: 'edit',
              id: item.id,
              name: item.name,
              description: item.description
            }
            if(this.isMainList){
              this.setProjectDialogData = setObj;
              this.showSetProjectDialog = true;
            }else {
              setObj.typeId = item.typeId
              this.setModuleDialogData = setObj;
              this.showSetModuleDialog = true;
            }

          },
          /**
           * 子组件删除回调函数
           * @param {Object} item
           * @return {void}
           */
          handleDelete(item) {
            this.$confirm('确定删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(this.isMainList){
                this.$axios.post(interfaceUrl.manageCenter.deleteProject, {
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
                this.$axios.post(interfaceUrl.manageCenter.deleteModule, {
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
           * @return {void}
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
                    this.$axios.post(interfaceUrl.manageCenter.deleteProject, {
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
                    this.$axios.post(interfaceUrl.manageCenter.deleteModule, {
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
          /**
           * 关闭项目新增编辑弹窗
           * @return {void}
           */
          handlesetProjectDialogClose() {
            this.showSetProjectDialog = false
          },
          /**
           * 添加项目成功回调
           * @return {void}
           */
          handleAddProjectSuccess() {
            this.$refs[this.viewType].updateView()
          },
          /**
           * 关闭模块新增编辑弹窗
           * @return {void}
           */
          handleSetModuleDialogClose() {
            this.showSetModuleDialog = false;
          },
          /**
           * 设置项目成功回调
           * @return {void}
           */
          handleSetModuleSuccess() {
            this.$refs[this.viewType].updateView()
          },
          /**
           * 分享按钮回调
           * @return {void}
           */
          handleShareBtn(){
            this.currentUrl = decodeURI(window.location.href);
            this.showShareTip = true
          }
        },
        mounted() {
            let query = this.$route.query;
            if (query.pathId && query.path) {
                this.changeManageCenterPath({
                  pathId:Utils.pathStrDecode(query.pathId),
                  pathName:Utils.pathStrDecode(decodeURI(query.path)),
                  type:query.path
                });
                let flag = (query.type != 1)
              this.isElement = !flag;
              this.isManageBox = flag;

            }else {
              this.changeManageCenterPath({
                pathId:'',
                pathName:'',
                type:''
              });
              this.defaultLoad = true
            }
        }
        ,
         watch:{
            $route() {
              var query = this.$route.query;
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
        width: 100%;
        /*margin: 0 auto;*/
        /*padding: 20px;*/
        .path-bar {
            margin: 5px 0px;
        }
        .manger-operation-box{
          height: 40px;
          margin-bottom: 20px;
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
