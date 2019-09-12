<template>
    <div>
        <section class="quesiton-reply" v-for="(reply,index) in replyData" ref="li">
            <div class="reply-state"> 
                <div>
                  <van-tag size="large" :color="'rgb(57, 147, 243)'">
                        {{reply.hflxmc}}
                  </van-tag>
                </div>
            </div>
            <div class="reply-header">
               {{reply.hfrxm}}&#x3000;发表于&#x3000;{{reply.hfsj}}
            </div>
            <div>
               <div @click="previewImage"  class="reply-content" v-html="reply.nr" ></div>
            </div>
        </section>
            <!-- 图片预览 -->
        <div v-transfer-dom>
          <previewer :list="imgList" ref="previewer"></previewer>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        gxrList:[], // 贡献人
        hjgs:0,
        imgList:[] //图片
    };
  },
  props: {
    replyData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    // replyData(){
    //      this.$nextTick( () => {
    //         this.$refs.li[6].scrollIntoView();
    //     })
    //  }
  },
  methods:{
    handleReject(params,index){
      this.$emit('handleReject',params,index);
    },
    previewImage(e) {
      if (e.target.nodeName == "IMG") {
        this.imgList.length = 0;
        let imgArr = e.currentTarget.getElementsByTagName("img"),
          url = e.target.currentSrc,
          curIndex;
        for (var i = 0; i < imgArr.length; i++) {
          if (imgArr[i].currentSrc == url) {
            curIndex = i;
          }
          this.imgList.push({ src: imgArr[i].currentSrc });
        }
        this.$refs.previewer.show(curIndex);
      } else {
        return;
      }
    },
    // 查看crowd
    handleCheckCrowd(data){
      this.$router.push({path:'/crowd',query:{crowdid:data}});  
    }
  },
  mounted(){},
  activated(){},
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.quesiton-reply {
  background: #fff;
  padding: 0.5rem 1.25rem;
  margin-bottom: 0.2rem;
  .reply-header {
    border-bottom: 1px solid #e8e8e8;
    padding: 0.5rem 0;
    color: #999999;
    font-size: @fontSize12;
  }
  .reply-state{
    .flex(space-between);
  }

  .reply-content {
    padding: 0.5rem 0;
    font-size: @fontSize14;
    >section{
      margin: 0.3rem 0;
      h4{
        background: linear-gradient(to right bottom, rgb(38, 80, 82), rgb(217, 217, 240));
        -webkit-background-clip: text;
        color: transparent;
        span{
          color: #f00;
        }
      }
      >div {
        padding:0 0.85rem;
      p{
        span:nth-of-type(1){
          display: inline-block;
          width: 40%;
        }
      }
     }
    } 
  }
}
</style>
