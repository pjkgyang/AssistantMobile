<template>
  <div class="addweekquestion">
    <header>
      <van-search v-model="keyword" :background="'#fff'" placeholder="搜索项目编号/项目名称" @search="handleSearchKeyword" />
    </header>
    <main>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <van-checkbox-group v-model="result" @change="handleChangeCheckbox">
            <van-checkbox v-for="(item, index) in list" :key="item" :name="item">
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
export default {
  data() {
    return {
      isLoading: false, //上啦刷新
      loading: false,
      finished: false,
      dataLoading:false,
      keyword: "",
      result: [],
      lcbbhs: "",
      curPage: 1,
      pageSize: 10,
      list: []
    };
  },
  methods: {
    // 上啦刷新
    onRefresh() {
      setTimeout(() => {
        this.init();
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.mapLcbxxForWeekPlan();
      }, 500);
    },
    // 关键字搜索
    handleSearchKeyword() {
      this.init();
    },
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
            this.$toast.success({message:'提交成功',duration:1500});
            this.$router.push({ name: "weekAdd", params: { bid:1} });
         }else{
           this.$toast(res.msg);
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
      this.curPage = 1;
      this.mapLcbxxForWeekPlan();
    },
    // 获取列表
    mapLcbxxForWeekPlan() {
      if( this.curPage == 1 && !this.loading){
        this.dataLoading = true;
      }
      this.$get(this.API.mapLcbxxForWeekPlan, {
        curPage: this.curPage,
        pageSize: this.pageSize,
        cnjssj: this.$route.query.lastDay,
        keyword: this.keyword
      }).then(res => {
        if (res.state == "success") {
          if (this.isLoading || this.curPage == 1) {
            this.list = res.data.page.rows;
          } else {
            this.list = this.list.concat(res.data.page.rows);
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
      });
    }
  },
  mounted(){
    this.yhbh = window.userId
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
  footer {
    text-align: center;
    button {
      width: 48%;
      border: none;
    }
  }
}
</style>
