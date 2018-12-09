<template>
    <div class="addProjectDialog">
        <el-dialog
                :title="data.type=='add'?'新建项目':'编辑项目'"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="setProjectForm" :rules="rules" ref="setProjectForm">
                <el-form-item label="项目名称" prop="name">
                    <el-input  auto-complete="off" maxlength="20" v-model="setProjectForm.name"></el-input>
                </el-form-item>
                <el-form-item label="项目介绍" prop="description">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="setProjectForm.description"
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
    import interfaceUrl from '../../lib/interface'
    export default {
        name:"set-project-dialog",
        props:{
            //显示隐藏
            value:{
                type:Boolean,
                required:true
            },
            //类型与数据
            data:{
                type:Object,
                required:true
            }
        },
        data() {
            return {
                dialogVisible: false,
                setProjectForm:{
                    id:"",
                    name:"",
                    oldName:"",
                    description:""
                },
                rules: {
                    name: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    description: [
                        { required: false},
                        { min: 0, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleClose(done) {
                this.$refs.setProjectForm.resetFields();
                this.$emit('close');
            },
            handleSubmit(){
                if(this.data.type=="add"){
                  this.$refs.setProjectForm.validate((valid) => {
                    if (valid) {
                      let info=this.setProjectForm;
                      this.$axios.post(interfaceUrl.manageCenter.addProject,{
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
                }else if(this.data.type=="edit"){
                  this.$refs.setProjectForm.validate((valid) => {
                    if (valid) {
                      let info=this.setProjectForm;
                      this.$axios.post(interfaceUrl.manageCenter.updateProject,{
                        info:JSON.stringify(info)
                      }).then(res=> {
                        this.$message({
                          message: '修改成功',
                          type: 'success'
                        });
                        this.$emit('close');
                        this.$emit('success');
                      })
                    }
                  });
                }

            },
        },
        watch:{
            value(newVal){
               this.dialogVisible= newVal;
            },
            data(newVal){
                this.setProjectForm={
                    id:newVal.id,
                    name:newVal.name,
                    oldName:newVal.name,
                    description:newVal.description,
                }
            }
        }
    };
</script>

<style lang="scss" scoped type="text/scss">
</style>
