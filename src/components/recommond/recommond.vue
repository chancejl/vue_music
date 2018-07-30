<template>
  <div class="recommend">
    <scroll class="recommend-content" ref="scroll" :data="dissList">
      <div>
        <div class="slider-wrapper" v-if="recommondData.length">
          <slider>
            <div v-for="item in recommondData">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommond-list" v-show="recommondData.length">
          <h1>热门歌单</h1>
          <ul class="list-wrapper">
            <li v-for="diss in dissList" class="diss" @click="selectItem(diss)">
              <img :src="diss.imgurl" alt="">
              <i class="icon-bofang"></i>
              <span class="title" v-html="diss.dissname"></span>
              <span class="auther" v-html="diss.creator.name"></span>
            </li>
          </ul>
          <h3 v-show="dissList.length">没有更多</h3>
        </div>
        <loading v-show="dissList.length===0"></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import { getRecommond, getDiss } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        recommondData: [],
        dissList: []
      }
    },
    components: {
      Slider,
      Loading,
      Scroll
    },
    created() {
      this._getRecommond()
      this.$nextTick(()=>{
        this._getDiss()
      })
    },
    computed: {
      ...mapState(['disc'])
    },
    methods: {
      ...mapMutations(['SET_DISC']),
      _getRecommond() {
        getRecommond().then(res => {
          if (ERR_OK === 0) {
            this.recommondData = res.data.slider
          }
        })
      },
      _getDiss() {
        getDiss().then(res => {
          if (ERR_OK === 0) {
            this.dissList = res.data.list
          }
        })
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommond/${item.dissid}`
        })
        this['SET_DISC'](item)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .recommend {
    position: fixed
    width: 100%
    top: 84px
    bottom: 10px
    .recommend-content {
      height 100%
      overflow: hidden
      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
        margin-bottom: 14px;
      }
      .recommond-list {
        margin: 10px 10px;
        h1 {
          margin: 10px 10px;
        }
        .list-wrapper {
          width: 100%;
          display: flex;
          flex-wrap wrap
          justify-content: space-around;
          .diss {
            position: relative;
            background: #fff;
            padding: 1%;
            width: 46%;
            margin-bottom: 10px;
            i {
              border-radius: 50%;
              position: absolute;
              right: 10px;
              font-size: 30px;
              bottom: 48px;
              color: #fff;
              background: rgba(0, 0, 0, 0.2);
            }
            img {
              width: 100%;
            }
            span {
              display: block;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding: 2px;
            }
            .auther {
              font-size: 14px;
            }
          }
        }
        h3 {
          text-align: center;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
