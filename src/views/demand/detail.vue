<template>
  <div class="demandDetail" @click="handleCloseBtnshow">
    <div
      :class="{'demandDetail-top':true,'no-btn-height':!btnShow}"
      @scroll="handleScroll"
      ref="demandDetail"
    >
      <section class="demandDetail-desc">
        <div class="demandDetail-detail">
          <h4>{{demandData.bt}}</h4>
          <div class="demandDetail-desc-info">
            <div class="demandDetail-desc-tag">
              <van-tag round color="#29BE1E">{{demandData.dqlcmc}}</van-tag>
            </div>
            <p>
                {{demandData.tcsj}} &#x3000; {{demandData.tcrxm}}
            </p>
            <p>
              需求编号：
              <span>{{demandData.xqbh}}</span>
            </p>
            <p>
              关联需求编号：
              <span>{{demandData.glxqbh}}</span>
            </p>
            <p>
              设计编号：
              <span>{{demandData.sjbh}}</span>&#x3000;
              开发编号：
              <span>{{demandData.sjbh}}</span>
            </p>
            <p>
              提出老师：
              <span>{{demandData.tcls}}</span>&#x3000;
              提出老师单位：
              <span>{{demandData.tcls}}</span>
            </p>
            <p>
              需求类型：
              <span>{{demandData.xqfl_display}}</span>
            </p>
            <p>
              责任人：
              <span>{{demandData.dqzrr}}</span>
            </p>
            <p>
              所属项目：
              <span> {{demandData.xmbh}} {{demandData.xmmc}}</span>
            </p>
            <p>
              产品：
              <span>{{demandData.cpmc }}</span>&#x3000;
              模块：
              <span>{{demandData.cpbjmc}}</span>
            </p>
            <p>
              期望设计完成日期：
              <span>{{demandData.qwsjwcrq}}</span>
            </p>
            <p>
              期望开发交付日期：
              <span>{{demandData.qwkfjfrq}}</span>
            </p>
            <p>
              需求文档：
              <a
              :href="API.downloadFile+'?fjId='+demandData.xqfjwid"
              target="_blank"
             >{{demandData.xqfjmc}}</a>
            </p>
            <p>
              详细需求设计：
               <a
                :href="API.downloadFile+'?fjId='+demandData.xxyxfjwid"
                target="_blank"
              >{{demandData.xxyxfjmc}}</a>
            </p>
          </div>
        </div>
        <div class="demandDetail-desc-nr">
          <div class="demand-content" @click="previewImage" v-html="demandData.nr">内容</div>
        </div>
      </section>

      <!-- 回复列表 -->
      <section class="demandDetail-reply">
        <replyList  :replyData="replyData" @handleReject="handleReject"></replyList>
      </section>
    </div>

    <!-- 图片预览 -->
    <div v-transfer-dom>
      <previewer :list="imgList" ref="previewer"></previewer>
    </div>

    <!-- 操作按钮 -->
    <div class="demandDetail-bottom">
      <btnGroup
        :update="update"
        :wid="$route.query.wid"
        @handleClick="handleClick"
        @BtnAuthFalse="BtnAuthFalse"
      ></btnGroup>
    </div>

    <div class="demandDetail-back" v-if="!!$route.query.frommsg">
      <mu-button fab color="red" @click="handleBackList" style="background:rgba(255,0,0,0.5)">
        <span>
          返回
          <br />
          <hr />列表
        </span>
      </mu-button>
    </div>

    <datePicker :show.sync="pickerKsrqShow" @handleChangeDatePicker="handleChangeDate" :dateDisable="dateDisable"
		:cphs="9999" @handleClose="pickerKsrqShow = false"></datePicker>

    <userPop :show="userPopShow" :xmbh="demandData.xmbh" @handleClosePop="handleClosePop" @handleCheckUser="handleCheckUser"></userPop>

    <!-- 需求确认,关闭 -->
     <van-actionsheet v-model="xqqrOrgbShow" :title="btnid==8?'需求确认':'关闭需求'">
      <div class="actionsheet-xqqr">
        <div>
           <!-- <div class="cell-title">
            <span>附件</span>
            <a href="javaScript:;;">{{demandData.xxyxfjmc}}</a>
          </div>   -->
          <div class="cell-title">
              <p>评价</p>
              <van-rate v-model="xqqrOrgbData.pf" />
          </div>
          <van-field  required v-if="btnid == 8"  v-model="xqqrOrgbData.qwkfjfrq" type="textarea" label="期望交付日期" placeholder="请选择"  rows="1" autosize @click="onClick" />
          <van-field  required v-model="xqqrOrgbData.nr" type="textarea" label="备注" placeholder="请输入" rows="5" clearable/>
        </div>
        <footer>
          <van-button class="cancelButton" size="normal" type="default" @click="xqqrOrgbShow = !xqqrOrgbShow">取消</van-button>
          <van-button class="commitButton" size="normal" type="primary" @click="handleCommitXqqr">提交</van-button>
        </footer>
      </div>
    </van-actionsheet>

        <!-- 需求提报,验证 -->
     <van-actionsheet v-model="yzOrtbShow" :title="btnid==7?'需求提报':'需求验证'">
      <div class="actionsheet-xqqr">
        <div>
           <div class="cell-title">
             <p>提报老师：</p>
             <div flex flex-wrap>
               <samp v-for="(item,index) in lsNames">
                <span>{{item}}</span>
                <span class="delete-tag" @click="handleDeleteLs(index)"><van-icon name="clear" size="13px"/></span>
               </samp>
               <samp style="color:#f00;border-color:rgba(255, 0, 0,0.4)" @click="handleAddUser">+</samp>
             </div>
          </div>

          <div class="cell-title">
            <p>是否会签：</p>
            <van-radio-group v-model="tbOryzData.sfhq" flex icon-size="16px">
              <van-radio :name="1">是</van-radio>
              <van-radio :name="0">否</van-radio>
            </van-radio-group>
          </div>
          <div class="cell-title">
              <p>开发质量：</p>
              <van-rate v-model="tbOryzData.kfzl" />
          </div>
          <div class="cell-title">
              <p>服务质量：</p>
              <van-rate v-model="tbOryzData.fwzl" />
          </div>
          <div class="cell-title">
              <p>响应速度：</p>
              <van-rate v-model="tbOryzData.xysd" />
          </div>
          <van-field  required v-model="tbOryzData.nr" type="textarea" label="内容" placeholder="请输入" rows="3" clearable/>
          <van-field  required v-model="tbOryzData.crowdpjsm" type="textarea" label="crowd说明" placeholder="请输入" rows="4" clearable/>
        </div>
        <footer>
          <van-button class="cancelButton" size="normal" type="default" @click="yzOrtbShow = !yzOrtbShow">取消</van-button>
          <van-button class="commitButton" size="normal" type="primary" @click="handleCommitTbyz">提交</van-button>
        </footer>
      </div>
    </van-actionsheet>

    <!-- 回复 驳回 -->
    <van-actionsheet v-model="replyOrRejectShow" :title="title">
      <div class="actionsheet-operate">
        <div>
          <van-field
            required
            v-model="formData.hfsm"
            type="textarea"
            label="内容"
            placeholder="请输入内容"
            rows="9"
            clearable
          />
        </div>

        <footer>
          <van-button
            class="cancelButton"
            size="normal"
            type="default"
            @click="replyOrRejectShow = !replyOrRejectShow"
          >取消</van-button>
          <van-button
            class="commitButton"
            size="normal"
            type="primary"
            @click="handleReplyCommit"
          >提交</van-button>
        </footer>
      </div>
    </van-actionsheet>
  </div>
