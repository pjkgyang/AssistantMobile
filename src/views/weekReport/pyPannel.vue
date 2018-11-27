<template>
  <div>

    <div class="weekReview">
      <van-cell-group>
        <div class="weekReview_top">
          <h5>批阅</h5>
          <a href="javaScript:;;" @click="handleCheckRecord">查看批阅记录</a>
        </div>
        <van-field v-model="value" type="textarea" rows="4" autosize placeholder="请输入批阅内容" />
      </van-cell-group>
      <div class="weekReview_btn">
        <van-button type="default" @click="handleClose">取消</van-button>
        <van-button type="primary" class="commitButton">保存</van-button>
      </div>
    </div>

    <van-popup v-model="Popshow" position='right' >
      <div class="review_list">
        <time-line :list="recordList" v-if="recordList.length != 0"></time-line>
        <div class="assistant-back">
            <mu-button fab small color="red" @click="handleClosePop">
              <span>返回</span>
            </mu-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import timeLine from "@/components/taskLog/timeLine.vue";
export default {
  data() {
    return {
      Popshow:false,
      recordList:[{
        yhxm:'张三',
        ydsj:'2018-08-08 12:00:00',
        bz:'批批批批批批批批'
      },{
        yhxm:'张三疯',
        ydsj:'2018-08-08 12:00:00',
        bz:'批批批批批批批批阅批阅批阅批阅批阅批阅批阅'
      },{
        yhxm:'张四',
        ydsj:'2018-08-08 12:00:00',
        bz:'批批批批批批批批'
      }]
    };
  },
  methods: {
    handleClose() {
      this.$router.go(-1);
    },
    handleClosePop(){
      this.Popshow = !this.Popshow
    },
    handleCheckRecord(){
      this.Popshow = !this.Popshow
    }
  },
  components: {timeLine}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.weekReview {
  padding-top: 0.5rem;
  .weekReview_top {
    .flex(@row:space-between);
    padding: 8px 15px;
    a {
      font-size: @fontSize12;
      color: rgb(54, 125, 231);
    }
    border-bottom: 1px solid #ccc;
  }
  .weekReview_btn {
    margin-top: 2rem;
    text-align: center;
    button {
      border: none;
      width: 48%;
    }
  }
}
.review_list{
  width: 85vw;
  height: 100vh;
  overflow-y: auto;
}
</style>
