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
import loading from "@/components/public/loading.vue";
export default {
  name: "app",
  data() {
    return {
      active: 0
    };
  },
  activated() {},
  watch: {
    $route: function(from, to) {
      this.$store.dispatch(
        "adduser",
        JSON.parse(localStorage.getItem("userInfo"))
      );
      this.$store.dispatch("chnageLoing", false);
      //  this.$toast.clear();
    }
  },
  beforeCreate() {
    this.$nextTick(()=>{
    console.log(navigator.userAgent.toLowerCase());

          if ((!!this.getIosVersion() && this.getIosVersion() < 10) || (!!this.getAndroidVersion() && this.getAndroidVersion() < 6)) {
         this.$store.dispatch("changeIosVersion", this.getIosVersion());
         this.$dialog.alert({
            message:
              "为了更多用户更好的体验，我们暂不兼容IOS9或Android4.0及以下版本；请访问PC端小助手浏览或升级您系统版本，谢谢！"
          });
        }
    })
    // this.$get(this.API.getLoginUser,{}).then(res=>{
    //   if (res.state == "success") {
    //     window.userName = res.data.nickName;
    //     window.userId = res.data.uid;
    //     localStorage.setItem("userInfo", JSON.stringify(res.data));
    //     this.$store.dispatch("adduser", JSON.parse(localStorage.getItem("userInfo")));
    //   }else{
    //     this.$toast(res.msg);
    //   }
    // })
  },
  methods:{
    getAndroidVersion() {
      var ua = navigator.userAgent.toLowerCase();
      var version = null;
      if (ua.indexOf("android") > 0) {
        var reg = /android [\d._]+/gi;
        var v_info = ua.match(reg);
        version = (v_info + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."); //得到版本号4.2.2
        version = parseInt(version.split(".")[0]); // 得到版本号第一位
      }
      return version;
    },
    getIosVersion(){
        var ua = navigator.userAgent.toLowerCase();
        var version = null;
        if (ua.indexOf("like mac os x") > 0) {
            var reg = /os [\d._]+/gi;
            var v_info = ua.match(reg);
            version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); //得到版本号9.3.2或者9.0
            version = parseInt(version.split('.')[0]); // 得到版本号第一位
        }
        return version;
    }

  },
  components: { loading }
};
</script>
<style lang="less">
@import "./index.less";
</style>
