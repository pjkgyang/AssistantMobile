<template>
  <div class="assiant-taskLog">
    <div class="taskLog-top-filter" :style="{'z-index':zIndex}">
      <div class="taskLog-filter--input">
        <van-search v-model="keyword" :background="'#fff'" placeholder="搜索姓名/项目编号/项目名称/填写人姓名"   @search="handleSearchKeyword" />
      </div>
      <div class="taskLog-filter--tabs">
        <span @click="hanldeSearchTXSJ" class="taskLog-filter-first">
          <span :class="{'text-active':txsjText!='填写时间'}">{{txsjText}}</span>&nbsp;
         
        </span>
        丨
        <span @click="hanldeSearchYDZT" class="taskLog-filter-second">
          <span :class="{'text-active':ydztText!='阅读状态'}">{{ydztText}}</span>&nbsp;
        
        </span>
        丨
        <span @click="hanldeSearchFW" class="taskLog-filter-third">
          <span :class="{'text-active':fwText!='范围'}">{{fwText}}</span>&nbsp;
        </span>
      </div>
    </div>
    <!-- load more -->
    <div class="taskLog-center-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <div class="taskLog-center-filter">
            <TaskLogList :Datalist="ProcessList" @handleOnButtonClick="handleOnButtonClick" @handleSeeDetails="handleSeeDetails"></TaskLogList>
          </div>
        </van-list>
      </van-pull-refresh>
       <div class="data_loading"  v-if="dataLoading && !this.loading">
             <van-loading type="spinner"/>
      </div>
      <div v-if="!ProcessList.length && !this.loading && !this.dataLoading">
        <emptyContent></emptyContent>
      </div>
    </div>
    <div class="taskLog-center-addtasklog">
      <mu-button fab  color="primary" class="btnBlue" @click="handleAddLog">
        <mu-icon value="add"></mu-icon>
      </mu-button>
    </div>

    <van-popup v-model="DataPopshow" position='top' class="pop">
      <div class="taskLog-search-pop">
        <div class="taskLog-search-pop-start">
          <p>开始日期</p>
          <van-cell-group title="开始日期">
            <van-cell :value="ksrqDate" is-link @click="handleChooseKsrq" />
          </van-cell-group>
        </div>
        <div style="color:#999">至</div>
        <div class="taskLog-search-pop-end">
          <p>结束日期</p>
          <van-cell-group title="结束日期">
            <van-cell :value="jsrqDate" is-link @click="handleChooseJsrq" />
          </van-cell-group>
        </div>
      </div>
      <div class="taskLog-search-pop-btn">
        <div>
          <van-button type="default" @click="handleClickReset">重置</van-button>
        </div>
        <div>
          <van-button style="background:#4376FF;border:none" type="danger" @click="handleClickQuery">确定</van-button>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="statePopshow" position='bottom' >
      <van-picker show-toolbar title="阅读状态" :columns="ydztColumn" @cancel="hadnleStateCancel"  @confirm="hadnleStateConfirm" />
    </van-popup>

    <van-popup v-model="fwPopshow" position='bottom' >
      <van-picker show-toolbar title="范围" :columns="fwColumn" @cancel="hadnleFwCancel"  @confirm="hadnleFwConfirm" />
    </van-popup>

    <div class="datePop">
      <van-popup v-model="pickerKsrqShow">
        <DatePicker @handleChangeDatePicker="handleChangeKsrqPicker"></DatePicker>
      </van-popup>
      <van-popup v-model="pickerJsrqShow">
        <DatePicker @handleChangeDatePicker="handleChangeJsrqPicker"></DatePicker>
      </van-popup>
    </div>
  </div>
</template>
<script>
import Cinput from "@/components/public/SearchInput.vue";
import Cbutton from "@/components/public/Button.vue";
import TaskLogList from "@/components/taskLog/TaskLog-card.vue";
import emptyContent from "@/components/public/empty-content.vue";
import { GetDateStr, getQueryStringByName } from "../../utils/util.js";
import DatePicker from "@/components/public/DatePicker.vue";
import { getMyDate } from "../../utils/util.js";


