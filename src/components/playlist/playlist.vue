<template>
    <transition name="list-fade">
      <div class="playlist">
        <div class="list-wrapper">
          <div class="list-header">
            <h1 class="title">
              <i class="icon"></i>
              <span class="text"></span>
              <span class="clear"><i class="icon-guanbi"></i></span>
            </h1>
          </div>
          <div class="list-content">
            <ul>
              <li class="item">
                <i class="current"></i>
                <span class="text"></span>
                <span class="like">
                  <i class="icon-not-favorite"></i>
                </span>
                <span class="delete">
                  <i class="icon-guanbi"></i>
                </span>
              </li>
            </ul>
          </div>
          <div class="list-operate">
            <div class="add">
              <i class="icon-add"></i>
              <span class="text">添加歌曲</span>
            </div>
          </div>
          <div class="list-close">
            <span>关闭</span>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
    export default {
        name: "playlist"
    }
</script>

<style scoped>

</style>
