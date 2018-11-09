<template>
  <div class="search-box">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: "SearchBox"
  }
</script>

<style lang="scss" scoped>
.search-box{
  display: inline-block;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
