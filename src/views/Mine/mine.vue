<template>
    <div>
        <header>
            <div class="mine-avatar">
                <img :src="userInfo.logo">
            </div>
            <div class="mine-info">
                <h4>{{userInfo.nickName}}</h4>
                <p>{{userInfo.unit}}</p>
            </div>
        </header>
        <div class="mine-footer">
            <van-cell is-link style="height:3.66666rem;display:flex;align-items:center" @click="handleCheckUserinfo">
                <template slot="title">
                    <mu-icon size="22" value="person" color="blue"></mu-icon>
                    <span class="custom-text">个人信息</span>
                </template>
            </van-cell>

            <van-cell v-if="lx == 3" style="height:3.66666rem;display:flex;align-items:center;" @click="handleEscLogin">
                <template slot="title">
                    <p class="esc-text">退出登录</p>
                </template>
            </van-cell>
        </div>

        <div class="cur-bbh">
          <p>当前版本：Jzv1.0.1</p>
        </div>
    </div>
</template>

<script>
import infoList from "@/components/mine/infoList";
export default {
  data() {
    return {
      userInfo: {},
      errorImg: 'this.src="' + require("../../../static/img/user.png") + '"',
      lx:''
    };
  },
  methods: {
    handleCheckUserinfo() {
      this.$router.push({ path: "/userinfolist" });
    },
    handleEscLogin(){
      this.clearCache();
    },
    clearCache() {
     //   删除cookie
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--; )
          document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
      }
      //   删除loca
      localStorage.removeItem('userInfo');

      this.$router.push({path:'/Login'});
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.lx = sessionStorage.getItem('lx');
  },
  components: { infoList }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
header {
  height: 5.65555rem;
  background: #ffffff;
  margin-bottom: 0.8rem ;
  .flex(flex-start,center);
  .mine-avatar {
    width: 30vw;
    height: 100%;
    .flex(center,center);
    img {
      width: 17vw;
      height: 17vw;
      border-radius: 50%;
    }
  }
  .mine-info {
    h4 {
      margin: 0.5rem 0;
    }
    p {
      color: #999999;
      font-size: @fontSize14;
    }
  }
}
.mine-footer {
  font-weight: 700;
  .van-cell {
    margin-bottom: 0.75rem;
  }
  .custom-text {
    font-size: 1rem !important;
    margin-left: 1rem;
  }
  .esc-text {
    width: 100%;
    font-size: 1rem !important;
    text-align: center;
    color: rgb(231, 64, 64);
  }
}
.cur-bbh{
  color: #999999;
  font-size: @fontSize12;
  text-align: center;
}
</style>
