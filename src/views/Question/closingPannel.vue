<template>
 <div>
     <questionlist :questionList="questionList" :isCloseShow="true" @handleCheckDetail="handleCheckDetail" 
     @handleCloseOrReject="handleCloseOrReject"></questionlist>
     <div v-if="!questionList.length">
          <emptyContent></emptyContent>
     </div>
 </div>
</template>

<script>
 import questionlist from '@/components/question/questionlist.vue';
 import emptyContent from "@/components/public/empty-content.vue";
 export default {
   data () {
     return {
         questionList:[{
             bt:'Zyh测试1',
             lcMc:'总部产品受理',
             wtbh:'123123123',
             fbrq:'2018-08-08',
             fbrxm:'张三',
             ssbm:'所属部门',
             cpmc:'adssad',
             wid: "78b93bfcfbc943e5a3124075a0ecb94f"
         }]
     }
   },
   methods:{
       handleCheckDetail(params){
         this.$router.push({name:'questionDetail',query:{wid:params.wid,lc:params.lcMc}});
       },
       // 驳回或关闭
       handleCloseOrReject(type,params){
          alert(type);
         if(type == 'reject'){

         }else{

         }
       }
   },
   components: {questionlist,emptyContent}
 }
</script>

<style scoped>

 
</style>
