<template>
  <transition name="rank">
    <music-list :songs="rankList" :title="topList.topTitle" :bgImg="topList.picUrl"></music-list>
  </transition>
</template>
<script>
  import MusicList from 'components/music-list/music-list';
  import { getSong } from 'api/rank';
  import { ERR_OK } from 'api/config';
  import { mapGetters } from 'vuex';
  import { createSong } from 'api/song'
  export default {
    data() {
      return {
        rankList: []
      }
    },
    created() {
      this._getSong()
    },
    computed: {
      ...mapGetters(['topList'])
    },
    components: {
      MusicList
    },
    methods: {
      _getSong() {
        if(!this.topList.id){
          this.$router.push('/rank')
          return
        }
        getSong(this.topList.id).then(res => {
          console.log(res.songlist)
          if (res.code === ERR_OK) {
            this.rankList = this.normalizedSong(res.songlist)
          }
        })
      },
      normalizedSong(list) {
        let ret = [];
        list.forEach(item => {
          ret.push(createSong(item.data))
        })
        return ret;
      }
    }
  }
</script>
<style scoped>
  .rank-enter, .rank-leave-to {
    transform: translate(100%)
  }

  .rank-enter-active, .rank-leave-active {
    transition: all 0.3s;
  }
</style>
