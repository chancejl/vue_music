<template>
  <div>
    <ul class="list">
      <li @click="selectItem(song,index)" v-for="(song,index) in data">
        <span class="name" v-html="song.name"></span>
        <span class="singer">{{song.singer}}-{{song.album}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array
      }
    },
    created() {
    },
    data() {
      return {}
    },
    computed: {},
    components: {},
    methods: {
      selectItem(song, index) {
        this.$emit('select', song, index)
      }
    }
  }
</script>
<style scoped lang="less">
  .list {
    width: 100%;
    li {
      margin: 0 15px;
      padding: 10px 10px;
      border-bottom: 0.2px solid rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      .name {
        display: block;
        width: 100%;
        font-size: 17px;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-bottom: 10px;
        white-space: nowrap;
      }
      .singer {
        color: rgba(0, 0, 0, 0.5);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
      }
    }
  }
</style>
