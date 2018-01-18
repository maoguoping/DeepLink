<template>
    <div class="doc">
        <ul>
            <li>
                <h2>
                    最近编辑
                </h2>
                <doc-link ></doc-link>
            </li>
            <li></li>
        </ul>
    </div>
</template>

<script>
    import DocLink from './DocLink.vue'
    export default {
        name: 'doc-index',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        components:{
            'doc-link':DocLink
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