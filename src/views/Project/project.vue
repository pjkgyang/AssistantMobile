<template>
  <div >
    <div class="assistant-project">
      <div class="project-top-filter">
        <div class="project-filter--input">
          <searchInput @handleSearchKeyword="handleSearchKeyword" :place="'搜索学校/项目编号/项目名称/合同编号/项目经理'"></searchInput>
        </div>
        <div class="project-filter--tabs">
          <span @click="hanldeSearchFilter('xmfl')">
            <span>{{xmflText}}</span>&nbsp;&nbsp;
            <van-icon name="arrow" />
          </span>
          丨
          <span @click="hanldeSearchFilter('xmzt')">
            <span>{{xmztText}}</span>&nbsp;&nbsp;
            <van-icon name="arrow" />
          </span>
          丨
          <span @click="hanldeSearchFilter('xmlb')">
            <span>{{xmlbText}}</span>&nbsp;&nbsp;
            <van-icon name="arrow" />
          </span>
          丨
          <span @click="hanldeSearchFilter('sfgx')">
            <span>{{gxText}}</span>&nbsp;&nbsp;
            <van-icon name="arrow" />
          </span>
          <!-- <span class="filter_more" @click="handleCheckFilter">
            <a href="javaScript:;;">更多筛选 &nbsp;
              <mu-icon size="14" value="filter_list"></mu-icon>
            </a>
          </span> -->
        </div>
      </div>
    </div>

    <div class="layout-scroll" ref="layoutScroll" @scroll="handleScroll" :scroll-top.prop="scrollTop">
      <mu-container ref="container" class="demo-loadmore-content">
        <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
          <div class="layout-scroll-center">
            <projectList :projectList="projectList" @handleCheckDetail="handleCheckDetail"></projectList>
          </div>
        </mu-load-more>
        <p v-if="finished && !!projectList.length" class="empty-content-tip">没有更多数据了</p>
      </mu-container>

      <div v-if="!projectList.length && !$store.state.loadingShow">
        <emptyContent></emptyContent>
      </div>
    </div>

    <van-popup v-model="xmflPopshow" position='bottom'>
      <van-picker show-toolbar title="项目分类" :columns="xmflList" @cancel="handleCancel" @confirm="hadnleXmflConfirm" />
    </van-popup>
    <van-popup v-model="xmztPopshow" position='bottom'>
      <van-picker show-toolbar title="项目状态" :columns="xmztList" @cancel="handleCancel" @confirm="hadnleXmztConfirm" :defaultIndex="1" />
    </van-popup>
    <van-popup v-model="xmlbPopshow" position='bottom'>
      <van-picker show-toolbar title="项目类别" :columns="xmlbList" @cancel="handleCancel" @confirm="hadnleXmlbConfirm" />
    </van-popup>
    <van-popup v-model="sfgxPopshow" position='bottom'>
      <van-picker show-toolbar title="是否购销" :columns="sfgxList" @cancel="handleCancel" @confirm="hadnleSfgxConfirm" />
    </van-popup>
  </div>

  <!-- <div v-else>
    <h1>开发中...</h1>
  </div> -->
</template>

