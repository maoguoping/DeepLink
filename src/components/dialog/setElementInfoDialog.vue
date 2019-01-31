<template>
  <div class="setElementInfoDialog">
    <el-dialog
      title="编辑信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="setElementInfoForm" :rules="rules" ref="setElementInfoForm">
        <el-form-item label="模块介绍" prop="elementDescription">
          <br>
          <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                  @close="handleCloseTag(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                    @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item label="模块介绍" prop="elementDescription">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="setElementInfoForm.elementDescription"
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
      setElementInfoForm: {
        elementId: '', // 模块id
        elementName: '', // 模块名称
        elementDescription: '' // 模块描述
      },
      rules: {
        elementDescription: [
          { required: false },
          { min: 0, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ],
        moduleTypeId: [
          { required: true, message: '必须选择分类', trigger: 'blur' }
        ]
      },
      folderTypeList: [],
      elementTypeList: [],
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    listInfo () {
      return this.$store.state.manageCenterStore.manageCenterInfo
    }
  },
  methods: {
    /**
       * 弹窗关闭回调
       * @param {function} done
       * @return {void}
       */
    handleClose (done) {
      this.$refs.setElementInfoForm.resetFields()
      this.$emit('close')
    },
    handleCloseTag (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    /**
       * 提交表单
       * @return {void} 回调函数
       */
    handleSubmit () {
      if (this.data.type == 'add') {
        let params = {
          parentId: this.listInfo.id,
          parentName: this.listInfo.name,
          parentPath: this.listInfo.path,
          parentPathId: this.listInfo.pathId,
          parentType: this.listInfo.type,
          parentTypeId: this.listInfo.typeId
        }
        Object.assign(params, this.setElementInfoForm)
        this.$refs.setElementInfoForm.validate((valid) => {
          if (valid) {
            let info = this.setElementInfoForm
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
      } else if (this.data.type == 'edit') {
        this.$refs.setElementInfoForm.validate((valid) => {
          if (valid) {
            let params = {
              parentId: this.listInfo.id,
              parentName: this.listInfo.name,
              parentPath: this.listInfo.path,
              parentPathId: this.listInfo.pathId,
              parentType: this.listInfo.type,
              parentTypeId: this.listInfo.typeId
            }
            Object.assign(params, this.setElementInfoForm)
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
      this.setElementInfoForm = {
        elementId: newVal.id,
        elementName: newVal.name,
        oldelementName: newVal.name,
        elementDescription: newVal.description,
        moduleTypeId: newVal.typeId,
        moduleType: newVal.moduleType || '0'
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
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

  .description-text {
    width: 100%;
    font-size: 12px;
    text-indent: 2em;
  }
</style>
