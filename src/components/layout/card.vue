<template>
 <div class="assistant-layout">
     <section class="layout_top">
        <slot name="caption"></slot>
     </section>
     <section class="layout_bottom">
       <slot name="detail"></slot>
     </section>
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
@import '../../index.less';
.assistant-layout{
    background: #fff;
    box-shadow: 0 0 3px rgba(26, 25, 25, 0.1);
    margin-bottom: 0.5rem;
  .layout_top{
      margin-left: 1.333rem;
      border-bottom: 1px solid  #E8E8E8;
      padding:0.75rem 1.333rem 0.75rem 0; 
  }  
  .layout_bottom{
    padding:1rem 1.333rem;  
  }
}
 
</style>
