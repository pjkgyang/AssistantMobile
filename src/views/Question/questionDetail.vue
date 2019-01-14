<template>
  <div class="questionDetail">
    <div :class="{'questionDetail-top':true,'no-btn-height':!btnShow}" @scroll="handleScroll" ref="questionDetail" :scroll-top.prop="scrollTop">
      <section class="questionDetail-desc">
        <div class="questionDetail-detail">
          <h4>{{questionData.bt}}</h4>
          <div class="questionDetail-desc-info">
            <div class="questionDetail-desc-tag">
              <van-tag round color="#F0871E" v-if="questionData.sqgbCount > 0 && questionData.fbzt != 1">已申请关闭</van-tag>
              <van-tag round color="#29BE1E">{{$route.query.lc}}</van-tag>

              <a href="javaScript:;;" @click="handleCheckProcess(questionData.wid)">
                <van-tag plain round>查看进度</van-tag>
              </a>
              <!-- <van-button size="mini" round @click="handleCheckProcess(questionData.wid)">查看进度</van-button> -->
            </div>
            <p>问题编号：
              <span>{{questionData.wtbh}}</span>
            </p>
            <p>提问时间：
              <span>{{questionData.fbrq}}</span>
            </p>
            <p>发布人：
              <span>{{questionData.fbrxm}}</span>
            </p>
            <p>所属单位：
              <span>{{questionData.ssbm}}</span>
            </p>
            <p>所属项目：
              <span>{{questionData.xmmc}}</span>
            </p>
            <p>问题类型：
              <span>{{questionData.wtlx_display}}</span>
            </p>
            <p>产品：
              <span>{{questionData.cpmc}}</span>
            </p>
            <p>期望解决日期：
              <span>{{questionData.qwjjrq}}</span>
            </p>
            <p>承诺结束日期：
              <span>{{questionData.cnjsrq}}</span>
            </p>
          </div>
        </div>
        <div class="questionDetail-desc-nr">
          <div class="question-content" @click="previewImage" v-html="questionData.nr">内容</div>
        </div>
      </section>
      <!-- 回复列表 -->
      <section class="questionDetail-reply">
        <replyList :questionData="questionData" :replyData="replyData" @handleReject="handleReject"></replyList>
      </section>
    </div>

    <!-- 图片预览 -->
    <div v-transfer-dom>
      <previewer :list="imgList" ref="previewer"></previewer>
    </div>

    <!-- 操作按钮 -->
    <div class="questionDetail-bottom">
      <btnGroup :wid="$route.query.wid" @handleClick="handleClick" @BtnAuthFalse="BtnAuthFalse"></btnGroup>
    </div>

    <van-actionsheet v-model="operateShow" :title="operateTitle">
      <div class="actionsheet-operate">
        <div>
          <van-field v-if="curOperate=='cnsj'||curOperate=='sl'" required v-model="formData.cnjsrq" type="textarea" label="承诺结束日期" placeholder="请选择" is-link rows="1" autosize @click="onClick('cnjsrq')" />
          <van-field v-if="curOperate=='sl'" required v-model="formData.qwjjrq" type="textarea" label="期望解决日期" placeholder="请选择" is-link rows="1" autosize @click="onClick('qwjjrq')" />
          <van-field v-if="curOperate=='cb'" required v-model="formData.rymc" type="textarea" label="催办人员" placeholder="请选择" is-link rows="1" autosize @click="onClick('cbry')" />
          <van-field v-if="curOperate!='sl' && curOperate!='xgcrowId'" required v-model="formData.sm" type="textarea" label="说明" placeholder="请输入" rows="5" clearable/>
          <van-field v-if="curOperate=='xgcrowId'" required v-model="formData.kfrwbh" type="textarea" label="开发任务编号" placeholder="请输入" rows="1" autosize clearable/>
          <van-field v-if="curOperate=='xgcrowId'" required v-model="formData.kfgzl" type="textarea" label="开发工作量(人/天)" placeholder="请输入" rows="1" clearable/>
        </div>

        <footer>
          <van-button class="cancelButton" size="normal" type="default" @click="operateShow = !operateShow">取消</van-button>
          <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
        </footer>
      </div>
    </van-actionsheet>

    <div class="datePop">
      <van-popup v-model="pickerKsrqShow">
        <datePicker @handleChangeDatePicker="handleChangeDate"></datePicker>
      </van-popup>
    </div>

    <div class="datePop">
      <van-popup v-model="cbryShow" position="right">
        <cbrylist :show="cbryShow" :wid="$route.query.wid" @handleClose="handleClose" @handleChooseCbry="handleChooseCbry"></cbrylist>
      </van-popup>
    </div>

    <!-- <mu-fade-transition>
    <aside v-if="scrollTop > 350">
      <h4>{{questionData.bt}}</h4>
      <p>发布人：<span>{{questionData.fbrxm}}</span>&#x3000;{{questionData.fbrq}}</p>
    </aside>
  </mu-fade-transition> -->
  </div>
