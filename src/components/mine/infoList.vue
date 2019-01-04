<template>
 <div class="mine-infolist Pop_element">
     <van-cell title="姓名" :value="userInfo.nickName" />
     <van-cell title="性别"  :value="userInfo.gender==1?'男':userInfo.gender==2?'女':'未知'" />
     <van-cell title="单位"  :value="userInfo.unit" />
     <van-cell title="联系邮箱"  :value="userInfo.email" />
     <van-cell title="手机号"  :value="userInfo.telNum | FormatPhoneNumber" />
 </div>
</template>

<script>
 export default {
   data () {
     return {
         userInfo:{}
     }
   },
    mounted(){
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    },
    filters:{
            FormatPhoneNumber:function(value){
                if (!value) return ''
                return value.slice(0,3) +'****'+value.slice(-4)
            }
    },
   components: {}
 }
</script>

<style scoped>

</style>
