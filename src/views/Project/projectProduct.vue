<template>
 <div class="project-product">
     <ul>
         <li v-for="item in cpList"  flex-col-center @click="handleCheckMilestone(item)">
             <div col="7" flex-column>
                 <div>
                     <h5>{{item.cpmc}}</h5>
                     <p class="font12">
                         <span class="color999">乙方责任人：</span>{{item.yfxm}}&#x3000;&#x3000;
                         <span class="color999">甲方责任人：</span>{{!item.jfxm?'无':item.jfxm}}
                     </p>
                 </div>
                 <div  class="font12" flex>
                     <span col="1" class="color999">任务进度:</span>
                     <div  col="4">
                         <progressBar :percentage="item.jd"></progressBar>
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
         cpList:[],
         xmbh:""
     }
   },
   activated(){
       if(this.xmbh != this.$route.query.xmbh){
            this.listMilestoneProduct();  
       }
       this.xmbh = this.$route.query.xmbh;
   },
   methods:{
       handleCheckMilestone(params){
           this.$router.push({name:"projectMilestone",query:{xmbh:this.$route.query.xmbh,cpbh:params.cpbh,cpmc:params.cpmc}})
       },
       listMilestoneProduct(){
           this.$store.dispatch("chnageLoing", true);
           this.$get(this.API.listMilestoneProduct,{
               xmbh:this.$route.query.xmbh
           }).then(res=>{
               if(res.state == 'success'){
                   if(!res.data){
                      this.cpList = []
                   }else{
                      this.cpList = res.data
                   }
                   this.$store.dispatch("chnageLoing", false);
               }else{
                   this.$store.dispatch("chnageLoing", false);
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
