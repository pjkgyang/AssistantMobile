<template>
  <div class="projectlist">
    <div class="project-card" v-for="(project,index) in projectList" @click="handleCheckDetail(project)">
      <div>
        <section class="project-card_avatar">
         <img src="../../../static/img/logo.png" alt="">
        </section>
        <section class="project-card_info">
          <h4>{{project.xmmc}}</h4>
          <div class="card-info_detail">
            <p>项目编号：
              <span>{{project.xmbh}}</span>
            </p>
            <p>合同编号：
              <span>{{project.htbh}}</span>
            </p>
            <p>项目经理：
              <span>{{project.xmjl}}</span>
            </p>
            <p>甲方负责人：
              <span>{{project.jfzrrxm}}</span>
            </p>
          </div>
        </section>
        <section class="project-card_link">
          <van-icon name="arrow" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCheckDetail(params) {
      this.$emit("handleCheckDetail", params);
    },
    //
    handleCloseOrReject(type, params) {
      this.$emit("handleCloseOrReject", type, params);
    }
  },
  props: {
    projectList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isCloseShow: {
      type: Boolean,
      default: false
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../index.less";

.project-card {
  background: #fff;
  position: relative;
  overflow: hidden;
  width: 96%;
  border-radius: 0.5rem;
  margin: 0.3rem auto;
  box-shadow: 0 0 10px rgb(214, 213, 213);
  &::after {
    display: block;
    content: "";
    clear: both;
  }
  > div {
    padding: 0.5rem 0.85rem;
    .flex(space-around,center);
    .project-card_avatar {
      width: 18%;
      height: 15.95vw;
      text-align: center;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    // link
    .project-card_link {
      width: 10%;
      text-align: center;
    }
    // 内荣
    .project-card_info {
      width: 70%;
      .card-info_detail {
        font-size: @fontSize12;
        color: #999999;
        span {
          color: #333;
        }
        > div {
          padding: 0.3rem 0;
        }
      }
    }
  }
  .btn-reject-close {
    display: block;
    text-align: right;
    margin: 0.3rem 0;
  }
}
</style>
