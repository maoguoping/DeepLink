<template>
<div class="element">
  <el-container>
    <el-header class="header">
      <h1 class="title">{{listInfo.name}}</h1>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</div>
</template>

<script>
  export default {
    name: "Element",
    computed:{
      listInfo(){
        return this.$store.state.manageCenterStore.manageCenterInfo || {
          name:'',
          description :'',
          id:'',
          type:'',
          typeId:'',
          tag:'',
          path:'',
          pathId:'',
          parentId:'',
          parentName:'',
          parentType:'',
          parentTypeId:'',
          parentPath:'',
          parentPathId:'',
          modifyDate:'',
          children:[]
        }
      }
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
.element{
  .el-header{
    padding-top: 20px;
    .title{

    }
  }

}
</style>
