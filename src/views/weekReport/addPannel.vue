<template>
  <div class="weekReport_add">
    <header>
      <weekSwitch :month="$route.query.month" :week="$route.query.week" @handleChange="handleChange"></weekSwitch>
    </header>
    <!-- <section v-if="weekType == 'jd'||weekType == 'wt'||(weekType == 'lcb'&& weekActive == 1)" class="add_btn">
      <mu-button  small color="primary" class="btnBlue" @click="handleAdd(weekType)">新增</mu-button>
    </section> -->
    <main :style="{'height':maxHeight}">
        <mu-container ref="container" class="demo-loadmore-content" v-if="dataList.length">
         <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">       
            <weekList :dataList="dataList" :weekType="weekType" :weekState="weekActive" @handleFillin="handleFillin"></weekList>
          </mu-load-more>
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
import addButton from '@/components/public/addButton'
import {
  getLastMonth,
  GetNextDate,
  getWeeks
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
      maxHeight: window.innerHeight - 105 + "px",
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
      
      dataObj:{}
    };
  },
  methods: {
    // 上啦刷新
    refresh() {
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.init();
      }, 1500);
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
      this.$router.push({
        path:data == "jd"? "/addweekprocess": data == "wt" ? "/addweekquestion" : "/addweekmilestone",
        query: {
          data: this.weekActive,
          week: this.weeksValue,
          month: this.monthValue,
          lastDay: this.lastMonthDay
        }
      });
    },
    // tab
    handleChange(params){
      this.monthValue = params.monthValue
      this.weeksValue = params.weeksValue  
      this.weekType = params.weekType      //类型tab
      this.weekActive = params.weekActive  //本周，下周tab
      if(params.weekType != 'lcb' && !params.weekActive){
        this.maxHeight = window.innerHeight - 135 + "px"
      }else{
        this.maxHeight = window.innerHeight - 105 + "px"
      }
      this.init();
    },
    // 填写未完成原因，后续措施  
    handleFillin(params, type) {
      this.dataObj = params
      if(type != 'jd'){
        this.yycsShow = true;
      }else{
        params.weekActive = this.weekActive
        this.$router.push({
        name:"Addweekprocess",
        params: params
      });
      }
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
                  this.$toast.success({message:'保存成功',duration:1500});
              }else{
                  this.$toast(res.msg);  
              }
            });
        } else if(this.weekType == "wt"){
          this.$post(!this.weekActive?this.API.batchUpdateWeekQuestionAll:batchUpdateWeekQuestionCljh, {
            zwtwids:this.dataObj.zwtWid,
            yhbh: this.uid,
            month: this.monthValue,
            zxh: this.weeksValue,
            wwcyy: !this.weekActive?this.form.wwcyy:"",
            hxcs: !this.weekActive?this.form.hxcs:"",
            cljh: this.form.gznr
          }).then(res => {
            if (res.state == "success") {
              if (res.state == "success") {
                this.init();
                this.yycsShow = !this.yycsShow 
                this.$toast.success({message:'保存成功',duration:1500});
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
      if (/^[\s]*$/.test(this.form.cljh) && this.weekType == "wt") {
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
    // 获取本月最后一天
    getlastMonthDay(year,month){
      this.lastMonthDay = GetNextDate(
        GetNextDate(getLastMonth(year, month - 1), 6),
          (getWeeks(year, month) - 1) * 7
      )
    }
  },
  computed: {},
  watch: {},
  mounted() {

  },
  watch: {},
  activated() {
    this.uid = window.userId;
    this.weeksValue = this.$route.query.week;
    this.monthValue = this.$route.query.month;
    this.getlastMonthDay(Number(this.monthValue.split('-')[0]),Number(this.monthValue.split('-')[1]));
    this.init();
    // if (this.$route.params.bid) {
    //   this.init();
    // }
  },
  components: { weekList, emptyContent,weekSwitch ,addButton}
};
</script>

<style lang="less" scoped>
.weekReport_add {
  
  main {
    overflow-y: auto;
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
