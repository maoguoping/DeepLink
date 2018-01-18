<template>
    <div class="guide-box">
        <div class="guide-box-title">
            导航栏
        </div>
        <div class="guide-box-listBox">
            <guide-list  v-for="(item ,index) in listItems" :key="item.id" :data="item" :data2="listItems"></guide-list>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import GuideList from './GuideList.vue'

    export default {
        name: 'guide',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                listItems: []
            }
        },
        created: function () {
            this.listItems = [
                {
                    'id': '0',
                    'name': "快捷方式",
                    'type': "root",
                    'childs':[
                        {
                            'id': '01',
                            'name': "最近编辑",
                            'type': "root-child",
                            'childs':[]
                        },
                        {
                            'id': '02',
                            'name': "最爱",
                            'type': "root-child",
                            'childs':[]
                        },
                    ]
                },
                {
                    'id': '1',
                    'name': "项目1",
                    'type': "project",
                    'childs':[
                        {
                            'id': '10',
                            'name': "模块1",
                            'type': "project-0",
                            'childs':[
                                {
                                    'id': '100',
                                    'name': "子模块1",
                                    'type': "project-1",
                                    'childs':[
                                        {
                                            'id': '1000',
                                            'name': "《推背图》",
                                            'type': "project-2",
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'id': '11',
                            'name': "模块2",
                            'type': "project-0",
                            'childs':[]
                        },
                    ]
                },
                {
                    'id': '2',
                    'name': "项目2",
                    'type': "project",
                    'childs':[]
                }
            ]

        },
        components: {
            //在#app元素内，注册组件
            'guide-list': GuideList
        },
        methods: {
            gotoIndex: function () {
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .guide-box {
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        &-title {
            color: #000000;
        }
        &-listBox {

        }
    }
</style>