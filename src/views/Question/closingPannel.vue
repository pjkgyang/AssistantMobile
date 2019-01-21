<template>
    <div>
        <mu-container ref="container" class="demo-loadmore-content">
            <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
                <questionlist :questionList="questionList" :isCloseShow="true" @handleCheckDetail="handleCheckDetail" @handleCloseOrReject="handleCloseOrReject"></questionlist>
            </mu-load-more>
            <p v-if="finished && !!questionList.length" class="empty-content-tip">没有更多数据了</p>
        </mu-container>
        <div v-if="!questionList.length && !$store.state.loadingShow">
            <emptyContent></emptyContent>
        </div>

        <van-actionsheet v-model="operateShow" title="驳回说明">
            <div class="actionsheet-operate">
                <div>
                    <van-field required v-model="sm" type="textarea" label="驳回说明" placeholder="请输入" rows="9" clearable/>
                </div>

                <footer>
                    <van-button class="cancelButton" size="normal" type="default" @click="operateShow = !operateShow">取消</van-button>
                    <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
                </footer>
            </div>
        </van-actionsheet>
    </div>

</template>

<script>
import questionlist from "@/components/question/questionlist.vue";
import emptyContent from "@/components/public/empty-content.vue";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      operateShow:false, // actionsheet 显示
      isLoading: false,
      loading: false,
      finished: false,
      questionList: [
        {
          bt: "Zyh测试1",
          lcMc: "总部产品受理",
          wtbh: "123123123",
          fbrq: "2018-08-08",
          fbrxm: "张三",
          ssbm: "所属部门",
          cpmc: "adssad",
          wid: "78b93bfcfbc943e5a3124075a0ecb94f"
        }
      ],
      sm: ""
    };
  },
  activated() {
    //    this.init();
  },
  methods: {
    // 查看详情
    handleCheckDetail(params) {
      this.$router.push({
        name: "questionDetail",
        query: { wid: params.wid, lc: params.lcMc }
      });
    },

    // 驳回或关闭
    handleCloseOrReject(type, params) {
      if (type == "reject") {
          this.operateShow = true;
      } else {
        this.$router.push({
            name: "closeQuestion",
            query: { wid: params.wid}
        });
      }
    },
    // 提交
    handleCommit(){
      if(!this.validDate()) return;
        this.$dialog.confirm({
            title: '提示',
            message: "您确定驳回吗?",
        }).then(() => {
          this.$toast.loading({mask: true,message: '提交中...',duration:0});
          this.$post(this.API.applyDismiss,{
            wid:'',
            zbwid: params.wid,
            sm:sm
          }).then(res=>{
              if(res.state == 'success'){
                this.$toast.clear();
                this.$toast('已驳回');   
                this.init();
              }else{
                this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
              }
          })    
        }).catch(() => {}); 
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
        this.queryAllQuestions();
      }, 800);
    },
    // 上拉刷新初始化
    init() {
      this.currentPage = 1;
      this.questionList = [];
      this.$store.dispatch("chnageLoing", true);
      this.queryAllQuestions();
    },

    // 获取申请关闭列表
    queryAllQuestions() {
      this.$get(this.API.queryAllQuestions, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        zt: "0",   // 处理中
        wtfl: "0", // 我提问的
        sqgb: 1    // 申请关闭
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
    },
    validDate(){
        if(!this.sm){
           this.$toast('请填写驳回说明'); 
           return false;
        }
        return true;
    }
  },
  components: { questionlist, emptyContent }
};
</script>

<style scoped>
</style>
