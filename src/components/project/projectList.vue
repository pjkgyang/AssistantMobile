<template>
  <div class="projectlist">
    <div class="project-card" v-for="(project,index) in projectList" @click="handleCheckDetail(project)">
      <div flex-col-center>
        <section class="project-card_info">
          <div flex-col-center spacebetween class="card_info-top">
            <section class="project-card_avatar" flex-center>
              <img :src="!project.logo?'static/img/unit.png':project.logo" >
            </section>
            <section >
              <h4>{{project.xmmc}}</h4>
            </section>
          </div>
          <div class="card-info_detail">
            <div>
              <p>所属单位：
                <span>{{project.dwmc}}</span>
              </p>
            </div>
            <div flex>
              <p col="1">项目编号：
                <span>{{project.xmbh}}</span>
              </p>
              <p col="1">合同编号：
                <span>{{project.htbh}}</span>
              </p>
            </div>
            <div flex>
              <p col="1">项目经理：
                <span>{{!project.yfzrrxm?'暂无':project.yfzrrxm}}</span>
              </p>
              <p col="1">甲方负责人：
                <span>{{!project.jfzrrxm?'暂无':project.jfzrrxm}}</span>
              </p>
            </div>
            <div flex spacebetween>
              <div col="3" flex-col-center>
                <p col="1">项目进度：</p>
                <div col="5">
                  <progressBar :percentage="!project.p_xmjd?0:project.p_xmjd"></progressBar>
                </div> 
              </div>
              <!-- <div col="1" text-right>
               <van-tag round :type="project.xmjd=='已完成'?'danger':'success'">{{project.xmjd}}</van-tag>
              </div> -->
            </div>
          </div>
        </section>
        <section class="project-card_link">
          <van-icon name="arrow" />
        </section>
      </div>
       <aside  :class="{'active-color-orange':project.xmzt!='在建'&&project.xmzt!='售后','active-color-green':project.xmzt=='在建'||project.xmzt=='售后'}" >
          {{project.xmzt}}
        </aside>
    </div>
  </div>
</template>

<script>
import progressBar from '@/components/public/progress'
export default {
  data() {
    return {
      // errorImg: 'this.src="' + require("../../../static/img/unit.png") + '"',
    };
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
  components: {progressBar}
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
    // link
    .project-card_link {
      width: 12%;
      text-align: center;
    }
    // 内荣
    .project-card_info {
      width: 88%;
      p{
        white-space: nowrap;
        // text-overflow: ellipsis;
        // overflow: hidden;
      }
      .card_info-top {
        .project-card_avatar {
          width: 17%;
          height: 13.28vw;
          padding: 0.133rem;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .project-card_avatar+section{
          width: 82%;
          p{
            font-size: 12px;
          }
        }
      }
      .card-info_detail {
        font-size: @fontSize12;
        color: #999999;
        margin: 0.2222rem 0;
        span {
          color: #333;
        }
        >div{
          padding: 0.1rem 0;
        }
      }
    }
  }
  aside{
    color: #fff;
    transform: rotate(45deg);
    width: 80px;
    height: 1.3rem;
    position: absolute;
    right: -21px;
    top:8px;
    text-align: center;
    font-size:@fontSize12;
    line-height: 1.3rem;
  }
  .btn-reject-close {
    display: block;
    text-align: right;
    margin: 0.3rem 0;
  }
}
</style>
