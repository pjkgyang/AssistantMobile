<template>
    <div class="weekadd_card">
        <div v-for="item in dataList">
            <div v-if="weekType == 'lcb'" class="container">
                <van-panel :title="item.xmbh+' '+item.xmmc">
                    <div class="content">
                        <p>
                            <span>项目经理：</span>{{item.xmjlxm}}&#x3000;
                            <span>战队队长：</span>{{item.zddzxm}}&#x3000;
                            <span>责任人：</span>{{item.zrrxm}}
                        </p>
                        <p>
                            <span>创建时间：</span>{{item.cjsj}}</p>
                        <p>
                            <span>项目内容：</span>{{item.xmnr}}</p>
                        <p>
                            <span>里程碑描述：</span>{{item.lcbms}}</p>
                        <p>
                            <span>承诺完成日期：</span>{{item.cnjssj}}</p>
                        <p>
                            <span>计划完成日期：</span>{{item.jhjssj}}</p>
                        <p>
                            <span>完成状态：</span>
                            <van-tag round :type="item.zt==1?'danger':'success'">{{item.zt_display}}</van-tag>
                        </p>
                        <p>
                            <span>未完成原因：</span>{{item.wwcyy}}</p>
                        <p>
                            <span>后续措施：</span>{{item.hxcs}}</p>
                    </div>
                </van-panel>
            </div>
            <div v-if="weekType == 'jd'" class="container">
                <van-panel :title="item.xmbh+' '+item.xmmc">
                    <div class="content">
                        <p>
                            <span>创建人：</span>{{item.cjrxm}}&#x3000;{{item.cjsj}}</p>
                        <p>
                            <span>责任人：</span>{{item.zrrxm}}</p>
                        <p>
                            <span>产品名称：</span>{{item.cpmc_display}}</p>
                        <p>
                            <span>任务名称：</span>{{item.rwmc_display}}</p>
                        <p>
                            <span>完成状态：</span>
                            <van-tag round :type="item.zt==1?'danger':'success'">{{item.zt==1?'计划中':'已完成'}}</van-tag>
                        </p>
                        <p>
                            <span>工作内容：</span>{{item.gznr}}</p>
                        <p>
                            <span>未完成原因：</span>{{item.wwcyy}}</p>
                        <p>
                            <span>后续措施：</span>{{item.hxcs}}</p>
                    </div>
                </van-panel>
            </div>
            <div v-if="weekType == 'wt'" class="container">
                <van-panel :title="item.xmbh+' '+item.xmmc">
                    <div class="content">
                        <p>
                            <span>创建人：</span>{{item.cjrxm}}&#x3000;{{item.cjsj}}</p>
                        <p>
                            <span>责任人：</span>{{item.zrrxm}}</p>
                        <p>
                            <span>问题标题：</span>{{item.wtbt}}</p>
                        <p>
                            <span>问题类别：</span>{{item.wtlb}}</p>
                        <p>
                            <span>期望解决日期：</span>{{item.qwjjrq}}</p>
                        <p>
                            <span>承诺解决日期：</span>{{item.cnjjrq}}</p>
                        <p>
                            <span>问题状态：</span>
                            <van-tag round :type="item.zt==1?'danger':'success'">{{item.zt==1?'计划中':'已完成'}}</van-tag>
                        </p>
                        <p>
                            <span>工作内容：</span>{{item.gznr}}</p>
                        <p>
                            <span>未完成原因：</span>{{item.wwcyy}}</p>
                        <p>
                            <span>后续措施：</span>{{item.hxcs}}</p>
                        <p>
                            <span>处理计划：</span>{{item.cljh}}</p>
                    </div>
                </van-panel>
            </div>
        </div>
        <div v-if="!dataList.length">
            <empty-content></empty-content>
        </div>
    </div>
</template>

<script>
import emptyContent from "../../components/public/empty-content.vue";
export default {
  data() {
    return {
      
    };
  },
  props: {
    weekType: {
      type:String,
      default: "lcb"
    },
    dataList:{
        type:Array,
        default:()=>{
            return [ {
          xmbh: "UK123456",
          xmmc: "项目名称项目名称项目名称项目名称项目名称项目名称",
          xmnr: "xmxmxmxmxmm",
          lcbms: "ssssssddd",
          cnwcrq: "2018-08-08",
          wczt: "1",
          cpmc: "产品名臣g",
          rwmc: "任务名称",
          wtbt: "张三三上哪上哪上哪啊",
          qwjjrq: "2018-08-09",
          cnjjrq: "2018-08-10",
          wtzt: "1",
          zrrxm: "张三丰",
          cpmc: "小助手",
          rwmc: "啊实打实大",
          wwcyy: "请问二群翁群二无群",
          hxcs: "请问二群翁群二无群",
          gznr: "请问二群翁群二无群",
          cljh: "处理计划",
          cjrxm: "王二旺",
          xmjl: "丁一手",
          zddzxm: "马四王"
        },
        {
          xmbh: "UK123456",
          xmmc: "项目名称项目名称项目名称项目名称项目名称项目名称",
          xmnr: "xmxmxmxmxmm",
          lcbms: "ssssssddd",
          cnwcrq: "2018-08-08",
          wczt: "1",
          cpmc: "产品名臣g",
          rwmc: "任务名称",
          wtbt: "张三三上哪上哪上哪啊",
          qwjjrq: "2018-08-09",
          cnjjrq: "2018-08-10",
          wtzt: "1",
          zrrxm: "张三丰",
          cpmc: "小助手",
          rwmc: "啊实打实大",
          wwcyy: "请问二群翁群二无群",
          hxcs: "请问二群翁群二无群",
          gznr: "请问二群翁群二无群",
          cljh: "处理计划",
          cjrxm: "王二旺",
          xmjl: "丁一手",
          zddzxm: "马四王"
        },
        {
          xmbh: "UK123456",
          xmmc: "项目名称项目名称项目名称项目名称项目名称项目名称",
          xmnr: "xmxmxmxmxmm",
          lcbms: "ssssssddd",
          cnwcrq: "2018-08-08",
          wczt: "1",
          cpmc: "产品名臣g",
          rwmc: "任务名称",
          wtbt: "张三三上哪上哪上哪啊",
          qwjjrq: "2018-08-09",
          cnjjrq: "2018-08-10",
          wtzt: "1",
          zrrxm: "张三丰",
          cpmc: "小助手",
          rwmc: "啊实打实大",
          wwcyy: "请问二群翁群二无群",
          hxcs: "请问二群翁群二无群",
          gznr: "请问二群翁群二无群",
          cljh: "处理计划",
          cjrxm: "王二旺",
          xmjl: "丁一手",
          zddzxm: "马四王"
        }]
        }
    }

  },
  methods: {
    handleFillin(data, type) {
      this.$emit("handleFillin", data, type);
    }
  },
  components: { emptyContent }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.container {
  margin-bottom: 0.5rem;
  .content {
    span {
      color:  #999999;
    }
    padding: 3px 15px;
  }
  .week_title {
    font-size: 0.9rem;
    color: #333;
  }
  p {
    font-size: 0.8rem;
    margin: 3px 0;
  }
}
</style>
