<template>
  <div class="roleManage">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.value">
        {{item.label}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <SearchBox>
      <template slot="main">
        <el-form ref="registerForm" :model="form" label-width="100px" inline @submit.native.prevent>
          <el-form-item label="角色名" prop="username" class="search-box-item">
            <el-input v-model="form.roleName" style="width: 210px"></el-input>
          </el-form-item>
          <el-form-item label="角色id" prop="userTickName" class="search-box-item">
            <el-input v-model="form.roleId" style="width: 210px"></el-input>
          </el-form-item>
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
          <el-form-item label="" prop="" class="search-box-item search-btn">
            <el-button type="ghost" @click="resetFun" style="width: 80px;padding: 10px">重置条件</el-button>
            <el-button type="primary" @click="searchFun" style="width: 185px">搜索</el-button>
          </el-form-item>
        </el-form>
      </template>
    </SearchBox>
    <div class="btn-box">
      <el-button type="primary" icon="el-icon-plus" @click="handleAddRole">新增</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="roleList"
      border
      tooltip-effect="dark"
      style="width: 100%"
      max-height="700"
      class="multipleTable"
      @sort-change="handleSortChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="roleId"
        label="角色id"
        sortable="custom"
        width="90">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="170"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="90"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" v-if="roleList.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.list"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="page.total">
      </el-pagination>
    </div>
    <RoleEditDialog v-model="showRoleEditDialog" :type="roleEditDialogType" :data="editRoleInfo" @close="showRoleEditDialog=false" @update="editConfirm"></RoleEditDialog>
  </div>
</template>

<script>
import SearchBox from '@/components/modules/SearchBox'
import RoleEditDialog from './RoleEditDialog'

export default {
  name: 'roleManage',
  data () {
    let page = {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      list: [5, 10, 20]
    }
    return {
      page,
      roleList: [], // 角色列表
      breadcrumbList: [
        {
          label: '用户设置',
          value: '1'
        },
        {
          label: '角色管理',
          value: '11'
        }
      ],
      form: {
        roleName: '',
        roleId: '',
        createTime: []
      },
      roleEditDialogType: 'add',
      editRoleInfo: {},
      showRoleEditDialog: false, // 显示编辑角色弹框
      sortCol: 'roleId',
      sortOrder: 'ASC'
    }
  },
  methods: {
    /**
       * 加载列表数据
       * @return {void}
       */
    load () {
      let { roleName, roleId, createTime } = this.form
      let { currentPage, pageSize } = this.page
      let createTimeList = []
      if (createTime && createTime.length === 2) {
        createTime.map(item => {
          let date = new Date(item)
          createTimeList.push(date.format('yyyy-MM-dd hh:mm:ss'))
        })
      }
      this.$axios.post(this.$api.setting.getRoleList, {
        searchData: JSON.stringify({
          roleId: '',
          createTime: createTimeList.join(','),
          orderName: this.sortCol,
          orderType: this.sortOrder,
          index: currentPage,
          pageSize
        })
      }).then(res => {
        let result = res.data.list.map(item => {
          item.createTime = new Date(item.createTime).format('yyyy-MM-dd hh:mm:ss') || ''
          return item
        })
        this.roleList = result
        this.page.total = res.data.total
      }).catch(e => {
        console.log(e)
      })
    },
    /**
       * 搜索按钮回调
       * @return {void}
       */
    searchFun () {
      this.page.currentPage = 1
      this.load()
    },
    resetFun () {
      this.form = {
        username: '',
        userId: '',
        userTickName: '',
        roleId: '',
        createTime: [],
        lastLoginTime: []
      }
    },
    /**
       * 分页页面size变化回调
       * @param {Number} val 更改数字
       * @return {void}
       */
    handleSizeChange (val) {
      this.page.pageSize = val
      this.page.currentPage = 1
      this.searchFun()
    },
    /**
       * 分页页码变化回调
       * @param {Number} val 更改数字
       * @return {void}
       */
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.loadViewData()
    },
    /**
       * 分页页码变化回调
       * @param {Object} row 行数据
       * @return {void}
       */
    handleEdit (row) {
      this.roleEditDialogType = 'edit'
      this.editRoleInfo = row
      console.log(row)
      this.showRoleEditDialog = true
    },
    /**
       * 修改用户信息成功回调
       * @return {void}
       */
    handleEditUpdate () {
      this.showUserEditDialog = false
      this.load()
    },
    /**
       * 排序更改回调
       * @param params {Object} 参数
       * @return {void}
       */
    handleSortChange (params) {
      let { prop, order } = params
      let sortOrder = ''
      order === 'ascending' ? sortOrder = 'ASC' : sortOrder = 'DESC'
      this.sortCol = prop
      this.sortOrder = sortOrder
      this.load()
    },
    /**
       * 新增角色弹窗回调
       * @return {void}
       */
    handleAddRole () {
      this.roleEditDialogType = 'add'
      this.showRoleEditDialog = true
    },
    /**
     * 弹窗确定回调
     * @param {string} type 成功关闭类别
     * @return {void}
     */
    editConfirm(type) {
      this.showRoleEditDialog = false
      if (type == 'new') {
        this.$message.success('新增角色成功');
      } else {
        this.$message.success('修改角色成功');
      }
      this.searchFun()
    }
  },
  mounted () {
    this.load()
  },
  components: {
    SearchBox,
    RoleEditDialog
  }
}
</script>

<style lang="scss" scoped>
  .roleManage {
    .search-box {
      .search-btn {
        padding-left: 30px;
      }
    }
    .btn-box {
      margin-bottom: 15px;
    }
    .pagination-box {
      display: block;
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
