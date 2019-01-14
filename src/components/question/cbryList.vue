<template>
 <div class="question-remind-ry">
     <div>
         <searchInput :place="'搜索责任人姓名/编号'"  @handleSearchKeyword="handleSearchKeyword"></searchInput>
     </div>
     <div class="remind-rylist">
         <van-checkbox-group v-model="result">
            <van-checkbox  v-for="(item, index) in ryList" :key="index" :name="item">
                <div>
                    <p>{{item.nickname}}&#x3000;( {{item.userbh}} )</p>
                </div>
            </van-checkbox>
          </van-checkbox-group>
     </div>
     <footer>
          <van-button size="normal" type="default" @click="handleClose">取消</van-button>   
          <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
     </footer>
 </div>
</template>

<script>
 import searchInput from "@/components/public/SearchInput.vue";
 export default {
   data () {
     return {
       ryList:[
           {name:'张三',tel:'132123'},
           {name:'张三feng',tel:'1321321'},
           {name:'张三xia3',tel:'132'},
           {name:'张三xia2',tel:'131232'},
           {name:'张三xia1',tel:'13sad2'},
           {name:'张三xia5',tel:'1fsd32'},
           {name:'张三xia4',tel:'13aad2'},
           
       ],
       result:[],
       keyword:''
     }
   },
   props:{
       show:{
           type:Boolean,
           default:false
       },
       wid:{
           type:String,
           default:''
       }
   },
   mounted(){
       this.queryCbRy();
   },
   methods:{
       handleCommit(){
           this.$emit('handleChooseCbry',this.result);
       },
       handleSearchKeyword(val){
           this.keyword = val;
           this.queryCbRy();
       },
      // 返回
       handleClose(){
           this.result = [];
           this.$emit('handleClose','')
       },
       queryCbRy(){
          this.$get(this.API.queryCbRy,{
              wid:this.wid,
              keyword:this.keyword
          }).then(res=>{
              if(res.state == 'success'){
                this.ryList = res.data;
                this.ryList.forEach((ele, i, arr) => {
                    if (ele.username.slice(0, 1) == 1) {
                         ele.userbh = `${ele.username.slice(0, 3)}****${ele.username.slice(-4)}`;
                    } else {
                         ele.userbh = ele.username;
                    }
                });  
              }else{
                 this.$toast(!res.msg?'系统超时，请稍后再试~':res.msg);  
              }
          })
       }
   },
   watch:{
       show(n,o){
           if(!n){
             this.result = [];  
           }
       }
   },
   components: {searchInput}
 }
</script>

<style lang="less" scoped>
@import '../../index.less';
    .question-remind-ry{
        background: #F2F3F5;
       width: 100vw;
       height: 100vh;
       .van-checkbox{
           .flex(space-around);
           font-size: @fontSize14;
           padding: 0.5rem 0;
           border-bottom: 1px solid #F2F3F5;
           div{
               width: 70vw;
               .flex(space-around);
               p{
                   text-align: center;
               }
           }
       }
       .remind-rylist{
         background: #fff;
         margin-top: 0.3rem;
         height: calc(100vh - 110px);
         overflow-y: auto;
       }
    }
</style>

