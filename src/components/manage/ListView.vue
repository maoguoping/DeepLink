<template>
    <div class="list-view">
        <el-table
                ref="multipleTable"
                :data="viewData"
                tooltip-effect="dark"
                style="width: 100%"
                max-height="700"
                :default-sort = "{prop: 'modifyDate', order: 'descending'}"
                @selection-change="handleSelectionChange">
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
                    sortable
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
                    <el-dropdown trigger="click">
                        <el-button
                                size="mini"
                                class="el-dropdown-link">
                            编辑
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>移动</el-dropdown-item>
                            <el-dropdown-item>重命名</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!--<el-button-->
                            <!--size="mini"-->
                            <!--type="danger"-->
                            <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <!--<div style="margin-top: 20px">-->
            <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>-->
            <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
        <!--</div>-->
    </div>
</template>
<script>
    export default {
        name: 'list-view',
        props:["viewData"],
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                multipleSelection: [],
                pathStr:""
            }
        },
        components: {
            //在#app元素内，注册组件
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
            handleRead(row) {
                this.$emit('viewRead', row);
            },
            handleDelete(index, row) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$alert('已删除','提示',{
                        type: 'message'
                    });
                })
                console.log(index, row);
            }
        },
        created:function () {
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
    }
</style>