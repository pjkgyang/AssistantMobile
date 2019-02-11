<template>
 <div class="project-product">
     <ul>
         <li v-for="item in cpList"  flex-col-center>
             <div col="4" flex-column>
                 <div>
                     <h5>{{item.cp_display}}</h5>
                     <p class="font12">
                         <span class="color999">乙方责任人：</span>{{item.yfzrrxm}}&#x3000;&#x3000;
                         <span class="color999">甲方责任人：</span>{{!item.jfzrrxm?'无':item.jfzrrxm}}
                     </p>
                 </div>
                 <div  class="font12" flex>
                     <span col="1" class="color999">任务完成率:</span>
                     <div  col="3">
                         <progressBar :percentage="Math.ceil(item.ywcrwzs/item.rwzs*100)"></progressBar>
                     </div>
                 </div>
             </div>
             <div col="1" text-center>
                 <van-icon name="arrow" />
             </div>
         </li>
     </ul>
 </div> 
</template>

<script>
 import progressBar from "@/components/public/progress.vue";
 export default {
   data () {
     return {
         cpList:[]
     }
   },
   mounted(){
    this.getProjectCatalog();  
   },
   methods:{
       getProjectCatalog(){
           this.$get(this.API.getProjectCatalog,{
               xmbh:this.$route.query.xmbh
           }).then(res=>{
               if(res.state == 'success'){
                   if(!res.data){
                      this.cpList = []
                   }else{
                      this.cpList = res.data
                   }
               }
           })
       }
   },
   components: {progressBar}
 }
</script>

<style lang="less" scoped>
.project-product{
    height: 100vh;
    overflow-y: auto;
    ul{
       background: #fff;
    }
    li{
       padding: 0.5rem;
       border-bottom: 1px solid #e0e0e0;
       p{
           margin: 4px 0;
       }
    }
}
</style>
