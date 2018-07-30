<template>
  <div class="search-list" v-show="searches.length">
    <ul>
    <li @click="select(item)" class="search-item" v-for="item in searches">
      <span class="text">{{item}}</span>
    </li>
    </ul>
  </div>
</template>

<script>
    export default {
        props:{
          searches:{
            type:Array,
            default:[]
          }
        },
      methods:{
        select(item){
            this.$emit('selected',item)
          },
        deleteOne(item){
            this.$emit('deleted',item)
        }
      }
    }
</script>

<style scoped>
  .search-list{
    padding-left: 20px;
    margin-top: 10px;
    }
  .search-item {
    position: relative;
    padding: 5px 0;
  }
  .icon{
    position: absolute;
    top: 0;
    right: 10px;
  }
</style>
