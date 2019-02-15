<template>
  <div>
    <div class="assistant-project">
      <div class="project-top-filter">
        <div class="project-filter--input">
          <searchInput @handleSearchKeyword="handleSearchKeyword" :place="'搜索项目内容/里程碑描述/责任人'"></searchInput>
        </div>
      </div>
    </div>

    <div class="project-milestone" ref="layoutScroll">
      <mu-container ref="container" class="demo-loadmore-content">
        <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
          <div class="project-milestone-list">
             <section v-for="item in milestoneList">
                 <div>
                   <div><h5><span class="color999 font12 fontW400">项目内容：</span>{{item.xmnr}}</h5></div>
                   <div flex><span class="color999 font12">里程碑：</span><h5>{{item.lcbms}}</h5></div>
                 </div>
                 <div class="font12">
                     <p>
                         <span class="color999">里程碑状态：</span>
                         <van-tag round :type="item.zt == 4||item.zt == 5||item.zt == 6?'danger':item.zt == 3||item.zt == 9?'success':'primary'">
                             {{item.zt==1?'计划中':item.zt==2?'处理中':item.zt==3?'已完成':item.zt==4?'停滞':item.zt==5?'关闭':item.zt==6?'取消':item.zt==7?'待定':'完成待确认'}}
                         </van-tag>
                     </p>
                     <p><span class="color999">责任人：</span>{{item.zzrxm}}</p>
                     <p><span class="color999">承诺结束日期：</span>{{!item.cnjssj?'无':item.cnjssj}}</p>
                     <p><span class="color999">实际结束日期：</span>{{!item.sjjssj?'无':item.sjjssj}}</p>
                 </div>
             </section>    
          </div>
        </mu-load-more>
        <p v-if="finished && !!milestoneList.length" class="empty-content-tip">没有更多数据了</p>
      </mu-container>

      <div v-if="!milestoneList.length && !$store.state.loadingShow">
        <emptyContent></emptyContent>
      </div>
    </div>

  </div>

  <!-- <div v-else>
    <h1>开发中...</h1>
  </div> -->
</template>

<script>
import searchInput from "@/components/public/SearchInput.vue";
import emptyContent from "@/components/public/empty-content.vue";
export default {
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      keyword: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      milestoneList: [],
      
      cpbh:''
    };
  },
  mounted() {
  },
  activated() {
    if(this.cpbh != this.$route.query.cpbh){
       this.init();
    }
    this.cpbh = this.$route.query.cpbh;
  },
  methods: {
    // 关键字筛选
    handleSearchKeyword(val) {
      this.keyword = val;
      this.init();
    },
    handleCancel() {
      this.xmflPopshow = this.xmztPopshow = this.xmlbPopshow = this.sfgxPopshow = false;
    },

// 上啦刷新
    refresh() {
      this.isLoading = true;
      // this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.currentPage = 1;
        this.getProject();
      }, 500);
    },
    // 异步更新数据
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        this.getProject();
      }, 300);
    },

    init() {
      this.currentPage = 1;
      this.milestoneList = [];
      this.$store.dispatch("chnageLoing", true);
      this.getProject();
    },
    getProject() {
      this.$get(this.API.pageMilestoneVO, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        xmbh: this.$route.query.xmbh,
        cpbh: this.$route.query.cpbh,
        cpmc: this.$route.query.cpmc,
        zt: ''
      }).then(res => {
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          this.total = res.data.total;
          if (this.isLoading || this.currentPage == 1) {
            this.milestoneList = res.data.rows;
          } else {
            this.milestoneList = this.milestoneList.concat(res.data.rows);
          }
          if (!res.data.rows) {
            this.milestoneList = [];
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
  components: { searchInput, emptyContent }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.project-top-filter {
  background: #fff;
  box-shadow: 0 2px 5px #eee;
  position: relative;
}
.project-filter--input {
  padding: 0.5rem;
}
.project-milestone{
  height: calc(100vh - 62px);
  overflow-y: auto;
  margin-top:0.3rem ;
  border-top: 1px solid rgb(230, 227, 227);
  .project-milestone-list{
    section{
        background: #fff;
        padding: 0.5rem;
        border-bottom: 1px solid rgb(230, 227, 227);
        p{
            margin: 0.2rem;
        }
    }
  }
}
</style>