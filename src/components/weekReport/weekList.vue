<template>
  <div class="weekadd_card">
    <div v-for="item in dataList">
      <div v-if="weekType == 'lcb'" class="container">
        <van-panel :title="item.xmbh+' '+item.xmmc">
          <div class="content">
            <p><span>项目内容：</span>{{item.xmnr}}</p>
            <p><span>里程碑描述：</span>{{item.lcbms}}</p>
            <p><span>承诺完成时间：</span>{{item.cnwcrq}}</p>
            <p><span>完成状态：</span><van-tag round :type="item.wczt==1?'danger':'success'">{{item.wczt==1?'计划中':'已完成'}}</van-tag></p> 
          </div>
          <div slot="footer" class="btn" >
            <van-button size="mini" type="danger" @click="handleFillin(item,'lcb')">填写原因措施</van-button>
          </div>
        </van-panel>
      </div>
      <div v-if="weekType == 'jd'" class="container">
        <van-panel :title="item.xmbh+' '+item.xmmc">
          <div class="content">
            <p><span>产品名称：</span>{{item.cpmc}}</p>
            <p><span>任务名称：</span>{{item.rwmc}}</p>
            <p><span>完成状态：</span><van-tag round :type="item.wczt==1?'danger':'success'">{{item.wczt==1?'计划中':'已完成'}}</van-tag></p> 
          </div>
          <!-- <div slot="footer" class="btn" >
            <van-button size="mini"  @click="handleFillin(item,'jd')">填写原因措施</van-button>
          </div> -->
        </van-panel>
      </div>
      <div v-if="weekType == 'wt'" class="container">
        <van-panel :title="item.xmbh+' '+item.xmmc">
          <div class="content">
            <p><span>问题标题：</span>{{item.wtbt}}</p>
            <p><span>期望解决日期：</span>{{item.qwjjrq}}</p>
            <p><span>承诺解决日期：</span>{{item.cnjjrq}}</p>
            <p><span>问题状态：</span><van-tag round :type="item.wtzt==1?'danger':'success'">{{item.wtzt==1?'计划中':'已完成'}}</van-tag></p> 
          </div>
          <div slot="footer" class="btn" >
            <van-button size="mini" @click="handleFillin(item,'wt')">填写原因措施</van-button>
          </div>
        </van-panel>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      
    };
  },
  props: {
    dataList:{
      type:Array,
      default:()=>{
        return [{
          xmbh: "UK123456",
          xmmc: "xxxxxxxxxxxxxx",
          xmnr: "xmxmxmxmxmm",
          lcbms: "ssssssddd",
          cnwcrq: "2018-08-08",
          wczt: "1",
          cpmc:'产品名臣g',
          rwmc:'任务名称',
          wtbt:'张三三上哪上哪上哪啊',
          qwjjrq:'2018-08-09',
          cnjjrq:'2018-08-10',
          wtzt:'1'
        }]
      }
    },
    weekType: {
      type: String,
      default: "lcb"
    },
    weekState:{
      type: Number,
      default:0
    }
  },
  methods:{
    handleFillin(data,type){
      this.$emit('handleFillin',data,type);
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.container {
    margin-bottom: 0.5rem;
  .content{
    padding: 3px 15px;
  }
  .week_title {
    font-size: 0.9rem;
    color: #333;
  }
  .btn{
    text-align: right;
    padding: 0.2rem 0;
    button{
      background: #169BD5;
      color: #fff;
      border: none;
      width: 80px;
    }
  }
  p {
    font-size:0.8rem;
    margin: 3px 0;
    color: rgb(129, 127, 127);
  }
}
</style>
