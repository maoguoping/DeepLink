<template>
  <div class="userManage">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="item.value">
        {{item.label}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <SearchBox>
      <template slot="main">
        <el-form ref="registerForm" :model="form" label-width="100px" inline @submit.native.prevent>
          <el-form-item label="用户名" prop="username" class="search-box-item">
            <el-input v-model="form.username" style="width: 210px"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="userTickName" class="search-box-item">
            <el-input v-model="form.userTickName" style="width: 210px"></el-input>
          </el-form-item>
          <br class="search-box-item">
          <el-form-item label="用户角色" prop="roleId" class="search-box-item">
            <el-select v-model="form.roleId" multiple placeholder="请选择" style="width: 210px">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                style="width: 210px"
              >
              </el-option>
            </el-select>
            <!--<el-input v-model="form.roleId" style="width: 210px"></el-input>-->
          </el-form-item>
          <el-form-item label="用户id" prop="userId" class="search-box-item">
            <el-input v-model="form.userId"  style="width: 210px"></el-input>
          </el-form-item>
          <br class="search-box-item">
          <el-form-item label="创建日期" prop="createTime" class="search-box-item">
            <el-date-picker
              v-model="form.createTime"
              type="daterange"
              placeholder="选择日期"
              format="yyyy/MM/dd"
              style="width: 240px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="最后登录日期" prop="lastLoginTime" class="search-box-item">
            <el-date-picker
              v-model="form.lastLoginTime"
              type="daterange"
              placeholder="选择日期"
              format="yyyy/MM/dd"
              style="width: 240px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="" class="search-box-item search-btn">
            <el-button type="ghost" @click="resetFun"  style="width: 80px;padding: 10px">重置条件</el-button>
            <el-button type="primary" @click="searchFun"  style="width: 185px">搜索</el-button>
          </el-form-item>
        </el-form>
      </template>
    </SearchBox>
    <el-table
      ref="multipleTable"
      :data="userListData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      max-height="700"
      class="multipleTable"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户id"
        sortable="custom"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userTickName"
        label="用户昵称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="最后登录时间">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" v-if="userListData.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.list"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <UserEditDialog v-model="showUserEditDialog" :data="editUserInfo" :type="userEditDialogType" @close="showUserEditDialog =false"></UserEditDialog>
  </div>
</template>

<script>
  import interfaceUrl from '../../../../lib/interface'
  import SearchBox from '../../../modules/SearchBox'
  import UserEditDialog from './userEditDialog'
    export default {
        name: "userManage",
        data(){
          let page = {
            currentPage: 1,
            pageSize: 5,
            total: 0,
            list: [5, 10, 20]
          };
          return {
            page,
            roleList:[],//角色列表
            breadcrumbList:[
              {
                label:'用户设置',
                value:'1'
              },
              {
                label:'用户管理',
                value:'11'
              }
            ],
            userListData:[],
            form:{
              username:'',
              userId:'',
              userTickName:'',
              roleId:'',
              createTime:[],
              lastLoginTime:[]
            },
            userEditDialogType:'edit',
            editUserInfo:{},
            showUserEditDialog:false,//显示编辑用户弹框
          }
        },
        methods:{
          /**
           * 加载角色下拉列表
           * @return {void}
           */
          getRoleListDic(){
            console.log('roel')
            this.$axios.get(interfaceUrl.api.getRoleListDic,{}).then(res =>{
              this.roleList = res.data;
            }).catch(e =>{
              console.log(e);
            })
          },
          /**
           * 加载列表数据
           * @return {void}
           */
          load(){
            let {username,userId,userTickName,roleId,createTime,lastLoginTime}=this.form;
            let {currentPage,pageSize}=this.page;
            let createTimeList =[],
                loginTimeList=[];
            if(createTime && createTime.length==2){
              createTime.map(item =>{
                let date = new Date(item);
                createTimeList.push(date.format('yyyy-MM-dd hh:mm:ss'))
              })
            }
            if(lastLoginTime && lastLoginTime.length==2){
              lastLoginTime.map(item =>{
                let date = new Date(item);
                loginTimeList.push(date.format('yyyy-MM-dd hh:mm:ss'))
              })
            }
            this.$axios.post(interfaceUrl.setting.getUserList,{
              searchData:JSON.stringify({
                username,
                userId,
                userTickName,
                roleId:roleId.join(','),
                createTime:createTimeList.join(','),
                lastLoginTime:loginTimeList.join(','),
                orderName:'username',
                orderType:'ASC',
                page:currentPage,
                pageSize
              })
            }).then(res =>{
              let result = res.data.userList.map(item =>{
                item.createTime = new Date(item.createTime).format('yyyy-MM-dd hh:mm:ss');
                item.lastLoginTime = new Date(item.lastLoginTime).format('yyyy-MM-dd hh:mm:ss');
                return item;
              });
              this.userListData = res.data.userList;
              this.page.total = res.data.total;
            }).catch(e =>{
              console.log(e);
            })
          },
          /**
           * 搜索按钮回调
           * @return {void}
           */
          searchFun(){
            this.load();
          },
          resetFun(){
            this.form={
              username:'',
                userId:'',
                userTickName:'',
                roleId:'',
                createTime:[],
                lastLoginTime:[]
            }
          },
          /**
           * 分页页面size变化回调
           * @param {Number} val 更改数字
           * @return {void}
           */
          handleSizeChange(val) {
            this.page.pageSize = val;
            this.page.currentPage = 1;
            this.searchFun();
          },
          /**
           * 分页页码变化回调
           * @param {Number} val 更改数字
           * @return {void}
           */
          handleCurrentChange(val) {
            this.page.currentPage = val;
            this.loadViewData();
          },
          /**
           * 分页页码变化回调
           * @param {Object} row 行数据
           * @return {void}
           */
          handleEdit(row){
            this.editUserInfo = row;
            console.log(row);
            this.showUserEditDialog = true;
          }
        },
        mounted(){
            this.getRoleListDic();
            this.load()
        },
        components:{
          SearchBox,
          UserEditDialog
        }
    }
</script>

<style lang="scss" scoped>
.userManage{
  .search-box{
    .search-btn{
      padding-left:30px;
    }
  }
  .pagination-box {
    display: block;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
