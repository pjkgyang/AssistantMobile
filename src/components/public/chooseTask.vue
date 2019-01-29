<template>
  <div>
    <van-popup v-model="itemPopShow" position="right">
      <div class="addtaskLog-pop-itemlist">
        <van-tabs @click="queryItem" v-model="active">
          <van-tab v-for="(tab,i) in btnList" :key="i" :title="tab.label"></van-tab>
        </van-tabs>
        <div style="text-align:center;background:#fff;padding:5px 0;">
          <searchInput @handleSearchKeyword="handleSearchKeyword" :place="'请输入项目名称'"></searchInput>
        </div>
        <div class="itemlist-group">
          <mu-container ref="container" class="demo-loadmore-content">
            <mu-load-more @refresh="onRefresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
              <van-cell v-for="(item,index) in allItems" :key="item" :title="item.xmmc" is-link @click="handleItemClick(item.xmbh,item.xmmc)" />
            </mu-load-more>
          </mu-container>  
          <div v-if="!allItems.length && !$store.state.loadingShow">
            <emptyContent></emptyContent>
          </div>
        </div>
        <div class="assistant-back">
          <mu-button fab  color="red" @click="handleClosePop">
            <span>返回<br><hr>上级</span>
          </mu-button>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="cpPopShow" position="right">
      <div class="addtaskLog-pop-itemlist">
        <div class="itemlist-cpgroup">
          <van-cell-group class="itemlist-group-cp">
            <van-cell v-for="(item,i) in cpItems" :key="i" :title="item.cp" is-link @click="handleCpClick(item.cp,item.cpbh)" />
          </van-cell-group>
          <emptyContent v-if="cpItems.length == 0"></emptyContent>
        </div>
        <div class="assistant-back">
          <mu-button fab  color="red" @click="handleClosePopCP">
            <span>返回<br><hr>上级</span>
          </mu-button>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="taskPopShow" position="right">
      <div class="addtaskLog-pop-itemlist">
        <div class="itemlist-cpgroup">
          <div v-for="(task,i) in taskItems" class="task-catlog" v-if="!taskLoading">
            <p>{{task.catalog}}</p>
            <van-cell-group class="itemlist-group-cp">
              <van-cell v-for="(item,i) in task.tasks.rows" :key="i" :title="item.rwmc" is-link @click="handletaskClick(item.rwmc,item.rwbh)" />
            </van-cell-group>
          </div>
        </div>
        <div class="assistant-back">
          <mu-button fab  color="red" @click="handleClosePopTask">
            <span>返回<br><hr>上级</span>
          </mu-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { GetDateStr, getMyDate } from "../../utils/util.js";
import searchInput from "@/components/public/SearchInput.vue";
import emptyContent from "@/components/public/empty-content.vue";

