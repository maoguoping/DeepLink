<template>
    <div class="edit-text">
      <span v-if="status==0" class="text-view">
        {{textVal}}
        <i class="iconfont icon-edit-square" @click="editFun"></i>
      </span>
      <span v-if="status==1" class="input-view" >
        <input ref="inputBox" class="input-box" type="text" v-model="textVal" @blur="textFun">
      </span>
    </div>
</template>

<script>
    export default {
        name: "EditText",
        props:{
          value:{
            type:String,
            required:true,
            default:''
          },
        },
        data(){
          return {
            status:0,
            textVal:this.value
          }
        },
        methods:{
          editFun(){
            this.status = 1;
            this.$nextTick(()=>{
              this.$refs.inputBox.focus();
            })
          },
          textFun(){
            this.status = 0;
          }
        },
        watch:{
          value(newVal){
            this.textVal = newVal;
          },
          textVal(newVal){
            this.$emit('on-change',newVal);
          }
        }
    }
</script>

<style lang="scss" scoped>
.edit-text{
  .text-view{
    .iconfont{
      margin-left: 5px;
      cursor: pointer;
    }
  }
  .input-view{
    .input-box{
      box-sizing: border-box;
      display: inline;
      width: 100%;
      padding: 0 5px;
    }
  }
}
</style>
