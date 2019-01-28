<template>
    <div>
        <div class="weekReport_switch">
            <van-tabs v-model="weekActive" @change="handleChangeWeek">
                <van-tab title="本周工作总结"></van-tab>
                <van-tab title="下周工作计划"></van-tab>
            </van-tabs>
            <van-tabs @change="handleChange" type="card" class="tabs_card">
                <van-tab title="里程碑工作"></van-tab>
                <van-tab title="进度任务"></van-tab>
                <van-tab title="问题处理"></van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
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


export default {
  data() {
    return {
      weekType: "lcb",
      weekActive:0,
      monthValue:'',
      weeksValue:'',
      weeksNum:'',

    };
  },
  props:{
      year:{
        type:Number,
        default:0 
      },
      monthV:{
        type:Number,
        default:0 
      },
      month:{
          type:String,
          default:''
      },
      week:{
          type:Number,
          default:0
      },
  },
  methods:{
      // 切换类型
    handleChange(index, title) {
      this.weekType = index == 0 ? "lcb" : index == 1 ? "jd" : "wt";
      this.$emit('handleChange',{monthValue:this.monthValue,weeksValue:this.weeksValue,weekType:this.weekType,weekActive:this.weekActive})
    },
    // 切换周数
    handleChangeWeek() {
      if (this.weekActive == 1) {
        if (this.week >= this.weeksNum) {
          this.monthValue = getNextMonth(this.month);
          this.weeksValue = 1;
        } else {
          this.monthValue = this.$route.query.month;
          this.weeksValue = JSON.parse(this.$route.query.week) + 1;
        }
      } else {
        this.monthValue = this.month;
        this.weeksValue = this.week;
      }
      this.$emit('handleChange',{monthValue:this.monthValue,weeksValue:this.weeksValue,weekType:this.weekType,weekActive:this.weekActive})
    },

     // 获取本月最后一天
    // getLastMonthDay(year, month) {
    //   this.weeksNum = getWeeks(year, month);
    //   // this.lastMonthDay = GetNextDate(
    //   //   GetNextDate(getLastMonth(year, month - 1), 6),
    //   //   (this.weeksNum - 1) * 7
    //   // );
    // },
  },
  activated(){
     this.monthValue = this.month;
     this.weeksValue = this.week;
     this.weeksNum = getWeeks(this.year,this.monthV);
  },
  components: {}
};
</script>

<style lang="less" scoped>
.weekReport_switch {
     margin-bottom: 0.5rem;
    .tabs_card {
      margin-top: 0.5rem;
    }
    button{
          width: 100%;
          color: #fff;
    }
}
</style>
