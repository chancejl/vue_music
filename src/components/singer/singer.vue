<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
  import ListView from 'base/listview/listview'
  import { getSinger } from 'api/singer'
  import { Singer } from 'common/js/singer'
  import {mapMutations} from 'vuex'
  import * as types from 'store/mutation-types'
  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSinger()
    },
    computed: {},
    components: {
      ListView
    },
    methods: {
      ...mapMutations([types.SET_SINGER]),
      _getSinger() {
        getSinger().then(res => {
          this.singers = this._sortSinger(res.data.list)
        })
      },
      _sortSinger(data) {
        let map = {
          hot: {
            title: '热门',
            items: []
          }
        }
        data.forEach((singer, index) => {
          if (index < 10) {
            map.hot.items.push(new Singer(singer.Fsinger_mid,
              singer.Fsinger_name))
          }
          const key = singer.Findex;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer(singer.Fsinger_mid,
            singer.Fsinger_name))
        });
        let hot = [];
        let rest = [];
        for (let k in map) {
          if (/\d/.test(k)) {
            continue
          }
          if (map[k].title === '热门') {
            hot.push(map[k])
          } else {
            rest.push(map[k])
          }
        }
        rest.sort((a, b) => {
          return a.title.charCodeAt() - b.title.charCodeAt()
        })
        return hot.concat(rest)
      },
      selectSinger(singer) {
        this[types.SET_SINGER](singer);
        this.$router.push({
          path: `/singer/${singer.id}`
        })
      }
    }
  }
</script>
<style scoped>
 .singer{
   width: 100%;
   position: fixed;
   top:84px;
   bottom: 0px;
 }
</style>
