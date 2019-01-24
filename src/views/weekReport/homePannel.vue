<template>
  <div class="assiant-weekReport">
    <div class="weekReport-top-filter">
      <div class="weekReport-filter--input">
        <searchInput @handleSearchKeyword="handleSearchKeyword" :place="'搜索姓名/项目编号/项目名称/填写人姓名'"></searchInput>
      </div>
      <div class="weekReport-filter--tabs">
        <span @click="hanldeSearchMonth" class="weekReport-filter-second">
          <span >{{monthValue}}</span>
        </span>
        <span @click="hanldeSearchZs" class="weekReport-filter-week">
          <span >第{{weekValue==1?'一':weekValue==2?'二':weekValue==3?'三':weekValue==4?'四':'五'}}周 
          <span class="week-date">{{WeekStartdate}} 至 {{WeekEnddate}}</span></span>
        </span>
        <span @click="hanldeSearchYDZT" class="weekReport-filter-second">
          <span>{{ydztText}}</span>
        </span>
      </div>
    </div>
    <!-- load more -->
    <div class="weekReport-center-content" ref="weekScrollcontent"  @scroll="handleScroll">
      <mu-container ref="container" class="demo-loadmore-content" >
        <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
          <div class="weekReport-center-filter">
            <listcard :Datalist="weekList" @handleSeeDetails="handleSeeDetails"></listcard>
          </div>
        </mu-load-more>
        <p v-if="finished && !!weekList.length" class="empty-content-tip">没有更多数据了</p>
      </mu-container>

      <!-- loading 加载完 -->
      <div v-if="!weekList.length && !$store.state.loadingShow">
        <emptyContent></emptyContent>
      </div>
    </div>
    <!-- 添加按钮 -->
    <!-- v-if="!$store.state.userInfo.userGroupTag.includes('JYGL')" -->
    <add-button @handleAdd="handleAddLog" v-if="!$store.state.userInfo.userGroupTag.includes('JYGL')"></add-button>

    <van-popup v-model="statePopshow" position='bottom' >
      <van-picker show-toolbar title="填写状态" :columns="ydztList" @cancel="hadnleStateCancel" @confirm="hadnleStateConfirm" />
    </van-popup>

    <van-popup v-model="zsPopshow" position='bottom'>
      <van-picker show-toolbar title="选择周数" :columns="columns" @cancel="hadnleZsCancel"  @confirm="hadnleZsConfirm" />
    </van-popup>

    <div class="datePop">
      <van-popup v-model="pickerMonthShow">
        <DatePickerMonth @handleChangeDatePicker="handleChooseMonth"></DatePickerMonth>
      </van-popup>
    </div>
  </div>
</template>
<script>
import listcard from "@/components/weekReport/listCard.vue";
import emptyContent from "@/components/public/empty-content.vue";
import DatePickerMonth from "@/components/public/DatePickerMonth.vue";
import { getMyDate,getLastMonth,getLastMonthDay,getNextMonth,getPreMonth,weekIndexInMonth,GetNextDate,getWeeks } from "../../utils/util.js";
import addButton from '@/components/public/addButton';
import searchInput from "@/components/public/SearchInput.vue";


