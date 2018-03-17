<template>
    <div class="manger-box" >
        <path-bar :pathData="pathStr" @pathLinkTo="pathLinkTo"></path-bar>
        <div>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="1">
                    <template slot="title">
                        一致性 Consistency<i class="header-icon el-icon-info"></i>
                    </template>
                    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="manger-content">
            <list-view :viewData="listItems" @viewRead="readView"></list-view>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import interfaceUrl from '../../lib/interface'
    import PathBar from '../bar/PathBar.vue'
    import ListView from './ListView.vue'
    export default {
        name: 'manage-center',
        data() {
            return {
                currentItem:{},
                listItems:[],
                listToatalItems:[],
                pathStr:"",
                activeNames: []
            }
        },
        components: {
            //在#app元素内，注册组件
            'path-bar': PathBar,
            'list-view': ListView
        },
        methods:{
            readView:function (id) {
                var selectedItem=this.listItems.filter(function (item) {
                    return item.id == id;
                })[0];
    //                this.listItems=selectedItem.children;
                this.pathStr=selectedItem.path;
            },
            pathLinkTo:function (name) {
                var selectedItem=this.listToatalItems.filter(function (item) {
                    return item.name == name;
                })[0];
                this.pathStr=selectedItem.path;
            },
            handleChange(val) {
                console.log(val);
            }
        },
        created:function () {
            axios.get(interfaceUrl.manageCenter.getViewData).then((res) => {
                this.listItems=res.data;
                this.listToatalItems=res.data;
            })
        },
        watch:{
            "pathStr":function (val) {
                var pathArr=val.split('/').slice(1);
                var tempItem=this.listToatalItems;
                var parentItem,parentId;
                for(var i=0;i<pathArr.length;i++){
                    parentItem=tempItem.filter(function (item) {
                        return item.name == pathArr[i];
                    })[0];
                    tempItem=parentItem.children;
                }
                this.listItems=tempItem;
                parentId=parentItem.id;

            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .manger-box {
        width: 920px;
        margin: 0 auto;
        padding: 20px;
        .path-bar{
            margin: 5px 0px;
        }
    }
</style>