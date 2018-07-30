<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
    <span v-html="loading"></span>
  </div>
</template>
<script>
  export default {
    props: {
      loading: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus">
  .loading
    width:100%;
    text-align: center;
    img
      width:20px
      height:20px
</style>
