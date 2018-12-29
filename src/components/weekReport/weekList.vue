<template>
  <div class="weekadd_card">
    <div v-for="item in dataList">
      <div v-if="weekType == 'lcb'" class="container">
        <van-panel :title="item.xmbh+' '+item.xmmc">
          <div class="content">
            <p><span>项目内容：</span>{{item.xmnr}}</p>
            <p><span>里程碑描述：</span>{{item.lcbms}}</p>
            <p><span>承诺完成时间：</span>{{item.cnwcrq}}</p>
            <p><span>完成状态：</span><van-tag round :type="item.zt==0?'danger':'success'">{{item.zt==0?'计划中':'已完成'}}</van-tag></p> 
            <p v-if="item.zt == 0"><span>未完成原因:</span>{{item.wwcyy}}</p>
            <p v-if="item.zt == 0"><span>后续措施:</span>{{item.hxcs}}</p>
          </div>
          <div slot="footer" class="btn" v-if="item.zt==0">
            <van-button style="background:#00c1de" size="mini" type="danger" @click="handleFillin(item,'lcb')">填写原因措施</van-button>
          </div>
        </van-panel>
      </div>
      <div v-if="weekType == 'jd'" class="container">
        <van-panel :title="item.xmbh+' '+item.xmmc">
          <div class="content">
            <p><span>产品名称：</span>{{item.cpmc}}</p>
            <p><span>任务名称：</span>{{item.rwmc}}</p>
            <p><span>完成状态：</span><van-tag round :type="item.zt==0?'danger':'success'">{{item.zt==0?'计划中':'已完成'}}</van-tag></p> 
            <p><span>工作内容:</span>{{item.gzms}}</p>
            <p v-if="item.zt == 0"><span>未完成原因:</span>{{item.wwcyy}}</p>
            <p v-if="item.zt == 0"><span>后续措施:</span>{{item.hxcs}}</p>
          </div>
          <div slot="footer" class="btn" v-if="item.zt == 0">
            <van-button style="background:#00c1de" size="mini"  @click="handleFillin(item,'jd')">{{weekState==0?'总结':'计划'}}</van-button>
          </div>
        </van-panel>
      </div>
      <div v-if="weekType == 'wt'" class="container">
        <van-panel :title="item.xmbh+' '+item.xmmc">
          <div class="content">
            <p><span>问题标题：</span>{{item.wtbt}}</p>
            <p><span>期望解决日期：</span>{{item.qwjjrq}}</p>
            <p><span>承诺解决日期：</span>{{item.cnjjrq}}</p>
            <p><span>问题状态：</span><van-tag round :type="item.zt==0?'danger':'success'">{{item.zt==0?'计划中':'已完成'}}</van-tag></p> 
            <p v-if="item.zt == 0"><span>未完成原因:</span>{{item.wwcyy}}</p>
            <p v-if="item.zt == 0"><span>后续措施:</span>{{item.hxcs}}</p>
          </div>
          <div slot="footer" class="btn" v-if="item.zt==0">
            <van-button size="mini" @click="handleFillin(item,'wt')" style="background:#00c1de">填写原因措施</van-button>
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
        return []
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
    margin-bottom: 0.15rem;
  .content{
    padding: 3px 15px;
    &:nth-of-type(1),&:nth-of-type(3){
      span:nth-child(1){
      width:90px;
     }
    }
    &:nth-of-type(2){
      span:nth-child(1){
        width:70px;
      }
    }
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
     span:nth-child(1){
      display: inline-block;
      color:#999999;
    }
  }
}
</style>
