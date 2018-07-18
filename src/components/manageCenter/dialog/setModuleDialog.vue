<template>
    <div class="setModuleDialog">
        <el-dialog
                :title="data.type=='add'?'新建模块':'编辑模块'"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="setModuleForm" :rules="rules" ref="setModuleForm">
                <el-form-item label="模块名称" prop="moduleName">
                    <el-input  auto-complete="off" maxlength="20" v-model="setModuleForm.moduleName"></el-input>
                </el-form-item>
              <el-form-item label="模块类型" prop="moduleType">
                <br>
                <el-select  v-model="setModuleForm.moduleType">
                  <el-option
                    v-for="item in moduleTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="模块介绍" prop="moduleDescription">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="setModuleForm.moduleDescription"
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
                setModuleForm:{
                    moduleId:"",
                    moduleName:"",
                    moduleType:"",
                    moduleDescription:"",
                },
                rules: {
                    moduleName: [
                        { required: true, message: '请输入模块名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    moduleDescription: [
                        { required: false},
                        { min: 0, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                    ],
                    moduleType:[
                      { required: true, message: '必须选择模块类别', trigger: 'blur' },
                    ]
                },
                moduleTypeList:[
                  {
                    label:"分卷",
                    value:0
                  },
                  {
                    label:"篇章",
                    value:1
                  },
                  {
                    label:"环境",
                    value:2
                  },
                  {
                    label:"人物",
                    value:3
                  },
                  {
                    label:"事件",
                    value:4
                  },
                ]
            };
        },
        methods: {
            handleClose(done) {
                this.$refs.setModuleForm.resetFields();
                this.$emit('close');
            },
            handleSubmit(){
//                if(this.data.type=="add"){
//                  this.$refs.setModuleForm.validate((valid) => {
//                    if (valid) {
//                      let info=this.setModuleForm;
//                      axios.post(interfaceUrl.manageCenter.addProject,{
//                        info:JSON.stringify(info)
//                      }).then(res=> {
//                        this.$message({
//                          message: '提交成功',
//                          type: 'success'
//                        });
//                        this.$emit('close');
//                        this.$emit('success');
//                      })
//                    }
//                  });
//                }else if(this.data.type=="edit"){
//                  this.$refs.setModuleForm.validate((valid) => {
//                    if (valid) {
//                      let info=this.setModuleForm;
//                      axios.post(interfaceUrl.manageCenter.updateProject,{
//                        info:JSON.stringify(info)
//                      }).then(res=> {
//                        this.$message({
//                          message: '修改成功',
//                          type: 'success'
//                        });
//                        this.$emit('close');
//                        this.$emit('success');
//                      })
//                    }
//                  });
//                }

            },
            getModuleTypeDic(){
              axios.get(interfaceUrl.api.getModuleTypeDic, {}).then(res => {
                this.moduleTypeList=res.data.data;
              });
            }
        },
        watch:{
            value(newVal){
              this.getModuleTypeDic();
//               this.getModuleTypeDic();
               this.dialogVisible= newVal;
            },
            data(newVal){
                this.setModuleForm={
                    moduleId:newVal.id,
                    moduleName:newVal.name,
                    moduleDescription:newVal.description,
                }
            }
        }
    };
</script>

<style lang="scss" scoped type="text/scss">
</style>