<script>
import searchInput from "@/components/public/SearchInput.vue";
import projectList from "@/components/project/projectList.vue";
import emptyContent from "@/components/public/empty-content.vue";
export default {
  data() {
    return {
      xmflPopshow: false, //项目分类
      xmztPopshow: false, //项目状态
      xmlbPopshow: false, //项目类别
      sfgxPopshow: false, //是否购销

      isLoading: false,
      loading: false,
      finished: false,
      xmflText: "项目分类",
      xmztText: "项目状态",
      xmlbText: "项目类别",
      gxText: "是否购销",

      xmflList: [
        "全部",
        "收藏项目",
        "高风险项目",
        "我拥有的项目",
        "我参与的项目",
        "已关闭的项目"
      ],
      xmztList: ["全部", "在建", "售后", "过保", "已关闭"],
      xmlbList: ["全部", "软件", "集成", "服务"],
      sfgxList: ["全部", "是", "否"],

      filter: {
        xmfl: "",
        xmzt: "",
        xmlb: "",
        sfgx: ""
      },
      keyword: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      projectList: [],

      scrollTop: ""
    };
  },
  mounted() {
    this.init();
  },
  activated(){
    this.$store.dispatch("chnageMark", false);
    var p = document.getElementsByClassName('layout-scroll')[0];
    this.$nextTick(function(){
       p.scrollTop = this.scrollTop;
    })
  },
  methods: {
    handleCheckDetail(params){
      this.$router.push({path:'/project/projectDetail',query:{xmbh:params.xmbh}});
    },

    // 项目分类
    hadnleXmflConfirm(picker, values) {
      this.xmflText = values == 0 ? "项目分类" : picker;
      this.filter.xmfl = values == 0 ? "" : values;
      this.xmflPopshow = false;
      this.init();
    },
    // 项目状态
    hadnleXmztConfirm(picker, values) {
      this.xmztText = values == 0 ? "项目状态" : picker;
      this.filter.xmzt = values == 0 ? "" : values;
      this.xmztPopshow = false;
      this.init();
    },
    // 项目类别
    hadnleXmlbConfirm(picker, values) {
      this.filter.xmlb = this.xmlbText = values == 0 ? "项目类别" : picker;
      this.xmlbPopshow = false;
      this.init();
    },
    // 是否购销
    hadnleSfgxConfirm(picker, values) {
      this.sfgxText = values == 0 ? "是否购销" : picker;
      this.filter.sfgx = values == 0 ? "" : values == 2 ? 0 : 1;
      this.sfgxPopshow = false;
      this.init();
    },
    // 关键字筛选
    handleSearchKeyword(val) {
      this.keyword = val;
      this.init();
    },
    handleCancel() {
      this.xmflPopshow = this.xmztPopshow = this.xmlbPopshow = this.sfgxPopshow = false;
    },
    // 条件筛选
    hanldeSearchFilter(data) {
      switch (data) {
        case "xmfl":
          this.xmflPopshow = true;
          break;
        case "xmzt":
          this.xmztPopshow = true;
          break;
        case "xmlb":
          this.xmlbPopshow = true;
          break;
        case "sfgx":
          this.sfgxPopshow = true;
          break;
        default:
          break;
      }
    },
    handleScroll() {
      this.$nextTick(() => {
        this.scrollTop = this.$refs.layoutScroll.scrollTop;
      });
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
      this.projectList = [];
      this.$store.dispatch("chnageLoing", true);
      this.getProject();
    },
    getProject() {
      this.$get(this.API.getProjectsForMobile, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        xmzt: this.filter.xmzt,
        xmlb: this.filter.xmlb,
        sfgx: this.filter.sfgx,
        pl: this.filter.xmfl
      }).then(res => {
        if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          this.total = res.data.total;
          if (this.isLoading || this.currentPage == 1) {
            this.projectList = res.data.rows;
          } else {
            this.projectList = this.projectList.concat(res.data.rows);
          }
          if (!res.data.rows) {
            this.projectList = [];
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
  components: { searchInput, projectList,emptyContent }
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
.project-filter--tabs {
  padding: 8px 0;
  .flex(@row:space-around,@col:center);
  color: #999999;
  border-bottom: 1px solid #d7d7d8;
  border-top: 1px solid #d7d7d8;
  > span {
    display: inline-block;
    text-align: center;
    font-size: @fontSize12;
    display: @flex;
    align-items: center;
    justify-content: center;
  }
  .filter_more {
    a {
      color: #999999 !important;
      .flex(@col:center);
    }
  }
  .van-icon {
    transform: rotate(90deg);
  }
}

h1 {
  text-align: center;
  line-height: 40vh;
}
</style>