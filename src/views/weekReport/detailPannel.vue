<template>
    <div class="weekReport_detail">
        <header>
          <weekSwitch :year="curYear" :monthY="curMonth" :month="$route.query.month" :week="$route.query.week" @handleChange="handleChange"></weekSwitch>
        </header>
        <main>
           <mu-container ref="container" class="demo-loadmore-content" v-if="dataList.length">
              <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
                <div class="weekReport_detail-centent">
                  <detailList :weekType="weekType" :dataList="dataList"></detailList>
                </div>
               </mu-load-more>
               <p v-if="finished && !!dataList.length" class="empty-content-tip">没有更多数据了</p>
           </mu-container>

           <div v-if="!dataList.length && !$store.state.loadingShow">
              <emptyContent></emptyContent>
           </div>
        </main>
        <footer>
            <!-- <mu-button  full-width color="success" class="btnBlue" @click="handleReview">批阅</mu-button> -->
            <!-- <van-button class="commitButton" type="default" @click="handleReview">批阅</van-button> -->
        </footer>
    </div>
</template>

<script>
import detailList from "../../components/weekReport/detailList.vue";
import emptyContent from "@/components/public/empty-content.vue";
import {
  getMyDate,
  getLastMonth,
  getLastMonthDay,
  getNextMonth,
  getPreMonth,
  weekIndexInMonth,
  GetNextDate,
  getWeeks
} from "../../utils/util.js";
import weekSwitch from '@/components/weekReport/switch';

export default {
  data() {
    return {
      isLoading:false,
      finished:false,
      loading:false,
      weekType: "lcb",
      weekActive:0,
      currentPage:1,
      pageSize:10,
      total:0,
      dataList:[],

      monthValue:'',
      weeksValue:'',

      curYear:0,
      month:0

    };
  },
  methods: {
    // 切换信息()
    handleChange(params){
      this.monthValue = params.monthValue
      this.weeksValue = params.weeksValue
      this.weekType = params.weekType
      this.init();
    },

    refresh () {
      // this.isLoading = true;
      // this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.init();
      }, 500)
    },
    // 异步更新数据
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        this.getPeopleWeekDetail();
      }, 800);
    },
    init(){
      this.currentPage = 1;
      this.dataList = [];
      this.$store.dispatch("chnageLoing", true);
      this.getPeopleWeekDetail();
    },
  
    // 批阅
    handleReview(){
      this.$router.push({path:'/weekreview'})
    },
    // 获取人员周报详情
    getPeopleWeekDetail(){
      this.$get(this.weekType=='lcb'?this.API.pageWeekWork:this.weekType=='jd'?this.API.pageWeeklyReport:this.API.pageWeekQuestion,{
        curPage:this.currentPage,
        pageSize:this.pageSize,
        qygc:'',
        month:this.monthValue,
        zxh:this.weeksValue,
        yhbh:this.$route.query.bh
      }).then(res=>{
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          this.total = res.data.total;
          if (this.isLoading || this.currentPage == 1) {
            this.dataList = res.data.rows;
          } else {
            this.dataList = this.dataList.concat(res.data.rows);
          }
          if(!res.data.rows){
            this.dataList = [];
          }
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          if (this.currentPage >= this.total) {
             this.finished = true;
          }else{
             this.finished = false;
          }
          this.currentPage += 1;
        } else {
          this.$store.dispatch("chnageLoing", false);
          this.$toast(res.msg);
        }
      })
    }
  },

  activated(){
    this.weeksValue = this.$route.query.week;
    this.monthValue = this.$route.query.month;
    this.curYear = Number(this.monthValue.split('-')[0]);
    this.curMonth = Number(this.monthValue.split('-')[1]);
    this.init();

  },
  components: { detailList,emptyContent,weekSwitch}
};
</script>

<style lang="less" scoped>
.weekReport_detail {
  .add_btn {
    text-align: center;
    margin: 0.5rem 0;
    button {
      width: 92%;
    }
  }
  // header {
  //   margin-bottom: 0.5rem;
  //   .tabs_card {
  //     margin-top: 0.5rem;
  //   }
  // }
  main {
    max-height: calc(100vh - 95px);
    overflow-y: auto;
    .weekReport_detail-centent{
      height: 100%;
      overflow-y: auto;
    }
  }
  footer{
      position: absolute;
      bottom:0.3rem;
      width: 100%;
      button{
          width: 100%;
          color: #fff;
      }
  }
}
</style>
