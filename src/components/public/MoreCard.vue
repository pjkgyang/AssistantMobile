<template>
  <div class="assistant-card">
     <div class="card-title">
         <h5>{{title}}</h5>
     </div>
     <div class="card-content">
         <slot name="content"></slot>
     </div>
  </div>    
</template>
<script>
export default {    
    data(){
        return {
            
        }
    },
    props:{
        title:{
            type:String,
            default:'工作汇报'
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../index.less";
.assistant-card{
    background: #fff;
    padding: 0 0.5rem;
    margin-bottom: 1rem;
    .card-title{
        color: rgb(75, 71, 71);
        border-bottom: @border-ef;
        padding: 0.6rem 0;
    }
}
</style>
