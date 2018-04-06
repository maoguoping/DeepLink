<template>
    <div class="addProjectDialog">
        <el-dialog
                title="新建项目"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="addProjectForm" :rules="rules" ref="addProjectForm">
                <el-form-item label="项目名称" prop="projectName">
                    <el-input  auto-complete="off" maxlength="20" v-model="addProjectForm.projectName"></el-input>
                </el-form-item>
                <el-form-item label="项目介绍" prop="projectDescription">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="addProjectForm.projectDescription"
                            maxlength="200"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
    import interfaceUrl from '../../../lib/interface'
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
                addProjectForm:{
                    projectName:"",
                    projectDescription:"",
                },
                rules: {
                    projectName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    projectDescription: [
                        { required: false},
                        { min: 0, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleClose(done) {
                this.$refs.addProjectForm.resetFields();
                this.$emit('close');
            },
            handleSubmit(){
                this.$refs.addProjectForm.validate((valid) => {
                    if (valid) {
                        let info=this.addProjectForm;
                        axios.post(interfaceUrl.manageCenter.addProject,{
                            info:JSON.stringify(info)
                        }).then(res=> {
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$emit('close');
                            this.$emit('success');
                        })
                    }
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
</style>