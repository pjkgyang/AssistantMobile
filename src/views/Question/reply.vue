<template>
    <div>
        <div class="question-reply">
            <van-cell-group>
                <van-field required v-model="hfData.gs" type="number" label="实施工时" placeholder="请输入" rows="1" autosize />
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
             <van-cell-group>
                <van-field required v-model="hfData.nr" type="textarea" label="内容" placeholder="请输入" rows="7"  />
            </van-cell-group>

        <div class="hf-radio hf-nr">
                <div class="hf-label">
                    <span>上传图片</span>
                </div>
                <div class="hf-content">
                    <uploadImg @handleOnReadImgs="handleOnReadImgs"></uploadImg>
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
        nr: "",

        imgStr:''
      }
    };
  },
  methods:{
        // 选择图片
      handleOnReadImgs(params){
         this.imgStr = '';
         if(!!params.length){
            params.forEach(ele=>{
               this.imgStr += '<img src='+ele+ '>'
          })
        }
       }, 

      handleClose(){
        this.$store.dispatch('chnageMark',true);
        this.$router.go(-1);  
      },
      handleCommit(){
        if(!this.validDate()) return;
        let nr = "<p>"+this.hfData.nr+'</p>'+ this.imgStr;
        this.$post(this.API.saveAnswer,{
           zbwid:this.$route.query.wid,
           gs:this.hfData.gs,
           nr:nr,
           sfbug:this.hfData.sfbug,
           tztwr:this.hfData.tztwr,
           hflx:1,
        }).then(res=>{
            if(res.state == 'success'){
               this.$toast.clear();
               this.$toast({message:'回复成功~',duration:1500});
               this.$router.go(-1);
            }else{
               this.$toast.clear();
               this.$toast(!res.msg?'请求超时，请稍后再试~':res.msg); 
            }
        })
      },
      
      validDate(){
          if(!/^\d+(\.\d+)?$/.test(this.hfData.gs) || this.hfData.gs > 8){
            this.$toast("请输入正确工时且单次工时不能超过8小时,大于8小时请分多个回复!");
            return false;
          }
          if(/^[\s]*$/.test(this.hfData.nr)){
            this.$toast("请输入回复内容!");
            return false;  
          }
          return true;
      }
  },
  activated(){
      this.hfData.gs = 0;
      this.hfData.nr = '';
      this.hfData.sfbug = '0';
      this.hfData.tztwr = '1';
      this.imgStr = '';
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
