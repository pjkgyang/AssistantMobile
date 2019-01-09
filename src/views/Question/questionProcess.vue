<template>
   <div>
      <div class="questionProcess-top">
        <section class="questionProcess-desc">
            <div class="questionProcess-detail">
            <h4>{{questionData.bt}}</h4>
                <div class="questionProcess-desc-info">
                    <p>问题编号：<span>{{questionData.wtbh}}</span></p>
                    <p>提问时间：<span>{{questionData.fbrq}}</span></p>
                    <p>发布人：<span>{{questionData.fbrxm}}</span></p>
                    <p>所属单位：<span>{{questionData.ssbm}}</span></p>
                    <p>所属项目：<span>{{questionData.xmmc}}</span></p>
                    <p>问题类型：<span>{{questionData.wtlx_display}}</span></p>
                    <p>产品：<span>{{questionData.cpmc}}</span></p>
                    <p>期望解决日期：<span>{{questionData.qwjjrq}}</span></p>
                    <p>承诺结束日期：<span>{{questionData.cnjsrq}}</span></p>
                </div> 
            </div>
        </section>
     </div>
     <div class="questionProcess-steps">
       <steps :list="processData"></steps>
     </div>
    </div>
</template>

<script>
 import steps from '@/components/question/steps'
 export default {
   data () {
     return {
         questionData:{},
         processData:[],
         active:0
     }
   },
   methods:{
       queryProcess(){
           this.$store.dispatch("chnageLoing", true);
           this.$get(this.API.queryProcess,{
               wid:this.$route.query.wid
           }).then(res=>{
               if(res.state == 'success'){
                 this.$store.dispatch("chnageLoing", false);  
                 this.processData = res.data
               }else{
                  this.$toast(!res.msg?'系统超时，请稍后再试~':res.msg);
               }
           })
       }
   },
   mounted(){
       this.queryProcess();
       this.questionData = this.$route.params.data
   },
   components: {steps}
 }
</script>

<style lang="less" scoped>
@import '../../index.less';
.questionProcess-top{
    background: #fff;
  .questionProcess-desc{
  .questionProcess-detail{
    padding:1rem  1.25rem ;
    border-bottom:1px solid #E8E8E8;
    .questionProcess-desc-info{
      font-size: @fontSize12;
    }
    p{
      color: #999999;
      span{
        color: #333;
      }
    }
  }
  }
}
.questionProcess-steps{
    padding: 1rem 1.25rem;
    background: #fff;
}
 
</style>
