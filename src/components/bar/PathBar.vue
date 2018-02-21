<template>
    <div class="path-bar">
        <div class="breadcrumb-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item,index) in docPath" :key="item">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
            <!--{{pathData}}-->
            <!--{{docStr}}-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'path-bar',
        props:['pathData'],
        data() {
            return {
                docPath:[]
            }
        },
        created:function () {
        },
        methods:{
            pathChange:function () {
                if(this.pathData){
                    this.docPath=this.pathData.split("/");
                    this.docPath[0]="管理中心";
                }
            }
        },
        mounted: function () {
            this.pathChange();

        },
        watch:{
            pathData:function () {
                this.pathChange();
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
</style>