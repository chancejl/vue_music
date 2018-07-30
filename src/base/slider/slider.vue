<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active:currentIndex===index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { addClass } from 'common/js/dom'
  export default {
    data() {
      return {
        dots: [],
        currentIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      }
    },
    methods: {
      setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          addClass(this.children[i], 'slider-item')
          this.children[i].style.width = sliderWidth + 'px';
          width += sliderWidth;
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      sliderInit() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollY: false,
          scrollX: true,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          click: true
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentIndex = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this.setAutoPlay()
          }
        })
      },
      setAutoPlay() {
        let pageIndex = this.currentIndex + 1;
        if (this.loop) {
          pageIndex += 1;
        }
        this.timer = setInterval(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      },
      dotsInit() {
        let num = this.children.length;
        if (this.loop) {
          num -= 2;
        }
        this.dots = new Array(num)
      }
    },
    mounted() {
      setTimeout(() => {
        this.setSliderWidth()
        this.sliderInit()
        this.dotsInit()
        if (this.autoPlay) {
          this.setAutoPlay()
        }
      }, 20)
      window.addEventListener('resize', () => {
        this.setSliderWidth(true)
      })
    },
    components: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/style/variable"
  .slider
    min-height 1px
    width 100%
    overflow hidden
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        text-align center
        box-sizing: border-box
        overflow hidden
        float left
        a
          display block
          width 100%
          overflow: hidden
          text-decoration: none
          img
            display: block
            width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-c1
        transition: all 0.1s
        -webkit-transition: all 0.1s
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-c2
</style>
