<template>
    <div class="guide-box">
        <div class="guide-box-title">
            导航栏
        </div>
        <!--<div class="guide-box-listBox">-->
            <!--<guide-list  v-for="(item ,index) in listItems" :key="item.id" :data="item" :data2="listItems"></guide-list>-->
        <!--</div>-->
        <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
        </el-input>
        <el-tree :data="listItems" :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="guideTree" :auto-expand-parent="false" :accordion="true"></el-tree>
    </div>
</template>

<script>
    import Vue from 'vue'
//    import GuideList from './GuideList.vue'

    export default {
        name: 'guide',
        data() {
            return {
                filterText: '',
                listItems: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created: function () {
            this.listItems = [
                {
                    'id': '0',
                    'label': "快捷方式",
                    'type': "root",
                    'children':[
                        {
                            'id': '01',
                            'label': "最近编辑",
                            'type': "root-child",
                            'childs':[]
                        },
                        {
                            'id': '02',
                            'label': "最爱",
                            'type': "root-child",
                            'children':[]
                        },
                    ]
                },
                {
                    'id': '1',
                    'label': "项目1",
                    'type': "project",
                    'children':[
                        {
                            'id': '10',
                            'label': "模块1",
                            'type': "project-0",
                            'children':[
                                {
                                    'id': '100',
                                    'label': "子模块1",
                                    'type': "project-1",
                                    'children':[
                                        {
                                            'id': '1000',
                                            'label': "《推背图》",
                                            'type': "project-2",
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'id': '11',
                            'label': "模块2",
                            'type': "project-0"
                        },
                    ]
                },
                {
                    'id': '2',
                    'label': "项目2",
                    'type': "project"
                }
            ]

        },
        components: {
        },
        watch: {
            filterText(val) {
                this.$refs.guideTree.filter(val);
            }
        },
        methods: {
            gotoIndex: function () {
            },
            handleNodeClick(data) {
                console.log(data);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }

        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .guide-box {
        height: 100%;
        padding: 5px 20px;
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        &-title {
            font-size: 20px;
            color: #000000;
            font-weight: bold;
        }
        .el-input{
          margin: 10px 0px;
        }
    }
</style>