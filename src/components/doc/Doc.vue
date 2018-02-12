<template>
    <div class="doc">
        <div class="doc-box">
            <!--标题-->
            <div class="doc-title">
                <h2>{{docData.title}}</h2>
            </div>
            <!--标签-->
            <div class="doc-tag">
                <label for="">标签：</label>
                <el-tag v-for="(tag,index) in docData.tag" :key="index">{{tag}}</el-tag>
                <!--<el-tag type="success">标签二</el-tag>-->
                <!--<el-tag type="info">标签三</el-tag>-->
                <!--<el-tag type="warning">标签四</el-tag>-->
                <!--<el-tag type="danger">标签五</el-tag>-->
                <!--<span v-for="(tag,index) in docData.tag">{{tag}}</span>-->
            </div>
            <!--内容-->
            <div class="doc-content">
                <div v-for="(block,index) in docData.content">
                    <!--段落-->
                    <div v-if="block.tagName=='p'">
                        <p v-for="(p,index) in (block.text)">
                            {{p}}
                        </p>
                    </div>
                    <!--图片-->
                    <div v-if="block.tagName=='img'" class="doc-img-box">
                            <img  v-for="(img,index) in block.imgs" :src="img" alt="暂无图片" class="doc-img">
                    </div>
                </div>
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
                docData:{}
            }
        },
        methods:{
            getDocData:function () {
                axios.get('/api?method=docData').then((res) => {
                    var result = res.data
                    this.docData=result
                })
            }
        },
        mounted:function () {
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
        .doc-box{
            .doc-title {
                display: inline-block;
                /*width: 100%;*/
                text-align: center;
                color:#393939;
                font-size: 28px;
                font-weight: bold;
                margin-top: 20px;
                margin-bottom: 20px;
                padding: 0px 50px;
            }
            .doc-tag{
                padding: 0px 50px;
                margin-bottom: 20px;
            }
            .doc-content {
                /*width: 100%;*/
                padding: 0px 50px;
                p{
                    font-size: 16px;
                    margin: 5px 0px;
                }
                .doc-img-box{
                    text-align: center;
                    .doc-img{
                        margin: 20px auto;
                    }
                }

                /*background-color: antiquewhite;*/
            }
        }
    }
</style>