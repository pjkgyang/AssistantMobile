<template>
    <div>
        <div class="question-close">
            <div class="close-grid">
                <div class="close-label">
                    <h4>服务质量：</h4>
                </div>
                <div>
                    <van-rate size="16" v-model="closeData.zlpf" />
                </div>
            </div>
            <!-- 服务质量小于等于填写说明 -->
            <van-cell-group v-if="closeData.zlpf<=3">
                <van-field required v-model="closeData.sm" type="textarea" label="评价说明" placeholder="请输入" rows="3"  />
            </van-cell-group>
            <div class="close-hjgxr">
                 <p class="tip">说明：请认定贡献人工时，谢谢您的支持!</p>
                 <h5>合计贡献人:</h5>
                 <div>
                     <section v-for="item in 3">
                        <p>张三</p> 
                        <p>
                          <van-field style="padding:5px 10px;border-left:1px solid #eee;" v-model="value" placeholder="" />   
                        </p> 
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
            <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
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
        value:0
    };
  },
  methods: {
    handleClose() {
      this.$router.go(-1);
    },
    handleCommit() {}
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
                 
              }
              border: 1px solid #eee;
              .flex(@col:center);
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
