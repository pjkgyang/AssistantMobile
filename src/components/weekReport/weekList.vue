<template>
  <div class="weekadd_card">
    <div v-for="(item,index) in dataList">
      <div v-if="weekType == 'lcb'" class="container">
        <van-panel :title="item.xmbh+' '+item.xmmc">
          <div class="content">
            <p><span>项目内容：</span>{{item.xmnr}}</p>
            <p><span>里程碑描述：</span>{{item.lcbms}}</p>
            <p><span>承诺完成时间：</span>{{item.cnwcrq}}</p>
            <p><span>完成状态：</span><van-tag round :type="item.zt==1?'danger':'success'">{{item.zt_display}}</van-tag></p> 
            <p><span>工作内容:</span>{{item.gznr}}</p>
            <p v-if="item.zt == 1 && !weekState"><span>未完成原因:</span>{{item.wwcyy}}</p>
            <p v-if="item.zt == 1 && !weekState"><span>后续措施:</span>{{item.hxcs}}</p>
          </div>
          <!-- 封存不能操作 -->
          <div slot="footer" class="btn" v-if="(!!weekState && !isNextBlock) || (!weekState && !isBlock)">
            <van-button v-if="item.zt == 1" style="background:#00c1de" size="mini" type="danger" @click="handleFillin(item,'lcb')">{{weekState==0?'填写原因措施':'填写工作内容'}}</van-button>
            <van-button  size="mini" type="danger" @click="handleDelete(item,'lcb',index)">删除</van-button>
          </div>
        </van-panel>
      </div>
      <div v-if="weekType == 'jd'" class="container">
        <van-panel :title="item.xmbh+' '+item.xmmc">
          <div class="content Jd_content">
            <p><span>产品名称：</span>{{item.cpmc}}</p>
            <p><span>任务名称：</span>{{item.rwmc}}</p>
            <p><span>完成状态：</span><van-tag round :type="item.zt==0?'danger':'success'">{{item.zt==0?'计划中':'已完成'}}</van-tag></p> 
            <p><span>工作内容:</span>{{item.gzms}}</p>
            <p v-if="item.zt == 0 && !weekState"><span>未完成原因:</span>{{item.wwcyy}}</p>
            <p v-if="item.zt == 0 && !weekState"><span>后续措施:</span>{{item.hxcs}}</p>
          </div>
          <!-- 是否封存 v-if="!isBlock" -->
          <div slot="footer" class="btn" v-if="(!!weekState && !isNextBlock) || (!weekState && !isBlock)">
            <van-button v-if="item.zt == 0"  style="background:#00c1de" size="mini"  @click="handleFillin(item,'jd')">{{weekState==0?'总结':'计划'}}</van-button>
            <van-button  size="mini" type="danger" @click="handleDelete(item,'jd',index)">删除</van-button>
          </div>
        </van-panel>
      </div>
      <div v-if="weekType == 'wt'" class="container">
        <van-panel :title="item.xmbh+' '+item.xmmc">
          <div class="content">
            <p><span>问题标题：</span>{{item.wtbt}}</p>
            <p><span>期望解决日期：</span>{{item.qwjjrq}}</p>
            <p><span>承诺解决日期：</span>{{item.cnjjrq}}</p>
            <p><span>问题状态：</span><van-tag round :type="item.zt==0?'danger':'success'">{{item.zt==0||item.zt==2?'处理中':'已关闭'}}</van-tag></p> 
            <p v-if="!weekState"><span>未完成原因:</span>{{item.wwcyy}}</p>
            <p v-if="!weekState"><span>后续措施:</span>{{item.hxcs}}</p>
            <p v-if="weekState"><span>处理计划：</span>{{item.cljh}}</p>
          </div>
          <div slot="footer" class="btn" v-if="(!!weekState && !isNextBlock) || (!weekState && !isBlock)">
            <van-button  size="mini" @click="handleFillin(item,'wt')" style="background:#00c1de">{{weekState==0?'总结':'计划'}}</van-button>
            <van-button  size="mini" type="danger" @click="handleDelete(item,'wt',index)">删除</van-button>
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
    },
    isBlock:{
      type:Boolean,
      default:false
    },
    isNextBlock:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    handleFillin(data,type){
      this.$emit('handleFillin',data,type);
    },
    handleDelete(data,type,index){
      this.$emit('handleDelete',data,type,index);
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
      width:95px;
     }
    }
  }
  .content.Jd_content{
    span:nth-child(1){
      width:75px;
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
