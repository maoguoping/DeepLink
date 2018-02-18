<template>
    <div class="doc">
        <div class="doc-box">
            <ul class="operation-bar clearfix">
                <li @click="edit">编辑</li>
            </ul>
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
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'doc',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                docData: {}
            }
        },
        methods: {
            getDocData: function () {
                var docId = "1";
                axios.get('/api?method=docData&docId=' + docId).then((res) => {
                    var result = res.data;
                    this.$set(this, "docData", result);
                })
            },
            edit: function () {
                this.$router.push({path: '/edit'});
            }
        },
        mounted: function () {
            this.getDocData();
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .doc {
        /*width: 960px;*/
        height: 100%;
        margin: 0 auto;
        overflow: auto;
        /*padding: 20px;*/
        .doc-box {
            .operation-bar {
                height: 30px;
                float: right;
                li {
                    cursor: pointer;
                }
            }
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
</style>