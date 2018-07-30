<template>
  <transition name="detial">
    <music-list :songs="songList" :title="title" :bgImg="bgImg"></music-list>
  </transition>
</template>
<script>
  import musicList from 'components/music-list/music-list'
  import { getSingerDetial } from 'api/singer'
  import { mapState } from 'vuex'
  import { createSong }  from 'api/song'
  import { ERR_OK } from 'api/config'
  export default {
    data() {
      return {
        songList: []
      }
    },
    created() {
      this._getDetial()
    },
    computed: {
      ...mapState(['singer']),
      title() {
        return this.singer.name;
      },
      bgImg() {
        return this.singer.url;
      }
    },
    components: {
      musicList
    },
    methods: {
      _getDetial() {
        if (!this.singer.id) {
          this.$router.push({
            path: '/singer'
          })
        }
        getSingerDetial(this.singer.id).then(res => {
          if (ERR_OK === res.code) {
            this.songList = this._createSong(res.data.list)
          console.log(this.songList)
          }
        })
      },
      _createSong(data) {
        let ary = []
        data.forEach(item => {
          let {musicData} = item;
          ary.push(createSong(musicData))
        })
        return ary
      }
    }
  }
</script>
<style scoped lang="stylus">
  .detial-enter, .detial-leave-to {
    transform: translate(100%)
  }

  .detial-enter-active, .detial-leave-active {
    transition: all 0.3s;
  }
</style>
