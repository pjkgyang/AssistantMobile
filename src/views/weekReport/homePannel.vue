<template>
  <div class="assiant-weekReport">
    <div class="weekReport-top-filter">
      <div class="weekReport-filter--input">
        <van-search v-model="keyword" :background="'#fff'" placeholder="搜索姓名/项目编号/项目名称/填写人姓名" @search="handleSearchKeyword" />
      </div>
      <div class="weekReport-filter--tabs">
        <span @click="hanldeSearchMonth" class="weekReport-filter-second">
          <span :class="{'text-active':true}">{{monthValue}}</span>&nbsp;
        </span>
        丨
        <span @click="hanldeSearchZs" class="weekReport-filter-week">
          <span :class="{'text-active':true}">第{{weekValue==1?'一':weekValue==2?'二':weekValue==3?'三':weekValue==4?'四':'五'}}周 {{WeekStartdate}} 至 {{WeekEnddate}}</span>&nbsp;
        </span>
        丨
        <span @click="hanldeSearchYDZT" class="weekReport-filter-second">
          <span :class="{'text-active':ydztText!='阅读状态'}">{{ydztText}}</span>&nbsp;
          <!-- <span>{{statePopshow?'▼':'▲'}}</span> -->
        </span>
      </div>
    </div>
    <!-- load more -->
    <div class="weekReport-center-content">
      <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <!-- <van-list v-model="loading" :finished="finished" @load="onLoad"> -->
          <div class="weekReport-center-filter">
            <listcard :Datalist="weekList" @handleSeeDetails="handleSeeDetails"></listcard>
          </div>
        <!-- </van-list> -->
      <!-- </van-pull-refresh> -->

      <div v-if="!weekList.length">
        <emptyContent></emptyContent>
      </div>
    </div>
    <div class="weekReport-center-addtasklog">
      <mu-button fab  color="primary" class="btnBlue" @click="handleAddLog">
         <mu-icon value="add"></mu-icon>
      </mu-button>
    </div>
   
    <van-popup v-model="statePopshow" position='bottom' >
      <!-- <div class="weekReport-state-pop">
        <ul>
          <li v-for="(ydzt,i) in ydztList" :key="i" @click="handeChooseYdzt(ydzt.value,ydzt.label)">{{ydzt.label}}</li>
        </ul>
      </div> -->
      <van-picker show-toolbar title="阅读状态" :columns="ydztList" @cancel="hadnleStateCancel" @confirm="hadnleStateConfirm" />
    </van-popup>

    <van-popup v-model="zsPopshow" position='bottom'>
      <!-- <div class="weekReport-state-pop">
        <ul>
          <li v-for="(zs,i) in weekNum" :key="i" @click="handeChooseZs(zs)">第 {{zs==1?'一':zs==2?'二':zs==3?'三':zs==4?'四':'五'}} 周</li>
        </ul>
      </div> -->
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

export default {
  data() {
    return {
      pickerMonthShow: false,
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      total: 0,
      ydztList: ['全部','未阅','已阅'],
      statePopshow: false,
      zsPopshow: false,
      keyword: "",
      curPage: 1,
      ydztText: "阅读状态",
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
          cjrxm: "张四",
          gcrq: "2018-10",
          zs: 2,
          cjsj: "2018-08-08 12:00:00",
          ydzt: 0,
          cjrbh:123
        },
        {
          cjrxm: "张五",
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
    hadnleZsConfirm(picker,values){
      this.weekValue = values+1
      this.WeekStartdate = GetNextDate(this.weekStart,values*7);//当前周周一日期
      this.WeekEnddate = GetNextDate(this.weekEnd,values*7);//当前周周日日期
      this.zsPopshow = false;
      this.saveStore();
      
    },
    hadnleZsCancel(){
      this.zsPopshow = false;
    },
    hadnleStateCancel(){
      this.statePopshow = false;
    },
    hadnleStateConfirm(picker, values){
      this.curPage = 1;
      this.isRead = values-1<0?'':values-1;
      this.ydztText = picker;
      this.statePopshow = false;
    },
    handleAddLog(){
       this.$router.push({path:'/weekadd',query:{month:this.monthValue,week:this.weekValue}});
    },
    // 选择月
    hanldeSearchMonth() {
      this.pickerMonthShow = true;
    },
    handleChooseMonth(data) {
      this.pickerMonthShow = false;
      this.formatDate(data.getFullYear(),data.getMonth());
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
    // // 查看阅读状态
    // handeChooseYdzt(value, label) {
    //   this.curPage = 1;
    //   this.isRead = value;
    //   this.ydztText = label;
    //   this.statePopshow = false;
    // },
    // // 选择周数
    // handeChooseZs(data) {
    //   this.weekValue = data
    //   this.WeekStartdate = GetNextDate(this.weekStart,(data-1)*7);//当前周周一日期
    //   this.WeekEnddate = GetNextDate(this.weekEnd,(data-1)*7);//当前周周日日期
    //   this.zsPopshow = false;
    //   this.saveStore();
    // },
    //关键字筛选
    handleSearchKeyword(val) {
      this.curPage = 1;
      this.keyword = val;
    },
    // 上啦刷新
    // onRefresh() {
    //   setTimeout(() => {
    //     // this.init();
    //   }, 800);
    // },
    // onLoad() {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     // this.queryTaskProcess(this.startDate, this.endDate);
    //   }, 800);
    // },
    handleSeeDetails(data){
      // escape(JSON.stringify(data))}
      this.$router.push({path:'/weekdetail',query:{month:this.monthValue,week:this.weekValue,bh:data.cjrbh}});
    },
    // 上拉刷新初始化
    init() {
      this.curPage = 1;
    },
    InitDate(){
      this.columns = [];
      this.year = new Date().getFullYear();
      this.month =  new Date().getMonth();
      this.monthValue = this.year+'-'+((this.month+1)<10?'0'+this.month+1:this.month+1);
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
    saveStore(){
      this.$store.dispatch("saveMonthValue", this.monthValue);
      this.$store.dispatch("saveWeekNum", this.weekNum);
      this.$store.dispatch("saveStartDate", this.weekStart);
      this.$store.dispatch("saveEndDate", this.weekEnd);
    }
  },
  computed: {
   
  },
  mounted() {
    this.InitDate();
  },

  activated() {},
  watch: {},
  components: {
    listcard,
    emptyContent,
    DatePickerMonth
  }
};
</script>

<style lang="less">
@import "../../index.less";
.weekReport-top-filter {
  background: #fff;
  box-shadow: 0 2px 5px #eee;
  position: relative;
  // z-index: 2222;
}
.weekReport-filter--input {
  padding: 0.5rem;
}
.weekReport-filter--tabs {
  padding: 8px 0;
  display: @flex;
  .weekReport-filter-week {
    width: 60%;
  }
  .weekReport-filter-second {
    width: 20%;
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
  big {
    color: #909090;
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
  height: calc(100vh - 13vh);
  overflow-y: auto;
  margin-top: 5px;
}

</style>