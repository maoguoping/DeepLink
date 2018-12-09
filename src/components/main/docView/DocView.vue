<template>
    <div class="doc">
        <div class="header-box">
            <path-bar :pathData="pathStr"></path-bar>
            <ul class="operation-bar clearfix">
                <li @click="edit">编辑</li>
            </ul>
        </div>
        <div class="read-box">
            <div class="doc-box">
                <!--标题-->
                <div class="doc-title">
                    <h2>{{docData.title}}</h2>
                </div>
                <!--标签-->
                <div class="doc-tag">
                    <label for="">标签：</label>
                    <el-tag v-for="(tag,index) in docData.tags" :key="index">{{tag}}</el-tag>
                </div>
                <!--内容-->
                <div class="doc-content" v-html="docData.text">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import interfaceUrl from '../../../lib/interface'
import PathBar from '../../bar/PathBar.vue'
export default {
  name: 'docView',
  props: [
    'docId'
  ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pathStr: '',
      docData: {}
    }
  },
  methods: {
    getDocData: function () {
      //                var docId = this.$route.params.id;
      axios.get(interfaceUrl.doc.getDocData, {
        params: {
          docId: this.docId
        }
      }).then((res) => {
        var result = res.data
        //                    this.pathStr=result.path;
        //                    console.log( this.pathStr);
        this.$set(this, 'pathStr', result.path)
        this.$set(this, 'docData', result)
      })
    },
    edit: function () {
      //                this.$router.push({name:'edit',params:this.docData});
      this.$emit('editDoc', this.docData)
    }
  },
  mounted: function () {
    this.getDocData()
  },
  components: {
    // 在#app元素内，注册组件
    'path-bar': PathBar
  }
}
</script>

<style lang="scss" scoped type="text/scss">
    .doc {
        height: 100%;
        width: 100%;
        margin: 0 auto;
        position: relative;
        .header-box{
            display: block;
            width: 100%;
            height: 30px;
            line-height: 30px;
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
            height: 100%;
            margin: 0 auto;
            overflow: auto;
            .doc-box {
                .doc-title {
                    display: inline-block;
                    /*width: 100%;*/
                    text-align: center;
                    color: #393939;
                    font-size: 28px;
                    font-weight: bold;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    padding: 0px 50px;
                }
                .doc-tag {
                    padding: 0px 50px;
                    margin-bottom: 20px;
                }
                .doc-content {
                    /*width: 100%;*/
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
            }
        }
    }
</style>
