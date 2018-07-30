<template>
  <div>
    <scroller class="scroller" v-show="rankList">
      <ul class="rank" v-for="rank in rankList" @click="select(rank)">
        <img :src="rank.picUrl" alt="">
        <div class="rankSong">
          <span class="rankTitle" v-html="rank.topTitle"></span>
          <li v-for="(song,index) in rank.songList"><span>{{index + 1}} {{song.songname}}-{{song.singername}}</span>
          </li>
        </div>
        <span class="more"><i></i></span>
      </ul>
    </scroller>
    <div class="load" v-show="rankList.length===0">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import { getRank } from 'api/rank';
  import { mapMutations } from 'vuex';
  import Loading from 'base/loading/loading';
  export default {
    data() {
      return {
        rankList: []
      }
    },
    created() {
      this._getRank()
    },
    computed: {},
    components: {
      Loading
    },
    methods: {
      ...mapMutations({
        setTop: 'SET_TOPLIST'
      }),
      _getRank() {
        getRank().then(res => {
          this.rankList = res.data.topList
        })
      },
      select(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        });
        this.setTop(item);
      }
    }
  }
</script>
<style scoped lang="stylus">
  .scroller {
    position: fixed;
    top: 90px;
    bottom: 0;
    height auto;
    overflow hidden;
    width: 100%;
    .rank {
      background white;
      margin: 0 10px 10px 10px;
      display flex;
      img {
        width 100px;
        height 100px;
      }
      div {
        width 70%;
        flex: 1
        display flex;
        flex-direction column;
        justify-content space-around;
        padding-left 10px;
        li {
          width 100%;
          span {
            display inline-block;
            width 90%;
            font-size 14px;
            text-overflow ellipsis;
            overflow hidden;
            white-space nowrap;
          }
        }
      }
      .more {
        position fixed;
        display block;
        right 0;
        top: 0;
        width 30px;
        height 100px;
      }
    }
  }
</style>
