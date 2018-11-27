<template>
    <div class="weekReport_detail">
        <header>
            <van-tabs v-model="weekActive">
                <van-tab title="本周工作总结"></van-tab>
                <van-tab title="下周工作计划"></van-tab>
            </van-tabs>
            <van-tabs @change="handleChange" type="card" class="tabs_card">
                <van-tab title="里程碑工作"></van-tab>
                <van-tab title="进度任务"></van-tab>
                <van-tab title="问题处理"></van-tab>
            </van-tabs>
        </header>
        <main>
            <detailList :weekType="weekType" ></detailList>
        </main>
        <footer>
            <mu-button  full-width color="success" class="btnBlue" @click="handleReview">批阅</mu-button>
            <!-- <van-button class="commitButton" type="default" @click="handleReview">批阅</van-button> -->
        </footer>
    </div>
</template>

<script>
import detailList from "../../components/weekReport/detailList.vue";
export default {
  data() {
    return {
      weekType: "lcb",
      weekActive:0,
    };
  },
  methods: {
    handleChange(index, title) {
      this.weekType = index == 0 ? "lcb" : index == 1 ? "jd" : "wt";
    },
    // 批阅
    handleReview(){
      this.$router.push({path:'/weekreview'})
    }
  },
  mounted(){
      
  },
  activated(){
    // JSON.parse(unescape(this.$route.query.data))
    console.log(this.$route.query)
  },
  components: { detailList }
};
</script>

<style lang="less" scoped>
.weekReport_detail {
  .add_btn {
    text-align: center;
    margin: 0.5rem 0;
    button {
      width: 92%;
    }
  }
  header {
    margin-bottom: 0.5rem;
    .tabs_card {
      margin-top: 0.5rem;
    }
  }
  main {
    max-height: calc(100vh - 135px);
    overflow-y: auto;
  }
  footer{
      position: absolute;
      bottom:0.3rem;
      width: 100%;
      button{
          width: 100%;
          color: #fff;
      }
  }
}
</style>
