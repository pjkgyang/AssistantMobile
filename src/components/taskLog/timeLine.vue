<template>
       <div class="tasklog-detail-pzlist-out">
         <div v-if="list.length">
            <span class="tasklog-pzpop-lastdot"></span>
            <p v-for="(pz,index) in list" :key="index" class="tasklog-detail-p"> 
                <span class="tasklog-pzpop-dot"></span>
                <span class="tasklog-pzpop-top">
                  <span>批注人 : </span>{{pz.yhxm}}&#x3000;<span>阅读日期 : </span>{{pz.ydsj==""?'无':pz.ydsj}}
                </span><br>
                <span class="tasklog-pzpop-bottom">
                    <span>批注内容 : </span>{{pz.bz==""?'无':pz.bz}}
                </span>
            </p>
          </div>
           <div v-else class="empty">
             <emptyContent></emptyContent>
           </div>
        </div>
</template>
<script>
 import emptyContent from  '@/components/public/empty-content.vue'
export default {
 props:{
     list:{
        type:Array,
        default:function(){
            return [
        {
          yhxm: "xxx",
          ydsj: 2011 - 10 - 10,
          bz: "asdasdasd"
        },
        {
          yhxm: "xxx",
          ydsj: 2011 - 10 - 10,
          bz: "asdasdasd"
        },
        {
          yhxm: "xxx",
          ydsj: 2011 - 10 - 10,
          bz: "asdasdasd"
        }
      ]
        }
     }  
  },
  components:{emptyContent}
};
</script>
<style scoped lang="less">
@import "../../index.less";

.tasklog-detail-pzlist-out {
  position: relative;
  .tasklog-pzpop-lastdot {
    width: 10px;
    height: 10px;
    display: inline-block;
    position: absolute;
    bottom: -3px;
    left: 4px;
    border-radius: 50%;
    background: rgb(156, 132, 132);
    z-index: 2;
  }
  .empty{
    height: 100vh;
  }
}
p.tasklog-detail-p {
  padding-left: 20px;
  padding-bottom: 5px;
  position: relative;
  .tasklog-pzpop-dot {
    width: 10px;
    height: 10px;
    display: inline-block;
    position: absolute;
    top: 2px;
    left: 4px;
    border-radius: 50%;
    background: rgb(156, 132, 132);
    z-index: 2;
  }
  .tasklog-pzpop-top {
    font-size: @fontSize12;
    span {
      color: #999;
    }
  }
  .tasklog-pzpop-bottom {
    font-size: 0.8rem;
    span {
      color: #999;
    }
  }
}
p.tasklog-detail-p:after {
  content: "";
  width: 1px;
  height: 96%;
  background: rgb(156, 132, 132);
  position: absolute;
  top: 5px;
  left: 8px;
  z-index: 1;
}
</style>
