<template>
        <el-dialog
                title="二维码分享"
                :visible.sync="dialogVisible"
                width="230px"
                :before-close="handleClose"
                class="shareQRCodeDialog"
        >
          <div style="height: 185px;width: 100px;text-align: center">
            <div v-html="svg"></div>
          </div>
        </el-dialog>
</template>
<script>
    export default {
        name:"shareQRCodeDialog",
        props:{
            //显示隐藏
            value:{
                type:Boolean,
                required:true
            },
            url:{
              type: String,
              required: true,
              default:''
            }
        },
        data() {
            return {
                dialogVisible:false,
              svg:''
            };
        },
        computed:{

        },
        methods: {
            handleClose(done) {
                this.$emit('close');
                done()
            },
        },
        watch:{
            value(newVal){
              this.$axios.post(this.$api.api.getQrCodeImageFromUrl,{
                  query:window.location.href
              }).then(res=> {
                this.svg = res.data;
              })
               this.dialogVisible= newVal;
            },
          url(newVal){
              console.log(newVal)

          }
        }
    };
</script>

<style lang="scss" scoped type="text/scss">
</style>
