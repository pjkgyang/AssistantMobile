<template>
<div>
  <div class="assistant-question" v-if="false">
    <div class="weekReport-top-filter">
        <div class="weekReport-filter--input">
            <searchInput :place="'搜索学校/项目编号/项目名称/合同编号/项目经理'"></searchInput>
        </div>
        <div class="weekReport-filter--tabs">
            <span @click="hanldeSearchWtfl" >
              <span>{{wtflText}}</span>
            </span>
            丨
            <span @click="hanldeSearchWtzt" >
              <span>{{WtztText}}</span>
            </span>
            丨
            <span @click="hanldeSearchSqgb">
              <span>{{sqgbText}}</span>
            </span>
            丨
          <span class="filter_more"> 
              <a href="javaScript:;;">更多筛选</a>
          </span>
        </div>
      </div>

      <div>
        <questionlist></questionlist>
      </div>

      <!-- 添加问题 -->
      <addButton @handleAdd="handleAddQuestion" :bottom="'18vw'"></addButton>
      <!-- 筛选条件 -->
      <filterCondition :show="false"></filterCondition>

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
  <develop></develop>
 </div>
</template>

<script>
 import develop from '@/components/public/developing';
 import searchInput from "@/components/public/SearchInput.vue";
 import questionlist from '@/components/question/questionlist.vue';
 import addButton from '@/components/public/addButton';
 import filterCondition from '@/components/public/filterCondition'


 export default {
   data () {
     return {
       wtflPopshow:false,
       wtztPopshow:false,
       sqgbPopshow:false,
       wtflList:['全部','我的提问','待我解决问题','我相关的问题','我受理过的问题','待我受理的问题'],
       wtztList:['全部','处理中','已关闭'],
       sqgbList:['全部','否','是'],
       wtfl:'',
       wtzt:'0',
       sqgb:'',
       wtflText:'问题分类',
       WtztText:'处理中',
       sqgbText:'申请关闭',
       cpText:'产品'
     }
   },
   methods:{
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
       this.wtfl = values==0?'':values-1
       this.wtflPopshow = !this.wtflPopshow

     },
     //  问题状态确定
     hanldeSearchWtzt(){
        this.wtztPopshow = true;
        this.wtflPopshow =  this.sqgbPopshow = false;
     },
     hadnleWtztConfirm(picker,values){
       this.WtztText = picker;
       this.wtzt = values==0?'':values-1
       this.wtztPopshow = !this.wtztPopshow
     },
     //  申请关闭确定
     hanldeSearchSqgb(){
        this.sqgbPopshow = true;
        this.wtflPopshow = this.wtztPopshow  = false;
     },
     hadnleSqgbConfirm(picker,values){
       this.sqgbText = picker;
       this.sqgb = values==0?'':values-1
       this.sqgbPopshow = !this.sqgbPopshow
     },

     handleAddQuestion(){
       this.$router.push({path:'/addquestion'});
     }
   },
   components: {develop,searchInput,questionlist,addButton,filterCondition}
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
       color: @baseColor !important;
    }
  }
}

</style>
