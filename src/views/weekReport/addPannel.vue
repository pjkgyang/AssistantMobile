<template>
  <div class="weekReport_add">
    <header>
       <div class="weekReport_switch">
            <van-tabs v-model="weekActive" @change="handleChangeWeek">
                <van-tab title="本周工作总结"></van-tab>
                <van-tab title="下周工作计划"></van-tab>
            </van-tabs>
            <van-tabs @click="handleChange" type="card" class="tabs_card">
                <van-tab title="里程碑工作"></van-tab>
                <van-tab title="进度任务"></van-tab>
                <van-tab title="问题处理"></van-tab>
            </van-tabs>
        </div>
      <!-- <weekSwitch :month="monthValue" :year="curYear" :monthV="curMonth" :week="weeksValue" @handleChange="handleChange"></weekSwitch> -->
    </header>
    <main>
        <mu-container ref="container" class="demo-loadmore-content" v-if="dataList.length">
         <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">       
            <weekList :dataList="dataList" :weekType="weekType" :weekState="weekActive" :isBlock="isBlock" :isNextBlock="isNextBlock" 
             @handleFillin="handleFillin" @handleDelete="handleDelete"></weekList>
          </mu-load-more>
          <p v-if="finished && !!dataList.length" class="empty-content-tip">没有更多数据了</p>
        </mu-container>
  
      <div v-if="!dataList.length && !$store.state.loadingShow">
        <empty-content></empty-content>
      </div>
    </main>

    <!-- 添加按钮 -->
    <add-button v-if="weekType == 'jd'||weekType == 'wt'||(weekType == 'lcb'&& weekActive == 1)"
     @handleAdd="handleAdd(weekType)"></add-button>

    <van-popup v-model="yycsShow" position="bottom" @click-overlay="handleClosepop">
      <div class="fill_pop">
        <form action="">
          <div v-if="weekActive == 0">
            <van-cell-group>
              <van-field required maxlength="500" v-model="form.wwcyy" label="未完成原因" type="textarea" placeholder="请输入未完成原因(500字以内)" rows="5" autosize />
            </van-cell-group>
            <van-cell-group>
              <van-field required maxlength="500" v-model="form.hxcs" label="后续措施" type="textarea" placeholder="请输入后续措施(500字以内)" rows="5" autosize />
            </van-cell-group>
          </div>
          <van-cell-group v-if="weekType == 'lcb' && weekActive == 1">
            <van-field required maxlength="500" v-model="form.gznr" label="工作内容" type="textarea" placeholder="请输入工作内容(500字以内)" rows="5" autosize />
          </van-cell-group>
          <van-cell-group v-if="weekType == 'wt' && weekActive == 1">
            <van-field required maxlength="500" v-model="form.cljh" label="处理计划" type="textarea" placeholder="请输入处理计划(500字以内)" rows="5" autosize />
          </van-cell-group>
        </form>
        <div class="footer_bar">
          <van-button type="default" @click="handleClosepop">取消</van-button>
          <van-button type="primary" class="commitButton" @click="handleSave">保存</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import weekList from "../../components/weekReport/weekList.vue";
import emptyContent from "../../components/public/empty-content.vue";
// import { mapGetters } from "vuex";
import weekSwitch from '@/components/weekReport/switch';
import addButton from '@/components/public/addButton';
import {
  getNextMonth,
  getLastMonthDay,
  getWeeks,
  GetNextDate,
  getLastMonth
} from "../../utils/util.js";

