<template>
 <div>
     <van-popup v-model="show" position="right" >
         <div  class="filter-pop">
        <div class="assistant-filtercondition">
           <section v-for="(filter,index) in filterList">
               <h5>{{filter.name}}</h5>
               <div class="assistant-filtercondition-list">
                   <van-tag :plain="!!filter.cpbh" :color="!filter.cpbh?'#00c1de':''" :style="{'color':!filter.cpbh?'#fff !important':'#555 !important'}"
                   @click.native="hanleChoosefilter('',index)">全部</van-tag>
                   <van-tag :plain="filter.cpbh != value" :color="filter.cpbh==value?'#00c1de':''" :style="{'color':filter.cpbh==value?'#fff !important':'#555 !important'}"  
                   v-for="(key,value) in filter.cplist" :key="index" @click.native="hanleChoosefilter(value,index)">{{key}}</van-tag>
               </div>
           </section>
        </div>
        <footer>
            <van-button size="normal" type="default" @click="handleClose">取消</van-button>
            <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">筛选</van-button>
        </footer>
        </div>
     </van-popup>
 </div>
</template>

<script>
 import { getMenu,getSession} from '@/utils/util.js';
 export default {
   data () {
     return {
         filterList:[
             {
                 name:'产品',
                 cplist:{},
                 cpbh:''
             }
         ],
     }
   },
   props:{
       show:{
         type:Boolean,
         default:false
       }
   },
   methods:{
    //  选择筛选
   hanleChoosefilter(params,index){
       console.log(index,params);
       this.filterList[index].cpbh = params;
   },
   handleClose(){
       this.$emit('handleClose','')
   },
    // 获取枚举
   getDictEnum(){
    if(!getSession('cp')){
      getMenu('cp',true).then(data=>{
          this.filterList[0].cplist = data;
        });
      }else{
        this.filterList[0].cplist = getSession('cp');
      } 
    }
   },
   mounted(){
     //获取产品枚举     
     this.getDictEnum(); 
   },
   components: {}
 }
</script>

<style lang="less" scoped>
@import '../../index.less';
.filter-pop{
    background: #F2F3F5;
}
.assistant-filtercondition{
    height: 90vh;
    width: 90vw;
    background: #fff;
    h5{
        font-size: @fontSize14;
        border-bottom: 1.5px solid rgb(236, 235, 235);
        padding:0.2rem 0.3rem ;
        margin-bottom: 0.3rem;
    }
    .assistant-filtercondition-list{
        .van-tag{
            margin: 0.2rem ;
        }
    }
}
  footer{
      text-align: center;
      height: 10vh;
      button{
          width: 48%;
          border: none;
          margin: 5vw 0;
      }
  }
</style>