</template>

<script>
import replyList from "@/components/question/replyList";
import btnGroup from "@/components/question/btnGroup";
import datePicker from "@/components/public/DatePicker";
import { getMyDate, getMenuByCode } from "@/utils/util.js";
import cbrylist from "@/components/question/cbryList";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      operateShow: false,
      pickerKsrqShow: false, //承诺日期
      cbryShow: false, //催办人员
      curOperate: "", //当前按钮
      dateType: "",
      operateTitle: "",
      questionData: {}, //单个问题详情
      // 修改（承诺结束日期,受理）
      formData: {
        cnjsrq: "",
        qwjjrq: "",
        sm: "",
        rymc: "",
        rybh: "",
        kfrwbh: "",
        kfgzl: 0
      },
      replyData: [], //回复列表
      imgList: [], //图片预览列表
      btnGroupData: {}, //按钮组
      btnShow:true, //按钮有按钮
      scroll: 0
    };
  },
  mounted() {},
  activated() {
    if (!this.$store.state.mark) {
      this.queryQuestion();
      this.queryAnswers();
    }
    this.$store.dispatch("chnageMark", false);
  },
  methods: {
    handleCommit() {
      if (!this.validDate()) return;
      let argumentObj = {
          wid: this.$route.query.wid,
          nr: this.formData.sm
        },
        urlApi = "";
      if (this.curOperate == "sl") {
        //受理
        argumentObj.cnjsrq = this.formData.cnjsrq;
        argumentObj.qwjjrq = this.formData.qwjjrq;
        argumentObj.Guid = ""; //工时
        urlApi = this.API.customerQuestion;
      } else if (this.curOperate == "cnsj") {
        //修改承诺结束日期
        argumentObj.cnjsrq = this.formData.cnjsrq;
        urlApi = this.API.changeCommitmentDate;
      } else if (this.curOperate == "cb") {
        argumentObj.ryData = this.formData.rybh; //人员编号
        urlApi = this.API.saveCb;
      } else if (this.curOperate == "xgcrowId") {
        argumentObj.crowdId = this.formData.kfrwbh; //任务编号
        argumentObj.kfgzl = this.formData.kfgzl; //开发工作量
        urlApi = this.API.addOrUpdateCrowdId;
        delete argumentObj.nr;
      }

      console.log(argumentObj);
      return;
      this.$toast.loading({ mask: true, message: "提交中...", duration: 0 });
      this.$post(urlApi, argumentObj).then(res => {
        if (res.state == "success") {
          this.$toast.clear();
          this.$toast({ message: "提交成功", duration: 1500 });
          this.operateShow = false;
        } else {
          this.$toast.clear();
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
        }
      });
    },
    previewImage(e) {
      if (e.target.nodeName == "IMG") {
        this.imgList.length = 0;
        let imgArr = e.currentTarget.getElementsByTagName("img"),
          url = e.target.currentSrc,
          curIndex;
        for (var i = 0; i < imgArr.length; i++) {
          if (imgArr[i].currentSrc == url) {
            curIndex = i;
          }
          this.imgList.push({ src: imgArr[i].currentSrc });
        }
        this.$refs.previewer.show(curIndex);
      } else {
        return;
      }
    },
    //  滚动监听（待用）
    handleScroll() {
      this.scroll = this.$refs.questionDetail.scrollTop;
    },
    //  查看问题进度
    handleCheckProcess(data) {
      this.$router.push({
        name: "QuestionProcess",
        query: { wid: data },
        params: { data: this.questionData }
      });
    },
    //  按钮操作
    handleClick(data) {
      if (data == "cnsj" || data == "cb") {
        this.operateShow = !this.operateShow;
        if (data == "cnsj") {
          this.operateTitle = "修改承诺结束日期";
        } else {
          this.operateTitle = "催办";
        }
      } else if (data == "hf") {
        this.$router.push({
          path: "/reply",
          query: { wid: this.$route.query.wid }
        });
      } else if (data == "gb") {
        this.$router.push({
          path: "/closequestion",
          query: { wid: this.$route.query.wid }
        });
      } else if (data == "sl") {
        this.isgcXmtdbyWt();
      } else if (data == "sqjs") {
        this.$router.push({ name: "applyClose" });
      } else if (data == "zf") {
        this.$router.push({
          name: "QuestionForward",
          query: { wid: this.$route.query.wid }
        });
      } else if (data == "xgcrowId") {
        this.operateShow = true;
      }
      this.curOperate = data;
    },
    // 按钮全部不显示
    BtnAuthFalse(){
      this.btnShow = false;
    },
    //弹出选择日期，催办人员
    onClick(data) {
      document.activeElement.blur();
      this.dateType = data;
      switch (data) {
        case "cnjsrq":
          this.pickerKsrqShow = !this.pickerKsrqShow;
          break;
        case "qwjjrq":
          this.pickerKsrqShow = !this.pickerKsrqShow;
          break;
        case "cbry":
          this.cbryShow = !this.cbryShow;
          break;
        default:
          break;
      }
    },
    //  选择日期
    handleChangeDate(data) {
      if (this.dateType == "cnjsrq") {
        this.formData.cnjsrq = getMyDate(data);
      } else if (this.dateType == "qwjjrq") {
        this.formData.qwjjrq = getMyDate(data);
      }
      this.pickerKsrqShow = !this.pickerKsrqShow;
    },

    // 关闭选择人员pop
    handleClose() {
      this.cbryShow = false;
    },

    //  选择催办人员
    handleChooseCbry(data) {
      const nameArr = [],
        bhArr = [];
      data.forEach(ele => {
        nameArr.push(ele.nickname);
        bhArr.push(ele.username);
      });
      this.formData.rymc = nameArr.join(",");
      this.formData.rybh = bhArr.join("|");
      this.cbryShow = false;
    },
    //  驳回(申请关闭)
    handleReject(params, index) {
      console.log(params, index);
      this.replyData[index].sfbh = 1;
    },
    // 获取单个问题
    queryQuestion() {
      this.questionData = {};
      this.$store.dispatch("chnageLoing", true);
      this.$get(this.API.queryQuestion, {
        wid: this.$route.query.wid
      }).then(res => {
        if (res.state == "success") {
          this.questionData = res.data;
          if (!!res.data.wtlb) {
            this.getCode(res.data.wtlb);
          }
          this.$store.dispatch("chnageLoing", false);
        } else {
          this.$store.dispatch("chnageLoing", false);
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
        }
      });
    },

    // 获取回复列表
    queryAnswers() {
      this.replyData = [];
      this.$store.dispatch("chnageLoing", true);
      this.$get(this.API.queryAnswers, {
        wid: this.$route.query.wid,
        isSolution: ""
      }).then(res => {
        if (res.state == "success") {
          this.replyData = res.data;
          this.$store.dispatch("chnageLoing", false);
        } else {
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
          this.$store.dispatch("chnageLoing", false);
        }
      });
    },
    // 是否项目团队
    isgcXmtdbyWt() {
      this.$get(this.API.isgcXmtdbyWt, {
        wid: this.$route.query.wid
      }).then(res => {
        if (res.state == "success") {
          if (!res.data) {
            this.operateTitle = "受理";
            this.operateShow = !this.operateShow;
          } else {
            this.$router.push({ name: "addQuestion", query: { sl: 1 } });
          }
        } else {
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
        }
      });
    },
    //  通过code获取名称
    getCode(code) {
      getMenuByCode("ProblemType", code).then(data => {
        this.questionData.wtlx_display = data;
      });
    },
    //  获取按钮权限
    queryBtnAuth() {
      this.$get(this.API.queryBtnAuth, {
        wid: this.$route.query.wid
      }).then(res => {
        if (res.state == "success") {
          this.btnGroupData = res.data;
          if (
            !res.data["hf"] &&
            !res.data["zf"] &&
            !res.data["sl"] &&
            !res.data["gb"] &&
            !res.data["cb"] &&
            !res.data["cnsj"] &&
            !res.data["xgcrowId"]
          ) {
            this.btnShow = false;
          }
        } else {
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
        }
      });
    },

    validDate() {
      if (this.curOperate == "sl") {
        if (!this.formData.cnjsrq) {
          this.$toast("请选择承诺结束日期");
          return false;
        }
        if (!this.formData.qwjjrq) {
          this.$toast("请选择期望解决日期");
          return false;
        }
      }
      if (this.curOperate == "cb") {
        if (!this.formData.rybh) {
          this.$toast("请选择催办人员");
          return false;
        }
        if (!this.formData.sm) {
          this.$toast("请填写说明内容");
          return false;
        }
      }
      if (this.curOperate == "cnsj") {
        if (!this.formData.cnjsrq) {
          this.$toast("请选择承诺结束日期");
          return false;
        }
        if (!this.formData.sm) {
          this.$toast("请填写说明内容");
          return false;
        }
      }

      if (this.curOperate == "xgcrowId") {
        if (!this.formData.kfrwbh) {
          this.$toast("请填写开发任务编号");
          return false;
        }
        if (!/^\d+(\.\d+)?$/.test(this.formData.kfgzl)) {
          this.$toast("请填写正确开发工作量");
          return false;
        }
      }
      return true;
    }
  },
  computed: {
    //监听state mark的变化 做页面处理
    ...mapGetters(["mark"])
  },
  watch: {
    operateShow(n, o) {
      this.formData.rymc = this.formData.rybh = this.formData.sm = this.formData.cnjsrq = this.formData.qwjjrq = this.formData.kfrwbh =
        "";
      this.formData.kfgzl = 0;
    },
    $route(from, to) {
      if (from.name == "Question") {
        this.scrollTop = 0;
      } else {
        this.scrollTop = this.scroll;
      }
    }
  },
  components: { replyList, btnGroup, datePicker, cbrylist }
};
</script>

<style lang="less" scoped>
@import "../../index.less";

.questionDetail-top {
  height: calc(100vh - 50px);
  overflow-y: auto;
  .questionDetail-desc {
    background: #fff;
    .questionDetail-detail {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #e8e8e8;
      .questionDetail-desc-info {
        font-size: @fontSize12;
        .questionDetail-desc-tag {
          margin: 0.5rem 0;
          a {
            float: right;
            .van-tag {
              color: rgb(153, 153, 153) !important;
            }
          }
        }
      }
      p {
        color: #999999;
        span {
          color: #333;
        }
      }
    }
    // 问题内容
    .questionDetail-desc-nr {
      padding: 0.75rem 1.25rem;
      .question-content {
        font-size: 0.85rem;
      }
    }
  }
}

.questionDetail-bottom {
  position: absolute;
  bottom: 0;
}
.questionDetail-reply {
  margin: 0.5rem 0 0 0;
}

.no-btn-height {
  height: 100vh !important;
}
// aside{
//   padding: 0.5rem 1rem;
//   position: fixed;
//   top: 0;
//   background: #fff;
//   width: 100%;
//   box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
//   p{
//      font-size: @fontSize12;
//       color: #999999;
//       span{
//         color: #333;
//       }
//     }
// }
</style>
