<template>
  <div class="weekReport_add">
    <header>
      <van-tabs v-model="weekActive" @change="handleChangeWeek">
        <van-tab title="本周工作总结"></van-tab>
        <van-tab title="下周工作计划"></van-tab>
      </van-tabs>
      <van-tabs @change="handleChange" type="card" class="tabs_card">
        <van-tab title="里程碑工作"></van-tab>
        <van-tab title="进度任务"></van-tab>
        <van-tab title="问题处理"></van-tab>
      </van-tabs>
    </header>

    <section v-if="weekType == 'jd'||weekType == 'wt'||(weekType == 'lcb'&& weekActive == 1)" class="add_btn">
      <mu-button round small color="primary" class="btnBlue" @click="handleAdd(weekType)">新增</mu-button>
    </section>
    <main :style="{'height':maxHeight}">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <weekList :dataList="dataList" :weekType="weekType" :weekState="weekActive" @handleFillin="handleFillin"></weekList>
        </van-list>
      </van-pull-refresh>
      <div class="data_loading" v-if="dataLoading">
        <van-loading type="spinner" />
      </div>
      <div v-if="!dataList.length && !this.dataLoading && !this.loading">
        <empty-content></empty-content>
      </div>
    </main>

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
          <van-cell-group v-if="weekType == 'lcb'">
            <van-field required maxlength="500" v-model="form.gznr" label="工作内容" type="textarea" placeholder="请输入工作内容(500字以内)" rows="5" autosize />
          </van-cell-group>
          <van-cell-group v-if="weekType == 'wt'">
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      uid: "", //用户编号
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      dataLoading: false,
      curPage: 1,
      pageSize: 10,
      dataList: [
        {
          xmbh: "UK123456",
          xmmc: "xxxxxxxxxxxxxx",
          xmnr: "xmxmxmxmxmm",
          lcbms: "ssssssddd",
          cnwcrq: "2018-08-08",
          wczt: "1",
          cpmc: "产品名臣g",
          rwmc: "任务名称",
          wtbt: "张三三上哪上哪上哪啊",
          qwjjrq: "2018-08-09",
          cnjjrq: "2018-08-10",
          wtzt: "1"
        }
      ],
      maxHeight: window.innerHeight - 110 + "px",
      yycsShow: false,
      weekType: "lcb",
      weekActive: 0,
      form: {
        wwcyy: "",
        hxcs: "",
        gznr: "",
        cljh: ""
      },
      weeksValue: "",
      monthValue: "",
      lastMonthDay: "", //本月最后一天
      weeksNum: "" // 本月周数
    };
  },
  methods: {
    // 上啦刷新
    onRefresh() {
      setTimeout(() => {
        this.init();
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.getWeekData();
      }, 500);
    },

    handleChange(index, title) {
      this.weekType = index == 0 ? "lcb" : index == 1 ? "jd" : "wt";
      this.dataLoading = true;
      this.init();
    },
    // 本周 下周
    handleChangeWeek() {
      if (this.weekActive == 1) {
        if (this.weeksValue == this.weeksNum) {
          this.monthValue = getNextMonth(this.monthValue);
          this.weeksValue = 1;
        } else {
          this.monthValue = this.$route.query.month;
          this.weeksValue = JSON.parse(this.$route.query.week) + 1;
        }
      } else {
        this.monthValue = this.$route.query.month;
        this.weeksValue = this.$route.query.week;
      }
      this.init();
    },
    handleFillin(params, type) {
      this.yycsShow = true;
      console.log(params);
    },
    handleClosepop() {
      this.yycsShow = !this.yycsShow;
      this.form.wwcyy = this.form.hxcs = this.form.gznr = this.form.cljh = "";
    },
    // 保存 未完成原因，后续措施
    handleSave() {
      if (!this.validate()) return;
      if (this.weekActive == 0) {
        if (this.weekType == "lcb") {
          // 里程碑
          this.$post(this.API.batchUpdateWeekWorkAll, {
            zgzwids: "",
            wwcyy: this.form.wwcyy,
            hxcs: this.form.hxcs,
            gznr: this.form.gznr
          }).then(res => {
            if (res.state == "success") {
            }
          });
        } else {
          this.$post(this.API.batchUpdateWeekQuestionAll, {
            zwtwids: '',
            yhbh: this.uid,
            month: this.monthValue,
            zxh: this.weeksValue,
            wwcyy: this.form.wwcyy,
            hxcs: this.form.hxcs,
            cljh: this.form.gznr
          }).then(res => {
            if (res.state == "success") {

            }
          });
        }
      }else{

      }
    },
    validate() {
      if (/^[\s]*$/.test(this.form.wwcyy) && this.weekActive == 0) {
        this.$toast("请填写未完成原因~");
        return false;
      }
      if (/^[\s]*$/.test(this.form.hxcs) && this.weekActive == 0) {
        this.$toast("请填写后续措施~");
        return false;
      }
      if (/^[\s]*$/.test(this.form.gznr) && this.weekType == "lcb") {
        this.$toast("请填写工作内容~");
        return false;
      }
      if (/^[\s]*$/.test(this.form.cljh) && this.weekType == "wt") {
        this.$toast("请填写处理计划~");
        return false;
      }
      return true;
    },
    // 添加任务进度，问题
    handleAdd(data) {
      this.$router.push({
        path:
          data == "jd"
            ? "/addweekprocess"
            : data == "wt" ? "/addweekquestion" : "/addweekmilestone",
        query: {
          data: this.weekActive,
          week: this.weeksValue,
          month: this.monthValue,
          lastDay: this.lastMonthDay
        }
      });
    },
    // 获取本月最后一天
    getLastMonthDay(year, month) {
      this.weeksNum = getWeeks(year, month);
      this.lastMonthDay = GetNextDate(
        GetNextDate(getLastMonth(year, month - 1), 6),
        (this.weeksNum - 1) * 7
      );
    },
    init() {
      this.curPage = 1;
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
          curPage: this.curPage,
          pageSize: this.pageSize,
          month: this.monthValue,
          zxh: this.weeksValue,
          yhbh: this.uid
        }
      ).then(res => {
        if (res.state == "success") {
          if (this.curPage == 1) {
            this.dataList = res.data.rows;
          } else {
            this.dataList = this.dataList.concat(res.data.rows);
          }
          this.dataLoading = false;
          this.loading = false;
          this.isLoading = false;
          if (this.curPage >= res.data.total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
          this.curPage += 1;
        } else {
          this.$toast.clear();
          this.dataLoading = false;
          this.$toast(res.msg);
        }
      }).catch(error=>{
          this.$toast.clear();
          this.dataLoading = false;
          this.$toast('系统繁忙，请稍后再试~');
      });
    }
  },
  computed: {},
  watch: {
    weekType(n, o) {
      if (!this.weekActive) {
        if (this.weekType == "lcb") {
          this.maxHeight = window.innerHeight - 100 + "px";
        } else {
          this.maxHeight = window.innerHeight - 135 + "px";
        }
      }
    },
    weekActive(n, o) {
      if (n) {
        this.maxHeight = window.innerHeight - 135 + "px";
      } else {
        if (this.weekType == "lcb") {
          this.maxHeight = window.innerHeight - 100 + "px";
        } else {
          this.maxHeight = window.innerHeight - 135 + "px";
        }
      }
    }
  },
  mounted() {
    this.uid = window.userId;
    this.weeksValue = this.$route.query.week;
    this.monthValue = this.$route.query.month;
    this.getLastMonthDay(
      this.monthValue.split("-")[0],
      JSON.parse(this.monthValue.split("-")[1])
    );
  },
  watch: {},
  activated() {
    if (this.$route.params.bid) {
      this.init();
    }
  },
  components: { weekList, emptyContent }
};
</script>

<style lang="less" scoped>
.weekReport_add {
  .add_btn {
    text-align: center;
    margin: 0.5rem 0;
    button {
      width: 92%;
    }
  }
  header {
    margin-bottom: 0.5rem;
    .tabs_card {
      margin-top: 0.5rem;
    }
  }
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
