<template>
  <div class="setModuleDialog">
    <el-dialog
      :title="data.type=='add'?'新建模块':'编辑模块'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="setModuleForm" :rules="rules" ref="setModuleForm">
        <el-form-item label="模块类型" prop="moduleType" v-show="data.type == 'add'">
          <br>
          <el-radio-group v-model="setModuleForm.moduleType">
            <el-radio label="0">文件夹</el-radio>
            <el-radio label="1">元素</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="模块名称" prop="name">
          <el-input auto-complete="off" maxlength="20" v-model="setModuleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="文件夹类型" prop="typeId" v-if="setModuleForm.moduleType == '0'">
          <br>
          <el-select v-model="setModuleForm.typeId">
            <el-option
              v-for="item in folderTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="元素类型" prop="typeId" v-if="setModuleForm.moduleType === '1'">
          <br>
          <el-select v-model="setModuleForm.typeId">
            <el-option
              v-for="item in elementTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模块介绍" prop="description">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="setModuleForm.description"
            maxlength="200"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'set-project-dialog',
  props: {
    // 显示隐藏
    value: {
      type: Boolean,
      required: true,
      default: false
    },
    // 类型与数据
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false, // 弹窗显示隐藏
      setModuleForm: {
        id: '', // 模块id
        name: '', // 模块名称
        oldName: '', // 模块原名称
        typeId: '', // 模块类型id
        moduleType: '0', // 模块类型(0：文件夹；1：元素)
        description: '' // 模块描述
      },
      rules: {
        name: [
          { required: true, message: '请输入模块名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        description: [
          { required: false },
          { min: 0, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '必须选择分类', trigger: 'blur' }
        ]
      },
      folderTypeList: [],
      elementTypeList: []
    }
  },
  computed: {
    ...mapState({
      listInfo: state => state.manageCenterStore.manageCenterInfo
    })
  },
  methods: {
    /**
       * 弹窗关闭回调
       * @param {function} done
       * @return {void}
       */
    handleClose (done) {
      this.$refs.setModuleForm.resetFields()
      this.$emit('close')
    },
    /**
       * 提交表单
       * @return {void} 回调函数
       */
    handleSubmit () {
      if (this.data.type === 'add') {
        let params = {
          parentId: this.listInfo.id,
          parentName: this.listInfo.name,
          parentPath: this.listInfo.path,
          parentPathId: this.listInfo.pathId,
          parentType: this.listInfo.type,
          parentTypeId: this.listInfo.typeId
        }
        Object.assign(params, this.setModuleForm)
        this.$refs.setModuleForm.validate((valid) => {
          if (valid) {
            this.$axios.post(this.$api.manageCenter.addModule, {
              info: JSON.stringify(params)
            }).then(res => {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$emit('close')
              this.$emit('success')
            })
          }
        })
      } else if (this.data.type === 'edit') {
        this.$refs.setModuleForm.validate((valid) => {
          if (valid) {
            let params = {
              parentId: this.listInfo.id,
              parentName: this.listInfo.name,
              parentPath: this.listInfo.path,
              parentPathId: this.listInfo.pathId,
              parentType: this.listInfo.type,
              parentTypeId: this.listInfo.typeId
            }
            Object.assign(params, this.setModuleForm)
            this.$axios.post(this.$api.manageCenter.updateModule, {
              info: JSON.stringify(params)
            }).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$emit('close')
              this.$emit('success')
            })
          }
        })
      }
    },
    /**
       * 获取模块类别列表
       * @return {void}
       */
    getFolderTypeDic () {
      this.$axios.get(this.$api.api.getFolderTypeDic, {}).then(res => {
        this.folderTypeList = res.data
      })
    },
    /**
       * 获取元素类别列表
       * @return {void}
       */
    getElementTypeDic () {
      this.$axios.get(this.$api.api.getElementTypeDic, {}).then(res => {
        this.elementTypeList = res.data
      })
    }
  },
  watch: {
    value (newVal) {
      this.getFolderTypeDic()
      this.getElementTypeDic()

      this.dialogVisible = newVal
    },
    data (newVal) {
      this.setModuleForm = {
        id: newVal.id,
        name: newVal.name,
        oldName: newVal.name,
        description: newVal.description,
        typeId: newVal.typeId,
        moduleType: newVal.moduleType || '0'
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
</style>