export default {
  data() {
    return {
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      taskLoading:false,
      itemLoading:false,
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
      itemPopShow: false,
      cpPopShow: false,
      taskPopShow: false,
      datePickerShow: false,
      currentPage: 1,
      currentPage: 1,
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

      hfrxm: "",
      hfrbh: "",
      showLoading: false
    };
  },
  props: {
    parentShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    parentShow(n, o) {
      this.itemPopShow = true;
      this.init();
    }
  },
  activated() {
    this.showLoading = false;
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
    handleSearchKeyword(val) {
      //关键字查询
      this.keyword = val;
      this.init();
    },
    handleClosePop() {
      this.itemPopShow = !this.itemPopShow;
    },
    handleClosePopCP() {
      this.cpPopShow = false;
    },
    handleClosePopTask() {
      this.taskPopShow = false;
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
      this.init();
    },

    handleItemClick(bh, mc) {
      // 获取项目 所属产品
      this.backupsInfo.xmmc = mc;
      this.backupsInfo.xmbh = bh;
      this.$store.dispatch("chnageLoing", true);
      this.$get(this.API.getProjectCatalog, {
        xmbh: bh
      }).then(res => {
        if (res.state == "success") {
          this.cpItems = res.data;
          this.$store.dispatch("chnageLoing", false);
        }else{
          this.$store.dispatch("chnageLoing", false);
          this.$toast(!res.msg?'请求超时,请稍后再试~':res.msg)
        }
      });
      this.cpPopShow = true;
    },
    handleCpClick(cp, cpbh) {
      // 获取 里程碑任务
      this.backupsInfo.cp = cp;
      this.backupsInfo.cpbh = cpbh;
      this.getMilestoneCatalog();
      this.taskPopShow = true;
    },

    handletaskClick(rwmc, rwbh) {
      // 获取 里程碑任务(选中任务)
      this.xmInfo.rwmc = rwmc;
      this.xmInfo.rwbh = rwbh;
      this.xmInfo.xmmc = this.backupsInfo.xmmc;
      this.xmInfo.xmbh = this.backupsInfo.xmbh;
      this.xmInfo.cp = this.backupsInfo.cp;
      this.xmInfo.cpbh = this.backupsInfo.cpbh;
      this.itemPopShow = this.cpPopShow = this.taskPopShow = false;
      this.taskName =
      this.xmInfo.xmmc + " — " + this.xmInfo.cp + " — " + this.xmInfo.rwmc;
      this.$emit("handletaskClick", this.taskName, this.xmInfo);
    },
    // 上啦刷新
    onRefresh() {
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
         this.currentPage = 1;
         if (!this.tabValue) {
          this.queryAllitems();
        } else {
          this.queryXMofType(this.tabValue);
        }
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      this.loading = true;
      setTimeout(() => {
        if (!this.tabValue) {
          this.queryAllitems();
        } else {
          this.queryXMofType(this.tabValue);
        }
      }, 800);
    },

    init() {
      this.currentPage = 1;
      this.allItems = [];
      this.$store.dispatch("chnageLoing", true);
      if (!this.tabValue) {
        this.queryAllitems();
      } else {
        this.queryXMofType(this.tabValue);
      }
    },

    queryAllitems() {
      // if(this.currentPage == 1 && !this.loading){
      //   this.allItems = [];
      //   this.itemLoading = true;
      // }
      //查询全部项目
      this.$get(this.API.getProjects, {
        curPage: this.currentPage,
        pageSize: 20,
        keyword: this.keyword,
        xmzt: "",
        xmlb: "",
        sfgx: "",
        pl: ""
      }).then(res => {
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          if (this.currentPage == 1) {
            this.allItems = res.data.rows;
          } else {
            this.allItems = this.allItems.concat(res.data.rows);
          }
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          if (this.currentPage >= res.data.total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
          this.currentPage += 1;
        }else{
           this.$store.dispatch("chnageLoing", false);
           this.$toast(res.msg);
        }
      }).catch(error=>{
        this.$store.dispatch("chnageLoing", false);
        this.$toast('系统繁忙,请稍后再试~');
      });;
    },
    //获取项目
    queryXMofType(pl) {
      this.$get(this.API.getMyProjects, {
        curPage: this.currentPage,
        pageSize: 20,
        keyword: this.keyword,
        xmzt: "",
        xmlb: "",
        sfgx: "",
        pl: pl
      }).then(res => {
        if (res.state == "success") {
          //   this.total = res.data[pl].total;
          this.$store.dispatch("chnageLoing", false);
          if (this.currentPage == 1) {
            this.allItems = res.data[pl].rows;
          } else {
            this.allItems = this.allItems.concat(res.data[pl].rows);
          }
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          if (this.currentPage >= res.data[pl].total) {
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
        this.$toast('系统繁忙,请稍后再试~');
      });;
    },
    // 获取任务
    getMilestoneCatalog(){
      this.taskItems = [];
      this.$store.dispatch("chnageLoing", true);
      this.$get(this.API.getMilestoneCatalog, {
        xmbh: this.backupsInfo.xmbh,
        cpbh: this.backupsInfo.cpbh,
        cpmc: this.backupsInfo.cp,
        curPage: 1,
        pageSize: 9999,
        taskType: "",
        rwzt: "",
        keyword: ""
      }).then(res => {
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          this.taskItems = res.data;
        }else{
          this.$store.dispatch("chnageLoing", false);
          this.$toast(!res.msg?'系统繁忙,请稍后再试':res.msg);
        }
      }).catch(error=>{
        this.$store.dispatch("chnageLoing", false);
        this.$toast('系统繁忙,请稍后再试~');
      });
    },
  },
  components: {
    searchInput,
    emptyContent
  }
};
</script>
<style scoped lang="less">
@import "../../index.less";

.addtaskLog-pop-itemlist {
  width: 100vw;
  height: 100vh;
  overflow:hidden;
  .itemlist-group {
    height: 86vh;
    margin-top: 5px;
    overflow-y: auto;
  }
  .itemlist-cpgroup {
    max-height: 100vh;
    margin-top: 5px;
    overflow-y: auto;
    .task-catlog p {
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
