<template>
    <div>
        <section class="quesiton-reply" v-for="(reply,index) in replyData">
            <div class="reply-state"> 
                <div>
                  <van-tag size="large" :color="reply.hflx == 3?'rgb(255, 68, 68)':'rgb(57, 147, 243)'">
                      {{reply.hflx == 1?'回复':reply.hflx == 2?'转发':reply.hflx == 3?'申请关闭':reply.hflx == 4?'受理':reply.hflx == 5?'取消':reply.hflx == 6?'指定':reply.hflx == 7?'催办':reply.hflx == 99?'运营':reply.hflx == 10?'待验':reply.hflx == 11?'标签':reply.hflx == 12?'集成':reply.hflx == 13?'运营':'开发'}}
                  </van-tag>
                </div>
                <div>
                  <van-tag   type="success">{{reply.lcbh==''?'无':reply.lcbh}}</van-tag>
                </div>
            </div>
            <div class="reply-header">
                <p class="fontColorb">
                    <span>{{reply.fbrxm}}&#x3000;</span>
                    <span>{{reply.fbsj}}</span>
                    <!-- 申请关闭 驳回-->
                    <span v-if="(reply.hflx == 3||reply.hflx == 10) && questionData.fbzt != 1">
                       <span class="floatRight" v-if="reply.sfbh == 0">
                         <van-button size="mini" type="danger" @click="handleReject(reply,index)">驳回</van-button>
                        </span>
                        <span class="floatRight" v-if="reply.sfbh == 1">
                          <van-tag>已驳回</van-tag>
                        </span>
                    </span>
                </p>
                <p class="fontColorg" v-if="reply.hflx == 4">
                    承诺结束日期：{{reply.cnjsrq}}&#x3000;工时：{{!reply.gs?0:reply.gs}}
                </p>
                <p class="fontColorg">
                    <!-- 期望解决日期 （转发问题，指定责任人）-->
                    <span v-if="reply.hflx == 2||reply.hflx == 6">期望解决日期：{{reply.qwjjrq}}</span>
                    <!-- 是否bug （受理，取消，指定责任人，催办，运营记录，申请待验证）-->
                    <span v-if="reply.hflx != 6&&reply.hflx != 5&&reply.hflx != 4&&reply.hflx != 7&&reply.hflx != 9&&reply.hflx != 10">
                        是否bug：{{reply.sfbg==0?'否':'是'}}&#x3000; 实施工时：{{!reply.gs?0:reply.gs}}
                    </span>
                </p>
                <!-- 转发责任人 （转发问题，指定责任人，催办，集成，运营）-->
                <p class="fontColorg" v-if="reply.hflx==2||reply.hflx==6||reply.hflx==7||reply.hflx==12||reply.hflx==13">
                    <span>{{reply.hflx==2?'转发至：':reply.hflx==7?'催办人：':reply.hflx==12||reply.hflx==13?'发送至：':'责任人：'}}</span>{{reply.sfjsr}}
                </p>
            </div>
            <div>
               <div @click="previewImage" v-if="reply.hflx != 9" class="reply-content" v-html="reply.nr + (!reply.sm?'':('<br><br><span style=color:red>'+reply.czrxm+' 于 '+reply.czsj+' 驳回了 '+reply.fbrxm+' 的申请；<br>驳回说明：'+reply.sm+'</span>'))" ></div>
               <div @click="previewImage" v-if="reply.hflx == 9" class="reply-content" v-html="reply.nr"></div>
            </div>
        </section>
            <!-- 图片预览 -->
        <div v-transfer-dom>
          <previewer :list="imgList" ref="previewer"></previewer>
        </div>
        <section class="quesiton-reply" v-if="questionData.fbzt == 1">
            <div class="reply-state"> 
              <div>
                  <van-tag size="large" color="rgb(255, 68, 68)">
                     关闭
                  </van-tag>
                </div>
            </div>
            <div class="reply-header">
                <p class="fontColorb">
                    <span>{{questionData.wtgbr}}&#x3000;</span>
                    <span>{{questionData.gbsj}}</span>
                </p>
            </div>
            <div class="reply-content">
                <section>
                   <h4>服务评价</h4>
                   <div class="reply-close-fwzl">
                     <span>服务质量：</span><van-rate v-model="questionData.zlpf"  disabled />&#x3000;{{questionData.zlpf}} 分
                   </div>
                </section>
                <section>
                   <h4>有效贡献人</h4>
                   <div v-if="!!gxrList.length">
                     <p v-for="gxr in gxrList"><span>姓名：{{gxr.gxrxm}}</span> &#x3000; 工时：{{gxr.gs}} (小时)</p>
                     <p>合计工时：{{hjgs}} (小时)</p>
                   </div>
                   <div v-else>
                     暂无贡献人
                   </div>
                </section>
                <section>
                   <h4>解决说明</h4>
                   <div v-html="!questionData.jjsm?'无':questionData.jjsm"></div>
                </section>
                <section>
                   <h4>是否认可工时：<span>{{questionData.gssfrk==1?'是':'否'}}</span></h4>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  data() {
    return {
        gxrList:[], // 贡献人
        hjgs:0,
        imgList:[] //图片
    };
  },
  props: {
    replyData: {
      type: Array,
      default: () => {
        return [
          {
            hflx: 1,
            hfrxm: "陈子豪",
            cjsj: "2018-11-13 16:55:20",
            cnjsrq: "2018-11-19",
            gs: "0",
            nr: "回复内容",
            lcbh: "项目团队受理"
          },
          {
            hflx: 2,
            hfrxm: "陈子豪",
            cjsj: "2018-11-13 16:55:20",
            cnjsrq: "2018-11-19",
            gs: "0",
            nr: "回复内容",
            lcbh: "项目团队受理",
            qwjjrq: "2018-11-13",
            sfjsr: "战三,李四,ermazi"
          },
          {
            hflx: 3,
            hfrxm: "陈子豪",
            cjsj: "2018-11-13 16:55:20",
            cnjsrq: "2018-11-19",
            gs: "0",
            nr: "回复内容",
            lcbh: "项目团队受理"
          },
          {
            hflx: 4,
            hfrxm: "陈子豪",
            cjsj: "2018-11-13 16:55:20",
            cnjsrq: "2018-11-19",
            gs: "0",
            nr: "回复内容",
            lcbh: "项目团队受理"
          }
        ];
      }
    },
    // 问题详情
    questionData:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },

  methods:{
    handleReject(params,index){
      this.$emit('handleReject',params,index)
    },
    // 获取贡献人
     getContributionPeople(){
       this.$get(this.API.queryContributionPeople,{
         wid:this.questionData.wid,
       }).then(res=>{
         if(res.state == 'success'){
           if(!!res.data){
            this.gxrList = res.data
            this.gxrList.forEach((ele, i, arr) => {
                if (ele.gs.split(".")[0] == "") {
                  ele.gs = 0 + ele.gs;
                }
                this.hjgs += parseFloat(ele.gs);
            });
           }else{
             this.gxrList = [];
             this.hjgs = 0;
           }
         }else{
           this.$toast(!res.msg?'系统超时，请稍后再试~':res.msg);
         }
       })
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
  },
  mounted(){
     if(this.questionData.fbzt==1){
       this.getContributionPeople();
     }
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.quesiton-reply {
  background: #fff;
  padding: 0.5rem 1.25rem;
  margin-bottom: 0.2rem;
  .reply-header {
    border-bottom: 1px solid #e8e8e8;
    padding: 0.5rem 0;
    .fontColorb {
      color: #333;
      font-size: @fontSize14;
    }
    .fontColorg {
      color: #999999;
      font-size: @fontSize12;
    }
  }
  .reply-state{
    .flex(space-between);
  }

  .reply-content {
    padding: 0.5rem 0;
    font-size: @fontSize14;
    >section{
      margin: 0.3rem 0;
      h4{
        background: linear-gradient(to right bottom, rgb(38, 80, 82), rgb(217, 217, 240));
        -webkit-background-clip: text;
        color: transparent;
        span{
          color: #f00;
        }
      }
      >div {
        padding:0 0.85rem;
      p{
        span:nth-of-type(1){
          display: inline-block;
          width: 40%;
        }
      }
     }
    } 
    .reply-close-fwzl{
      .flex();
    }
  }
}
</style>
