<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommond">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div"  class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div"  class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div"  class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/style/variable"
  .tab
    display flex
    height: 40px
    line-height: 40px
    background $color-background-w
    .tab-item
      flex 1
      position relative
      overflow hidden
      text-align center
      .tab-link
        font-size $font-size-medium
        color $color-text-h
        padding-bottom 5px
      &.router-link-active
      .tab-item
        border-bottom 2px solid $color-green
        .tab-link
          color $color-green

</style>
