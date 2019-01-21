<template>
    <div>
        <ul v-if="list.length" :style="{'counter-reset':type=='process'?'step':'step ' + (list.length+1)}">
            <li v-for="(process,index) in list" :key="index" 
            :class="{'crowdBefore':type=='crowd','active':process.flag == 2,'active-1':process.flag == 1}">
                <div v-if="type == 'process'">{{process.mc}}</div>
                <div v-else class="crowd">
                     <p><span>{{process.czrxm}}</span>&#x3000;{{process.czsj}}&#x3000;<van-tag round type="primary">{{process.ztDisplay}}</van-tag></p>
                     <p>审核意见:<span>{{process.shyy}}</span></p>  
                </div>
            </li>
        </ul>
        <div v-else class="empty">
            <emptyContent></emptyContent>
        </div>
    </div>
</template>
<script>
import emptyContent from "@/components/public/empty-content.vue";
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
    }
  },
  mounted() {

  },
  components: { emptyContent }
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
      padding: 0 0 1rem 1.8rem;
      z-index: 2;
      color: #999;
      &::before {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        content: counter(step); /*设定计数器内容*/
        counter-increment: step; /*计数器值递增*/
        width: 20px;
        height: 20px;
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
        left: 9px;
        top: 16px;
        z-index: 2; 
      }
      .crowd{
           span:nth-child(1){
             color: #333;
           }
      }
    }
  }

  li.crowdBefore::before{
    content: counter(step);
    counter-increment:step -1;
  }
  li.active{
      color: #4b0;
  }
  ul li.active::before,
  ul li.active::after {
    background-color: #4b0;
  }

  li.active-1{
    color: rgb(226, 28, 28);
  }
  ul li.active-1::before,
  ul li.active-1::after {
    background-color: #f00;
  }

  ul li.active::before{
      content:'✔';
  }
  ul li:last-child::after {
    display: none;
  }
</style>