export default {
  data() {
    return {
      zIndex:2000,
      pickerKsrqShow: false,
      pickerJsrqShow: false,
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      dataLoading:false,
      total: 0,
      ydztList: [
        { label: "全部", value: "" },
        { label: "未阅", value: "0" },
        { label: "已阅", value: "1" }
      ],
      ydztColumn:["全部","未阅","已阅"],
      fwList: [
        { label: "全部", value: "" },
        { label: "战队(组织结构)", value: "0" },
        { label: "学校成员", value: "2" },
        { label: "合作伙伴", value: "3" },
        { label: "项目", value: "1" }
      ],
      fwColumn:['全部',"战队(组织结构)","项目","学校成员","合作伙伴",],
      DataPopshow: false,
      statePopshow: false,
      fwPopshow: false,
      startDate: "",
      endDate: "",
      ksrqDate: "",
      jsrqDate: "",
      keyword: "",
      curPage: 1,
      ydztText: "阅读状态",
      fwText: "范围",
      txsjText: "填写时间",
      ProcessList: [],
      isRead: "",
      fwValue: "",
      fwOrstate: ""
    };
  },
  methods: {
    // 阅读状态pop关闭
    hadnleStateCancel(){
      this.statePopshow = false;
    },
    hadnleFwCancel(){
      this.fwPopshow = false;
    },
    // 阅读状态pop确定
    hadnleStateConfirm(picker,values){
      this.curPage = 1;
      this.isRead = values==0?'':values==1?'0':'1';
      this.ydztText = picker;
      this.queryTaskProcess(this.startDate, this.endDate);
      this.statePopshow = false;
    },
    hadnleFwConfirm(picker,values){
      this.curPage = 1;
      this.fwValue = values-1<0?'':values-1;
      this.fwText = picker;
      this.queryTaskProcess(this.startDate, this.endDate);
      this.fwPopshow = false;
    },
    handleChooseKsrq() {
      this.pickerKsrqShow = true;
    },
    handleChooseJsrq() {
      this.pickerJsrqShow= true;
    },

    handleChangeKsrqPicker(data) {
      this.ksrqDate = getMyDate(data);
      this.pickerKsrqShow = false;
    },
    handleChangeJsrqPicker(data) {
      this.jsrqDate = getMyDate(data);
      this.pickerJsrqShow = false;
    },
    hanldeSearchTXSJ() {
      //填写时间
      this.zIndex = 2500;
      this.statePopshow = this.fwPopshow = false;
      this.ksrqDate = this.startDate;
      this.jsrqDate = this.endDate;
      this.DataPopshow = !this.DataPopshow;
    },
    hanldeSearchYDZT() {
      //阅读状态
      this.zIndex = 1000;
      this.fwOrstate = "阅读状态";
      this.DataPopshow = this.fwPopshow = false;
      this.statePopshow = !this.statePopshow;
    },
    hanldeSearchFW() {
      //范围
      this.zIndex = 1000;
      this.fwOrstate = "范围";
      this.DataPopshow = this.statePopshow = false;
      this.fwPopshow = !this.fwPopshow;
    },
    // handeChooseYdzt(value, label) {
    //   // 查看阅读状态
    //   this.curPage = 1;
    //   this.isRead = value;
    //   this.ydztText = label;
    //   this.queryTaskProcess(this.startDate, this.endDate);
    //   this.statePopshow = false;
    // },
    // handeChooseFw(value, label) {
    //   //查看范围
    //   this.curPage = 1;
    //   this.fwValue = value;
    //   this.fwText = label;
    //   this.queryTaskProcess(this.startDate, this.endDate);
    //   this.fwPopshow = false;
    // },
    handleClickQuery() {
      //日期筛选
      this.curPage = 1;
      this.startDate = this.ksrqDate;
      this.endDate = this.jsrqDate;
      this.queryTaskProcess(this.ksrqDate, this.jsrqDate);
      this.txsjText = this.ksrqDate + " - " + this.jsrqDate;
      this.DataPopshow = !this.DataPopshow

    },

    handleClickReset() {
      //重置日期
      this.ksrqDate = GetDateStr(-7);
      this.jsrqDate = GetDateStr(0);
    },

    handleSearchKeyword(val) {
      //关键字筛选
      this.curPage = 1;
      this.keyword = val;
      this.queryTaskProcess(this.startDate, this.endDate);
    },
    // 上啦刷新
    onRefresh() {
      setTimeout(() => {
        this.init();
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.queryTaskProcess(this.startDate, this.endDate);
      }, 500);
    },

    handleOnButtonClick(data) {
      let _this = this;
      if (data.split("&")[0] == "delete") {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否删除该条日报?"
          })
          .then(() => {
            _this
              .$post(_this.API.deleteTaskProcess, {
                wid: JSON.parse(data.split("&")[1]).wid
              })
              .then(res => {
                if (res.state == "success") {
                  _this.ProcessList.splice(data.split("&")[1], 1);
                  _this.$toast.success("删除成功~");
                }
              });
          });
      } else {
        this.$router.push({
          name: "AddTaskLog",
          params: { data: data.split("&")[1] }
        });
      }
      // //删除 编辑
      // if (data.split("&")[0] == "delete") {
      //   let _this = this;
      //   this.$vux.confirm.show({
      //     title: "提示",
      //     content: "是否删除该条日报?",
      //     onConfirm() {
      //       _this
      //         .$post(_this.API.deleteTaskProcess, {
      //           wid: JSON.parse(data.split("&")[1]).wid
      //         })
      //         .then(res => {
      //           if (res.state == "success") {
      //             _this.ProcessList.splice(data.split("&")[1], 1);
      //             _this.$vux.toast.show({
      //               text: "删除成功"
      //             });
      //           }
      //         });
      //     }
      //   });
      // } else {
      //   this.$router.push({
      //     name: "AddTaskLog",
      //     params: { data: data.split("&")[1] }
      //   });
      // }
    },
    handleSeeDetails(data) {
      //查看详情
      if (data.ydzt == 0) {
        this.$post(this.API.readLog, {
          wid: data.wid
        }).then(res => {
          if (res.state == "success") {
            data.ydzt = 1;
          }
        });
      }
      this.$router.push({ name: "TaskLogDetail", params: { data: data } });
    },
    handleAddLog() {
      // 添加日报
      this.$router.push({ name: "AddTaskLog" });
    },
    // 上拉刷新初始化
    init() {
      this.curPage = 1;
      this.queryTaskProcess(this.startDate, this.endDate);
    },
    // 获取日志列表
    queryTaskProcess(start, end) {
      if(this.curPage == 1 && !this.loading){
         this.dataLoading = true;
         this.ProcessList = [];
      }
      this.$get(this.API.queryLogTaskProcess, {
        curPage: this.curPage,
        pageSize: 16,
        startDay: start,
        endDay: end,
        isRead: this.isRead,
        keyword: this.keyword,
        fw: this.fwValue
      }).then(res => {
        if (res.state == "success") {
          this.total = res.data.total;
          if (this.isLoading || this.curPage == 1) {
            this.ProcessList = res.data.rows;
          } else {
            this.ProcessList = this.ProcessList.concat(res.data.rows);
          }
          // 加载状态结束
          this.dataLoading = false;
          this.loading = false;
          this.isLoading = false;
          if (this.curPage >= this.total) {
            this.finished = true;
          }
          this.curPage += 1;
        } else {
          this.dataLoading = false;
          this.$toast(res.msg);
        }
      });
    }
  },
  mounted() {
    this.startDate = GetDateStr(-7);
    this.endDate = GetDateStr(0);
    this.txsjText = this.startDate + " - " + this.endDate;
  },
  activated() {
    if(this.$route.params.bid == 1){
      this.init();
    }
  },
  watch: {
    $route: function(from, to) {
      
    }
  },

  components: {
    Cinput,
    TaskLogList,
    Cbutton,
    emptyContent,
    DatePicker
  }
};
</script>

