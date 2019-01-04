<template>
  <div class="questionlist">
      <div class="question-card" v-for="item in 3">
        <div>
        <section class="question-card_icon">
            <van-icon name="question" size="1.8em"/>
        </section>
        <section class="question-card_info">
           <h4>消息中心配置前置代理时发现</h4>
           <div class="card-info_detail">
              <p>问题编号：jz181100997</p>
              <p>提问时间：2018.04.08 12:00:00</p>
              <p>发布人：李俊 </p>  
              <p>单位：宁波大学</p>
              <p>产品：OA-Domino版</p>
              <div>
                <van-tag round color="#F0871E">已申请关闭</van-tag>
              </div>
           </div>
        </section >
        <section class="question-card_link">
            <van-icon name="arrow" />
        </section>
        </div>
        <hr>
      </div>
  </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {}
 }
</script>

<style lang="less" scoped>
@import '../../index.less';
.questionlist{
  padding: 0.5rem 0;
  height: calc(100vh - 150px);
}
.question-card{
  background: #fff;
  &::after{
    display: block;
    content: "";
    clear: both;
  }
  >div{
  .flex(@col:center);
  }
  hr{
    border: none;
    border-top: 2px solid #E8E8E8;
    width: 85%;
    float: right;
    margin-bottom: 0;
  }
  // 问题icon
  .question-card_icon{
    width:17%;
    text-align: center;
    .van-icon{
      color: #f00;
    }
  }
  // link
  .question-card_link{
    width:12%;
    text-align: center;
  }
  // 内荣
  .question-card_info{
    width:71%;
    h4{
      margin: 0.5rem 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .card-info_detail{
      font-size: @fontSize12;
      color: #999999;
      >div{
        text-align: right;
      }
    }
  }
} 
</style>
