<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :listenScroll="listenScroll"
          @scroll="scroll"
  >
    <ul>
      <li v-for="singerG in data" class="singerG" ref="singerG">
        <h2 v-html="singerG.title"></h2>
        <ul>
          <li v-for="singer in singerG.items" class="singer" @click="chooseSinger(singer)">
            <img v-lazy="singer.url" alt="">
            <span v-html="singer.name"></span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutmove" >
      <ul>
        <li v-for="(item,index) in shortcutList" class="item" :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>
<script>
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'

  const index_height = 18
  export default {
    created(){
      this.touch={}
      this.listenScroll=true
      this.listHeight=[]
      this.probeType = 3
    },
    data(){
      return {
        scrollY: -1
      }
      },
    props: {
      data: {
        type: Array,
        default:[]
      }
    },
    data() {
      return {}
    },
    computed: {
      shortcutList(){
        return this.data.map((singerG)=>{
          return singerG.title.substr(0,1)
        })
      }
    },
    components: {
      Scroll
    },
    methods: {
      chooseSinger(singer) {
        this.$emit('select', singer)
      },
      onShortcutTouchStart(e){
        let anchorIndex = getData(e.target,'index')
        let firstTouch=e.touches[0]
        this.touch.y1=firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortcutmove(e){
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1)/index_height|0
        let anchorIndex = parseInt( this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      scroll(pos){
        this.scrollY = pos.y
      },
      _scrollTo(index){
        this.$refs.listview.scrollToElement(this.$refs.singerG[index],0)
      },
      _calculateHeight(){
         this.listHeight = []
        const list = this.$refs.singerG
        let height = 0
        for(var i = 0;i < list.length;i++){
           let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    watch:{
      data(){
        setTimeout(()=>{
          this._calculateHeight()
        },20)
      }
      // scrollY(newY){
      //   const listHeight = this.listHeight
      //   for(let i = 0; i < listHeight.length;i++){
      //     let height1 = listHeight[i]
      //     let height2 = listHeight[i+1]
      //     if(!height2||(-newY < height2&&-newY>- height1)){
      //       this.currentIndex = i
      //       console.log(this.currentIndex)
      //       return
      //     }
      //   }
      //   this.currentIndex=0
      // }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/style/variable.styl"
  .listview {
    display flex
    height: 100%;
    overflow: hidden;
    flex-direction column
    .singerG {
      display flex
      flex-direction column
      width: 100%
      h2 {
        padding-left: 20px;
        display block;
        width 100%
        background #fff;
        height 30px;
        line-height 30px;
      }
      .singer {
        display flex;
        align-items center
        width: 100%
        margin 20px 20px;
        img {
          width 60px;
          height: 60px;
          border-radius 50%
        }
        span {
          display block
          text-align center
          margin-left 20px
          font-size $font-size-medium
        }
      }
    }
    .list-shortcut{
      position: fixed
      right:5px
      top:20%
    }
    li{
      margin:4px 0
    }
    .current{
      color:blue
    }
  }
</style>
