<template>
  <div class="box" ref="pBox">
    <h1>{{title}}</h1>
    <div class="content">
      <input type="text" v-model="user.username" placeholder="输入用户名">
      <input type="password" v-model="user.password" placeholder="输入密码">
    </div>
    <div class="btn">
      <span @click="userCancel" class="cancel">取消</span>
      <span @click="userSend" class="confirm">确认</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '登录'
      }
    },
    data() {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    computed: {},
    components: {},
    methods: {
      userSend() {
        this.$refs.pBox.style.top='120%';
        this.$refs.pBox.style.opacity=0;
        this.$emit('user', this.user)
      },
      userCancel() {
        this.$refs.pBox.style.top='120%';
        this.$refs.pBox.style.opacity=0;
      }
    }
  }
</script>
<style scoped lang="stylus">
  .box {
    position: absolute;
    left: 50%;
    top: 30%;
    width: 300px;
    height: 200px;
    transform: translate(-50%, -50%);
    background: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    h1 {
      position absolute
      width 60%;
      font-size 20px;
      left 50%
      margin-left: -30%;
      text-align center;
      margin-top 10px;
    }
    .content {
      padding-top 40px;
      width: 100%;
      height 70%;
      input {
        padding-left 20px;
        margin-bottom 10px;
        width 90%;
        height 40px;
        outline medium;
        font-size 18px;
      }
    }
    .btn {
      border-top: 0.1px solid #555;
      width 100%;
      height 30%;
      display flex;
      span {
        width 50%;
        font-size 20px;
        text-align center;
        line-height 50px;
      }
      .cancel{
        border-right:0.1px solid #555;
      }
    }
  }
</style>
