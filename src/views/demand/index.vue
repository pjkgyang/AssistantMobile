<template>
  <div>
    <div class="assistant-demand">
      <div class="demand-top-filter">
        <div class="demand-filter--input">
          <searchInput
            @handleSearchKeyword="handleSearchKeyword"
            :place="'请输入提出人姓名/工号/手机号/标题/项目编号/项目名称'"
          ></searchInput>
        </div>
        <div class="demand-filter--tabs">
          <span @click="hanldeSearchFilter('xqfl')">
            <span>{{xqflText}}</span>&nbsp;&nbsp;
            <van-icon name="arrow" />
          </span>
          丨
          <span @click="hanldeSearchFilter('cxzt')">
            <span>{{cxztText}}</span>&nbsp;&nbsp;
            <van-icon name="arrow" />
          </span>
          丨
          <span @click="hanldeSearchFilter('xqlx')">
            <span>{{xqlxText}}</span>&nbsp;&nbsp;
            <van-icon name="arrow" />
          </span>
        </div>
      </div>

      <!-- 问题列表 -->
      <div class="layout-scroll" ref="layoutScroll" @scroll="handleScroll" style="height:calc(100vh - 110px);">
        <mu-container ref="container" class="demo-loadmore-content">
          <mu-load-more
            @refresh="refresh"
            :loaded-all="finished"
            :refreshing="isLoading"
            :loading="loading"
            @load="onLoad"
          >
            <div class="layout-scroll-center">
              <demandList :demandList="demandList" @handleCheckDetail="handleCheckDetail"></demandList>
            </div>
          </mu-load-more>
          <p v-if="finished && !!demandList.length" class="empty-content-tip">没有更多数据了</p>
        </mu-container>

        <div v-if="!demandList.length && !$store.state.loadingShow">
          <emptyContent></emptyContent>
        </div>
      </div>

      <!-- <addButton  :bottom="'18vw'"></addButton> -->
      <van-popup v-model="xqflPopshow" position="bottom">
        <van-picker
          show-toolbar
          title="需求分类"
          :columns="xqflList"
          @cancel="handleCancel"
          @confirm="hadnleXqflConfirm"
        />
      </van-popup>
      <van-popup v-model="cxztPopshow" position="bottom">
        <van-picker
          show-toolbar
          title="查询状态"
          :columns="xqztList"
          @cancel="handleCancel"
          @confirm="hadnleCxztConfirm"
          :defaultIndex="1"
        />
      </van-popup>
      <van-popup v-model="xqlxPopshow" position="bottom">
        <van-picker
          show-toolbar
          title="需求类型"
          :columns="xqlxList"
          @cancel="handleCancel"
          @confirm="hadnleXqlxConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import searchInput from "@/components/public/SearchInput.vue";
import demandList from "@/components/demand/demandList.vue";
import addButton from "@/components/public/addButton";
import emptyContent from "@/components/public/empty-content.vue";
import { getMenu, getSession } from "@/utils/util.js";