<style lang="less">
@import "../../index.less";
.taskLog-top-filter {
  background: #fff;
  box-shadow: 0 2px 5px #eee;
  position: relative;
}
.taskLog-filter--input {
  padding: 0.5rem;
}
.taskLog-filter--tabs {
  padding: 8px 0;
  display: @flex;
  .taskLog-filter-first {
    width: 48%;
  }
  .taskLog-filter-second,
  .taskLog-filter-third {
    width: 26%;
  }
}
.taskLog-filter--tabs {
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
.taskLog-center-filter {
  height: 100%;
  overflow-y: auto;
}
.taskLog-center-addtasklog {
  position: fixed;
  bottom: 14vw;
  right:2vw;
  font-size:1rem;
}
.text-active {
  color: @text-color;
}
//  pop
.pop {
  margin-top: 94px;
  z-index: 200;
  background: #fff !important;
}
.taskLog-search-pop {
  .flex(@row:space-around,@col:center);
  .taskLog-search-pop-start,
  .taskLog-search-pop-end {
    p {
      font-size: @fontSize14;
      font-weight: 700;
      margin: 8px 0 8px 12px !important;
    }
  }
}
.taskLog-search-pop-btn {
  .flex(@row:space-around);
  padding: 15px 0;
  > div {
    width: 45%;
    button{
      width: 100%;
      height: 40px;
    }
  }
}
.taskLog-state-pop ul li {
  padding: 8px 0;
  border-bottom: 1px solid #efefef;
  color: #000;
  text-align: center;
}
.taskLog-center-content {
  height: calc(100vh - 13vh);
  overflow-y: auto;
  margin-top: 5px;
}
.datePop {
  z-index: 5000;
}
</style>