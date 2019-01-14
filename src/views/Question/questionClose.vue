<template>
    <div>
        <div class="question-close">
            <div class="close-grid">
                <div class="close-label">
                    <h4>服务质量：</h4>
                </div>
                <div class="close-star">
                    <van-rate size="16" v-model="closeData.zlpf" /> &#x3000;<span>{{closeData.zlpf}}分</span>
                </div>
            </div>
            <!-- 服务质量小于等于填写说明 -->
            <van-cell-group v-if="closeData.zlpf<=3">
                    <van-field required v-model="closeData.sm" type="textarea" label="评价说明" placeholder="我们的服务给您带来不便，深表歉意。为了更好的为您服务，请填写评价说明！" rows="3"  />
            </van-cell-group>
            <div class="close-hjgxr">
                 <h5>合计贡献人:</h5>
                 <p class="tip">说明：请认定贡献人工时，谢谢您的支持!</p>
                 <div>
                     <section class="hjgxr-head">
                        <p>姓名</p> 
                        <p>工时(小时)</p> 
                     </section>
                     <section v-for="item in gxrgsList">
                        <p>{{item.fbrxm}}</p> 
                        <p>
                          {{item.qrgs}}  
                          <!-- <van-field disabled style="padding:5px 10px;border-left:1px solid #eee;" v-model="item.gs" />    -->
                        </p> 
                     </section>
                     <section class="no-content" v-if="gxrgsList.length == 0">
                        暂无贡献人
                     </section>
                 </div>
            </div>
            <div class="close-grid">
                <div class="close-label">
                    <h4>工时认可：</h4>
                </div>
                <div class="close-radio">
                   <van-radio-group v-model="closeData.gssfrk">
                        <van-radio name="1">是</van-radio>&#x3000;&#x3000;
                        <van-radio name="0">否</van-radio>
                   </van-radio-group>
                </div> 
            </div>    
        </div>
        <footer>
            <van-button size="normal" type="default" @click="handleClose">取消</van-button>
            <van-button  class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
        </footer>
    </div>
</template>

<script>
export default {
  data() {
    return {
      closeData: {
        zlpf:5,
        sm: "",
        gssfrk:'1'
      },
      value:0,
      gxrgsList:[], //贡献人工时列表
    };
  },
  activated(){
     this.queryrReferenceHour(); 
  },
  methods: {
    // 返回
    handleClose() {
      this.$store.dispatch('chnageMark',true);//标识
      this.$router.go(-1);
    },
    
    // 
    queryrReferenceHour(){
        this.$get(this.API.queryrReferenceHour,{
          wid:this.$route.query.wid  
        }).then(res=>{
            if(res.state == 'success'){
                this.gxrgsList = res.data;
                this.gxrgsList.forEach((ele, i, arr) => {
                    ele.qrgs = ele.confirmH.replace("/^.(d+)/", "0.");
                }); 
            }else{
                this.$toast(!res.msg ? "系统超时，请稍后再试~":res.msg); 
            }
        })
    },


    handleCommit() {
        this.$toast.loading({mask: true,message: '提交中...',duration:0});
        if(!this.validDate()) return;
    },


    validDate(){
        if(!this.closeData.zlpf){
            this.$toast("请选择质量评分"); 
            return false;
        }
        if(this.closeData.zlpf <= 3 && !this.closeData.sm){
            this.$toast("请填写评价说明"); 
            return false;
        }
        return true;
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.question-close {
  background: #fff;
  .tip{
      color: #999999;
      font-size: @fontSize12;
  }
  .close-hjgxr{
         padding: 10px 15px;
         h5{
              margin: 0.5rem 0;
          }
      >div{
          section{
               p{
                  width: 50%;
                  text-align: center;
                  font-size:@fontSize12;
                  padding: 0.5rem 0;
                }
                p:nth-child(1){
                border-right:1px solid  #eee;
                }
               border: 1px solid #eee;
              .flex(@col:center);
          }
          .no-content{
              padding: 0.5rem 0;
             justify-content: center;
             font-size:@fontSize12;
          }
          .hjgxr-head{
              font-weight: 700;
            //   p:nth-child(1){
            //     width: 51%;
            //     padding: 0.5rem 0;
            //     border-right:1px solid  #eee;
            //   }
          }
      }
  }
}
.close-label {
  width: 90px;
  font-size: @fontSize14;
  font-weight: 700;
  &::before {
    content: "*";
    position: absolute;
    left: 7px;
    font-size: 14px;
    color: #f44;
  }
}
.close-star{
    .flex();
    font-size: @fontSize14;
}
.close-grid {
  .flex(@col:center);
  padding: 10px 15px;
  border-bottom: 1px solid rgb(245, 243, 243);
  .van-radio-group{
    .flex();  
  }
  h4 {
    width: 90px;
    font-size: @fontSize14;
  }
}
</style>
