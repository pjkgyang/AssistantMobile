<template>
    <div class="assistant-crowd">
        <section class="assistant-crowd_top" >
           <p>任务名称：
                <span>{{!CrowdRwxx.rwmc?'无':CrowdRwxx.rwmc}}</span>
            </p>
            <p>任务编号：
                <span>{{!CrowdRwxx.rwbh?'无':CrowdRwxx.rwbh}}</span>
            </p>
            <p>交付日期：
                <span>{{!CrowdRwxx.jfrq?'无':CrowdRwxx.jfrq}}</span>
            </p>
        </section>
        <section class="assistant-crowd_list" :style="{'maxHeight':$store.state.clienHeight - 100 +'px'}">
            <steps :type="'crowd'" :list="JDGZList"></steps>
        </section>
    </div>
</template>

<script>
import steps from "@/components/question/steps";
import { formatTime } from "@/utils/util";
export default {
  data() {
    return {
      CrowdRwxx: {},
      JDGZList: []
    };
  },
  methods: {
    getCrowd(rwbh) {
      this.$get(this.API.getCrowdRwzt, {
        rwbh: rwbh
      }).then(res => {
        if (res.state == "success") {
          if (res.data != null && res.data.length != 0) {
            this.JDGZList = res.data;
            this.JDGZList.forEach((ele, i, arr) => {
              ele.czsj = formatTime(ele.czsj / 1000);
            });
          } else {
            this.JDGZList = [];
          }
        }
      });

      this.$get(this.API.getCrowdRwxx, {
        rwbh: rwbh
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data) {
            this.CrowdRwxx = res.data;
          } else {
            this.CrowdRwxx = {};
          }
        }
      });
    }
  },
  activated() {
    this.$store.dispatch('chnageMark',true); //标识
    this.getCrowd(this.$route.query.crowdid);
  },
  components: { steps }
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.assistant-crowd_top {
  font-size: @fontSize14;
  border-bottom: 1px solid #E8E8E8;
  padding-bottom:1rem;
  p {
    color: #999999;
    span {
      color: #333;
    }
  }
}
.assistant-crowd_list{
    padding-top:1rem; 
    overflow-y: auto;
}

.assistant-crowd {
  padding: 1rem 1.25rem;
  background: #fff;
}
</style>
