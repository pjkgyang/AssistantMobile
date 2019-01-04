<template>
  <div class="assisant-tasklog-detail">
    <div class="tasklog-detail-content">
      <h5>日报内容</h5>
      <div class="tasklog-detail-content-info">
        <p>
          <span>填报人</span> {{logDetail.cjrxm}}</p>
        <p>
          <span>日报日期</span> {{logDetail.gcrq}}</p>
        <p>
          <span>填写时间</span> {{logDetail.cjsj}}</p>
        <p>
          <span>项目名称</span> {{logDetail.xmmc==''?'无':logDetail.xmmc}}</p>
        <p>
          <span>产品名称</span> {{logDetail.cpmc==''?'无':logDetail.cpmc}}</p>
        <p>
          <span>任务名称</span> {{logDetail.rwmc==''?'无':logDetail.rwmc}}</p>
        <p>
          <span>工时</span> {{logDetail.gs}}</p>
        <p>
          <span>工作内容</span> {{logDetail.gcms}}</p>
      </div>
    </div>
    <!-- <div>
            <h5>附件</h5>
        </div> -->
    <div class="tasklog-detail-approval">
      <h5>审批意见
        <span v-if="unitType == 0&&logDetail.ydzt != 2" @click="handleCheckPZ">查看批注列表</span>
      </h5>
      <div v-if="logDetail.ydzt != 2">
        <!-- <x-textarea placeholder="请填写审批意见" :rows='8' v-model="SPvalue" :show-counter="true" :max="200"></x-textarea> -->
        <van-field v-model="SPvalue" type="textarea" placeholder="请填写审批意见" rows="4" autosize />
      </div>
      <div class="tasklog-detail-pzlist" v-if="logDetail.ydzt == 2">
        <time-line :list="pzList" v-if="pzList.length != 0"></time-line>
        <p v-if="pzList.length == 0" class="tasklog-detail-nopz">暂无审批意见</p>
      </div>
    </div>
    <div class="tasklog-detail-btn">
      <div>
        <van-button type="default" @click="handleCancel">取消</van-button>
      </div>
      <div v-if="logDetail.ydzt != 2">
        <van-button class="commitButton" :loading="commitloanind" type="primary" @click="handleCommit">提交</van-button>
      </div>
    </div>
    
    <van-popup v-model="pzListVisible" position="right" :overlay="true" :close-on-click-overlay="true">
      <div class="tasklog-detail-pzpop">
        <div class="tasklog-pzpop-pz ">
          <time-line :list="pzList" v-if="pzList.length != 0"></time-line>
          <emptyContent v-if="pzList.length == 0"></emptyContent>
        </div>
        <div class="assistant-back">
          <mu-button fab small color="red" @click="handleBack">
            <span>返回<br>上级</span>
          </mu-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Cbutton from "@/components/public/Button.vue";
import emptyContent from "@/components/public/empty-content.vue";
import timeLine from "@/components/taskLog/timeLine.vue";
import { XTable } from "vux";
export default {
  data() {
    return {
      pzListVisible: false,
      commitloanind:false,
      logDetail: {},
      pzList: [
        {
          yhxm: "xxx",
          ydsj: 2011 - 10 - 10,
          bz: "asdasdasd"
        },
        {
          yhxm: "xxx",
          ydsj: 2011 - 10 - 10,
          bz: "asdasdasd"
        },
        {
          yhxm: "xxx",
          ydsj: 2011 - 10 - 10,
          bz: "asdasdasd"
        }
      ],
      SPvalue: "",
      unitType: "",
    };
  },
  mounted() {},
  methods: {
    handleCheckPZ() {
      this.getLogComments(this.logDetail.wid);
      this.pzListVisible = !this.pzListVisible;
    },
    handleBack() {
      this.pzListVisible = false;
    },
    handleCommit() {
      // 保存批注
      this.commitloanind = true;
      this.$post(this.API.commentLog, {
        wid: this.logDetail.wid,
        bz: this.SPvalue
      }).then(res => {
        if (res.state == "success") {
          this.$toast.success('提交成功~');
          this.commitloanind = false;
          this.$router.go(-1);
        } else {
          this.commitloanind = false;
          this.$toast.fail(res.msg);
        }
      });
    },

    handleCancel() {
      this.$router.go(-1);
    },
    // 获取批注列表
    getLogComments(wid) {
      this.$get(this.API.getLogComments, {
        wid: wid
      }).then(res => {
        if (res.state == "success") {
          if (res.data != null && res.data.length != 0) {
            this.pzList = res.data;
          } else {
            this.pzList = [];
          }
        }
      });
    }
  },
  activated() {
    this.unitType = JSON.parse(sessionStorage.getItem("userInfo")).unitType;
    this.logDetail = this.$route.params.data;
    if (this.logDetail.ydzt != 2) {
      this.$get(this.API.getLogComment, {
        wid: this.logDetail.wid
      }).then(res => {
        if (res.state == "success") {
          this.SPvalue = res.data;
        }
      });
    } else if (this.logDetail.ydzt == 2) {
      this.getLogComments(this.logDetail.wid);
    }
  },
  components: { Cbutton, XTable, emptyContent, timeLine }
};
</script>
<style scoped lang="less">
@import "../../index.less";

.assisant-tasklog-detail {
  padding: 10px 0;
  .tasklog-detail-content {
    background: #fff;
    margin-bottom: 10px;
    .tasklog-detail-content-info {
      font-size: 0.75rem;
      padding: 0 10px 6px 10px;
    }
    h5 {
      padding: 8px 10px;
      border-bottom: @border-ef;
    }
    span {
      display: inline-block;
      width: 60px;
      margin: 4px 10px 4px 0;
      color: @color;
    }
  }
  .tasklog-detail-approval {
    background: #fff;
    margin-bottom: 10px;
    h5 {
      padding: 8px 10px;
      border-bottom: @border-ef;
      span {
        float: right;
        font-weight: 400;
        color: rgb(36, 124, 207);
      }
    }
    .tasklog-detail-pzlist {
      min-height: 15vh;
      max-height: 35vh;
      overflow-y: auto;
      padding: 5px 20px;
      .tasklog-detail-nopz {
        font-size: 0.9rem;
        text-align: center;
        line-height: 15vh;
      }
    }
  }
  .tasklog-detail-btn {
   .operate-btn();
  }
}

.tasklog-detail-pzpop {
  width: 85vw;
  .tasklog-pzpop-pz {
    height: 100vh;
    overflow-y: auto;
    padding: 5px;
  }
}
</style>
