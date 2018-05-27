<template>
    <div class="doc" v-if="value">
        <div class="header-box">
            <!--<path-bar :pathData="pathStr" @pathLinkTo="pathLinkTo"></path-bar>-->
        </div>
        <ul class="operation-bar clearfix">
            <li>统计</li>
        </ul>
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
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新标签</el-button>
                </el-form-item>
                <!--内容-->
                <div class="doc-content">
                    <!--<div id="summernote">-->

                    <!--</div>-->
                  <quill-editor ref="myTextEditor" :content="form.text" :options = "editorOption" @change=""></quill-editor>
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
    import interfaceUrl from '../../lib/interface'
    import PathBar from '../bar/PathBar.vue'
    const manageCenterName="管理中心"
    export default {
        name: 'doc-edit',
        props:{
            value:{
                type: Boolean,
                required: true
            },
            data:{
                type: Object,
                required: true
            }
        },
        data() {
            return {
                form: {
                    id:"",
                    title: '',
                    path:'',
                    tags: [],
                    text: ''
                },
                editorOption:{},    // 编辑器选项
                displayFlag:false,
                submitFlag:false,
                pathStr:'',
                inputVisible: false,
                inputValue: '',
//                docData: this.data
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
            initDisplay(){
                this.displayFlag=true;
//                $('#summernote').summernote({
//                    lang: 'zh-CN',
//                    placeholder: ' ',
//                    height: 300,
//                    minHeight: 300,
//                    maxHeight: 300,
//                    focus: true,
//                    toolbar: [
//                        ['operate', ['undo', 'redo']],
//                        ['magic', ['style']],
//                        ['style', ['bold', 'italic', 'underline', 'clear']],
//                        ['para', ['height', 'fontsize', 'ul', 'ol', 'paragraph']],
//                        ['font', ['strikethrough', 'superscript', 'subscript']],
//                        ['color', ['color']],
//                        ['insert', ['picture', 'video', 'link', 'table', 'hr']],
//                        ['layout', ['fullscreen', 'codeview']],
//                    ],
//                    callback: {
//
////                    onImageUpload:function (files) {
////                        console.log('文件上传')
//////                        sendFile(files[0])
////                    }
//                    }
//                });
                this.form={
                    title:this.data.title?this.data.title:"",
                    tags:this.data.tags?this.data.tags:"",
                    path:this.data.path?this.data.path:""
                }
                if(this.data.path){
                    this.form.path=this.docPath;
                }
                if(this.data.text){
//                    $('#summernote').summernote('code',this.data.text);
                }
            },
            onSubmit() {
//                //获取富文本编辑器文本
//                var markupStr = $('#summernote').summernote('code');
//                this.form.text=markupStr;
//                axios.post(interfaceUrl.doc.docSubmit,{
//                    form:this.form
//                }).then((res) => {
//                    if(res.data.code==200){
//                        this.$alert('修改文档成功', '成功', {
//                            confirmButtonText: '确定',
//                            callback: action => {
//
//                            }
//                        });
//                        this.submitFlag=true;
//                    }else {
//
//                    }
//                });
            },
            cancleEdit() {
//                if(!this.submitFlag){
//                    this.$confirm('编辑尚未提交，确定离开?', '提示', {
//                        confirmButtonText: '确定',
//                        cancelButtonText: '取消',
//                        type: 'warning'
//                    }).then(() => {
////                    this.$router.push({name:"manageCenter",query:{path:this.docData.path,type:'doc'}});
//                        this.$emit('close');
////                        this.displayFlag=false;
//                    })
//                }
            },
            pathLinkTo(name){
                if(name==manageCenterName){
                    this.pathStr="";
                }else {
                    var index=this.pathStr.indexOf(name)+name.length;
                    this.pathStr=this.pathStr.substring(0,index);
                }
            }
        },
        mounted() {
        },
        updated(){
            if(!this.displayFlag&&this.value){
                this.initDisplay();
            }
        },
        watch: {
            "pathStr": function (val) {
//                if(val==this.docData.path){
//                    this.$router.push({name:"manageCenter",query:{path:this.docData.path,type:'doc'}});
//                }else {
//                    this.$router.push({name:"manageCenter",query:{path:this.docData.path,type:''}});
//                }

            },
            value(newVal,oldVal){
                if(!newVal){
                    this.displayFlag=false;
                }
            }
        },
        components: {
            //在#app元素内，注册组件
            'path-bar': PathBar
        },
//        beforeRouteLeave(to, from, next) {
//            // 导航离开该组件的对应路由时调用
//            // 可以访问组件实例 `this`;
//            if(to.query.path!=this.docData.path){
//                next(false);
//                this.$confirm('编辑尚未提交，确定离开?', '提示', {
//                    confirmButtonText: '确定',
//                    cancelButtonText: '取消',
//                    type: 'warning'
//                }).then(() => {
//                    // 选择确定
//                    next()
//                })
//            }else {
//                next();
//            }
//        }
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
        width: 100%;
        .header-box{
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            position: absolute;
            margin-bottom: 5px;
            top: -15px;
            .path-bar{
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
                    box-sizing: border-box;
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
                    display: inline-block;
                    /*height: 350px;*/
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
