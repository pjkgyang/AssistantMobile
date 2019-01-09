<template>
    <div >
        <ul v-if="list.length">
            <li v-for="(process,index) in list" :key="index" :class="{'active':process.flag == 2}">
                {{process.mc}}
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
    counter-reset: step; 
    li {
      list-style-type: none;
      font-size: 0.9rem;
      position: relative;
      padding: 0 0 0 1.8rem;
      height: 2.5rem;
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
    }
  }
  li.active{
      color: #4b0;
  }
  ul li.active::before,
  ul li.active::after {
    background-color: #4b0;
  }
  ul li.active::before{
      content:'✔';
  }
  ul li:last-child::after {
    display: none;
  }
</style>
