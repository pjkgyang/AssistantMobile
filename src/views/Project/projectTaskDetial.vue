<template>
  <div class="assistant-projectTask">
    <div class="projectTask-header">
      <div class="projectTask-xm">
        <p>所属项目：[{{$route.query.xmbh}}] {{!!$route.params.xmmc?$route.params.xmmc:taskList.length?taskList[0].xmmc:''}}</p>
      </div>
      <!-- <searchInput @handleSearchKeyword="handleSearchKeyword" :place="'搜索合同编号/项目经理'"></searchInput> -->
    </div>
    <div class="projectTask-list" :style="{'height':$store.state.clienHeight - 42+'px'}">
      <mu-container ref="container" class="demo-loadmore-content">
        <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
          <layoutCard v-for="(task,index) in taskList" :key="index">
            <div slot="caption">
              <h4>{{task.rwmc}}</h4>
              <section>
                <p v-if="$route.query.lx">
                  <span>责任人：</span>{{task.ssrxm}}&#x3000;
                  <span class="color999">创建人：</span>{{!task.cjrxm?'无':task.cjrxm}}
                </p>
                <div v-else>
                  <div><h5><span class="color999 fontW400">项目内容：</span>{{task.cpmc_display}}</h5></div>
                  <div flex><span class="color999">里程碑：</span><h5>{{task.lcbms_display}}</h5></div>
                </div>
                <!-- <div>
                  <van-tag round :type="task.zt==1?'success':'danger'">{{task.zt_display}}</van-tag>
                </div> -->
              </section>
            </div>
            <div slot="detail">
              <section>
                <p><span>{{$route.query.lx?'任务状态：':'里程碑状态：'}}</span><van-tag round :type="task.zt==1?'success':'danger'">{{task.zt_display}}</van-tag></p>
                <p v-if="!$route.query.lx">
                  <span class="color999">责任人：</span>{{!task.zrrxm?'无':task.zrrxm}}
                </p>
                <p v-if="$route.query.lx"> <span>创建时间：</span>{{task.cjsj}}</p>
                <p v-if="!$route.query.lx">
                  <span class="color999">确认人：</span>{{!task.qrrxm?'无':task.qrrxm}}&#x3000;
                  <span class="color999">是否确认：</span>{{!task.sfqr?'无':'已确认'}}<br>
                  <span class="color999">确认时间：</span>{{!task.qrsj?'无':task.qrsj}}
                </p>
                <p v-if="$route.query.lx"><span>产品名称：</span>{{task.cpmc_display}}</p>
                <p v-if="$route.query.lx"><span>里程碑：</span>{{task.lcbms_display}}</p>
              </section>
            </div>
          </layoutCard>
        </mu-load-more>
        <p v-if="finished && !!taskList.length" class="empty-content-tip">没有更多数据了</p>
      </mu-container>
      <div v-if="!taskList.length && !$store.state.loadingShow">
        <emptyContent></emptyContent>
      </div>
    </div>
  </div>
</template>

<script>
import searchInput from "@/components/public/SearchInput.vue";
import layoutCard from "@/components/layout/card.vue";
import emptyContent from "@/components/public/empty-content.vue";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      taskList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      personType: "",
      filterType: "",
      sfqr: "",

      params: {}
    };
  },
  methods: {
    handleSearchKeyword(val) {

    },
    // 上啦刷新
    refresh() {
      this.isLoading = true;
      // this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.currentPage = 1;
        this.pageHomePageTaskDetail();
      }, 500);
    },
    // 异步更新数据
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        this.pageHomePageTaskDetail();
      }, 300);
    },
    init() {
      this.currentPage = 1;
      this.taskList = [];
      this.$store.dispatch("chnageLoing", true);
      this.pageHomePageTaskDetail();
    },
    pageHomePageTaskDetail() {
      let params = {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xmbh: this.$route.query.xmbh,
        isAll: true,
        personType: this.$route.query.type,
        filterType: this.$route.query.lx,
        sfqr: this.$route.query.sfqr
      };

      if (this.$route.query.lx) {
        delete params.sfqr;
      } else {
        delete params.isAll;
        delete params.personType;
        delete params.filterType;
      }

      this.$get(
        this.$route.query.lx
          ? this.API.pageHomePageTaskDetail
          : this.API.pageProjectPanelMilestoneDetail,
        params
      ).then(res => {
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          this.total = res.data.total;
          if (this.isLoading || this.currentPage == 1) {
            this.taskList = res.data.rows;
          } else {
            this.taskList = this.taskList.concat(res.data.rows);
          }
          if (!res.data.rows) {
            this.taskList = [];
          }
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          if (this.currentPage >= this.total) {
            this.finished = true;
          } else {
            this.finished = false;
          }
          this.currentPage += 1;
        } else {
          this.$store.dispatch("chnageLoing", false);
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
        }
      });
    }
  },
  activated() {
    if (this.$route.query.type) {
      if (
        this.personType != this.$route.query.type ||
        this.filterType != this.$route.query.lx
      ) {
        this.init();
      }
    } else if (this.$route.query.sfqr) {
      if (this.sfqr != this.$route.query.sfqr) {
        this.init();
      }
    }

    this.personType = this.$route.query.type;
    this.filterType = this.$route.query.lx;
    this.sfqr = this.$route.query.sfqr;
  },
  components: { searchInput, layoutCard, emptyContent }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.assistant-projectTask {
  .projectTask-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
  .projectTask-xm {
    color: #999999;
    padding: 0.7rem;
    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    font-size: @fontSize12;
  }
  .projectTask-list {
    padding: 0.33rem 0;
    overflow-y: auto;
    section {
      font-size: @fontSize12;
      p span:nth-child(1) {
        color: #999;
      }
    }
  }
}
</style>
