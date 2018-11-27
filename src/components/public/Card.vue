<template>
  <div class="assistant_card">
      <div class="card_avatar">
          <slot name="avatar"></slot> 
      </div>
     <div class="card_info">
         <slot name="info"></slot>
     </div>
     <div class="card_mark">
         <slot name="mark"></slot>
     </div>
     <div class="card_icon">
         <slot name="icon"></slot>
     </div>
  </div>    
</template>
<script>
export default {
    
}
</script>
<style lang='less' scoped>
@import "../../index.less";
.assistant_card{
    .flex(@col:center);
    font-size: @fontSize12;
    color: rgb(100, 100, 100);
    .card_avatar{
        width: 20%;
       .flex(@row:center);
       text-align: center;
    }
    .card_info{
        width:52%;
    }
    .card_mark{
        width: 20%;
        .textalign();
    }
    .card_icon{
        width: 8%;
    }
}
</style>
