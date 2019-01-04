<template>
 <div>
     <van-popup v-model="show" position="right" >
        <div class="assistant-filtercondition">
           <section v-for="filter in filterList">
               <h5>{{filter.name}}</h5>
               <div>
                   <span v-for="(key,value) in filter.cplist">{{key}}</span>
               </div>
           </section>
        </div>
     </van-popup>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         filterList:[
             {
                 name:'产品',
                 cp:{}
             }
         ]
     }
   },
   props:{
       show:{
         type:Boolean,
         default:false
       }
   },
   methods:{
       getDictEnum(name,isInterface,obj){
           this.$get(this.API.getDictEnum,{
               name:name,
               code:"",
               isInterface:isInterface || ''
           }).then(res=>{
               if(res.state == 'success'){
                   sessionStorage.setItem(name,JSON.stringify(res.data));
               }
           })
       },
        //  获取sesstion
        getSession(name) {
                return JSON.parse(sessionStorage.getItem(name));
        } 
   },
   mounted(){
     //获取产品枚举     
     this.getDictEnum('cp',true,this.filterList[0].cp); 
     console.log(this.filterList[0])
   },
   components: {}
 }
</script>

<style scoped>
.assistant-filtercondition{
    height: 100vh;
    width: 85vw;
}
</style>
