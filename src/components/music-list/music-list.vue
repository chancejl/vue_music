<template>
  <scroller :data="songs" class="music-list" ref="list">
    <div class="back">
      <i class="icon-fanhui" @click="goBack"></i>
    </div>
    <div class="bg" :style="bgStyle" ref="bgImg">
      <div class="filter"></div>
      <h1 v-html="title"></h1>
      <div class="play" v-show="songs.length>0" ref="playBtn" @click="random">
        <i class="icon-bofang"></i>
      </div>
    </div>
    <div class="songList">
      <song-list @select="selectItem" :data="songs"></song-list>
    </div>
    <loading class="loading" v-show="songs.length===0"></loading>
  </scroller>
</template>
<script>
  import Scroll from 'base/scroll/scroll'
  import songList from 'base/song-list/song-list'
  import Loading from 'base/loading/loading'
  import { mapActions } from 'vuex'
  // import {playlistMixin} from 'common/js/mixin'
  export default {
    // mixins:[playlistMixin],
    props:{
      bgImg: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImg})`
      }
    },
    components: {
      Scroll,
      songList,
      Loading
    },
    methods: {
    // handlePlaylist(){
    //   const bottom = playlist.length>0?'60px':''
    //     this.$refs.list.$ele.style.bottom=bottom
    //     this.$refs.list.refresh()
    //   },
      ...mapActions(['selectPlay','randomPlay']),
    random(){
        this.randomPlay({
          list:this.songs
        })
    },
      goBack() {
        this.$router.back()
      },
      selectItem(song, index) {
        this.selectPlay({list: this.songs, index})
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/style/variable.styl"
  .music-list {
    position fixed
    top: 0
    left: 0
    bottom 0
    right 0
    background: $color-background
    .back i {
      z-index 20
      padding 5px 10px
      position absolute
      font-size 35px
      color: #31c27c
    }
    h1 {
      /*width: 70%*/
      position absolute
      left 30%;
      top:0;
      font-size 25px
      color: #FFF
      padding 20px 20px
    }
    .bg {
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      transform-origin: top
      background-size: cover
      .play {
        z-index:100;
        font-size 60px;
        position absolute;
        right 0;
        transform translateY(-100%)
        color: #31c27c;
        padding 20px 20px
        span {
          font-size 20px;
        }
      }
      .filter {
        position absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(0, 0, 0, .4);
      }
    }
    .songlist {
      padding-left 10px;
      padding-right 10px;
    }
    .loading {
      padding-top 30px;
    }
  }
</style>
