<template>
    <div class="doc">
        <path-bar pathData="pathStr"></path-bar>
    </div>
</template>
<script>
    import PathBar from './bar/PathBar.vue'
    export default {
        name: 'manger-center',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                listName:"大渣好，我系...",
                pathStr:""
            }
        },
        components: {
            //在#app元素内，注册组件
            'path-bar': PathBar
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .doc {
        width: 920px;
        margin: 0 auto;
        padding: 20px;
        .doc-title {
            display: inline-block;
            width: 50%;
        }
        .doc-content {
            width: 100%;
            background-color: antiquewhite;
        }
    }
</style>