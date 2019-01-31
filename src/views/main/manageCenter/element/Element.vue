<template>
  <div class="element">
        <div class="title-box">
          <h1 class="title">{{listInfo.name}}</h1>
        </div>
        <div class="info-box">
          <div class="btn-box">
            <a class="edit-btn" @click="handleEditInfo">编辑</a>
          </div>
          <ul>
            <li>
              <label class="info-label">标签：</label><br>
              <div class="info-content">
                <span>
                <el-tag :key="tag" v-for="tag in dynamicTags">
                  {{tag}}
                </el-tag>
                <!--<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>-->
                <!--<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
              </span>
              </div>
            </li>
            <li>
              <label class="info-label">描述：</label><br>
              <div class="info-content">
                 <p class="description-text">{{listInfo.description}}</p>
                 <!--<textarea class="description-text" v-model="listInfo.description" style="resize:none" ></textarea>-->
              </div>
            </li>
          </ul>
        </div>

        <div class="list-box">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <SetElementInfoDialog
          v-model="showSetElementInfoDialog"
          :data="listInfo"
          @close="showSetElementInfoDialog = false"
        ></SetElementInfoDialog>
  </div>
</template>

<script>
import SetElementInfoDialog from '@/components/dialog/setElementInfoDialog'
export default {
  name: 'Element',
  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      showSetElementInfoDialog: false
    }
  },
  computed: {
    listInfo () {
      return this.$store.state.manageCenterStore.manageCenterInfo || {
        name: '',
        description: '',
        id: '',
        type: '',
        typeId: '',
        tag: '',
        path: '',
        pathId: '',
        parentId: '',
        parentName: '',
        parentType: '',
        parentTypeId: '',
        parentPath: '',
        parentPathId: '',
        modifyDate: '',
        children: []
      }
    }
  },
  methods: {
    /**
       * 编辑按钮回调
       * @return {void}
       */
    handleEditInfo () {
      this.showSetElementInfoDialog = true
    }
  },
  components: {
    SetElementInfoDialog
  }
}
</script>

<style lang="scss" scoped type="text/scss">
  .element {
    width: 100%;
      .title-box {
        display: block;
        line-height: 60px;
        width: 100%;
        padding-left: 20px;
      }
      .info-box {
        border: 1px solid #EEE;
        border-radius: 3px;
        padding: 20px;
        .btn-box{
          .edit-btn{
            font-size: 12px;
            float: right;
            cursor: pointer;
          }
        }
        .info-label{
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .info-content{
          margin-top: 10px;
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
          .description-text{
            width: 100%;
            font-size: 12px;
            text-indent: 2em;
          }
        }

      }
  }
</style>
