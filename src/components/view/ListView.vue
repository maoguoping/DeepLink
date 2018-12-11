<template>
  <div class="list-view">
    <el-table
      ref="multipleTable"
      :data="viewData"
      border
      :row-class-name="tableRowClassName"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="700"
      @selection-change="handleSelectionChange"
      @sort-change="handelSortChange"
      class="multipleTable"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="modifyTime"
        label="修改日期"
        sortable="custom"
        width="120">
        <template slot-scope="scope">{{ scope.row.modifyTime}}</template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{ text: '项目', value: '项目' }, { text: '环境', value: '环境' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            close-transition>{{scope.row.tag}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="介绍"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRead(scope.row)">查看
          </el-button>
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button
              size="mini"
              class="el-dropdown-link">
              编辑
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>移动</el-dropdown-item>
              <el-dropdown-item :command="['edit',scope.row]">修改</el-dropdown-item>
              <el-dropdown-item :command="['delete',scope.row]">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box" v-if="viewData==''?false:viewData.length>0">
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
  </div>
</template>
<script>
  import Utils from '@/lib/utils.js'
  import {mapMutations} from 'vuex';
  import interfaceUrl from '../../lib/interface'

  const manageCenterName = "管理中心"
  export default {
    name: 'list-view',
    props:{
      defaultLoad:{
        type: Boolean,
        required:false,
        default:true
      }
    },
    data() {
      let page = {
        currentPage: 1,
        pageSize: 5,
        total: 0,
        list: [5, 10, 20]
      };
      return {
        page,
        sortBy: "modifyDate",
        order: "descending",
        viewData: [],
        msg: 'Welcome to Your Vue.js App',
        multipleSelection: []
      }
    },
    computed: {
      //获取路径信息
      pathStr() {
        return this.$store.state.manageCenterStore.manageCenterPath;
      },
      pathId() {
        return this.$store.state.manageCenterStore.manageCenterPathId;
      }
    },
    components: {
      //在#app元素内，注册组件
    },
    methods: {
      ...mapMutations([
        "changeManageCenterPath"
      ]),

      /**
       * 更新列表数据
       * @return {void}
       */
      updateView() {
        this.page.currentPage = 1;
        this.loadViewData();
      },
      /**
       * 选择变化回调
       * @param {Array} valList 返回id列表
       * @return {void}
       */
      handleSelectionChange(valList) {
        this.multipleSelection = valList;
        this.$emit("mulSection", valList)
      },
      /**
       * 分页页面size变化回调
       * @param {Number} val 更改数字
       * @return {void}
       */
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.page.currentPage = 1;
        this.loadViewData();
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
       * 分页排序变化回调
       * @param {Object} event 更改事件
       * @return {void}
       */
      handelSortChange(event) {
        this.sortBy = event.prop;
        this.order = event.order;
        this.loadViewData();
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      /**
       *查看事件
       * @param {Object} row 行数据
       * @return {void}
       */
      handleRead(row) {
        this.$emit('viewRead', row);
        this.page.currentPage = 1
        this.changeManageCenterPath({
          pathId: row.pathId,
          pathName: decodeURI(row.path),
          type:row.type
        });
        this.$router.push({
          path:'/manageCenter',
          query:{
            pathId: Utils.pathStrEncode(row.pathId),
            path: Utils.pathStrEncode(encodeURI(row.path)),
            type:row.type
          }
        })

      },
      /**
       *下拉框事件
       * @param {Array} command 下拉框指令
       * @return {void}
       */
      handleCommand(command) {
        let commandStr = command[0],
          obj = command[1];
        switch (commandStr) {
          case 'edit': {
            this.$emit('edit', obj);
            break;
          }
            ;
          case 'delete': {
            this.$emit('delete', obj);
            break;
          }
        }
      },
      /**
       *加载表格
       * @return {void}
       */
      loadViewData() {
        let pathId = this.pathId || "";
        this.$axios.post(interfaceUrl.manageCenter.getViewDataByPathId, {
          pathId: pathId,
          pageInfo: JSON.stringify({
            currentPage: this.page.currentPage,
            pageSize: this.page.pageSize,
            sortBy: this.sortBy,
            order: this.order
          })
        }).then(res => {
          let result = res.data.list.map(item =>{
            item.modifyTime = new Date(item.modifyTime).format('yyyy-MM-dd');
            return item;
          });

          this.$set(this.page, 'total', res.data.total);
          this.viewData = result;
          this.$emit('on-change', {
            type: "update",
            viewType: "listView",
            viewDescription: res.data.listDescription
          })
        })
      },
      /**
       * 表格行class生成
       * @param row
       * @param rowIndex
       * @return {string}
       */
      tableRowClassName({row, rowIndex}) {
        if (row.type === 0) {
          return 'folder';
        } else if (row.type === 1) {
          return 'element';
        } else {
          return 'project';
        }
      }
    },
    created() {
    },
    mounted() {
//            var path=""
//            if(manageCenterName!=this.pathStr){
//                path=this.pathStr;
//            }
//            this.   (path);
      this.defaultLoad && this.updateView();
    },
    watch: {
      pathId(val) {
        this.loadViewData();
      },
      defaultLoad(val){
        val && this.updateView();
      }
    }
  }
</script>
<style lang="scss" type="text/scss">
  .list-view {
    .multipleTable {
      border: 1px solid #DCDFE6;
    }
    .header {
      background-color: #D3D3D3;
    }
    .element {
      background-color: #FFE4E1;
    }
    .folder {
      background-color: #FFFFE0;
    }
    .project {
      background-color: #F0FFFF;
    }
  }
</style>
<style lang="scss" scoped type="text/scss">
  .list-view {
    ul {
      li {
        height: 60px;
        line-height: 60px;
        border: 1px solid #eeeeee;
        /*display: inline-block;*/
      }
    }
    .pagination-box {
      display: block;
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
