<template>
    <div class="assisant-empty" :style="{top:top}">
        <img :src="emptyImg" alt="">
        <p>暂无内容</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            emptyImg:require("../../../static/img/empty.png")
        }
    },
    props:{
        top:{
            type:String,
            default:'40%'
        }
    }
}
</script>
<style scoped lang='less'>
  .assisant-empty{
      position: absolute;
      width: 100%;
      text-align: center;
      font-size:0.9rem;
  }
</style>

