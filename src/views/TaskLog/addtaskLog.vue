<template>
    <div>
        <div class="assisant-tasklog-addtaskLog">
            <van-cell-group>
                <van-field v-model="gcrq" label="日报日期" is-link @focus="handleFocus" required/>
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="gs" type="number" placeholder="请输入工时" label="工时" required/>
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="taskName" type="textarea" label="关联任务" is-link rows="1" autosize @click="onClick" required/>
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="content" type="textarea" label="内容" placeholder="请填写内容" rows="4" required/>
            </van-cell-group>
            <div class="tasklog-addtaskLog-btn">
                <div>
                    <van-button type="default" @click="handleCancel">取消</van-button>
                </div>
                <div>
                    <van-button class="commitButton" :loading="commitloanind" type="primary" @click="handleCommit">提交</van-button>
                </div>
            </div>
        </div>

        <!-- 选择任务 -->
        <choose-task :parentShow="show" @handleClosePop="handleClosePop" @handletaskClick="handletaskClick"></choose-task>

        <van-popup v-model="datePickerShow">
            <DatePicker @handleChangeDatePicker="handleChangeDatePicker"></DatePicker>
        </van-popup>
    </div>
</template>
<script>
import { GetDateStr, getMyDate } from "../../utils/util.js";
import Cinput from "@/components/public/SearchInput.vue";
import Cbutton from "@/components/public/Button.vue";
import emptyContent from "@/components/public/empty-content.vue";
import DatePicker from "@/components/public/DatePicker.vue";
import chooseTask from "@/components/public/chooseTask";

