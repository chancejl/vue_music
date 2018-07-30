<template>
  <div class="player" ref="player" v-show="playingList.length">
    <div class="full" v-show="fullScreen">
      <i @click="back" class="icon-fanhui"></i>
      <div class="background">
        <img v-lazy="currentSong.image" alt="">
      </div>
      <div class="header">
        <span v-html="currentSong.name"></span>
        <span v-html="currentSong.singer"></span>
      </div>
      <div class="middle" @click="closeList">
        <div>
          <img class="cd" :class="cdSpin" v-lazy="currentSong.image" alt="">
        </div>
        <div>

        </div>
        <div class="progress">
          <span class="time-l">{{format(currentTime)}}</span>
          <progress-bar :percent="percent" @percentChange="progressBarChange"></progress-bar>
          <span class="time-r">{{format(currentSong.duration)}}</span>
        </div>
      </div>
      <div class="footer">
        <div class="playMode">
          <i :class="iconMode" @click="setMode"></i>
        </div>
        <div class="pre" @click="preSong">
          <i class="icon-281"></i>
        </div>
        <div class="play" @click="play">
          <i :class="playIcon"></i>
        </div>
        <div class="next" @click="nextSong">
          <i class="icon-28"></i>
        </div>
        <div @click="getList" class="list">
          <i class="icon-ttpodicon"></i>
        </div>
      </div>
    </div>
    <transition name="playList">
      <scroller class="playList" v-show="listFlag">
        <i v-show="listFlag" @click="closeList" class="icon-guanbi"></i>
        <song-list :data="playList" @select="selectList"></song-list>
      </scroller>
    </transition>
    <div @click="full" class="mini" v-show="!fullScreen&&playing">
      <img class="miniP" :class="cdSpin" v-lazy="currentSong.image" alt="">
      <span class="mini-text">
      <span v-html="currentSong.name"></span>
      <span v-html="currentSong.singer"></span>
      </span>
    </div>
    <audio @timeupdate="updateTime" @ended="end" ref="audio" @canplay="isReady" @error="error" :src="currentSong.url"></audio>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { playMode } from 'common/js/config';
  import { shuffle } from 'common/js/randomList';
  import ProgressBar from 'base/progress-bar/progress-bar';
  import SongList from 'base/song-list/song-list';
  export default {
    data() {
      return {
        readyFlag: false,
        currentTime: 0,
        playList: [],
        listFlag: false
      }
    },
    created() {
    },
    computed: {
      ...mapGetters([
        'mode',
        'playing',
        'fullScreen',
        'playingList',
        'currentIndex',
        'currentSong'
      ]),
      percent() {
        return this.currentTime / this.currentSong.duration;
      },
      playIcon() {
        return this.playing ? 'icon-zanting' : 'icon-bofang'
      },
      iconMode() {
        return this.mode === playMode.sequence ? 'icon-yinpinliebiaoxunhuan' : this.mode === playMode.loop ? 'icon-danquxunhuan' : 'icon-suijibofang1'
      },
      cdSpin() {
        return this.playing ? 'play' : 'pause';
      }
    },
    components: {
      ProgressBar,
      SongList
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN',
        setPlaying: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRENTINDEX',
        setPlayMode: 'SET_MODE',
        setPlayList: 'SET_PLAYINGLIST',
        setPlayHistory: 'SET_PLAY_HISTORY'
      }),
        mounted(){
        // console.log(this.currentSong.url);
      },
      back() {
        this.setFullScreen(false);
        this.listFlag=false;
      },
      full() {
        this.setFullScreen(true);
      },
      play() {
        if (!this.readyFlag) return;
        this.setPlaying(!this.playing)
      },
      preSong() {
        if (!this.readyFlag) return
        this.readyFlag = false;
        let index = this.currentIndex;
        index--;
        if (index <= -1) {
          index = this.playingList.length - 1;
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.play()
        }
      },
      nextSong() {
        if (!this.readyFlag) return;
        this.readyFlag = false;
        let index = this.currentIndex;
        index++;
        if (index >= this.playingList.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.play()
        }
      },
      isReady() {
        this.readyFlag = true;
      },
      error() {
        this.readyFlag = true;
      },
      setMode() {
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null;
        if (this.mode === playMode.random) {
          list = shuffle(this.playingList)
        } else {
          list = this.playingList
        }
        this.resetCurrentIndex(list)
        this.setPlayList(list)
      },
      resetCurrentIndex(list) {
        let index = list.findIndex(item => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      end() {
        if (this.mode === playMode.loop ||
          this.playingList.length===1) {
          this.loop()
        } else {
          this.nextSong()
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      format(interval) {
        interval = interval | 0
        let minute = interval / 60 | 0
        let second = interval % 60
        return `${minute}:${this.pad(second)}`
      },
      pad(num) {
        if (num < 10) {
          return '0' + num
        } else {
          return num
        }
      },
      progressBarChange(percent) {
        this.$refs.audio.currentTime = this.currentSong.duration * percent
        if (!this.playing) {
          this.play()
        }
      },
      getList() {
        this.listFlag=true;
        this.playList=this.playingList;
      },
      selectList(song) {
        let index=this.playingList.findIndex(item=>item.id===song.id);
        this.setCurrentIndex(index);
      },
      closeList() {
        this.listFlag=false;
      }
    },
    watch: {
      playing(newP) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newP ? audio.play() : audio.pause()
        })
      },
      currentSong(newS, oldS) {
        if (newS === oldS) return;
        this.$nextTick(() => {
          this.$refs.audio.play();
          this.readyFlag = true;
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  .player {
    transition: all 1s;
    .full {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 1);
      .icon-fanhui {
        z-index 100;
        position absolute;
        color: #31c27c
        font-size 35px;
        padding 10px 10px;
      }
      .background {
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(10px)
        img {
          height 100%
        }
      }
      .header {
        padding-top 10px;
        width 100%
        height 60px;
        color: #fff;
        border-bottom 0.1px solid rgba(255, 255, 255, 0.2)
        span {
          margin 0 20%;
          font-size 18px;
          height 30px;
          line-height 30px;
          text-align center;
          width auto;
          text-overflow ellipsis;
          overflow hidden;
          white-space nowrap;
          display block;
        }
      }
      .middle {
        position fixed;
        left 0;
        top 0;
        height: 100%;
        padding-top 70px;
        padding-bottom 100px;
        width: 100%;
        .cd {
          position absolute;
          top: 10%
          left 50%;
          margin-left -40%;
          width 80%
          box-sizing border-box;
          border-radius 50%;
          animation: rotate 20s linear infinite;
          border: 10px solid rgba(255, 255, 255, 0.1);
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
        .progress{
          width 70%
          height 30px;
          position absolute;
          bottom 260px;
          left 50%;
          transform translate(-50%)
          span{
            display block;
            width 30px;
            font-size 14px;
            color: white;
          }
          .time-l{
            position absolute;
            left -30px;
            top:50%
            margin-top -7px;
          }
          .time-r{
              position absolute;
              right -30px;
              top:50%
              margin-top -7px;
            }
        }
      }
      .footer {
        z-index: 100;
        position fixed;
        left 0;
        bottom 0;
        height 100px;
        line-height 100px;
        width 100%
        display flex;
        font-size 30px;
        color white;
        div {
          flex 1;
          text-align center
        }
        .play {
          font-size 40px;
        }
      }
    }
    .playList{
      width: 100%;
      position fixed;
      top:50%;
      bottom 0;
      height auto;
      background white;
      .icon-guanbi{
        z-index:10;
        position absolute;
        top:0;
        right:0;
        padding-top:10px;
        padding-right:10px;
      }
    }
    .mini{
      width: 100%
      height: 70px;
      position absolute;
      bottom 0;
      left 0;
      border-top:2px solid #1E90FF;
      background:white;
      .miniP {
        position absolute;
        bottom 0px;
        left 10%;
        display: inline-block;
        margin-left -30px;
        width 60px
        box-sizing border-box;
        border 3px solid #1E90FF;
        border-radius 50%;
        animation: rotate 20s linear infinite;
        &.play {
          animation: rotate 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    .mini-text{
      position:absolute;
      top:20px;
      left:20%;
      color: #000;
    }
    }
    .playList-enter{
      transform translateY(100%)
    }
    .playList-leave-to{
      transform translateY(100%)
    }
    .playList-enter-active,.playList-leave-active{
      transition: all 0.3s;
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
