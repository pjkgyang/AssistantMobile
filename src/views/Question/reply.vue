<template>
    <div>
        <div class="question-reply">
            <van-cell-group>
                <van-field required v-model="hfData.gs" type="textarea" label="实施工时" placeholder="请输入" rows="1" autosize />
            </van-cell-group>
            <div class="hf-radio">
                <h4>是否bug</h4>
                <van-radio-group v-model="hfData.sfbug">
                    <van-radio name="1">是</van-radio>&#x3000;&#x3000;
                    <van-radio name="0" checked-color="#00c1de">否</van-radio>
                </van-radio-group>
            </div>
            <div class="hf-radio">
                <h4>通知提问人</h4>
                <van-radio-group v-model="hfData.tztwr">
                    <van-radio name="1">是</van-radio>&#x3000;&#x3000;
                    <van-radio name="0">否</van-radio>
                </van-radio-group>
            </div>
            <div class="hf-radio hf-nr">
                <div class="hf-label">
                    <span>内容</span>
                </div>
                <div class="hf-content">
                    <uploadImg></uploadImg><br>
                    <div class="xq-textarea">
                       <van-field style="padding:0" v-model="hfData.nr" type="textarea" placeholder="请输入" rows="7"  />
                    </div>
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
 import uploadImg from '@/components/public/uploadImg';
export default {
  data() {
    return {
      hfData: {
        gs: 0,
        sfbug: "0",
        tztwr: "1",
        nr: ""
      }
    };
  },
  methods:{
      handleClose(){
        this.$router.go(-1);  
      },
      handleCommit(){
          
      }
  },
  components: {uploadImg}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.question-reply {
  background: #fff;
}
.hf-nr{
    align-items: flex-start !important;
   .hf-label {
    width: 90px;
    font-size: @fontSize14;
    font-weight: 700;
      &::before{
       content:'*';
       position:absolute;
       left: 7px;
       font-size:14px;
       color: #f44;
     }
  } 
}
.hf-radio {
  .flex(@col:center);
  padding: 10px 15px;
  border-bottom: 1px solid rgb(245, 243, 243);
  h4 {
    width: 90px;
    font-size: @fontSize14;
  }
  .van-radio-group {
    .flex();
  }
  .hf-content {
    display: flex;
    flex-direction: column;
    .xq-textarea{
     width:calc(100vw - 120px);
    }
  }
}
</style>
