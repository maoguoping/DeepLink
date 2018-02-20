<template>
    <div class="doc">
        <div class="header-box">
            <div class="breadcrumb-box">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <!--<el-breadcrumb-item :to="{ path: '/mangerCenter' }">管理中心</el-breadcrumb-item>-->
                    <el-breadcrumb-item v-for="(item,index) in form.path">{{item}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <ul class="operation-bar clearfix">
                <li>统计</li>
            </ul>
        </div>
        <div class="read-box">
            <div class="doc-box">
            <el-form ref="form" :model="form" label-width="80px">
                <!--标题-->
                <el-form-item class="doc-title" label="标题：">
                    <el-input id="titleInput" v-model="form.title" type="text" placeholder="请输入标题"></el-input>
                </el-form-item>
                <!--标签-->
                <el-form-item class="doc-tag" label="标签：">
                    <el-tag
                            :key="tag"
                            v-for="tag in form.tags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
                <!--内容-->
                <div class="doc-content">
                    <div id="summernote">

                    </div>
                </div>
                <el-form-item class="submit-box">
                    <el-button type="primary" @click="onSubmit">保存提交</el-button>
                    <el-button @click="cancleEdit">离开</el-button>
                </el-form-item>
            </el-form>
        </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'doc-edit',
        data() {
            return {
                form: {
                    title: '',
                    path:'',
                    tags: [],
                    text: ''
                },
                docPath:'',
                inputVisible: false,
                inputValue: '',
                docData: {}
            }
        },
        methods: {
            handleClose(tag) {
                this.form.tags.splice(this.form.tags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.form.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            getDocData: function () {
                axios.get('/api?method=docData&docId=1000').then((res) => {
                    if(res.code==200){
                        var result = res.data;
                        this.docData = result;
                    }else {

                    }
                })
            },
            onSubmit() {
                //获取富文本编辑器文本
                var markupStr = $('#summernote').summernote('code');
                this.form.text=markupStr;
                axios.post('/api?method=docSubmit',{
                    form:this.form
                }).then((res) => {
                    if(res.data.code==200){
                        this.$alert('修改文档成功', '成功', {
                            confirmButtonText: '确定',
                            callback: action => {

                            }
                        });
                    }else {

                    }
                });
            },
            cancleEdit:function () {
                this.$confirm('编辑尚未提交，确定离开?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({name:'doc',params:{id:'2018022001'}});
                })
            }
        },
        mounted() {
            $('#summernote').summernote({
                lang: 'zh-CN',
                placeholder: ' ',
                height: 300,
                minHeight: 300,
                maxHeight: 300,
                focus: true,
                toolbar: [
                    ['operate', ['undo', 'redo']],
                    ['magic', ['style']],
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['para', ['height', 'fontsize', 'ul', 'ol', 'paragraph']],
                    ['font', ['strikethrough', 'superscript', 'subscript']],
                    ['color', ['color']],
                    ['insert', ['picture', 'video', 'link', 'table', 'hr']],
                    ['layout', ['fullscreen', 'codeview']],
                ],
                callback: {

//                    onImageUpload:function (files) {
//                        console.log('文件上传')
////                        sendFile(files[0])
//                    }
                }
            });
            this.$set(this, "docData", this.$route.params);
            if(this.docData.title){
                this.form.title=this.docData.title;
            }
            if(this.docData.tags){
                this.form.tags=this.docData.tags;
            }
            if(this.docData.path){
                this.docPath=this.docData.path.split("/");
                this.docPath[0]="管理中心";
                this.form.path=this.docPath;
            }
            if(this.docData.text){
               $('#summernote').summernote('code',this.docData.text);
            }
//            this.getDocData();
        },
        beforeRouteLeave(to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            if(to.path!="/doc"){
                next(false);
                this.$confirm('编辑尚未提交，确定离开?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 选择确定
                    next()
                })
            }else {
                next();
            }
        }
    }

    function sendFile(file) {

    }
</script>

<style lang="scss" scoped type="text/scss">
    .doc {
        height: 100%;
        margin: 0 auto;
        padding-top: 20px;
        position: relative;
        .header-box{
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            position: absolute;
            margin-bottom: 5px;
            top: -15px;
            .breadcrumb-box{
                display: inline-block;
            }
            .operation-bar {
                height: 30px;
                float: right;
                li {
                    cursor: pointer;
                }
            }
        }
        .read-box{
            .doc-box {
                .doc-title {
                    display: inline-block;
                    width: 100%;
                    text-align: left;
                    color: #393939;
                    font-size: 28px;
                    font-weight: bold;
                    margin-top: 5px;
                    margin-bottom: 5px;
                    padding: 0px 50px;
                    /*input{*/
                    /*display: inline-block;*/
                    /*!*width: 90%;*!*/
                    /*height: 30px;*/
                    /*font-size: 20px;*/
                    /*}*/
                }
                .doc-tag {
                    padding: 0px 50px;
                    margin-bottom: 5px;
                    .el-tag + .el-tag {
                        margin-left: 10px;
                    }
                    .button-new-tag {
                        margin-left: 10px;
                        height: 32px;
                        line-height: 30px;
                        padding-top: 0;
                        padding-bottom: 0;
                    }
                    .input-new-tag {
                        width: 90px;
                        margin-left: 10px;
                        vertical-align: bottom;
                    }
                }
                .doc-content {
                    height: 350px;
                    padding: 0px 50px;
                    p {
                        font-size: 16px;
                        margin: 5px 0px;
                    }
                    .doc-img-box {
                        text-align: center;
                        .doc-img {
                            margin: 20px auto;
                        }
                    }

                    /*background-color: antiquewhite;*/
                }
                .submit-box {
                    margin: 15px auto;
                }
            }
        }
    }
</style>