export default {
  data() {
    return {
      pickerMonthShow: false,
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      total: 0,
      ydztList: ['全部','未填写','已填写'],
      statePopshow: false,
      zsPopshow: false,
      keyword: "",
      currentPage: 1,
      pageSize:16,
      ydztText: "状态",
      weekList: [
        {
          cjrxm: "张三",
          gcrq: "2018-10",
          zs: 2,
          cjsj: "2018-08-08 12:00:00",
          ydzt: 1,
          cjrbh:123
        },
        {
          cjrxm: "张四期",
          gcrq: "2018-10",
          zs: 2,
          cjsj: "2018-08-08 12:00:00",
          ydzt: 0,
          cjrbh:123
        },
        {
          cjrxm: "张五个倍",
          gcrq: "2018-10",
          zs: 2,
          cjsj: "2018-08-08 12:00:00",
          ydzt: 3,
          cjrbh:123
        }
      ],
      isRead: "",
      month:'',
      year:'',
      monthValue: "", //月份
      weekValue:"1",   //当前选择周
      WeekStartdate:'',
      WeekEnddate:'',
      weekStart:'',//第一周周一日期(记录)
      weekEnd:'',//第一周周日日期(记录)
      weekNum:'1',
      columns:[]
    };
  },
  methods: {
    // 选择周数
    hadnleZsConfirm(picker,values){
      this.weekValue = values+1
      this.WeekStartdate = GetNextDate(this.weekStart,values*7);//当前周周一日期
      this.WeekEnddate = GetNextDate(this.weekEnd,values*7);//当前周周日日期
      this.init();
      this.zsPopshow = false;
    },
    hadnleZsCancel(){
      this.zsPopshow = false;
    },
    hadnleStateCancel(){
      this.statePopshow = false;
    },
    // 阅读状态
    hadnleStateConfirm(picker, values){
      this.currentPage = 1;
      this.isRead = values-1<0?'':values-1;
      this.ydztText = picker;
      this.init();
      this.statePopshow = false;
    },
    // 添加日报
    handleAddLog(){
       this.$router.push({name:'weekAdd',query:{month:this.monthValue,week:this.weekValue},params:{bid:1}});
    },
    // 选择月
    hanldeSearchMonth() {
      this.pickerMonthShow = true;
    },
    handleChooseMonth(data) {
      this.pickerMonthShow = false;
      this.formatDate(data.getFullYear(),data.getMonth());
      this.init();
    },
    handleChangeJsrqPicker(data) {
      this.jsrqDate = getMyDate(data);
      this.pickerJsrqShow = false;
    },
    //阅读状态
    hanldeSearchYDZT() {
      this.zsPopshow = false;
      this.statePopshow = !this.statePopshow;
    },
    hanldeSearchZs() {
      this.zsPopshow = !this.zsPopshow;
      this.statePopshow = false;
    },
    //关键字筛选
    handleSearchKeyword(val) {
      this.keyword = val;
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
        this.getPageWeekPlanPerson();
      }, 800);
    },

    handleSeeDetails(data){
      this.$router.push({path:'/weekdetail',query:{month:this.monthValue,week:this.weekValue,bh:data.yhbh}});
    },
    // 上拉刷新初始化
    init() {
      this.currentPage = 1;
      this.weekList = [];
      this.$store.dispatch("chnageLoing", true);
      this.getPageWeekPlanPerson();
    },

    // 获取人员周报列表
    getPageWeekPlanPerson(){
      this.$get(this.API.pageWeekPlanPerson,{
        curPage:this.currentPage,
        pageSize:this.pageSize,
        month:this.monthValue,
        zxh:this.weekValue,
        qygc:'',
        zt:this.isRead,
        keyword:this.keyword
      }).then(res=>{
          if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          this.total = res.data.total;
          if (this.isLoading || this.currentPage == 1) {
            this.weekList = res.data.rows;
          } else {
            this.weekList = this.weekList.concat(res.data.rows);
          }
          if(!res.data.rows){
            this.weekList = [];
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
    },

    InitDate(){
      this.columns = [];
      this.year = new Date().getFullYear();
      this.month =  new Date().getMonth();
      this.monthValue = this.year+'-'+((this.month+1)<10?'0'+(this.month+1):this.month+1);
      this.WeekStartdate = this.weekStart =  getLastMonth(this.year,this.month);//获取当月开始第一周周一日期
      this.WeekEnddate = this.weekEnd = GetNextDate(this.WeekStartdate,6);//获取当月开始第一周周日日期
      this.weekNum = getWeeks(this.year,this.month+1);  //获取当月周数
      for(var i =1;i<=this.weekNum;i++){
        let index = i==1?'一':i==2?'二':i==3?'三':i==4?'四':'五';
        this.columns.push('第'+index+'周');
      }
    },
    
    formatDate(year,month){
       this.columns = [];
       this.weekValue = '1';
       this.monthValue = year + '-' + ((month+1)<10?'0'+(month+1):month+1)
       this.weekStart = this.WeekStartdate =  getLastMonth(year,month);//获取当月开始第一周周一日期
       this.weekEnd = this.WeekEnddate = GetNextDate(this.WeekStartdate,6);//获取当月开始第一周周日日期
       this.weekNum = getWeeks(year,month+1);  //获取当月周数
       for(var i =1;i<=this.weekNum;i++){
           let index = i==1?'一':i==2?'二':i==3?'三':i==4?'四':'五';
           this.columns.push('第'+index+'周');
       }
    },
    handleScroll(){
      var scrollTop = this.$refs.weekScrollcontent.scrollTop
    }
    // saveStore(){
    //   this.$store.dispatch("saveMonthValue", this.monthValue);
    //   this.$store.dispatch("saveWeekNum", this.weekNum);
    //   this.$store.dispatch("saveStartDate", this.weekStart);
    //   this.$store.dispatch("saveEndDate", this.weekEnd);
    // }
  },
  computed: {
   
  },
  mounted() {
    // this.$nextTick(() => {
      // document.getElementById('weekReportContent').scrollTop = 30
    // })
    this.InitDate();
    this.init();
  },

  activated() {},
  watch: {},
  components: {
    listcard,
    emptyContent,
    DatePickerMonth,
    addButton,
    searchInput
  }
};
</script>

<style lang="less">
@import "../../index.less";
.weekReport-top-filter {
  background: #fff;
  box-shadow: 0 2px 5px #eee;
  position: relative;
}
.weekReport-filter--input {
  padding: 0.5rem;
}
.weekReport-filter--tabs {
  padding: 8px 0;
 .flex(space-between,center);
  color: #999999;
  border-bottom: 1px solid  #D7D7D8;
  border-top: 1px solid  #D7D7D8;
  .weekReport-filter-week {
    width: 64%;
    border-left: 1.5px solid #D7D7D8;
    border-right: 1.5px solid #D7D7D8;
    .week-date{
      font-size: @fontSize12;
    }
  }
  .weekReport-filter-second {
    width: 16%;
  }
}
.weekReport-filter--tabs {
  > span {
    display: inline-block;
    text-align: center;
    font-size: @fontSize12;
    display: @flex;
    align-items: center;
    justify-content: center;
  }
}
.weekReport-center-filter {
  height: 100%;
  overflow-y: auto;
}
.weekReport-center-addtasklog {
  position: fixed;
  bottom: 14vw;
  right: 2vw;
}
.text-active {
  color: @text-color;
}
//  pop
.pop {
  margin-top: 93px;
  z-index: 200;
  background: #fff !important;
}

.weekReport-state-pop ul li {
  padding: 8px 0;
  border-bottom: 1px solid #efefef;
  color: #000;
  text-align: center;
}
.weekReport-center-content {
  height: calc(100vh - 100px);
  overflow-y: auto;
  margin-top: 5px;
}

</style>