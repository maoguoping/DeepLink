<template>
    <div class="headerbar-box">
        <router-link id="logo" to="/index">首页</router-link>
        <router-link id="edit" to="/edit">编辑</router-link>
        <div>
            头部
        </div>
    </div>
</template>

<script>
    import {bus} from '../bus/bus.js'
    export default {
        name: 'header-bar',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        created:function () {
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .headerbar-box{
        width: 100%;
        height: 99px;
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
        cursor:pointer;
        /*border-bottom: 1px solid #cccccc;*/
    }
</style>