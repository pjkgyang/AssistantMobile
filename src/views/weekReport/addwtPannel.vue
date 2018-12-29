<template>
    <div class="addweekquestion">
        <header>
            <van-search v-model="keyword" :background="'#fff'" placeholder="搜索问题标题" @search="handleSearchKeyword" />
        </header>
        <main>
            <mu-container ref="container" class="demo-loadmore-content">
               <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
                    <van-checkbox-group v-model="result" @change="handleChangeCheckbox">
                        <van-checkbox v-for="(item, index) in listArr" :key="item" :name="item">
                            <div class="question-list">
                                <h5>{{item.bt}}</h5>
                                <div class="question-info">
                                    <span>{{item.fbrxm}}</span>
                                    <span>{{item.dwmc}}</span>
                                </div>
                            </div>
                        </van-checkbox>
                    </van-checkbox-group>
                </mu-load-more>
          </mu-container>

            <div v-if="listArr.length == 0 && !$store.state.loadingShow">
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
import emptyContent from '../../components/public/empty-content.vue'
export default {
  data() {
    return {
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      keyword: "",
      result: [],
      wtList: "",
      currentPage:1,
      pageSize:18,
      listArr: [],

      yhbh:''
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
        this.getQuestionForWeekPlan();
      }, 800);
    },
    // 关键字搜索
    handleSearchKeyword() {
      this.init();
    },
    handleClose() {
      this.$router.go(-1);
    },
    handleCommit() {
      if (!this.wtList) {
        this.$toast({message:"请选择问题~",duration:1500});
        return;
      }
      this.$post(this.API.addWeekQuestionPlan, {
        wids:this.wtList,
        month:this.$route.query.month,
        zxh:this.$route.query.week,
        yhbh:this.yhbh
      }).then(res=>{
         if(res.state == 'success'){
            this.$toast.success({message:'提交成功',duration:1500});
            this.$router.push({ name: "weekAdd", params: { bid:1} });
         }else{
           this.$toast(res.msg);
         }
      });
    },
    handleChangeCheckbox(val) {
      let widsArr = [];
      val.forEach(ele => {
        widsArr.push(ele.wtWid);
      });
      this.wtList = widsArr.join(",");
    },
    // 上拉刷新初始化
    init() {
      this.currentPage = 1;
      this.listArr = [];
      this.$store.dispatch("chnageLoing", true);
      this.getQuestionForWeekPlan();
    },

    // 获取问题列表
    getQuestionForWeekPlan(){
      this.$get(this.API.pageQuestionForWeekPlan,{
        curPage:this.currentPage,
        pageSize:this.pageSize,
        cnjssj:this.$route.query.lastDay,
        keyword:this.keyword
      }).then(res=>{
        if(res.state == 'success'){
          this.$store.dispatch("chnageLoing", false);
          if (this.isLoading || this.currentPage == 1) {
            this.listArr = res.data.rows;
          } else {
            this.listArr = this.listArr.concat(res.data.rows);
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
      })
    }

  },
  activated(){
    this.init();
    this.yhbh = window.userId
  },
  components: {emptyContent}
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
    overflow-y:auto;
    .question-list {
      width: calc(100vw - 50px);
      color: #333;
      h5 {
        width: 100%;
        .text-ellipsis();
      }
      .question-info {
        .flex();
        span:nth-of-type(1) {
          display: inline-block;
          width: 20%;
          color: rgb(141, 139, 139);
          font-size: @fontSize12;
        }
        span:nth-of-type(2) {
          display: inline-block;
          width: 75%;
          .text-ellipsis();
          color: #333;
          font-size: @fontSize14;
        }
      }
    }
  }
  footer {
    text-align: center;
    button {
      width: 48%;
      border: none;
    }
  }
}
</style>
