  <template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove" @touchend.prevent="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import {getData} from 'common/js/dom'
  const BTNWIDTH = 8
  // const transform = getData('transform')
  export default{
    created() {
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initial = true
        this.touch.startX = e.touches[0].pageX//当前第一次点x坐标
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initial) return
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX), this.$refs.progressBar.clientWidth - BTNWIDTH)
        this.offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initial = false
        this.triggerPercent()
      },
      offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
      },
      triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - BTNWIDTH
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      progressClick(e) {
        let rect = this.$refs.progressBar.getBoundingClientRect()
        let offsetWidth = e.pageX - rect.left
        this.offset(offsetWidth)
        this.triggerPercent()
      }
    },
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initial) {
          const barWidth = this.$refs.progressBar.clientWidth - BTNWIDTH
          const offsetWidth = newPercent * barWidth
          this.offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .progress-bar {
    height: 30px
    .bar-inner {
      position: relative
      top: 13px
      height: 2px
      background: rgba(0, 0, 0, 0.3)
      .progress {
        position: absolute
        height: 100%
        background: #31c27c
      }
      .progress-btn-wrapper {
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn {
          position: relative
          top: 10px
          left: 7px
          box-sizing: border-box
          width: 10px
          height: 10px
          border-radius: 50%
          background: #1E90FF;
        }
      }
    }
  }
</style>
