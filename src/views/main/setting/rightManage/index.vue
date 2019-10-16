<template>
  <div class="rightManage">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.value">{{item.label}}</el-breadcrumb-item>
    </el-breadcrumb>
    <SearchBox>
      <template slot="main">
        <el-form ref="registerForm" :model="form" label-width="100px" inline @submit.native.prevent>
          <el-form-item label="权限名" prop="rightName" class="search-box-item">
            <el-input v-model="form.rightName" style="width: 210px"></el-input>
          </el-form-item>
          <el-form-item label="权限id" prop="rightId" class="search-box-item">
            <el-input v-model="form.rightId" style="width: 210px"></el-input>
          </el-form-item>
          <el-form-item label="创建日期" prop="createTime" class="search-box-item">
            <el-date-picker
              v-model="form.createTime"
              type="daterange"
              placeholder="选择日期"
              format="yyyy/MM/dd"
              style="width: 240px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label prop class="search-box-item search-btn">
            <el-button type="ghost" @click="resetFun" style="width: 80px;padding: 10px">重置条件</el-button>
            <el-button type="primary" @click="searchFun" style="width: 185px">搜索</el-button>
          </el-form-item>
        </el-form>
      </template>
    </SearchBox>
    <div class="btn-box">
      <el-button type="primary" icon="el-icon-plus" @click="handleAddRight">新增</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="rightList"
      border
      tooltip-effect="dark"
      style="width: 100%"
      class="multipleTable"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="rightName" label="权限名称" sortable width="120"></el-table-column>
      <el-table-column prop="rightId" label="权限id" sortable="custom" width="90"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="170" sortable="custom"></el-table-column>
      <el-table-column prop="description" label="权限描述"></el-table-column>
      <el-table-column label="操作" fixed="right" width="90">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" v-if="rightList.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.list"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="page.total"
      ></el-pagination>
    </div>
    <RightEditDialog
      v-model="showRightEditDialog"
      :type="rightEditDialogType"
      :data="editRightInfo"
      @close="showRightEditDialog=false"
      @update="editConfirm"
    ></RightEditDialog>
  </div>
</template>

<script>
import SearchBox from '@/components/modules/SearchBox'
import RightEditDialog from './RightEditDialog'
import { Table, TableColumn, DatePicker, Breadcrumb, BreadcrumbItem } from 'element-ui'
export default {
  name: 'rightManage',
  data () {
    let page = {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      list: [5, 10, 20]
    }
    return {
      page,
      rightList: [], // 角色列表
      breadcrumbList: [
        {
          label: '用户设置',
          value: '1'
        },
        {
          label: '权限管理',
          value: '12'
        }
      ],
      form: {
        rightName: '',
        rightId: '',
        createTime: []
      },
      rightEditDialogType: 'add',
      editRightInfo: {},
      showRightEditDialog: false, // 显示编辑角色弹框
      sortCol: 'rightId',
      sortOrder: 'ASC'
    }
  },
  methods: {
    /**
     * 加载列表数据
     * @return {void}
     */
    load () {
      let { rightName, rightId, createTime } = this.form
      let { currentPage, pageSize } = this.page
      let createTimeList = []
      if (createTime && createTime.length === 2) {
        createTime.map(item => {
          let date = new Date(item)
          createTimeList.push(date.format('yyyy-MM-dd hh:mm:ss'))
        })
      }
      console.log('请求接口')
      this.$axios
        .post(this.$api.setting.getRightList, {
          searchData: JSON.stringify({
            rightId: rightId,
            rightName: rightName,
            createTime: createTimeList.join(','),
            orderName: this.sortCol,
            orderType: this.sortOrder,
            index: currentPage,
            pageSize
          })
        })
        .then(res => {
          let result = res.data.list.map(item => {
            item.createTime =
              new Date(item.createTime).format('yyyy-MM-dd hh:mm:ss') || ''
            return item
          })
          this.rightList = result
          this.page.total = res.data.total
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
     * 搜索按钮回调
     * @return {void}
     */
    searchFun () {
      console.log(this.form)
      this.page.currentPage = 1
      this.load()
    },
    resetFun () {
      this.form = {
        username: '',
        userId: '',
        userTickName: '',
        rightId: '',
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
      this.rightEditDialogType = 'edit'
      this.editRightInfo = row
      console.log(row)
      this.showRightEditDialog = true
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
      order === 'ascending' ? (sortOrder = 'ASC') : (sortOrder = 'DESC')
      this.sortCol = prop
      this.sortOrder = sortOrder
      this.load()
    },
    /**
     * 新增角色弹窗回调
     * @return {void}
     */
    handleAddRight () {
      this.rightEditDialogType = 'add'
      this.showRightEditDialog = true
    },
    /**
     * 弹窗确定回调
     * @param {string} type 成功关闭类别
     * @return {void}
     */
    editConfirm (type) {
      this.showRightEditDialog = false
      if (type === 'new') {
        this.$message.success('新增角色成功')
      } else {
        this.$message.success('修改角色成功')
      }
      this.searchFun()
    }
  },
  mounted () {
    this.load()
  },
  components: {
    SearchBox,
    RightEditDialog,
    'el-table': Table,
    'el-table-column': TableColumn,
    'el-date-picker': DatePicker,
    'el-breadcrumb': Breadcrumb,
    'el-breadcrumb-item': BreadcrumbItem
  }
}
</script>

<style lang="scss" scoped>
.rightManage {
  height: 100%;
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
