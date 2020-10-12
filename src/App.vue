<template>
    <div id="DeepLink">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'app', // name属性作为组件名称，全局 ID 自动作为组件的 name
  computed: {
	},
	async created () {
		console.log('app created')
		// await this.$store.dispatch('setUserInfo')
		// await this.$store.dispatch('getPageAcceessList')
	},
  mounted () {
  }
}
</script>
<style lang="scss" type="text/scss">
    @import "assets/css/base.css";

    html {
        /*overflow: hidden;*/
        height: 100%;
    }

    .app {
        background-color: #999;
        height: 100%;
    }

    #DeepLink {

    }
</style>
