<template>
  <div class="userManage">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="item.value">
        {{item.label}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <SearchBox>
      <el-form ref="registerForm" :model="form" label-width="70px" inline @submit.native.prevent>
        <el-form-item label="用户名" prop="account">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户id" prop="account">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>
      </el-form>
    </SearchBox>
    <el-table
      ref="multipleTable"
      :data="userListData"
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
            @click="handleRead(scope.row)">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import interfaceUrl from '../../../../lib/interface'
  import SearchBox from '../../../modules/SearchBox'
    export default {
        name: "userManage",
        data(){
          return {
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
            userListData:[
              {
                username:'123',
                userId:'123',
                userTickName:'123',
                createTime:'2131',
                lastLoginTime:'123',
                roleName:'213'
              }
            ],
            form:{
              username:'',
              userId:''
            }
          }
        },
        methods:{
          load(){
            this.$axios.post(interfaceUrl.setting.getUserList,{
              searchData:JSON.stringify({
                username:'',
                userId:'',
                userTickName:'',
                createTime:'',
                lastLoginTime:'',
                orderName:'username',
                orderType:'ASC',
                page:0,
                pageSize:20
              })
            }).then(res =>{
              let result = res.userList.map(item =>{
                item.createTime = new Date(item.createTime).format('yyyy-MM-dd hh:mm:ss');
                item.lastLoginTime = new Date(item.lastLoginTime).format('yyyy-MM-dd hh:mm:ss');
                return item;
              });
              this.userListData = res.userList;
            }).catch(e =>{
              console.log(e);
            })
          }
        },
        mounted(){
            this.load()
        },
        components:{
          SearchBox
        }
    }
</script>

<style lang="scss" scoped>
.userManage{
  .search-box{
    box-sizing: border-box;
    margin: 20px 0;
    padding:20px;
  }
}
</style>
