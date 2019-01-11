<template>
    <div>
        <div class="question-projectlist">
            <div>
                <searchInput @handleSearchKeyword="handleSearchKeyword" :place="'请输入项目编号/项目名称/合同编号'"></searchInput>
            </div>
            <div class="question-projectlist_content">
                <mu-container ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
                        <section v-for="item in listArr" @click="handleChooseItem(item)">
                            <div class="question-projectlist_detail">
                                <h5>{{item.xmmc}}</h5>
                                <div>
                                    <p>学校：{{item.dwmc}}</p>
                                    <p>项目状态：
                                        <van-tag round type="success">{{item.xmzt}}</van-tag>
                                    </p>
                                    <p>合同编号：{{item.htbh}}</p>
                                    <p>项目编号：{{item.xmbh}}</p>
                                </div>
                            </div>
                            <div class="question-projectlist_link">
                                <van-icon name="arrow" />
                            </div>
                        </section>
                    </mu-load-more>
                    <p v-if="finished && !!listArr.length" class="empty-content-tip">没有更多数据了</p>
                </mu-container>
                <div v-if="!listArr.length && !$store.state.loadingShow">
                    <emptyContent></emptyContent>
                </div>
            </div>
            <footer>
                <van-button size="normal" type="default" @click="handleClose">取消</van-button>
            </footer>
        </div>
    </div>
</template>

<script>
 import searchInput from "@/components/public/SearchInput.vue";
 import emptyContent from "@/components/public/empty-content.vue";
export default {
  data() {
    return {
      loading: false,
      isLoading: false,
      finished: false,
      currentPage: 1,
      pageSize: 12,
      keyword: "",
      listArr: []
    };
  },
  props: {},
  methods: {
    handleSearchKeyword(val) {
      this.keyword = val;
      this.init();
    },
    handleClose() {
      this.$emit("handleClose", "");
    },
    handleChooseItem(data) {
      this.$emit("handleChooseItem", data);
    },
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
        this.getProjects();
      }, 800);
    },
    // 上拉刷新初始化
    init() {
      this.currentPage = 1;
      this.listArr = [];
      this.$store.dispatch("chnageLoing", true);
      this.getProjects();
    },
    //获取项目
    getProjects() {
      this.$get(this.API.getProjects, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        xmlb: "",
        sfgx: "",
        // this.sfts?'1,2':'1,2,3'
        xmzt: "1,2,3",
        pl: ""
      }).then(res => {
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          this.total = res.data.total;
          if (this.isLoading || this.currentPage == 1) {
            this.listArr = res.data.rows;
          } else {
            this.listArr = this.listArr.concat(res.data.rows);
          }
          if (!res.data.rows) {
            this.listArr = [];
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
  mounted() {
    this.init()
  },
  components: { searchInput,emptyContent }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.question-projectlist {
  height: 100vh;
  width: 100vw;
  background: #f2f3f5;
}
.question-projectlist_content {
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 0.5rem 0;
  section {
    background: #fff;
    padding: 0.633333rem;
    border-bottom: 1.5px solid rgb(228, 225, 225);
    .flex(space-between,center);
    .question-projectlist_detail {
      width: 90%;
      h5 {
        margin-bottom: 0.3333rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        color: #999999;
        font-size: @fontSize12;
      }
    }
    .question-projectlist_link {
      width: 10%;
    }
  }
}
footer {
  text-align: center;
  button {
    width: 95%;
    border: none;
    margin: 0.5rem 0;
  }
}
</style>

