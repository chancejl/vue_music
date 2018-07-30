<template>
    <div>
      <search-bar ref="searchBar" @query="setQueryValue"></search-bar>
     <div class="hotWrapper" v-show="query.length===0">
       <h1 class="hot">热门搜索</h1>
       <ul class="hotTag">
         <li @click="addQuery(tag.k)" v-for="tag in hotTag">{{tag.k}}</li>
       </ul>
     </div>
      <div class="search-history" v-show="searchHistory.length">
        <h1 class="title">
          <span class="text">搜索历史</span>
          <span class="clear" @click="deleteAll">
            <i class="icon-guanbi"></i>
          </span>
        </h1>
        <search-list @selected="addQuery" :searches="searchHistory"></search-list>
      </div>
      <div class="searchOut">
        <suggest @select="saveSearch" v-show="query" :query="query"></suggest>
      </div>
    </div>
</template>
<script>
  import SearchBar from 'base/search-item/search-item';
  import {getHotTag} from 'api/search';
  import {ERR_OK} from 'api/config';
  import Suggest from 'components/suggest/suggest'
  import {mapActions,mapGetters} from 'vuex'
  import SearchList from 'base/search-list/search-list'
  export default {
    data() {
      return {
        query: '',
        hotTag: []
      }
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
     },
    created() {
      this._getHotTag()
    },
    components: {
      SearchBar,
      Suggest,
      SearchList
    },
    methods: {
      saveSearch(){
        this.saveSearchHistory(this.query)
      },
      _getHotTag() {
        getHotTag().then(res=>{
          if(res.code==ERR_OK){
            this.hotTag=res.data.hotkey.slice(1,10);
          }
        })
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ]),
      addQuery(query) {
        this.$refs.searchBar.setQuery(query);
      },
      setQueryValue(query) {
        this.query=query;
      },
      deleteOne(item){
       this.deleteSearchHistory(item)
      },
      deleteAll(){
        this.clearSearchHistory()
      }
    }
  }
</script>
<style scoped lang="stylus">
  .hot{
    padding-left 20px;
    padding-bottom 10px;
  }
 .hotTag{
   li{
     display inline-block;
     border: 0.5px solid #ccc;
     border-radius:18px;
     padding 8px 10px;
     margin: 5px 5px 5px 10px;
     background white;
   }
 }
   .title{
     margin-top:10px;
     position: relative;
     .text{
       padding-left:20px;
       padding-bottom:10px;
       font-weight:bold;
     }
     .clear{
       position: absolute;
       top:0;
       right:10px;
     }
   }

</style>
