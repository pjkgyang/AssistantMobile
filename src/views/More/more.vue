<template>
  <div class="assistant_more">
    <div class="assistant_more_swipe">
      <van-swipe style="height:100%" :autoplay="3000">
        <van-swipe-item><img src="static/img/swipe1.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="static/img/swipe2.png" alt=""></van-swipe-item>
      </van-swipe>
    </div>
    <div class="assistant_more_content">
      <moreCard v-for="(item,index) in moreList" :key="index" :title="moreList.title" >
        <section slot="content">
          <ul class="assistant_more_item">
            <li v-for="(option,index) in item.list" :key="index" @click="handleRouter(option.route)">
              <!-- <div :style="{ backgroundImage:'url('+iconImg+')',backgroundSize:'600%',backgroundPosition:'-600px -15px'}"></div> -->
              <div><mu-icon size="30" :value="option.icon" :color="option.color"></mu-icon></div>
              <p>{{option.name}}</p>
            </li>
          </ul>
        </section>
      </moreCard>
    </div>
  </div>
</template>

<script>
  import moreCard from '@/components/public/MoreCard.vue';
  export default {
  data() {
    return {
        moreList:[
          {title:'工作汇报',list:[
            {icon:'today',name:'日报',route:'/tasklog',color:'indigo',bgcolor:'rgba(242, 159, 23,0.8)'},
            {icon:'event_note',name:'周报',route:'/weekreport',color:'blue',bgcolor:'rgba(82, 192, 214,0.8)'}
            ]
          }
        ]
    };
  },
  methods:{
    handleRouter(params){
      this.$router.push({path:params})
    }
  },
  components: {moreCard}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.assistant_more_swipe {
  height: 15vh;
  .van-swipe-item {
    background: #ccc;
    height: 100%;
    img{
      height: 100%;
      width: 100%;
    }
  }
}
.assistant_more_content{
  max-height: calc(85vh - 65px);
  overflow-y: auto;
  margin-top:10px;
}
 .assistant_more_item{
    .flex();
    flex-wrap: wrap;
    li{
      width: 25%;
      .flex(@column:column,@row:center,@col:center);
      padding: 2px;
      margin:5px 0;
      div{
        width: 11vw;
        height: 11vw;
        border-radius:50%;
        text-align: center;
        .flex(@row:center,@col:center);
      }
      p{
        color: #333;
        font-size: @fontSize12;
      }
    }  
  }
</style>
