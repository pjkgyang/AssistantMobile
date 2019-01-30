<template>
    <div class="assistant-projectTask">
        <div class="projectTask-header">
            <div class="projectTask-xm">
                <p>所属项目：[{{$route.query.xmbh}}] {{!!$route.params.xmmc?$route.params.xmmc:taskList.length?taskList[0].xmmc:''}}</p>
            </div>
            <searchInput @handleSearchKeyword="handleSearchKeyword" :place="'搜索学校/项目编号/项目名称/合同编号/项目经理'"></searchInput>
        </div>
        <div class="projectTask-list" :style="{'height':$store.state.clienHeight - 82+'px'}">
            <mu-container ref="container" class="demo-loadmore-content">
                <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
                        <layoutCard v-for="(task,index) in taskList" :key="index">
                            <div slot="caption">
                                <h4>{{task.rwmc}}</h4>
                                <section spacebetween flex-col-center>
                                    <p>
                                        <span>责任人：</span>{{task.ssrxm}}&#x3000;
                                        <span class="color999">创建人：</span>{{!task.cjrxm?'无':task.cjrxm}}
                                    </p>
                                    <div>
                                        <van-tag :type="task.zt==1?'success':'danger'">{{task.zt_display}}</van-tag>
                                    </div>
                                </section>
                            </div>
                            <div slot="detail">
                                <section>
                                    <p>
                                        <span>创建时间：</span>{{task.cjsj}}
                                    </p>
                                    <p>
                                        <span>产品名称：</span>{{task.cpmc_display}}
                                    </p>
                                    <p>
                                        <span>里程碑：</span>{{task.lcbms_display}}
                                    </p>
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
import emptyContent from "@/components/public/empty-content.vue"
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
      personType:'',
      filterType:''
    };
  },
  methods: {
    handleSearchKeyword() {},
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
      this.$get(this.API.pageHomePageTaskDetail, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xmbh: this.$route.query.xmbh,
        isAll: true,
        personType: this.$route.query.type,
        filterType: this.$route.query.lx
      }).then(res => {
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
      if(this.personType != this.$route.query.type || this.filterType != this.$route.query.lx){
         this.init();
      }
      this.personType = this.$route.query.type;
      this.filterType = this.$route.query.lx;
  },
  components: { searchInput, layoutCard,emptyContent }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.assistant-projectTask {
    .projectTask-header{
        border-bottom:1px solid rgba(0, 0, 0, 0.08);
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
