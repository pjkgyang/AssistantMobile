<template>

 <div class="project-satisfy">
     <div class="project-satisfy-top">
         <h5>{{$route.query.sfmy?'满意':'不满意'}}问题数:</h5>
     </div>
      <div class="project-wtmy" :style="{'height':($store.state.clienHeight - 40)+'px'}" ref="layoutScroll" @scroll="handleScroll">
        <mu-container ref="container" class="demo-loadmore-content">
          <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
            <div class="layout-scroll-center">
              <questionlist :questionList="questionList" @handleCheckDetail="handleCheckDetail"></questionlist>
            </div>
          </mu-load-more>
          <p v-if="finished && !!questionList.length" class="empty-content-tip">没有更多数据了</p>
        </mu-container>

        <div v-if="!questionList.length && !$store.state.loadingShow">
          <emptyContent></emptyContent>
        </div>
      </div>
 </div>
</template>

<script>
import questionlist from "@/components/question/questionlist.vue";
import emptyContent from "@/components/public/empty-content.vue";
export default {
  data() {
    return {
      questionList: [],
      finished: false,
      isLoading: false,
      loading: false,

      currentPage: 1,
      pageSize: 10,

      xmbh: "",
      sfmy: "",

      scrollTop:0
    };
  },

  activated() {
    if (
      this.xmbh != this.$route.query.xmbh ||
      this.sfmy != this.$route.query.sfmy
    ) {
      this.init();
    }
    this.xmbh = this.$route.query.xmbh;
    this.sfmy = this.$route.query.sfmy;

    this.$nextTick(function() {
      this.$refs.layoutScroll.scrollTop = this.scrollTop;
    });
  },
  methods: {
    handleCheckDetail(params) {
      this.$router.push({ path: "/questiondetail", query: { wid: params.wid } });
    },
    handleScroll(){
       this.scrollTop = this.$refs.layoutScroll.scrollTop
    },
    refresh() {
      this.isLoading = true;
      setTimeout(() => {
        this.currentPage = 1;
        this.queryReportQuestionLst();
      }, 500);
    },
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        this.queryReportQuestionLst();
      }, 300);
    },
    init() {
      this.currentPage = 1;
      this.questionList = [];
      this.$store.dispatch("chnageLoing", true);
      this.queryReportQuestionLst();
    },
    queryReportQuestionLst() {
      this.$get(this.API.queryReportQuestionLst, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xmbh: this.$route.query.xmbh,
        sfwsl: true,
        sfmy: this.$route.query.sfmy
      }).then(res => {
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          this.total = res.data.total;
          if (this.isLoading || this.currentPage == 1) {
            this.questionList = res.data.rows;
          } else {
            this.questionList = this.questionList.concat(res.data.rows);
          }
          if (!res.data.rows) {
            this.questionList = [];
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
  components: { questionlist, emptyContent }
};
</script>

<style lang="less" scoped>
.project-satisfy-top{
  background: #fff;
  box-shadow: 0 2px 3px rgb(212, 210, 210);
  border-bottom: 1px solid rgb(221, 220, 220);
  padding: 0.5rem;
}
.project-wtmy {
  overflow-y: auto;
}
</style>
