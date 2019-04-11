<template>
 <div>
     <van-popup v-model="show" position="right" >
       <div  class="filter-pop">
        <div class="assistant-filtercondition">
           <section v-for="(filter,index) in filterList">
               <h5><span>●</span>&nbsp;{{filter.name}}</h5>
               <div class="assistant-filtercondition-list">
                   <van-tag :plain="!!filter.cpbh" :color="!filter.cpbh?'#00c1de':''" :style="{'color':!filter.cpbh?'#fff !important':'#555 !important'}"
                   @click.native="hanleChoosefilter('',index)">全部</van-tag>
                   <van-tag :plain="filter.cpbh != value" :color="filter.cpbh==value?'#00c1de':''" :style="{'color':filter.cpbh==value?'#fff !important':'#555 !important'}"  
                   v-for="(key,value) in filter.cplist" :key="index" @click.native="hanleChoosefilter(value,index)">{{key}}</van-tag>
               </div>
           </section>
        </div>
        <footer>
            <van-button size="normal" type="default" @click="handleClose">取消</van-button>
            <!-- <van-button  class="commitButton" size="normal" type="primary" @click="handleCommitFilter">筛选</van-button> -->
        </footer>
        </div>
     </van-popup>
 </div>
</template>

<script>
import { getMenu, getSession } from "@/utils/util.js";
export default {
  data() {
    return {
      filterList: [
        {
          name: "产品",
          cplist: {},
          cpbh: ""
        }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //  选择筛选
    hanleChoosefilter(params, index) {
      this.filterList[index].cpbh = params;
      this.$emit("hanleChoosefilter", params);
    },
    handleClose() {
      this.$emit("handleClose", "");
    },
    // 获取枚举
    getDictEnum() {
      if (!getSession("cp")) {
        getMenu("cp", true).then(data => {
          this.filterList[0].cplist = data;
        });
      } else {
        this.filterList[0].cplist = getSession("cp");
      }
    }
  },
  mounted() {
    //获取产品枚举
    this.getDictEnum();
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.filter-pop {
  background: #f2f3f5;
  height: 100vh;
}
.assistant-filtercondition {
  height: calc(100vh - 60px);
  width: 93vw;
  overflow-y: auto;
  background: #fff;
  h5 {
    font-size: @fontSize14;
    border-bottom: 1.5px solid rgb(236, 235, 235);
    padding: 0.5rem 0.3rem;
    margin-bottom: 0.3rem;
    span {
      color: @baseColor;
    }
  }
  .assistant-filtercondition-list {
    .flex();
    flex-wrap: wrap;
    .van-tag {
      margin: 0.2rem 0 0.2rem 0.2rem;
      padding: 0.2rem 0.4rem !important;
      width: 32%;
      text-align: center;
      height: 2.2rem;
      background: rgba(182, 181, 181, 0.2);
      .flex(center,center);
      .van-hairline--surround::after {
        border: none !important;
      }
    }
  }
}
</style>
