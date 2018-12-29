<template>
 <div>
     <div class="data_loading" >
            <van-loading type="spinner"/>&nbsp;
            <p>加载中...</p>
      </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {}
 }
</script>

<style lang="less" scoped>
@import "../../index.less";
 .data_loading{
    height:10vh;
    width: 100vw;
    position: absolute;
    top:50%;
    margin-top: -5vh;
   .flex(@row:center,@col:center);
   p{
     font-size: @fontSize14;
     color: #c9c9c9
   }
}
</style>
