<template>
    <div class="path-bar">
        <div class="breadcrumb-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item,index) in docPath" :key="item" >
                    <a @click="pathLinkTo(item)">{{item}}</a>
                </el-breadcrumb-item>
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
                }else {
                    this.docPath=["管理中心"];
                }
            },
            pathLinkTo:function (item) {
               this.$emit('pathLinkTo',item);
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
    .path-bar{
        .breadcrumb-box{
            margin: 8px 0px;
        }
    }
    a{
        text-decoration: none;
    }
</style>