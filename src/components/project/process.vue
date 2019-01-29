<template>
    <div>
        <ul v-if="list.length">
            <li v-for="(process,index) in list" :key="index" 
            :class="{'active-dkl':type == 'dkl','active':process.completed == true && type == 'process'}">
                <div v-if="type == 'process'">{{process.jdmc}}</div>
                <div v-else class="crowd">
                     <p><span>{{process.sj}}</span>&#x3000;<van-tag type="primary" round>{{process.sm}}</van-tag></p>
                     <p><span class="color999">金额：</span>{{process.je}}</p>  
                </div>
            </li>
        </ul>
        <div v-else text-center> 
          {{type=='process'?'暂无进度':'暂无付款记录'}}
        </div>
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
        return [];
      }
    },
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

  ul li.active-dkl{
    padding: 0.2rem 0 0.5rem 1.8rem;
    color: #333;
  }
  ul li.active-dkl::before {
    background-color: #409eff;
    width: 16px;
    height: 16px;
    z-index: 1000;
  }
  ul li.active-dkl::after{
    background-color: #409eff;
    left: 7px;
  }



  ul li:last-child::after {
    display: none;
  }
</style>
