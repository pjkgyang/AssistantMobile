<template>
    <div>
      <div>
        <van-cell-group>
            <van-field required v-model="questionmcData.nycd" type="textarea" label="难易程度" placeholder="请选择" is-link rows="1" autosize @click="onClick('nycd')" />
            <van-field required v-model="questionmcData.sfjj" type="textarea" label="是否紧急" placeholder="请选择" is-link rows="1" autosize @click="onClick('sfjj')" />
            <van-field required v-model="questionmcData.sfbug" type="textarea" label="是否bug" placeholder="请选择" is-link rows="1" autosize @click="onClick('sfbug')" />
            <van-field required v-model="questionData.gs" type="number" label="工时" placeholder="请输入" rows="1" autosize />
            <van-field  v-model="questionData.sm" type="textarea" label="关闭说明" placeholder="请输入" rows="5"  />
        </van-cell-group>

        <footer>
            <van-button size="normal" type="default" @click="handleClose">取消</van-button>
            <van-button  class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
        </footer>
      </div>

      <van-actionsheet v-model="actionSheetShow" :title="'选择'+actionSheetTitle" >
          <ul :class="{'actionsheet_list':true}" > 
              <li v-for="(value,key) in optionList" @click="handleOnSelect(key,value)">{{value}}</li>
          </ul>
      </van-actionsheet>
    </div>
</template>

<script>
export default {
  data() {
    return {
      actionSheetShow:false,
      actionSheetTitle:'',
      questionData: {
        nycd:'',//难易程度
        sfjj:'',//是否紧急
        sfbug:'',
        gs:'',
        sm:''
      },
      questionmcData:{
        nycd:'',
        sfjj:'',
        sfbug:'',
      },
      type:'',//记录选择cell
      optionList:{},//列表数据
      nycdList:{1:'低',2:'一般',3:'中',4:'高'},//难易程度
      sfjjList:{0:'否',1:'是'},//是否紧急
      sfbugList:{0:'否',1:'是'},//是否bug
    };
  },
  methods:{
   onClick(params,e){
     document.activeElement.blur();
     this.type = params;
     this.actionSheetShow = true;
   },
   // 返回
   handleClose(){
     this.$store.dispatch('chnageMark',true);//标识
     this.$router.go(-1);
   },
   // 选择
   handleOnSelect(key,value){
     if(this.type == 'nycd'){
        this.questionmcData.nycd = value;
        this.questionData.nycd = key;
     }else if(this.type == 'sfjj'){
       this.questionmcData.sfjj = value;
       this.questionData.sfjj = key;
     }else if(this.type == 'sfbug'){
       this.questionmcData.sfbug = value;
       this.questionData.sfbug = key;
     }
     this.actionSheetShow = false;
   },
 
   handleCommit(){
     if(!this.validDate()) return;
     this.$post(this.API.saveAnswer,{
        zbwid: this.$route.query.wid,
        nr: !this.questionData.sm? "申请关闭" : this.questionData.sm,
        nycd: this.questionData.nycd,
        gs: this.questionData.gs,
        sfbg: this.questionData.sfbug,
        jjyf: this.questionData.sfjj,
        hflx: 3
     }).then(res=>{
       if(res.state == 'success'){
          this.$toast.clear();
          this.$toast('提交成功~');
          this.$router.go(-1);
       }else{
          this.$toast.clear();
          this.$toast(!res.msg?"系统超时，请稍后再试~":res.msg); 
       }
     })
   },
   
   queryrHfHour(){
     this.$get(this.API.queryrHfHour,{
          wid: this.$route.query.wid
        }).then(res=>{
            if(res.state == 'success'){
            this.questionData.gs = res.data;   
        }else{
            this.$toast(!res.msg?"系统超时，请稍后再试~":res.msg); 
        }
      }) 
   },
       
   validDate(){
     if(!this.questionData.nycd){
       this.$toast('请选择难易程度');
       return false;
     }
     if(!this.questionData.sfjj){
       this.$toast('请选择是否紧急');
       return false;
     }
     if(!this.questionData.sfbug){
       this.$toast('请选择是否bug');
       return false;
     }
     if(!/^\d+(\.\d+)?$/.test(this.questionData.gs)){
       this.$toast('请填写正确工时');
       return false;
     }
     return true;
    //  if(!this.questionmcData.sm){
    //    this.$toast('请填写说明内容');
    //    return false;
    //  }
   }

  },
  mounted(){},
  activated(){
    this.queryrHfHour();
  },
  watch:{
    type(n,o){
      switch (n) {
        case 'nycd':
          this.actionSheetTitle = '难易程度';
          this.optionList = this.nycdList;
          break;
        case 'sfjj':
          this.actionSheetTitle = '是否紧急';
          this.optionList = this.sfjjList;
          break;
        case 'sfbug':
          this.actionSheetTitle = '是否bug';
          this.optionList = this.sfbugList;
          break;
        default:
          break;
      }
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
  .actionsheet_list{
      height:20vh;
      overflow-y: auto;
      li{
        color: #575656;
        text-align: center;
        padding: 0.45555rem 0;
        font-size: 0.85rem;
      }
  } 
</style>