export default {
  data() {
    return {
      show: false,
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      commitloanind: false,
      date: undefined,
      active: 0,
      btnList: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "我收藏的",
          value: "1"
        },
        {
          label: "我参与的",
          value: "4"
        },
        {
          label: "我拥有的",
          value: "3"
        },
        {
          label: "关闭的",
          value: "5"
        },
        {
          label: "其他",
          value: "6"
        }
      ],
      tabValue: "",
      datePickerShow: false,
      curPage: 1,
      curPage: 1,
      allItems: [], //项目
      loadMore: false,
      keyword: "",
      gs: "",
      content: "",
      gcrq: GetDateStr(0),
      xmInfo: {},
      backupsInfo: {},
      cpItems: [], //产品
      taskItems: [], //任务
      taskName: "请选择",
      taskLogDetail: {},
      pullupDefaultConfig: {
        pullUpHeight: 100,
        height: 40,
        autoRefresh: true,
        upContent: "上拉加载更多...",
        downContent: "释放后加载",
        loadingContent: "加载中..."
      },
      hfrxm: "",
      hfrbh: "",
      commitText: "提交",
      showLoading: false
    };
  },
  activated() {
    this.showLoading = false;
    this.commitText = "提交";
    if (this.$route.params.data) {
      this.taskLogDetail = JSON.parse(this.$route.params.data);
      this.xmInfo.xmbh = this.taskLogDetail.xmbh;
      this.xmInfo.xmmc = this.taskLogDetail.xmmc;
      this.xmInfo.rwbh = this.taskLogDetail.rwbh;
      this.xmInfo.rwmc = this.taskLogDetail.rwmc;
      this.xmInfo.cp = this.taskLogDetail.cpmc;
      this.xmInfo.cpbh = this.taskLogDetail.cpdm;
      this.xmInfo.wid = this.taskLogDetail.wid;
      this.hfrxm = this.taskLogDetail.cjrxm;
      this.hfrbh = this.taskLogDetail.cjrbh;
      this.gs = this.taskLogDetail.gs;
      this.gcrq = this.taskLogDetail.gcrq;
      this.content = this.taskLogDetail.gcms;
      this.taskName =
        this.taskLogDetail.xmmc == ""
          ? "请选择"
          : this.taskLogDetail.xmmc +
            "--" +
            this.taskLogDetail.cpmc +
            "--" +
            this.taskLogDetail.rwmc;
      document.title = "编辑日报";
    } else {
      this.gs = this.content = "";
      this.gcrq = GetDateStr(0);
      this.taskName = "请选择";
      this.xmInfo = {};
      this.hfrxm = window.userName;
      this.hfrbh = window.userId;
      document.title = "添加日报";
    }
  },
  methods: {
    handleClosePop(){
        this.show = !this.show
    },
    handletaskClick(name,data){
        this.xmInfo = data;
        this.taskName = name;
        console.log(this.xmInfo)
    },
    handleFocus() {
      this.datePickerShow = true;
    },
    handleChangeDatePicker(date) {
      this.gcrq = getMyDate(date);
      this.datePickerShow = !this.datePickerShow;
    },
    handleSearchKeyword(val) {
      //关键字查询
      this.keyword = val;
      this.curPage = 1;
      if (!this.tabValue) {
        this.queryAllitems();
      } else {
        this.queryXMofType(this.tabValue);
      }
    },
    // 选择任务
    onClick() {
      this.show = !this.show
    },
    handleCancel() {
      this.$router.go(-1);
    },
    handleCommit() {
      // 日报提交(新增 编辑)
      if (!/^\d+(\.\d+)?$/.test(this.gs)) {
        this.$toast("请填写正确工时~");
        return;
      } else if (!this.content) {
        this.$toast("请填写内容~");
        return;
      } else if (this.taskName == "请选择") {
        this.$toast("请选择关联任务~");
        return;
      }
      this.commitloanind = true;
      this.$post(this.API.addOrUpdateTaskProcess, {
        xmbh: !this.xmInfo.xmbh ? "" : this.xmInfo.xmbh,
        rwbh: !this.xmInfo.rwbh ? "" : this.xmInfo.rwbh,
        gclx: 2,
        gcms: this.content,
        gcrq: this.gcrq,
        gs: this.gs,
        hfrbh: this.hfrbh,
        hfrxm: this.hfrxm,
        wid: !this.xmInfo.wid ? "" : this.xmInfo.wid
      }).then(res => {
        if (res.state == "success") {
          this.$toast.clear();
          this.$toast(!this.xmInfo.wid ? "添加成功~" : "修改成功~");
          this.commitloanind = false;
          this.$router.push({ name: "TaskLog", params: { bid: "1" } });
        } else {
          this.$toast.fail(res.msg);
          this.commitloanind = false;
        }
      });
    },
    queryItem() {
      switch (this.active) {
        case 0:
          this.tabValue = "";
          break;
        case 1:
          this.tabValue = "1";
          break;
        case 2:
          this.tabValue = "4";
          break;
        case 3:
          this.tabValue = "3";
          break;
        case 4:
          this.tabValue = "5";
          break;
        case 5:
          this.tabValue = "6";
          break;
        default:
          break;
      }
      this.curPage = 1;
      if (!this.tabValue) {
        this.queryAllitems();
      } else {
        this.queryXMofType(this.tabValue);
      }
    },
    // 上啦刷新
    onRefresh() {
      setTimeout(() => {
        this.init();
      }, 800);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        if (!this.tabValue) {
          this.queryAllitems();
        } else {
          this.queryXMofType(this.tabValue);
        }
      }, 800);
    },
    init() {
      this.curPage = 1;
      if (!this.tabValue) {
        this.queryAllitems();
      } else {
        this.queryXMofType(this.tabValue);
      }
    },

    queryAllitems() {
      //查询全部项目
      this.$get(this.API.getProjects, {
        curPage: this.curPage,
        pageSize: 20,
        keyword: this.keyword,
        xmzt: "",
        xmlb: "",
        sfgx: "",
        pl: ""
      }).then(res => {
        if (res.state == "success") {
          this.total = res.data.total;
          if (this.curPage == 1) {
            this.allItems = res.data.rows;
          } else {
            this.allItems = this.allItems.concat(res.data.rows);
          }
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          this.curPage += 1;
          if (this.curPage >= this.total) {
            this.finished = true;
          }
        }
      });
    },
    //获取项目
    queryXMofType(pl) {
      this.$get(this.API.getMyProjects, {
        curPage: this.curPage,
        pageSize: 20,
        keyword: this.keyword,
        xmzt: "",
        xmlb: "",
        sfgx: "",
        pl: pl
      }).then(res => {
        if (res.state == "success") {
          this.total = res.data[pl].total;
          if (this.curPage == 1) {
            this.allItems = res.data[pl].rows;
          } else {
            this.allItems = this.allItems.concat(res.data[pl].rows);
          }
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          this.curPage += 1;
          if (this.curPage >= this.total) {
            this.finished = true;
          }
        } else {
          this.$toast(res.msg);
        }
      });
    }
  },
  components: {
    Cinput,
    Cbutton,
    emptyContent,
    DatePicker,
    chooseTask
  }
};
</script>
<style scoped lang="less">
@import "../../index.less";
.assisant-tasklog-addtaskLog {
  padding: 10px 0;
  .van-cell-group {
    margin-bottom: 1vw;
  }
}
  .tasklog-addtaskLog-btn {
     .operate-btn();
  }
.addtaskLog-pop-itemlist {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .itemlist-group {
    height: 85vh;
    margin-top: 5px;
    overflow-y: auto;
  }
  .itemlist-cpgroup {
    max-height: 100vh;
    margin-top: 5px;
    overflow-y: auto;
    .task-catlog p{
        font-weight: 700;
        font-size: @fontSize14;
        margin: 1vh 2vw;
    }
    .itemlist-group-cp {
      max-height: 99vh;
    }
  }
}
</style>
