<template>
<div>
  <div class="assistant-question" >
    <div class="weekReport-top-filter">
        <div class="weekReport-filter--input">
            <searchInput @handleSearchKeyword="handleSearchKeyword" :place="'搜索学校/项目编号/项目名称/合同编号/问题编号'"></searchInput>
        </div>
        <div class="weekReport-filter--tabs">
            <span @click="hanldeSearchWtfl" >
              <span>{{wtflText}}</span>&nbsp;&nbsp;<van-icon name="arrow" />
            </span>
            丨
            <span @click="hanldeSearchWtzt" >
              <span>{{WtztText}}</span>&nbsp;&nbsp;<van-icon name="arrow" />
            </span>
            丨
            <span @click="hanldeSearchSqgb">
              <span>{{sqgbText}}</span>&nbsp;&nbsp;<van-icon name="arrow" />
            </span>
            丨
          <span class="filter_more" @click="handleCheckFilter"> 
              <a href="javaScript:;;" >更多筛选 &nbsp;<mu-icon size="14" value="filter_list"></mu-icon></a>
          </span>
        </div>
      </div>
      
      <!-- 问题列表 -->
      <div class="layout-scroll">
        <mu-container ref="container" class="demo-loadmore-content" >
          <mu-load-more @refresh="refresh" :loaded-all="finished" :refreshing="isLoading" :loading="loading" @load="onLoad">
            <div class="layout-scroll-center">
                <questionlist :questionList="questionList" @handleCheckDetail="handleCheckDetail"></questionlist>
            </div>
          </mu-load-more>
          <p v-if="finished && !!questionList.length" class="empty-content-tip">没有更多数据了</p>
        </mu-container>

        <div v-if="!questionList.length && !$store.state.loadingShow">
          <emptyContent></emptyContent>
        </div>
      </div>

      <!-- 添加问题 -->
      <addButton @handleAdd="handleAddQuestion" :bottom="'18vw'"></addButton>
      <!-- 筛选条件 -->
      <filterCondition :show="filterShow" @handleClose="handleCheckFilter"></filterCondition>

      <van-popup v-model="wtflPopshow" position='bottom' >
        <van-picker show-toolbar title="问题分类" :columns="wtflList" @cancel="handleCancel" @confirm="hadnleWtflConfirm" />
      </van-popup>
      <van-popup v-model="wtztPopshow" position='bottom' >
        <van-picker show-toolbar title="问题状态" :columns="wtztList" @cancel="handleCancel" @confirm="hadnleWtztConfirm" :defaultIndex="1"/>
      </van-popup>
      <van-popup v-model="sqgbPopshow" position='bottom' >
        <van-picker show-toolbar title="申请关闭" :columns="sqgbList" @cancel="handleCancel" @confirm="hadnleSqgbConfirm" />
      </van-popup>
  </div>
  <!-- <develop></develop> -->
 </div>
</template>

<script>
 import develop from '@/components/public/developing';
 import searchInput from "@/components/public/SearchInput.vue";
 import questionlist from '@/components/question/questionlist.vue';
 import addButton from '@/components/public/addButton';
 import filterCondition from '@/components/public/filterCondition'
