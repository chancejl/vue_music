<template>
  <div class="header">
    <img src="./logo.png" alt="">
    <span>猫咪音乐</span>
    <router-link to="/user"><i class="icon-gerenzhongxin"></i></router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    computed:{
    },
    methods:{
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/style/variable"
  @import "~common/style/mixin"
  .header {
    position relative
    height 44px
    line-height 44px;
    background $color-green
    img{
      margin: 3px 5px;
      width:38px;
      height:34px;
    }
    span{
      font-size 18px;
      color: white;
      padding-left 5px;
      position absolute;
      top:0;
      left 40px;
    }
    i {
      font-size 30px;
      color: white;
    }
    .icon-gerenzhongxin{
      color: white;
      font-size 30px;
      position absolute;
      right 10px;
      top:10px;
    }
  }

</style>