export default {
  data() {
    return {
      uid: "", //用户编号
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      dataLoading: false,
      currentPage: 1,
      pageSize: 10,
      dataList: [],
      // maxHeight: window.innerHeight - 100 + "px",
      yycsShow: false,
      weekType: "lcb",
      weekActive: 0,
      form: {
        wwcyy: "",
        hxcs: "",
        gznr: "",
        cljh: ""
      },
      weeksValue: "",  //周数
      monthValue: "",  //月数
      lastMonthDay:'',  //本月最后一天

      newWeek:'',   //记录周
      newMonth:'',  //记录月
      dataObj:{},

      isBlock:false, //是否封存
      isNextBlock:'',  //是否下周封存
      isNext:0,

      weeksNum:0,
      curYear:'',
      curMonth:''
    };
  },
  methods: {
      handleChangeWeek(){
        if (this.weekActive == 1) {
          if (this.$route.query.week == this.weeksNum) {
            this.monthValue = this.newMonth =  getNextMonth(this.$route.query.month);
            this.weeksValue = this.newWeek = 1;
          } else {
            this.monthValue = this.newMonth =this.$route.query.month;
            this.weeksValue = this.newWeek = Number(this.$route.query.week) + 1;
          }
        } else {
          this.monthValue = this.$route.query.month;
          this.weeksValue = this.$route.query.week;
        } 
        this.init();
        if(!this.isNext && !!this.weekActive){
          this.isWeekPlanBlocked(this.monthValue,this.weeksValue,true);
        }
      },
      // 类型切换
      handleChange(index,title){
         this.weekType = index == 0 ? "lcb" : index == 1 ? "jd" : "wt";
         this.init();
         if(!this.isNext && !!this.weekActive){
            this.isWeekPlanBlocked(this.monthValue,this.weeksValue,true);
         }
      },
         // 获取本月最后一天
    getLastMonthDay(year, month) {
      this.weeksNum = getWeeks(year, month);
      this.lastMonthDay = GetNextDate(
        GetNextDate(getLastMonth(year, month - 1), 6),
        (this.weeksNum - 1) * 7
      );
    },

    // 上啦刷新
    refresh() {
      // this.isLoading = true;
      // this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.init();
      }, 500);
    },

    // 异步更新数据
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        this.getWeekData();
      }, 800);
    },

    // 添加任务进度，问题
    handleAdd(data) {
      let obj = {
          weekActive: this.weekActive,
          week: this.weeksValue,
          month: this.monthValue,
          sign:Math.ceil(Math.random()*100)
       };
      if(data != "jd") delete obj.weekActive;
      if(data != 'lcb') delete obj.sign;

      this.$router.push({
        path:data == "jd"? "/addweekprocess": data == "wt" ? "/addweekquestion" : "/addweekmilestone",
        query:obj
      });
    },
    // 填写未完成原因，后续措施  
    handleFillin(params, type) {
      this.dataObj = params
      if(type != 'jd'){
        this.yycsShow = true;
      }else{
        params.weekActive = this.weekActive;
        this.$router.push({
        name:"Addweekprocess",
        query:{weekActive:this.weekActive},
        params: params
      });
      }
    },
    
    // 删除进度任务
    handleDelete(params,type,index){
      let obj = {};
      switch(type){
       case 'lcb':
         obj.zgzWid = params.zgzWid
        break;
       case 'jd':
         obj.wid = params.wid
        break;
       case 'wt':
         obj.zwtWid = params.zwtWid
        break;
    }
      this.$dialog.confirm({
       title: '提示',
       message: type == 'jd'?'是否确定删除此任务进度?':type=='lcb'?'是否确定删除此里程碑?':'是否确定删除此问题?'
       }).then(() => {
         this.$post(type=='jd'?this.API.deleteWeeklyReport:type=='lcb'?this.API.deleteWeekWork:this.API.deleteWeekQuestion,
         obj).then(res=>{
            if(res.state == 'success'){
              this.dataList.splice(index,1);
              this.$toast({message:'删除成功~',duration:2000});
            }else{
              this.$toast(res.msg); 
            }
         })
       }).catch(() => {

       });
    },
    handleClosepop() {
      this.yycsShow = !this.yycsShow;
      this.form.wwcyy = this.form.hxcs = this.form.gznr = this.form.cljh = "";
    },
    // 保存 未完成原因，后续措施
    handleSave() {
      if (!this.validate()) return;
        // 里程碑
        if (this.weekType == "lcb") {
            this.$post(!this.weekActive?this.API.batchUpdateWeekWorkAll:this.API.batchUpdateWeekWorkGznr, {
              zgzwids:this.dataObj.zgzWid,
              wwcyy: !this.weekActive?this.form.wwcyy:"",
              hxcs: !this.weekActive?this.form.hxcs:"",
              gznr:!this.weekActive?'':this.form.gznr
            }).then(res => {
              if (res.state == "success") {
                  this.init();
                  this.yycsShow = !this.yycsShow 
                  this.$toast({message:'保存成功~',duration:2000});
              }else{
                  this.$toast(res.msg);  
              }
            });
        } else if(this.weekType == "wt"){
            let obj = {
                yhbh: this.uid,
                month: this.monthValue,
                zxh: this.weeksValue,
                wwcyy: !this.weekActive?this.form.wwcyy:"",
                hxcs: !this.weekActive?this.form.hxcs:"",
                cljh: this.form.cljh
            }
            if (!this.weekActive) {
              obj.zwtwids = this.dataObj.zwtWid
            }else{
              obj.wtwids = this.dataObj.wtwid;
            }
          this.$post(!this.weekActive?this.API.batchUpdateWeekQuestionAll:this.API.batchUpdateWeekQuestionCljh, obj).then(res => {
            if (res.state == "success") {
              if (res.state == "success") {
                this.$toast('保存成功~');
                this.init();
                this.yycsShow = !this.yycsShow 
             }else{
                this.$toast(res.msg);  
             }
            }
          });
        }
    },
    validate() {
      if (/^[\s]*$/.test(this.form.wwcyy) && this.weekActive == 0 ) {
        this.$toast("请填写未完成原因~");
        return false;
      }
      if (/^[\s]*$/.test(this.form.hxcs) && this.weekActive == 0) {
        this.$toast("请填写后续措施~");
        return false;
      }
      if (/^[\s]*$/.test(this.form.gznr) && this.weekType == "lcb" && this.weekActive == 1) {
        this.$toast("请填写工作内容~");
        return false;
      }
      if (/^[\s]*$/.test(this.form.cljh) && this.weekType == "wt" && this.weekActive == 1) {
        this.$toast("请填写处理计划~");
        return false;
      }
      return true;
    },
    

    init() {
      this.currentPage = 1;
      this.dataList = [];
      this.$store.dispatch("chnageLoing", true);
      this.getWeekData();
    },
    // 获取周报数据
    getWeekData() {
      this.$get(
        this.weekType == "lcb"
          ? this.API.pageWeekWork
          : this.weekType == "jd"
            ? this.API.pageWeeklyReport
            : this.API.pageWeekQuestion,
        {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          month: this.monthValue,
          zxh: this.weeksValue,
          yhbh: this.uid
        }).then(res => {
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          if (this.currentPage == 1) {
            this.dataList = res.data.rows;
          } else {
            this.dataList = this.dataList.concat(res.data.rows);
          }
          if(!res.data.rows){
            this.dataList = [];
          }
          this.loading = false;
          this.isLoading = false;
          if (this.currentPage >= res.data.total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
          this.currentPage += 1;
        } else {
          this.$store.dispatch("chnageLoing", false);
          this.$toast(res.msg);
        }
      }).catch(error=>{
          this.$store.dispatch("chnageLoing", false);
          this.$toast('系统繁忙，请稍后再试~');
      });
    },
    // 是否封存
    isWeekPlanBlocked(month,zxh,isNext){
     this.$get(this.API.isWeekPlanBlocked,{
       month:month,
       zxh:zxh
     }).then(res=>{
       if(res.state == 'success'){
          if(isNext){
            this.isNextBlock = res.data.bolck;
            this.isNext = 1;
          }else{
            this.isBlock = res.data.bolck;
          }
       }else{
         this.$toast(res.msg); 
       }
     })
    },
  },
  computed: {},
  watch: {
    yycsShow(n,o){
      if(!n){
        this.form.wwcyy = this.form.hxcs = this.form.gznr = this.form.cljh = '';
      }
    }
  },
  mounted() {

  },
  activated() {
    this.uid = this.$store.state.userInfo.uid;
    this.monthValue = this.newMonth?this.newMonth:this.$route.query.month;
    this.weeksValue = this.newWeek?this.newWeek:this.$route.query.week;
    this.curYear = Number(this.monthValue.split('-')[0]);
    this.curMonth = Number(this.monthValue.split('-')[1]);
    this.getLastMonthDay( this.curYear,this.curMonth);
    this.init();
    // if(!!this.$route.params.bid){
      this.isWeekPlanBlocked(this.monthValue,this.weeksValue,false);
    // }
  },
  components: { weekList, emptyContent,weekSwitch ,addButton}
};
</script>

<style lang="less" scoped>
.weekReport_add {
  main {
    height: calc(100vh - 95px);
    overflow-y: auto;
  }
}
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
.fill_pop {
  height: 80vh;
  form {
    max-height: 65vh;
    overflow-y: auto;
  }
  .footer_bar {
    width: 100%;
    text-align: center;
    button {
      width: 48vw;
    }
    .commitButton {
      border: none;
    }
    position: absolute;
    bottom: 10px;
  }
}
</style>