import emptyContent from "@/components/public/empty-content.vue";

 export default {
   data () {
     return {
       wtflPopshow:false,
       wtztPopshow:false,
       sqgbPopshow:false,
       filterShow:false,//更多筛选
       wtflList:['全部','我的提问','待我解决问题','我相关的问题','我受理过的问题','待我受理的问题'],
       wtztList:['全部','处理中','已关闭'],
       sqgbList:['全部','否','是'],
       wtfl:'',//问题分类
       wtzt:'0',//问题状态
       sqgb:'', //申请关闭
       keyword:'',
       wtflText:'问题分类',
       WtztText:'处理中',
       sqgbText:'申请关闭',
       cpText:'产品',
       currentPage:1,
       pageSize:10,
       questionList:[],
       isLoading:false,
       loading:false,
       finished:false,

     }
   },
   mounted(){
     this.init();
   },
   methods:{
    //  查看问题详情
     handleCheckDetail(params){
       this.$router.push({path:'questiondetail',query:{wid:params.wid}})
     },
    //  关闭pop
     handleCancel(){
       this.wtflPopshow = this.wtztPopshow = this.sqgbPopshow = false;
     },
    //  问题分类确定
     hanldeSearchWtfl(){
        this.wtflPopshow = true;
        this.wtztPopshow = this.sqgbPopshow = false;
     },
     hadnleWtflConfirm(picker,values){
       this.wtflText = picker;
       this.wtfl = values==0?'':values-1;
       this.wtflPopshow = !this.wtflPopshow;
       this.init();
     },

     //  问题状态确定
     hanldeSearchWtzt(){
        this.wtztPopshow = true;
        this.wtflPopshow =  this.sqgbPopshow = false;
     },
     hadnleWtztConfirm(picker,values){
       this.WtztText = picker;
       this.wtzt = values==0?'':values-1;
       this.wtztPopshow = !this.wtztPopshow;
       this.init();
     },

     //  申请关闭确定
     hanldeSearchSqgb(){
        this.sqgbPopshow = true;
        this.wtflPopshow = this.wtztPopshow  = false;
     },
     hadnleSqgbConfirm(picker,values){
       this.sqgbText = picker;
       this.sqgb = values==0?'':values-1
       this.sqgbPopshow = !this.sqgbPopshow;
       this.init();
     },
     // 更多筛选(取消筛选)
     handleCheckFilter(){
       this.filterShow = !this.filterShow;
     },
    // 添加问题
     handleAddQuestion(){
       this.$router.push({path:'/addquestion'});
     },

/**
 *   问题列表操作
 */
    // 关键字查询
    handleSearchKeyword(val){
      this.keyword = val;
      this.init();
    },
    // 上啦刷新
    refresh () {
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.init();
      }, 1500)
    },
    // 异步更新数据
    onLoad() {
      this.loading = true;
      setTimeout(() => {
        this.getQuestionList();
      }, 800);
    },
    // 上拉刷新初始化
    init() {
      this.currentPage = 1;
      this.questionList = [];
      this.$store.dispatch("chnageLoing", true);
      this.getQuestionList();
    },
    //  获取问题列表
     getQuestionList(){
       this.$get(this.API.queryAllQuestions,{
         curPage:this.currentPage,
         pageSize:this.pageSize,
         zt:this.wtzt,//问题状态
         wtfl:this.wtfl,
         sqgb:this.sqgb,
         cp:'',
         keyword:this.keyword
       }).then(res=>{
         if (res.state == "success") {
          this.$store.dispatch("chnageLoing", false);
          this.total = res.data.total;
          if (this.isLoading || this.currentPage == 1) {
            this.questionList = res.data.rows;
          } else {
            this.questionList = this.questionList.concat(res.data.rows);
          }
          if(!res.data.rows){
            this.questionList = [];
          }
          // 加载状态结束
          this.loading = false;
          this.isLoading = false;
          if (this.currentPage >= this.total) {
             this.finished = true;
          }else{
             this.finished = false;
          }
          this.currentPage += 1;
        } else {
          this.$store.dispatch("chnageLoing", false);
          this.$toast(!res.msg?'系统超时，请稍后再试~':res.msg);
        }
       })
     }
   },
   components: {develop,searchInput,questionlist,addButton,filterCondition,emptyContent}
 }
</script>

<style lang="less" scoped>
@import "../../index.less";
.weekReport-top-filter {
  background: #fff;
  box-shadow: 0 2px 5px #eee;
  position: relative;
}
.weekReport-filter--input {
  padding: 0.5rem;
}
.weekReport-filter--tabs {
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

</style>
