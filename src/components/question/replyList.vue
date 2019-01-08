<template>
    <div>
        <section class="quesiton-reply" v-for="reply in replyData">
            <div>
                <van-tag size="large" :color="reply.hflx == 3?'rgb(255, 68, 68)':'#007AFF'">
                    {{reply.hflx == 1?'回复':reply.hflx == 2?'转发问题':reply.hflx == 3?'申请关闭':reply.hflx == 4?'受理':reply.hflx == 5?'取消':reply.hflx == 6?'指定责任人':reply.hflx == 7?'催办':reply.hflx == 99?'运营记录':reply.hflx == 10?'申请待验证':reply.hflx == 11?'标签':reply.hflx == 12?'集成':reply.hflx == 13?'运营':'开发'}}
                </van-tag>
            </div>
            <div class="reply-header">
                <p class="fontColorb">
                    <span>{{reply.hfrxm}}&#x3000;</span>
                    <van-tag round type="success">{{reply.lcbh==''?'无':reply.lcbh}}</van-tag>&#x3000;
                    <span>{{reply.cjsj}}</span><br>
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
            <div class="reply-content" v-html="reply.nr"></div>
        </section>
    </div>
</template>

<script>
export default {
  data() {
    return {};
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

  .reply-content {
    padding: 0.5rem 0;
    font-size: @fontSize14;
  }
}
</style>
