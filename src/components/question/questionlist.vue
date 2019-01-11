<template>
  <div class="questionlist">
      <div class="question-card" v-for="(question,index) in questionList" @click="handleCheckDetail(question)">
        <div>
          <section class="question-card_info">
            <h4>{{question.bt}}</h4>
            <div class="card-info_detail">
                <div>
                  <van-tag  round  type="success">{{question.lcMc}}</van-tag>
                  <!-- v-if="question.sqgbCount > 0 && question.fbzt != 1" -->
                  <van-tag v-if="question.sqgbCount > 0 && question.fbzt != 1" round  color="#F0871E">已申请关闭</van-tag>
                  <!-- v-if="question.tjkfs > 0" -->
                  <van-tag v-if="question.tjkfs > 0" round  color="#7232dd">已提交开发</van-tag>
                </div>
                <p>问题编号：<span>{{question.wtbh}}</span></p>
                <p>提问时间：<span>{{question.fbrq}}</span></p>
                <p>发布人：<span>{{question.fbrxm}}</span></p>  
                <p>单位：<span>{{question.ssbm}}</span></p>
                <p>产品：<span>{{question.cpmc}}</span></p>
            </div>
          </section >
          <section class="question-card_link">
              <van-icon name="arrow" />
          </section>
        </div>
        <!-- 类型申请关闭，处理中 && question.sqgbCount > 0  && question.fbzt != 1-->
        <div v-if="isCloseShow" class="btn-reject-close">
          <van-button size="small" type="warning" @click.stop="handleCloseOrReject('reject',question)">驳回</van-button>
          <van-button size="small" type="danger"  @click.stop="handleCloseOrReject('close',question)">关闭</van-button>
        </div>
        <hr>
        <aside :class="{'active-color-orange':question.fbzt==0,'active-color-green':question.fbzt==1}">
          {{question.fbzt==0?'处理中':'已关闭'}}
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
     questionList:{
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

.question-card{
  background: #fff;
  position: relative;
  overflow: hidden;
  &::after{
    display: block;
    content: "";
    clear: both;
  }
  >div{
    padding: 0 0.85rem;
    .flex(@col:center);
  }
  hr{
    border: none;
    border-top: 2px solid #E8E8E8;
    width: 98%;
    float: right;
    margin-bottom: 0;
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
  .question-card_link{
    width:12%;
    text-align: center;
  }
  // 内荣
  .question-card_info{
    width:88%;
    h4{
      margin: 0.3rem 0 0 0 ;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      // overflow: hidden;
    }
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
