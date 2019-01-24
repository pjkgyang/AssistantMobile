<template>
  <div v-if="false">
    <div class="assistant-project" >
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
          <span @click="hanldeSearchFilter('gx')">
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
   
    <!-- <div class="layout-scroll" ref="layoutScroll"  @scroll="handleScroll" :scroll-top.prop="scrollTop">
        <mu-container ref="container" class="demo-loadmore-content" >
          <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
            <div class="layout-scroll-center" >
                 <projectList :projectList="projectList"></projectList>
            </div>
          </mu-load-more>
          <p v-if="finished && !!projectList.length" class="empty-content-tip">没有更多数据了</p>
        </mu-container>

        <div v-if="!projectList.length && !$store.state.loadingShow">
          <emptyContent></emptyContent>
        </div>
    </div> -->


  </div>

  <div v-else>
    <h1>开发中...</h1>
  </div>
</template>

<script>
 import searchInput from "@/components/public/SearchInput.vue";
 import projectList from '@/components/project/projectList.vue';
 export default {
  data() {
    return {
      xmflText:'项目分类',
      xmztText:'项目状态',
      xmlbText:'项目类别',
      gxText:'是否购销',
      projectList:[{
             xmmc:"南京农业大学学生工作信息化建设综合",
             xmbh:'UK123456',
             xmjl:'张三',
             htbh:'F342131231',
             jfzrrxm:'李四',
         }]
    };
  },
  methods:{
    // 关键字筛选
    handleSearchKeyword(){

    },
    // 条件筛选
    hanldeSearchFilter(){

    }
  },
  components: {searchInput,projectList}
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
  border-bottom: 1px solid  #D7D7D8;
  border-top: 1px solid  #D7D7D8;
    > span {
    display: inline-block;
    text-align: center;
    font-size: @fontSize12;
    display: @flex;
    align-items: center;
    justify-content: center;
  }
  .filter_more{
    a{
       color: #999999 !important;
       .flex(@col:center)
    }
  }
  .van-icon{
    transform: rotate(90deg);
  }
}

h1{
  text-align: center;
  line-height: 40vh;
}
</style>