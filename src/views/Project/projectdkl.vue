<template>
    <div class="project-dkl">
        <section class="project-dkl-top" flex-column flex-row-center>
            <p flex spacebetween>
                <span col="1">合同金额（元）</span>
                <span col="1">已付款（元）</span>
                <span col="1">已开票（元）</span>
            </p>
            <p flex spacebetween>
                <span col="1">{{stepsData.htje}}</span>
                <span col="1">{{stepsData.dkje}}</span>
                <span col="1">{{stepsData.ykpje}}</span>
            </p>
        </section>

        <section class="project-dkl-bottom" :style="{'height':$store.state.clienHeight - 120+'px'}">
            <div>
                <steps :type="'dkl'"  :list="stepsList"></steps>
            </div>
        </section>
    </div>
</template>

<script>
import steps from "@/components/project/process";
export default {
  data() {
    return {
      stepsData: {},
      stepsList:[],
      xmbh: ""
    };
  },

  methods: {
    getPaymentStat() {
      this.$toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      this.$get(this.API.getPaymentStat, {
        xmbh: this.$route.query.xmbh
      }).then(res => {
        if (res.state == "success") {
          this.stepsData = res.data;
          if(!res.data.fkList){
              this.stepsList = [];
          }else{
              this.stepsList = res.data.fkList
          }
          this.$toast.clear();
        } else {
          this.$toast.clear();
          this.$toast(!res.msg ? "请求超时，请稍后再试~" : res.msg);
        }
      });
    }
  },
  activated() {
    if (this.xmbh != this.$route.query.xmbh) {
      this.getPaymentStat();
    }
    this.xmbh = this.$route.query.xmbh;
  },
  components: { steps }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.project-dkl {
  overflow-y: auto;
  .project-dkl-top {
    height: 7rem;
    background: #d7d7d7;
    text-align: center;
    p {
      font-size: @fontSize12;
      margin-bottom: 0.5rem;
    }
  }
  .project-dkl-bottom {
    padding: 1rem;
    background: #fff;
    p {
      text-align: center;
      font-size: @fontSize14;
    }
    > div {
      padding: 1rem 0;
    }
  }
}
</style>
