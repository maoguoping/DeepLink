<template>
    <router-link class="doc-link" to="/doc" :doc-id="docId" >{{docName}}</router-link>
    <!--<div class="doc-link" :doc-id="docId" @click="linkTo()">-->
        <!--{{docName}}-->
    <!--</div>-->
</template>

<script>
    import { bus } from '../../bus/bus.js'
    export default {
        name: 'doc-link',
        props:['linkName'],
        data() {
            return {
                docName:this.linkName,
                docId:1,
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods:{
//            linkTo:function () {
//                bus.$emit('docChangeTo', '1')
//            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .doc-link{
        cursor:pointer;
        color: #000000;
    }
</style>