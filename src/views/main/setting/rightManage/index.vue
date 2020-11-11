<template>
  <div class="rightManage">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.value">{{item.label}}</el-breadcrumb-item>
    </el-breadcrumb>
    <SearchBox>
      <template v-slot:main>
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
      <el-button type="danger" icon="el-icon-delete" @click="handleDelRight">删除</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="rightList"
      border
      tooltip-effect="dark"
      style="width: 100%"
      class="multipleTable"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="rightName" label="权限名称" sortable width="120"></el-table-column>
      <el-table-column prop="rightId" label="权限id" sortable="custom" width="90"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="170" sortable="custom"></el-table-column>
      <el-table-column prop="description" label="权限描述"></el-table-column>
      <el-table-column label="操作" fixed="right" width="90">
        <template v-slot="scope">
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
import Utils from '@/lib/utils.js'
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
      sortOrder: 'ASC',
      selectList: []
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
          createTimeList.push(Utils.timeFormat(date, 'yyyy-MM-dd hh:mm:ss'))
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
            item.createTime = Utils.timeFormat(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss') || ''
            return item
          })
          this.rightList = result
          this.page.total = res.data.total
          this.selectList = []
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
     * 新增权限弹窗回调
     * @return {void}
     */
    handleAddRight () {
      this.rightEditDialogType = 'add'
      this.showRightEditDialog = true
    },
    /**
     * 删除权限回调
     * @return {void}
     */
    handleDelRight () {
      if (this.selectList.length === 0) {
        this.$message.warning('请选择权限')
        return
      }
      let ids = this.selectList.map(i => i.rightId)
      this.$axios
        .post(this.$api.setting.deleteRight, {
          rightInfo: JSON.stringify({
            rightId: ids.join(',')
          })
        })
        .then(res => {
          this.$message.success('删除权限成功')
          this.load()
        })
        .catch(e => {
          this.$message.error('删除权限失败')
          console.log(e)
        })
    },
    /**
     * 弹窗确定回调
     * @param {string} type 成功关闭类别
     * @return {void}
     */
    editConfirm (type) {
      this.showRightEditDialog = false
      if (type === 'new') {
        this.$message.success('新增权限成功')
      } else {
        this.$message.success('修改权限成功')
      }
      this.searchFun()
    },
    /**
     * 多选回调
     * @param {array} list 成功关闭类别
     * @return {void}
     */
    handleSelectionChange (list) {
      this.selectList = list
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
