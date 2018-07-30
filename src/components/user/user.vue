<template>
  <div class="user-wrapper">
    <div class="avatar">
      <img src="./default_avatar.jpg" alt="">
    </div>
    <div class="unsign" v-show="!user.username">
      <div class="name">
        <span>{{msg}}</span>
      </div>
      <input @click="showBox" class="sign-btn" type="button" value="马上登录">
      <span @click="singUp" class="signin">没有账号?马上注册...</span>
      <pop-box ref="popBox1" class="popBox" :title="titleIn" @user="_userSignin"></pop-box>
      <pop-box ref="popBox2" class="popBox" :title="titleUp" @user="_userSignUp"></pop-box>
    </div>
    <div class="sign" v-show="user.username">
      <div class="profile">
        <span v-html="user.username"></span>
        <span>最近查找的</span>
        <div v-for="item in searchHistory">
          <div class="song">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { userSignIn, userSignUp } from 'api/user';
  import PopBox from 'base/pop-box/pop-box';
  import { ERR_OK } from 'api/config'
  import { mapGetters, mapMutations } from 'vuex';
  import SongList from 'base/song-list/song-list';
  export default {
    data() {
      return {
        titleIn: '登录',
        titleUp: '注册',
        user: {},
        msg: '未登录'
      }
    },
    created() {
      //this._getUser();
    },
    computed: {
      ...mapGetters([
        'searchHistory',
        'playingList'
      ])
    },
    components: {
      PopBox,
      SongList
    },
    methods: {
    ...mapMutations({
        setCurrentIndex: 'SET_CURRENTINDEX'
      }),
      showBox() {
        this.$refs.popBox1.$el.style.top = '30%';
        this.$refs.popBox1.$el.style.opacity = 1;
      },
      _userSignin(user) {
        userSignIn(user).then((res) => {
          this.user = res.data.user
        })
      },
      singUp() {
        this.$refs.popBox2.$el.style.top = '30%';
        this.$refs.popBox2.$el.style.opacity = 1;
      },
      _userSignUp(user) {
        userSignUp(user).then((res) => {
          if (res.data.code === ERR_OK) {
            this.msg=res.data.title
      }
        })
      },
      selectList(song) {
        let index=this.playingList.findIndex(item=>item.id===song.id);
        this.setCurrentIndex(index);
      },
    }
  }
</script>
<style scoped lang="stylus">
  .user-wrapper {
    position fixed;
    left: 0;
    top: 84px;
    width 100%;
    height 100%;
    .avatar {
      width 100px;
      margin 30px auto;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .name {
      width 100%;
      text-align: center;
      span {
        font-size 20px;
      }
    }
    .unsign {
      .sign-btn {
        display block;
        width 90%;
        margin-left 5%;
        height 40px;
        line-height 40px;
        text-align center;
        background #31c27c;
        outline medium;
        margin-top 50px;
      }
      .signin {
        font-size 18px;
        color: #31c27c
        display block;
        width 100%;
        text-align center;
        padding-top 20px;
      }
      .popBox {
        top: 120%;
        transition: all 0.5s;
      }
    }
    .sign{
      .profile{
        display flex;
        flex-direction column;
        align-items center;
        span{
          height 40px;
          padding-left 20px;
          width 90%;
          background #fff;
          font-size:18px;
          line-height 40px;
          border-bottom 0.1px solid #ccc;
        }
      }
    }
  }
</style>
