<template>
    <div class="userEditDialog">
        <el-dialog
                title="编辑用户"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
          <div>
            <div class="top-box clearfix">
              <div class="pic-box"></div>
              <div class="info-box">
                <ul>
                  <li>
                    <label>用户id：</label>
                    <span>{{data.userId}}</span>
                  </li>
                  <li class="clearfix">
                    <span class="name-block">
                      <label>用户名：</label>
                      <span>{{data.username}}</span>
                    </span>
                    <span class="name-block">
                      <label>用户昵称：</label>
                      <span>{{data.userTickName}}</span>
                    </span>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </el-dialog>
    </div>
</template>
<script>
    import interfaceUrl from '../../../../lib/interface'
    import {mapMutations} from 'vuex';
    export default {
        name:"set-project-dialog",
        props:{
            //显示隐藏
            value:{
                type:Boolean,
                required:true
            },
            data:{
              type:Object,
              required:true,
              default:{
                username:'',
                userId:'',
                userTickName:''
              }
            }
        },
        data() {
            return {
                dialogVisible:false,
            };
        },
        computed:{

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
  .userEditDialog{
    .top-box{
      border: 1px solid #eee;
      padding: 20px;
      .pic-box{
        display: inline-block;
        float: left;
        width: 60px;
        height: 60px;
        background-color: #3a8ee6;
      }
      .info-box{
        display: inline-block;
        float: left;
        width: 390px;
        padding: 0 20px;
        ul{
          li{
            height: 30px;
            line-height: 30px;
            label{
              font-weight: bold;
            };
            .name-block{
              display: inline-block;
              width: 195px;
              float: left;
            }
          }
        }
      }
    }
  }
</style>