</template>

<script>
import replyList from "@/components/demand/reply";
import btnGroup from "@/components/demand/button";
import datePicker from "@/components/public/DatePicker";
import { getMyDate, getMenuByCode,encryptByDES } from "@/utils/util.js";
import { mapState, mapMutations, mapGetters } from "vuex";
import userPop from '@/components/public/userChoose.vue';

export default {
  data() {
    return {
      userPopShow:false,
      update: false,
      replyOrRejectShow: false, //驳回说明
      xqqrOrgbShow:false,//需求确认,关闭
      yzOrtbShow:false, //提报,验证
      pickerKsrqShow:false,
      dateDisable: false, //日期选择范围禁用
      demandData: {}, //单个问题详情
      title:'回复',
      // 确认 关闭
      xqqrOrgbData:{
        nr: "",
        pf: 5,
        qwkfjfrq: ""
      },
      // 提报 验证
      lsNames:[],
      qrlsList:[],
      tbOryzData:{
        nr: "",
        qrls: "",
        sfhq: 1,
        kfzl: 5,
        fwzl: 5,
        xysd: 5,
        crowdpjsm: ""
      },
      formData: {
        hfsm: "", //回复说明
      },
      replyData: [], //回复列表
      imgList: [], //图片预览列表
      btnGroupData: {}, //按钮组
      btnShow: true, //按钮有按钮
      scroll: 0,
      replyDetail: {},
      btnid:"",
      qwjjrq: "", //按钮组里的期望解决日期
      des:''
    };
  },

  activated() {
    this.imgList = [];
    // this.des = encryptByDES("assistant" + this.$store.state.userInfo.userName, "WISEDUUSER");
    this.queryDemand();
    this.queryDemandReplys();
    this.scroll = 0;
    this.$store.dispatch("chnageMark", false);
  },

  updated: function() {


  },
  methods: {
    handleAddUser(){
      this.userPopShow = !this.userPopShow;
    },
    // 选择日期
    onClick(data) {
      document.activeElement.blur();
      this.pickerKsrqShow = !this.pickerKsrqShow;
      this.dateDisable = true;
    },
    //  选择日期 （确定）
    handleChangeDate(data) {
      this.xqqrOrgbData.qwkfjfrq = getMyDate(data);
      this.pickerKsrqShow = !this.pickerKsrqShow;
    },
    // 无操作
    BtnAuthFalse(data){
      this.btnShow = data;
    },
    // 返回列表
    handleBackList() {
      this.$store.dispatch("chnageMark", false);
      this.$router.push({ path: "/demand" });
    },
    handleCloseBtnshow() {
      this.$store.dispatch("changeBtnshow", false);
    },

    // 回复提交
    handleReplyCommit() {
      if (/^[\s]*$/.test(this.formData.hfsm)) {
        this.$toast("请输入内容~");
        return;
      }
      this.clickBtnslhfcb();
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
    // 需求确认 ,关闭 提交
    handleCommitXqqr(){
        if(!this.validDate()) return;
        let obj = {},url = '';
        this.xqqrOrgbData.btnbh = this.btnid;
        this.xqqrOrgbData.zbwid = this.demandData.wid;
        if(this.btnid == 8){
          obj = this.xqqrOrgbData;
          url = this.API.confirmRequirement;
          this.$router.push({name:'signTure',params:{data:obj}});
          return;
        }
        if(this.btnid == 12){
           obj = {
             nr:this.xqqrOrgbData.nr,
             pf:this.xqqrOrgbData.pf,
             btnbh: this.btnid,
             zbwid:this.demandData.wid
            };
           url = this.API.confirmDvpt;
        }
        this.$post(url, obj).then(res => {
            if (res.state == "success") {
                this.$toast("提交成功");
                this.xqqrOrgbData.nr = "";
                this.xqqrOrgbData.pf = 5;
                this.xqqrOrgbData.qwkfjfrq = '';
                this.queryDemandReplys();
                this.update = !this.update;
                this.xqqrOrgbShow = false;
            } else {
                this.$toast(res.msg);
            }
      });
    },
    // 回复 驳回 催办 受理
    clickBtnslhfcb(){
        this.$post(
             this.btnid == "1"
            ? this.API.reply
            : this.btnid == "4"
            ? this.API.remind
            : this.btnid == "3"
            ? this.API.reject
            : this.API.accept,
          {
            zbwid: this.$route.query.wid,
            nr: this.formData.hfsm,
            btnbh: this.btnid
          }
        ).then(res => {
          if (res.state == "success") {
            this.formData.hfsm = "";
            if(this.btnid == '2'||this.btnid == '3'){
                this.update = !this.update
            }
             this.queryDemandReplys();
             this.replyOrRejectShow = false;
             this.$toast(this.btnid == "1"? "回复成功": this.btnid == "4"? "催办成功":this.btnid == "3"?'驳回成功':'受理成功');
          } else {
            this.$message({message: res.msg,type: "error" });
          }
        });
    },
    //  滚动监听（待用）
    handleScroll() {
      this.scroll = this.$refs.demandDetail.scrollTop;
    },
    //  查看问题进度
    handleCheckProcess(data) {
      this.$router.push({
        name: "QuestionProcess",
        query: { wid: data },
        params: { data: this.demandData }
      });
    },
    //  按钮操作
    handleClick(data) {
        this.btnid = data;
      if (data == "1" || data=="3") { //回复
        this.title = data=='1'?'回复':'驳回';
        this.replyOrRejectShow = !this.replyOrRejectShow;
      } else if (data == "2" || data == "4") { //受理 催办
        this.clickBtnslhfcb();
      } else if(data == "8" || data == "12"){ //需求确认,关闭
        this.xqqrOrgbShow = !this.xqqrOrgbShow;
      }else if(data == "7" || data == "11"){ //需求提报，验证
        this.yzOrtbShow = !this.yzOrtbShow;
      }
    },
    // 选择老师
    handleCheckUser(names,val){
      this.lsNames = names;
      this.qrlsList = val;
      this.userPopShow = false;
    },
    // 删除 选择老师
    handleDeleteLs(index){
      this.lsNames.splice(index,1);
      this.qrlsList.splice(index,1);
    },

    // 验证，提报
    handleCommitTbyz(){
       if(!this.validDateTbYz()) return;
       this.tbOryzData.qrls = this.qrlsList.join('|');
       this.tbOryzData.btnbh = this.btnid;
       this.tbOryzData.zbwid = this.demandData.wid;
       this.$post(this.btnid=='11'?this.API.projectTeamVerifyDvpt:this.API.submitDetailDesign, this.tbOryzData).then(res => {
        if (res.state == "success") {
          this.$toast("提交成功");
          this.tbOryzData.nr = "";
          this.tbOryzData.qrls = "";
          this.tbOryzData.sfhq = 1;
          this.tbOryzData.kfzl = 5;
          this.tbOryzData.fwzl = 5;
          this.tbOryzData.xysd = 5;
          this.tbOryzData.crowdpjsm = "";
          this.lsNames = [];
          this.qrlsList = [];
          this.update = !this.update;
          this.queryDemandReplys();
          this.yzOrtbShow = false;
        } else {
        }
      });
    },
    // 关闭pop
    handleClosePop(){
      this.userPopShow = false;
    },

    // 获取单个问题
    queryDemand() {
      this.$get(this.API.queryDemand, {
        zbwid: this.$route.query.wid
      }).then(res => {
        if (res.state == "success") {
          this.demandData = res.data;
        } else {
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
        }
      });
    },

    // 获取回复列表
    queryDemandReplys() {
      this.replyData = [];
      this.$toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      this.$get(this.API.demandReplys, {
        zbwid: this.$route.query.wid,
      }).then(res => {
        if (res.state == "success") {
          this.replyData = res.data;
          this.$toast.clear();
        } else {
          this.$toast.clear();
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
        }
      });
    },

    validDate() {
        // 需求交付,关闭
        if (this.btnid == '8' && !this.xqqrOrgbData.qwkfjfrq) {
            this.$toast("请选择交付日期");
            return false;
        }
        if (/^[\s]*$/.test(this.xqqrOrgbData.nr)) {
              this.$toast("请输入备注内容");
              return false;
        }
        return true;
    },

    validDateTbYz(){
       // 需求交付,关闭
        if (!this.lsNames.length) {
            this.$toast("请选择提报老师");
            return false;
        }
        if (/^[\s]*$/.test(this.tbOryzData.nr)) {
              this.$toast("请输入内容");
              return false;
        }
        if (/^[\s]*$/.test(this.tbOryzData.crowdpjsm)) {
              this.$toast("请输入crowd评价说明");
              return false;
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
      if (!n) {

       }
    },
    $route: function(from, to) {
      if (from.name == "demandIndex") {
        this.$store.dispatch("chnageMark", true);
      }
    }
  },
  components: { replyList, btnGroup, datePicker,userPop }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.demandDetail {
  height: 100vh;
  position: relative;
}
.demandDetail-top {
  overflow-y: auto;
  height:calc(100vh - 50px);
  .demandDetail-desc {
    background: #fff;
    .demandDetail-detail {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #e8e8e8;
      .demandDetail-desc-info {
        font-size: @fontSize12;
        .demandDetail-desc-tag {
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
    .demandDetail-desc-nr {
      padding: 0.75rem 1.25rem;
      .demand-content {
        font-size: 0.85rem;
        img {
         max-width: 100% !important;
        }
      }
    }
  }
}
.demandDetail-back {
  position: fixed;
  bottom: 60px;
  right: 0;
  font-size: 12px;
}
.demandDetail-bottom {
  position: fixed;
  bottom: 0;
  z-index: 1100;
}
.demandDetail-reply {
  margin: 0.5rem 0 0 0;
}
.no-btn-height {
  height: 100vh !important;
}
.actionsheet-xqqr .cell-title{
    display: flex;
    align-items: center;
    margin:0 15px;
    padding:  10px 0 ;
    border-bottom: 1px solid #ebedf0;
     &::before{
        content: '*';
        position: absolute;
        left: 7px;
        font-size: 14px;
        color: #f44;
    }
    p{
        display: inline-block;
        width: 90px;
        font-size: 14px;
        font-weight:700;
        color: #333;
    }

    samp{
      width: 3rem;
      border: 1px solid rgb(211, 210, 210);
      text-align: center;
      margin: 3px 0;
      padding: 3px 0;margin-right: 10px;
      border-radius: 4px;
      position: relative;
      .delete-tag{
        position: absolute;
        right: -5px;
        top: -5px;
        border-radius: 50%;
        text-align: center;
        line-height: 0.7rem;
        color: #f00;
      }
    }
}
</style>
