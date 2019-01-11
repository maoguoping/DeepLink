<template>
    <div class="listInfoDialog">
        <el-dialog
                title="列表信息"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
          <div>
             <ul>
               <li>
                 <label>名称：</label><span>{{listInfo.name}}</span>
               </li>
               <li>
                 <label>类型：</label><span>{{listInfo.type}}</span>
               </li>
               <li>
                 <label>描述：</label><span>{{listInfo.description}}</span>
               </li>
             </ul>
          </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name:"set-project-dialog",
        props:{
            //显示隐藏
            value:{
                type:Boolean,
                required:true
            },
        },
        data() {
            return {
                dialogVisible:false,
            };
        },
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
        },
        methods: {
            handleClose(done) {
                this.$emit('close');
                done();
            },
        },
        watch:{
            value(newVal){
               this.dialogVisible= newVal;
            }
        }
    };
</script>

<style lang="scss" scoped type="text/scss">
</style>
