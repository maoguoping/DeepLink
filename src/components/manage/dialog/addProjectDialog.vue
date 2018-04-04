<template>
    <div class="addProjectDialog">
        <el-dialog
                title="新建项目"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form>
                <el-form-item label="项目名称">
                    <el-input  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item class="tag" label="标签：">
                    <el-tag
                            :key="tag"
                            v-for="tag in tags"
                            closable
                            :disable-transitions="false"
                            @close="handleCloseTag(tag)">
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
                            width="100"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新标签</el-button>
                </el-form-item>
                <el-form-item label="项目介绍">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="textarea">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleClose">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name:"add-project-dialog",
        props:{
            value:{
                type:Boolean,
                required:true
            }
        },
        data() {
            return {
                dialogVisible: false,
                tags:[],
                inputVisible:false,
                inputValue:"",
                textarea:""
            };
        },
        methods: {
            handleClose(done) {
                this.$emit('close');
            },
            handleCloseTag(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
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
    .tag{
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
</style>