export default {
  data() {
    return {
      xqflPopshow: false,
      cxztPopshow: false,
      xqlxPopshow: false,
      filterShow: false, //更多筛选
      xqflList: [],
      xqztList: [],
      xqlxList: [],
      xqfl: "", //问题分类
      cxzt: "", //问题状态
      xqlx: "", //申请关闭
      keyword: "",
      xqflText: "需求分类",
      cxztText: "查询状态",
      xqlxText: "需求类型",
      currentPage: 1,
      pageSize: 10,
      demandList: [],
      isLoading: false,
      loading: false,
      finished: false,

      filterData: {},
      scrollTop: 0
    };
  },
  mounted() {
    this.getDictEnum();
    window.addEventListener("popstate", this.historyChange);
  },
  beforeDestroy() {
    window.removeEventListener("popstate", this.historyChange);
  },
  activated() {
    if (!this.$store.state.mark) {
      this.init();
    }
    this.$store.dispatch("chnageMark", false);
    this.$nextTick(function() {
      this.$refs.layoutScroll.scrollTop = this.scrollTop;
    });
  },

  methods: {
    //  记录滚动位置
    handleScroll() {
      this.scrollTop = this.$refs.layoutScroll.scrollTop;
    },
    // 监听返回
    historyChange() {
      if (this.filterShow) {
        history.pushState("", null, "#/demand");
        this.filterShow = false;
      }
    },
    //  查看问题详情
    handleCheckDetail(params) {
      this.$router.push({ path: "/demand/detail", query: { wid: params.wid } });
    },
    //  关闭pop
    handleCancel() {
      this.xqflPopshow = this.cxztPopshow = this.xqlxPopshow = false;
    },
    // 筛选条件选择
    hanldeSearchFilter(params) {
      if (params == "xqfl") {
        this.xqflPopshow = true;
        this.cxztPopshow = this.xqlxPopshow = this.filterShow = false;
      } else if (params == "cxzt") {
        this.cxztPopshow = true;
        this.xqflPopshow = this.xqlxPopshow = this.filterShow = false;
      } else if (params == "xqlx") {
        this.xqlxPopshow = true;
        this.xqflPopshow = this.cxztPopshow = this.filterShow = false;
      }
    },
    hadnleXqflConfirm(picker, values) {
      this.xqflText = picker.text;
      this.xqfl = picker.id;
      this.xqflPopshow = !this.xqflPopshow;
      this.init();
    },

    hadnleCxztConfirm(picker, values) {
      this.cxztText = picker.text;
      this.cxzt = picker.id;
      this.cxztPopshow = !this.cxztPopshow;
      this.init();
    },
    hadnleXqlxConfirm(picker, values) {
      this.xqlxText = picker.text;
      this.xqlx = picker.id;
      this.xqlxPopshow = !this.xqlxPopshow;
      this.init();
    },
    // 更多筛选(取消筛选)
    handleCheckFilter() {
      this.filterShow = !this.filterShow;
    },
    //  产品筛选（暂时）
    hanleChoosefilter(params) {
      this.filterData.cp = params;
      this.init();
      this.filterShow = false;
    },

    // 添加问题(判断是否有申请关闭)；
    handleAddQuestion() {
      this.$post(this.API.canSubmitQuestion, {}).then(res => {
        if (res.state == "success") {
          if (res.data >= 1) {
            this.$dialog
              .confirm({
                title: "提示",
                confirmButtonText: "前去处理",
                cancelButtonText: "暂不处理",
                message:
                  "您有" +
                  res.data +
                  "个问题申请关闭，请根据问题处理情况驳回或者关闭，处理之后可以继续提问，谢谢支持"
              })
              .then(() => {
                this.$router.push({ name: "xqlxList" });
              })
              .catch(() => {});
          } else {
            this.$router.push({ path: "/adddemand" });
          }
        } else {
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
        }
      });
    },

    /**
     *   问题列表操作
     */
    // 关键字查询
    handleSearchKeyword(val) {
      this.keyword = val;
      this.init();
    },
    // 上啦刷新
    refresh() {
      this.isLoading = true;
      setTimeout(() => {
        this.currentPage = 1;
        this.queryPageDemands();
      }, 500);
    },
    // 异步更新数据
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        this.queryPageDemands();
      }, 300);
    },
    // 上拉刷新初始化
    init() {
      this.currentPage = 1;
      this.demandList = [];
      this.$store.dispatch("chnageLoing", true);
      this.queryPageDemands();
    },
    //  获取问题列表
    queryPageDemands() {
      this.$refs.layoutScroll.scrollTop = this.scrollTop;
      this.$get(this.API.queryPageDemands, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xqzt: this.cxzt, //问题状态
        xqxglx: this.xqfl,
        xqlx: this.xqlx,
        isDemandLibrary:'',
        keyword: this.keyword
      }).then(res => {
          if (res.state == "success") {
            this.$store.dispatch("chnageLoing", false);
            this.total = res.data.total;
            if (this.isLoading || this.currentPage == 1) {
              this.demandList = res.data.rows;
            } else {
              this.demandList = this.demandList.concat(res.data.rows);
            }
            if (!res.data.rows) {
              this.demandList = [];
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
        })
        .catch(error => {});
    },

    // 获取枚举
    getDictEnum() {
        let _this  = this;
      //获取需求分类
        this.xqflList = [{text:'全部',id:''}];
        this.xqztList = [{text:'全部',id:''}];
        this.xqlxList = [{text:'全部',id:''}];
        this.$get(this.API.getDictEnum,{
            name: 'DemandRelatedType'
        }).then(res=>{
            Object.keys(res.data).forEach(function(key){
                _this.xqflList.push({text:res.data[key],id:key});
            });
        })

        this.$get(this.API.getDictEnum,{
            name: 'DemandStatus'
        }).then(res=>{
            Object.keys(res.data).forEach(function(key){
                _this.xqztList.push({text:res.data[key],id:key});
            });
        })

        this.$get(this.API.getDictEnum,{
            name: 'DemandType'
        }).then(res=>{
            Object.keys(res.data).forEach(function(key){
                _this.xqlxList.push({text:res.data[key],id:key});
            });
        })
    }
  },
  components: {
    searchInput,
    demandList,
    addButton,
    emptyContent
  }
};
</script>

<style lang="less" scoped>
@import "../../index.less";

.demand-top-filter {
  background: #fff;
  box-shadow: 0 2px 5px #eee;
  position: relative;
}
.demand-filter--input {
  padding: 0.5rem;
}
.demand-filter--tabs {
  padding: 8px 0;
  .flex(@row:space-around, @col:center);
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
</style>
