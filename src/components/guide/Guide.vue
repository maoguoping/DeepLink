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
    import axios from 'axios'
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
            axios.get('/api?method=guideListData').then((res) => {
                  this.listItems=res.data;
            })
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
                if(data.id!=null){
                    this.$router.push({name:"doc",params:{id:data.id}});
                }
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.path.indexOf(value) !== -1;
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