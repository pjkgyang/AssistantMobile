<template>
  <div class="addweekquestion">
    <header>
      <van-search v-model="keyword" :background="'#fff'" placeholder="搜索项目编号/项目名称" @search="handleSearchKeyword" />
    </header>
    <main>

        <mu-container ref="container" class="demo-loadmore-content">
         <mu-load-more @refresh="onRefresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
          <van-checkbox-group v-model="result" @change="handleChangeCheckbox">
            <van-checkbox v-for="(item, index) in listArr" :key="item" :name="item">
              <div class="question-list">
                <h5>{{item.xmbh}} {{item.xmmc}}</h5>
                <div class="question-info">
                  <p>
                    <span>项目内容：</span>{{item.xmnr}}</p>
                  <p>
                    <span>里程碑描述：</span>{{item.lcbms}}</p>
                  <p>
                    <span>承诺完成日期：</span>{{item.cnwcrq}}</p>
                  <p>
                    <span>责任人：</span>{{item.zrrxm}}</p>
                </div>
              </div>
            </van-checkbox>
          </van-checkbox-group>
        </mu-load-more>
        <p v-if="finished && !!listArr.length" class="empty-content-tip">没有更多数据了</p>
      </mu-container>

      <div v-if="!listArr && !$store.state.loadingShow">
          <empty-content></empty-content>
      </div>
    </main>
    <footer>
      <van-button size="normal" type="default" @click="handleClose">取消</van-button>
      <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      keyword: "",
      result: [],
      lcbbhs: "",
      currentPage: 1,
      pageSize: 10,
      listArr: [],
    };
  },
  computed:{
    sign(){
      return this.$route.query.sign;
    }
  },
  watch:{
    sign(){
     this.lcbbhs = [];
     this.result = []
    }
  },
  methods: {
    // 上啦刷新
    onRefresh() {
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
        this.mapLcbxxForWeekPlan();
      }, 800);
    },
    // 关键字搜索
    handleSearchKeyword() {
      this.init();
    },
    // 取消选择
    handleClose() {
      this.$router.go(-1);
    },
    handleCommit() {
      if (!this.lcbbhs) {
        this.$toast({message:"请选择项目~",duration:1500});
        return;
      }
      this.$post(this.API.addWeekWorkPlan, {
        lcbbhs: this.lcbbhs,
        yhbh: this.yhbh,
        month: this.$route.query.month,
        zxh: this.$route.query.week
      }).then(res=>{
         if(res.state == 'success'){
            this.$toast.clear();
            this.$toast({message:'添加成功~',duration:2000});
            // this.$router.push({ name: "weekAdd", params: { bid:1} });
            this.$router.go(-1);
         }else{
           this.$toast(!res.msg?'请求超时，请稍后再试~':res.msg);
         }
      });
    },
    handleChangeCheckbox(val) {
      let lcbbhArr = [];
      val.forEach(ele => {
        lcbbhArr.push(ele.lcbbh);
      });
      this.lcbbhs = lcbbhArr.join(",");
    },
    // 上拉刷新初始化
    init() {
      this.currentPage = 1;
      this.listArr = [];
      this.$store.dispatch("chnageLoing", true);
      this.mapLcbxxForWeekPlan();
    },
    // 获取列表
    mapLcbxxForWeekPlan() {
      this.$get(this.API.mapLcbxxForWeekPlan, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        cnjssj: this.$route.query.lastDay,
        keyword: this.keyword
      }).then(res => {
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          if (this.isLoading || this.currentPage == 1) {
            this.listArr = res.data.page.rows;
          } else {
            this.listArr = this.listArr.concat(res.data.page.rows);
          }
          if(!res.data.page.rows){
            this.listArr = [];
          }
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          if (this.currentPage >= res.data.total) {
            this.finished = true;
          }else{
            this.finished = false;
          }
           this.currentPage += 1;
        } else {
          this.$store.dispatch("chnageLoing", false);
          this.$toast(res.msg);
        }
      });
    }
  },
  mounted(){
    this.yhbh = this.$store.state.userInfo.uid;
    this.init();
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.addweekquestion {
  .van-checkbox {
    border-bottom: 1px solid #eee;
    padding: 5px 0;
  }
  main {
    background: #fff;
    margin: 0.5rem 0;
    padding: 0 0.5rem;
    height: calc(100vh - 110px);
    overflow-y: auto;
    .question-list {
      width: calc(100vw - 50px);
      color: #333;
      h5 {
        width: 100%;
        .text-ellipsis();
      }
      .question-info {
        p {
          width: 100%;
          color: rgb(141, 139, 139);
          font-size: @fontSize12;
          .text-ellipsis();
        }
      }
    }
  }
}
</style>
