<template>
    <div class="addweekquestion">
        <header>
            <van-search v-model="keyword" :background="'#fff'" placeholder="搜索问题标题" @search="handleSearchKeyword" />
        </header>
        <main>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <van-checkbox-group v-model="result" @change="handleChangeCheckbox">
                        <van-checkbox v-for="(item, index) in list" :key="item" :name="item">
                            <div class="question-list">
                                <h5>{{item.bt}}</h5>
                                <div class="question-info">
                                    <span>{{item.fbrxm}}</span>
                                    <span>{{item.dwmc}}</span>
                                </div>
                            </div>
                        </van-checkbox>
                    </van-checkbox-group>
                </van-list>
            </van-pull-refresh>
            <div v-if="dataLoading && !this.loading" class="data_loading">
              <van-loading type="spinner" />
            </div>
            <div v-if="!list.length && !this.loading && !this.dataLoading">
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
      dataLoading:false,
      keyword: "",
      result: [],
      wtList: "",
      curPage:1,
      pageSize:18,
      list: [],

      yhbh:''
    };
  },
  methods: {
    // 上啦刷新
    onRefresh() {
      setTimeout(() => {
         this.init();
      }, 800);
    },
    // 异步更新数据
    onLoad() {
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
      this.curPage = 1;
      this.getQuestionForWeekPlan();
    },
    // 获取问题列表
    getQuestionForWeekPlan(){
      if( this.curPage == 1 && !this.loading){
         this.dataLoading = true;
      }
      this.$get(this.API.pageQuestionForWeekPlan,{
        curPage:this.curPage,
        pageSize:this.pageSize,
        cnjssj:this.$route.query.lastDay,
        keyword:this.keyword
      }).then(res=>{
        if(res.state == 'success'){
          if (this.isLoading || this.curPage == 1) {
            this.list = res.data.rows;
          } else {
            this.list = this.list.concat(res.data.rows);
          }
          // 加载状态结束
          this.dataLoading = false;
          this.loading = false;
          this.isLoading = false;
          if (this.curPage >= res.data.total) {
            this.finished = true;
          }else{
            this.finished = false;
          }
          this.curPage += 1;
        } else {
          this.dataLoading = false;
          this.$toast(res.msg);
        }
      })
    }

  },
  mounted(){
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
