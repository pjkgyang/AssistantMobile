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
       <footer class="mine-footer">
            <van-cell  is-link style="height:3.66666rem;display:flex;align-items:center" @click="handleCheckUserinfo">
                <template slot="title">
                    <mu-icon size="22" value="person" color="blue"></mu-icon>
                    <span class="custom-text">个人信息</span>
                </template>
            </van-cell>
       </footer>

 </div>
</template>

<script>
 import infoList from '@/components/mine/infoList'
 export default {
   data () {
     return {
        userInfo:{},
        errorImg: 'this.src="' + require("../../../static/img/user.png") + '"',
     }
   },
   methods:{
       handleCheckUserinfo(){
           this.$router.push({path:'/userinfolist'})
       }
   },
   mounted(){
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
   },
   components: {infoList}
 }
</script>

<style lang="less" scoped>;
@import "../../index.less";
 header{
     height: 5.65555rem;
     background: #ffffff;
     margin: 0.8rem 0;
     .flex(flex-start,center);
     .mine-avatar{
         width:30vw;
         height: 100%;
         .flex(center,center);
         img{
             width: 17vw;
             height: 17vw;
             border-radius: 50%;
         }
     }
     .mine-info{
         h4{
             margin: 0.5rem 0;
         }
         p{
             color: #999999;
             font-size: @fontSize14;
             
         }
     }
 }
 footer{
     font-weight: 700;
     .custom-text{
         font-size: 1rem !important;
         margin-left:1rem;
     }
 }
</style>
