<template>
  <div class="search-bar">
    <i class="icon-sousuo"></i>
    <input type="text" v-model="query" :placeholder="placeholder">
    <i @click="clear" v-show="query" class="icon-guanbi"></i>
  </div>
</template>
<script>
  import {debounce} from 'common/js/randomList'
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲,歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
   created(){
      this.$watch('query',debounce((newQuery)=>{
        this.$emit('query',newQuery)
      },200))
      },
    computed: {},
    components: {},
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query=query
      }
    }
  }
</script>
<style scoped lang="stylus">
  .search-bar {
    width: 90%;
    height 40px;
    margin: 20px auto;
    background: #fff;
    border-radius: 3px;
    display flex
    align-items center
    i {
      padding 0 10px;
    }
    input {
      width 100%;
      height 30px;
      padding-right 10px;
      outline: medium;
    }
  }
</style>
