<template>
    <div class="list-view">
        <el-table
                ref="multipleTable"
                :data="viewData"
                tooltip-effect="dark"
                style="width: 100%"
                max-height="700"
                @selection-change="handleSelectionChange"
                @sort-change="handelSortChange"
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
                    prop="modifyDate"
                    label="修改日期"
                    sortable="custom"
                    width="120">
                <template slot-scope="scope">{{ scope.row.modifyDate }}</template>
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
                            close-transition>{{scope.row.tag}}</el-tag>
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
                            @click="handleRead(scope.row)">查看</el-button>
                    <el-dropdown trigger="click" @command="handleCommand">
                        <el-button
                                size="mini"
                                class="el-dropdown-link">
                            编辑
                        </el-button>
                        <el-dropdown-menu slot="dropdown" >
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
    import axios from 'axios'
    import {mapMutations} from 'vuex';
    import interfaceUrl from '../../lib/interface'
    const manageCenterName = "管理中心"
    export default {
        name: 'list-view',
        data() {
            let page={
                currentPage:1,
                pageSize:5,
                total:0,
                list:[5,10,20]
            };
            return {
                page,
                sortBy:"modifyDate",
                order:"descending",
                viewData:[],
                msg: 'Welcome to Your Vue.js App',
                multipleSelection: []
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
        },
        methods: {
          ...mapMutations([
            "changeManageCenterPath"
          ]),
        updateView() {
          this.loadViewData();
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
          this.page.pageSize = val;
          this.page.currentPage = 1;
          this.loadViewData();
        },
        handleCurrentChange(val) {
          this.page.currentPage = val;
          this.loadViewData();
        },
        handelSortChange(event) {
          this.sortBy = event.prop;
          this.order = event.order;
          this.loadViewData();
        },
        formatter(row, column) {
          return row.address;
        },
        filterTag(value, row) {
          return row.tag === value;
        },
        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        },
          /**
           *查看事件
           * @param row
           */
        handleRead(row) {
          this.$emit('viewRead', row);
          this.changeManageCenterPath(row.path);
        },
          /**
           *下拉框事件
           * @param row
           */
          handleCommand(command){
            let commandStr=command[0],
                obj=command[1];
            switch (commandStr){
              case 'edit':{
                this.$emit('edit', obj);
                break;
              };
              case 'delete':{
                this.$emit('delete', obj);
                break;
              }
            }
          },
        loadViewData() {
          let path = "";
          if (this.pathStr != manageCenterName) {
            path = this.pathStr;
          }
          axios.post(interfaceUrl.manageCenter.getViewDataByPath, {
            path: encodeURI(path),
            pageInfo: JSON.stringify({
              currentPage: this.page.currentPage,
              pageSize: this.page.pageSize,
              sortBy: this.sortBy,
              order: this.order
            })
          }).then(res => {
            var result = res.data.data.list;
            this.$set(this.page, 'total', res.data.data.total);
            this.viewData = result;
            this.$emit('on-change', {
              type: "update",
              viewType: "listView",
              viewDescription: res.data.data.listDescription
            })
          })
        }
      },
        created(){
        },
        mounted(){
//            var path=""
//            if(manageCenterName!=this.pathStr){
//                path=this.pathStr;
//            }
//            this.loadViewData(path);
            this.updateView();

        },
        watch: {
            "pathStr": function (val) {
                this.loadViewData();
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .list-view{
        ul{
            li{
                height: 60px;
                line-height: 60px;
                border: 1px solid #eeeeee;
                /*display: inline-block;*/
            }
        }
        .pagination-box{
            display: block;
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
