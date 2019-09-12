<template>
  <div class="assistant_more">
    <div class="assistant_more_swipe">
      <van-swipe style="height:100%" :autoplay="3000">
        <van-swipe-item v-for="(img,index) in imgs" :key="index">
           <img :src="img.src" alt="">
        </van-swipe-item>
        <!-- <van-swipe-item><img src="static/img/question.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="static/img/process.png" alt=""></van-swipe-item> -->
      </van-swipe>
    </div>
    <div class="assistant_more_content">
      <moreCard v-for="(item,index) in moreList" :key="index" :title="moreList.title" >
        <section slot="content">
          <ul class="assistant_more_item">
            <li v-for="(option,index) in item.list" :key="index" @click="handleRouter(option.route)" >
              <!-- <div :style="{ backgroundImage:'url('+iconImg+')',backgroundSize:'600%',backgroundPosition:'-600px -15px'}"></div> -->
              <div :style="{background:option.bgColor}">
                <mu-icon size="30" :value="option.icon" :color="option.color" v-if="option.icon"></mu-icon>
                <span v-if="option.name=='周报'||option.name=='日报'">{{option.name=='周报'?'周':'日'}}</span>
              </div>
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
            {icon:'',name:'日报',route:'/tasklog',color:'#fff',bgColor:'#007AFF'},
            {icon:'',name:'周报',route:'/weekreport',color:'#fff',bgColor:'#007AFF'},
            {icon:'event_note',name:'需求交付',route:'/demand/index',color:'#fff',bgColor:'#007AFF'},
            ]
          }
        ],
        imgs:[
         {src:require("../../../static/img/progress.png")},
         {src:require("../../../static/img/question.png")},
         {src:require("../../../static/img/process.png")}
        ]
    };
  },
  computed:{
    
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
  height:24vh;
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
        width: 12vw;
        height: 12vw;
        border-radius:5px;
        text-align: center;
        .flex(@row:center,@col:center);
        font-weight: 700;
        color: #fff;
      }
      p{
        color: #1E2329;
        margin-top: 0.6rem;
        font-size: @fontSize14;
      }
    }  
  }
</style>
