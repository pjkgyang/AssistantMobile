<template>
 <div>
    <section class="quesiton-reply" v-for="reply in replyData">
       <div>
            <van-tag size="large" color="#007AFF">{{reply.hflx==1?'受理':''}}</van-tag>
       </div>
       <div class="reply-header">
           <p class="fontColorb">{{reply.hfrxm}} &#x3000;{{reply.cjsj}}</p>
           <p class="fontColorg">承诺结束日期：{{reply.cnjsrq}}　 工时：{{reply.gs}}</p>
       </div>
       <div class="reply-content" v-html="reply.nr"></div>
    </section>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         
     }
   },
   props:{
       replyData:{
           type:Array,
           default:()=>{
               return [{
                   hflx:1,
                   hfrxm:'陈子豪',
                   cjsj:'2018-11-13 16:55:20',
                   cnjsrq:'2018-11-19',
                   gs:'0',
                   nr:'回复内容'
               }]
           }
       }
   },
   components: {}
 }
</script>

<style lang="less" scoped>
@import '../../index.less';
    .quesiton-reply{
        .reply-header{
            border-bottom: 1px solid #E8E8E8;
            padding: 0.5rem 0;
            .fontColorb{
                color: #333;
                font-size:@fontSize14;
            }  
            .fontColorg{
                color: #999999;
                font-size:@fontSize12;
            }
        }
       
       .reply-content{
        padding: 0.5rem 0;
        font-size:@fontSize14;
       } 
    }
</style>
