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
  activated(){},
  watch:{
    '$route':function(from,to){
       this.$store.dispatch("adduser", JSON.parse(localStorage.getItem("userInfo")));
       this.$store.dispatch("chnageLoing", false);
    }
  },
  beforeCreate() {
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
  components:{loading},
};
</script>
<style lang="less">
@import "./index.less";
</style>
