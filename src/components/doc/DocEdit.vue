<template>
    <div class="doc">
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
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
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
                    tags: ['标签一', '标签二', '标签三'],
                    text: ''
                },
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
                axios.get('/docData').then((res) => {
                    var result = res.data
                    this.docData = result
                })
            },
            onSubmit() {
                var markupStr = $('#summernote').summernote('code');
                this.form.text=markupStr;
//                axios.post('/docSubmit').then((res) => {
//                    var result = res.data
//                    this.docData = result
//                })
                console.log('submit!');
            }
        },
        mounted() {
            $('#summernote').summernote({
                lang: 'zh-CN',
                placeholder: ' ',
                height: 400,
                minHeight: 400,
                maxHeight: 400,
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
            })
//            this.getDocData();
        }
    }

    function sendFile(file) {

    }
</script>

<style lang="scss" scoped type="text/scss">
    .doc {
        width: 960px;
        height: 100%;
        margin: 0 auto;
        overflow: auto;
        /*padding: 20px;*/
        .doc-box {
            .doc-title {
                display: inline-block;
                width: 100%;
                text-align: left;
                color: #393939;
                font-size: 28px;
                font-weight: bold;
                margin-top: 20px;
                margin-bottom: 20px;
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
                margin-bottom: 20px;
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
                height: 486px;
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
                margin: 20px auto;
            }
        }
    }
</style>