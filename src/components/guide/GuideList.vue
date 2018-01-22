<template>
    <div class="guide-list" v-cloak>
        <div class="parent" @click="toggle" :class="'list-'+data.type">
            <doc-link :linkName="listName"></doc-link>
        </div>
        <div class="childs" v-if="!listFold">
            <guide-list v-for="(item ,index) in listData.childs" :key="item.id" :data="item"></guide-list>
        </div>
    </div>
</template>

<script>
    import {bus} from '../../bus/bus'
    import DocLink from '../doc/DocLink.vue'
    export default {
        name: 'guide-list',
        props:['data','data2'],
        data() {
            return {
                listData:this.data,
                listData2:this.data2,
                listName:this.data.name,
                listFold:true,
                listId:this.data.id,
                msg: 'Welcome to Your Vue.js App'
            }
        },
        components: {
            'doc-link':DocLink
        },
        methods:{
            toggle:function () {
                this.listFold=!this.listFold;
               if(this.listId=='1000'){
                   bus.$emit('docChangeTo');
               }
            }
        }
    }
</script>
<style lang="scss" scoped type="text/scss">
    .guide-list{
        cursor: pointer;
        .list-root,
        .list-project{
            padding-left: 1em;
        }
        .list-root{
            &-child{
                padding-left: 2em;
            }
        }
        .list-project{
            &-0{
                padding-left: 2em;
            }
            &-1{
                padding-left: 3em;
            }
            &-2{
                padding-left: 4em;
            }

        }
    }
</style>