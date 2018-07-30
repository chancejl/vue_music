<template>
  <transition name="disc">
    <music-list :songs="songList" :title="disc.dissname" :bgImg="disc.imgurl"></music-list>
  </transition>
</template>
<script>
  import musicList from 'components/music-list/music-list'
  import { mapGetters } from 'vuex';
  import { getDissList } from 'api/recommend';
  import { createSongForDisc } from 'api/song'
  export default {
    data() {
      return {
        songList: []
      }
    },
    created() {
      this._getDissList()
    },
    computed: {
      ...mapGetters(['disc'])
    },
    components: {
      musicList
    },
    methods: {
      _getDissList() {
        if(!this.disc.dissid){
          this.$router.push('/recommend')
          return
        }
          getDissList(this.disc.dissid).then(res => {
          let data = JSON.parse(/jsonCallback\((.+)\)/.exec(res)[1]);
          console.log(data)
          this.songList = this.normalizeSong(data.cdlist[0].songlist)
        })
      },
      normalizeSong(list) {
        let ret = [];
        list.forEach(item => {
          ret.push(createSongForDisc(item))
        })
        return ret
      }
    }
  }
</script>
<style scoped lang="stylus">
  .disc-enter, .disc-leave-to {
    transform: translate(100%)
  }

  .disc-enter-active, .disc-leave-active {
    transition: all 0.3s;
  }
</style>
