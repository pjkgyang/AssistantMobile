<template>
  <div class="demandlist">
      <div class="demand-card" v-for="(demand,index) in demandList" @click="handleCheckDetail(demand)">
        <div>
          <section class="demand-card_info">
            <h4>{{demand.bt}}</h4>
            <div class="card-info_detail">
                <div>
                  <van-tag  round  type="success">{{demand.dqlcmc}}</van-tag>
                </div>
                <p>需求编号：<span>{{demand.xqbh}}</span></p>
                <p>提出时间：<span>{{demand.tcsj}}</span></p>
                <p>提出人：<span>{{demand.tcrxm}}</span></p>  
                <p>提出老师：<span>{{demand.tcls}}</span>&#x3000;老师单位：<span>{{demand.lsdw}}</span></p>
                <p>产品：<span>{{demand.cpbjmc}}</span></p>
            </div>
          </section >
          <section class="demand-card_link">
              <van-icon name="arrow" />
          </section>
        </div>
        <aside :class="{'active-color-green':demand.xqfl!=2,'active-color-orange':demand.xqfl==2}">
          {{demand.xqfl==1?'需求':demand.xqfl==2?'BUG':'需求变更'}}
        </aside>
      </div>
  </div>
</template>

<script>
 export default {
   data () {
     return {
       
     }
   },
   methods:{
     handleCheckDetail(params){
       this.$emit('handleCheckDetail',params);
     },
     //  
     handleCloseOrReject(type,params){
       this.$emit('handleCloseOrReject',type,params);
     }
   },
   props:{
     demandList:{
       type:Array,
       default:()=>{
         return []
       }
     },
     isCloseShow:{
       type:Boolean,
       default:false
     }
   },
   components: {}
 }
</script>

<style lang="less" scoped>
@import '../../index.less';
.demand-card{
  background: #fff;
  position: relative;
  overflow: hidden;
  width: 96%;
  border-radius: 0.5rem;
  margin: 0.3rem auto;
  box-shadow: 0 0 10px  rgb(214, 213, 213);
  &::after{
    display: block;
    content: "";
    clear: both;
  }
  >div{
    padding: 0.5rem 0.85rem;
    .flex(@col:center);
  }
  aside{
    color: #fff;
    transform: rotate(45deg);
    width: 80px;
    height: 1.3rem;
    position: absolute;
    right: -21px;
    top:8px;
    text-align: center;
    font-size:@fontSize12;
    line-height: 1.3rem;
  }

  // link
  .demand-card_link{
    width:12%;
    text-align: center;
  }
  // 内荣
  .demand-card_info{
    width:88%;
    .card-info_detail{
      font-size: @fontSize12;
      color: #999999;
      span{
        color:#333;
      }
      >div{
        padding: 0.3rem 0;
      }
    }
  }
  .btn-reject-close{
    display: block;
    text-align: right;
    margin: 0.3rem 0;
  }
} 
</style>
