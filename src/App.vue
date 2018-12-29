<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <loading v-if="$store.state.loadingShow"></loading>
  </div>
</template>

<script>
import { getQueryStringByName } from "./utils/util.js";
import loading from '@/components/public/loading.vue'
export default {
  name: "app",
  data() {
    return {
      active: 0
    };
  },
  components:{loading},
  beforeCreate() {
    // console.log(this.$store.state.loadingShow)
    //  this.$router.push({ path: "/login" });
    //  this.$get(this.API.getLoginUser, {}).then(res => {
    //     if (res.state == "success") {
    //         window.userName = res.data.nickName;
    //         window.userId = res.data.uid;
    //         sessionStorage.setItem("jzUser", res.data.unitType);
    //     } else {
    //       alert(res.msg);
    //     }
    // }).catch(error=>{

    // });
    // window.openId = getQueryStringByName("openId");
    // if (window.openId) {
    //   sessionStorage.setItem("openId", window.openId);
    // } else {
    //   window.openId = sessionStorage.getItem("openId");
    // }
    // this.$post(this.API.wxLogin, {
    //   openId: window.openId
    // }).then(res => {
    //   if (res.state == "success") {
    //     if (!!res.data) {
          this.$get(this.API.getLoginUser, {}).then(res => {
            if (res.state == "success") {
              window.userName = res.data.nickName;
              window.userId = res.data.uid;
              sessionStorage.setItem("jzUser", res.data.unitType);
            } else {
              alert(res.msg);
            }
          });
    //     }
    //   } else {
    //     this.$router.push({ path: "/login" });
    //     // window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html#/login'
    //   }
    // });
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>
