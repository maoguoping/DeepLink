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
        data() {
            return {
            }
        },
        computed:{
          //获取路径信息
          pathStr(){
            return this.$store.state.manageCenterStore.manageCenterPath;
          },
          docPath(){
            let pathStr=this.pathStr;
            let docPath=[];
            if(pathStr){
              docPath=pathStr.split("/");
              docPath[0]="管理中心";
            }else {
              docPath=["管理中心"]
            }
            return docPath;
          }
        },
        created:function () {
        },
        methods:{
//            pathChange:function () {
//                if(this.pathStr){
//                    this.docPath=this.pathStr.split("/");
//                    this.docPath[0]="管理中心";
//                }else {
//                    this.docPath=["管理中心"];
//                }
//            },
            pathLinkTo:function (item) {
               this.$emit('pathLinkTo',item);
            }
        },
        mounted: function () {
//            this.pathChange();

        },
//        watch:{
//            pathStr:function () {
//                this.pathChange();
//            }
//        }
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
