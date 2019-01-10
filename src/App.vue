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
      active: 0,
    };
  },
  components:{loading},
  watch:{
     '$route':(from,to)=>{
        // this.$store.dispatch("chnageLoing", false);
     }
  },
  beforeCreate() {
    // console.log(this.$store.state.loadingShow)
    // window.openId = getQueryStringByName("openId");
    // window.lx = getQueryStringByName("lx");

    // if (window.openId) {
    //   sessionStorage.setItem("openId", window.openId);
    // } else {
    //   window.openId = sessionStorage.getItem("openId");
    // }

    // if(window.lx){
    //   sessionStorage.setItem("lx", window.lx);
    // }else{
    //   window.lx = sessionStorage.getItem("lx"); 
    // }
    // this.$post(this.API.wxLogin, {
    //   openId: window.openId,
    //   lx: window.lx
    // }).then(res => {
    //   if (res.state == "success") {
        this.$get(this.API.getLoginUser,{}).then(res=>{
          if (res.state == "success") {
            window.userName = res.data.nickName;
            window.userId = res.data.uid;
            sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          }else{
            this.$toast(res.msg);
          }
        })
       this.$store.dispatch("adduser", JSON.parse(sessionStorage.getItem("userInfo")));
    //   } else {
    //     this.$router.push({ path: "/login" });
    //     // window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html#/login'
    //   }
    //    alert(JSON.stringify(res));
    // });
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>
