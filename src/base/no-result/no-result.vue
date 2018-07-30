<template>
    <div class="no-result">
      <img src="./cat.png" alt="" class="img" style="width: 200px;
      margin-top: 50%;">
      <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script>
    export default {
      props:{
          title:{
            type:String,
            default:''
          }
      }
    }
</script>

<style scoped>
  .no-result{
    text-align: center;
    .no-result-text{
      margin-top: 30%;
      font-size: 16px;
      color:#666
    }
  }
</style>
