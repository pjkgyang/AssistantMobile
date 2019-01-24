<template>
    <div>
        <ul v-if="list.length" >
            <li v-for="(process,index) in list" :key="index" 
            :class="{'active':process.completed == true}">
                <div v-if="type == 'process'">{{process.jdmc}}</div>
                <div v-else class="crowd">
                     <p><span>{{process.czrxm}}</span>&#x3000;{{process.czsj}}&#x3000;<van-tag round type="primary">{{process.ztDisplay}}</van-tag></p>
                     <p>审核意见:<span>{{process.shyy}}</span></p>  
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
      return{
          
      }
  },
  props: {
    type:{
      type:String,
      default:'process'
    },
    list: {
      type: Array,
      default: function() {
        return [{
            jdmc:'启动',
            completed:true
        },{
            jdmc:'安装部署',
            completed:true
        },{
            jdmc:'项目实施',
            completed:false
        },{
            jdmc:'试运行',
            completed:false
        },{
            jdmc:'验收',
            completed:false
        }];
      }
    }
  },
  mounted() {

  },
  components: {  }
};
</script>
<style scoped lang="less">
@import "../../index.less";
  ul {
    position: relative;
    margin-bottom: 30px;
    li {
      list-style-type: none;
      font-size: 0.9rem;
      position: relative;
      padding: 0 0 0.5rem 1rem;
      z-index: 2;
      color: #999;
      &::before {
        display: block;
        position: absolute;
        content: ''; 
        left: 0;
        top: 4px;
        width: 10px;
        height: 10px;
        background-color: #999;
        line-height: 20px;
        border-radius: 20px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        margin: 0 auto 8px auto;
      }
      &::after {
        content: "";
        width: 2px;
        height: 100%;
        background-color: #999;
        position: absolute;
        left: 4px;
        top: 13px;
        z-index: 2; 
      }
    }
  }

  li.active{
      color: #409eff;
  }
  ul li.active::before,
  ul li.active::after {
    background-color: #409eff;
  }

  ul li:last-child::after {
    display: none;
  }
</style>
