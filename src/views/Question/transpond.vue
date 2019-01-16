<template>
    <div>
      <div>
        <van-cell-group>
            <van-field required v-model="questionmcData.zfdx" type="textarea" label="转发对象" placeholder="请选择" is-link rows="1" autosize @click="onClick('zfdx')" />
            <van-field v-if="questionData.zfdx == 11" required v-model="questionmcData.cpmc" type="textarea" label="产品" placeholder="请选择" is-link rows="1" autosize @click="onClick('cp')" />
            <van-field required v-model="questionData.qwjjrq" type="textarea" label="期望解决日期" placeholder="请输入" rows="1" autosize @click="onClick('qwjjrq')"/>
            <van-field required v-model="questionData.sm" type="textarea" label="转发说明" placeholder="请输入" rows="5"  />
        </van-cell-group>

        <footer>
            <van-button size="normal" type="default" @click="handleClose">取消</van-button>
            <van-button  class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
        </footer>
      </div>

        <van-actionsheet v-model="actionSheetShow" :title="'选择'+actionSheetTitle" >
           <ul :class="{'actionsheet_list':true}" v-if="actionSheetTitle == '产品'"> 
                <li v-for="(value,key) in optionList" @click="handleOnSelect(key,value)">{{value}}</li>
           </ul>
           <ul :class="{'actionsheet_list':true}" v-else> 
                <li v-for="(item,index) in optionList" @click="handleOnSelect(item.bh,item.mc)">{{item.mc}}</li>
           </ul>
        </van-actionsheet>

        <div class="datePop">
          <van-popup v-model="pickerDateShow">
            <datePicker @handleChangeDatePicker="handleChangeDate"></datePicker>
          </van-popup>
        </div>
    </div>
</template>

<script>
 import datePicker from '@/components/public/DatePicker.vue';
 import { getMenu,getSession,getMyDate} from '@/utils/util.js';

 export default {
  data() {
    return {
      actionSheetShow:false,
      pickerDateShow:false, //日期选择
      actionSheetTitle:'',
      questionData: {
        cpbh:'',//
        zfdx:'',//转发类型
        qwjjrq:'',
        sm:''
      },
      questionmcData:{
        cpmc:'',
        zfdx:''
      },
      
      optionList:null, // 列表数据
      cpList:{},       // 产品列表
      zfdxList:[]      // 转发对象
    };
  },
  methods:{
   onClick(params,e){
     document.activeElement.blur();
     if(params == 'zfdx'){
        this.actionSheetTitle = '转发对象';
        this.optionList = this.zfdxList;
     }else if(params == 'cp'){
        this.actionSheetTitle = '产品';
        this.optionList = this.cpList; 
     }else if(params == 'qwjjrq'){
        this.pickerDateShow = true;
        return;
     }
     this.actionSheetShow = true;
   },
   
   handleChangeDate(val){
      this.questionData.qwjjrq = getMyDate(val);
      this.pickerDateShow = false;
   },
   
   // 返回
   handleClose(){
     this.$store.dispatch('chnageMark',true);//标识
     this.$router.go(-1);
   },
   // 选择
   handleOnSelect(key,value){
      if(this.actionSheetTitle == '产品'){
         this.questionmcData.cpmc = value;
         this.questionData.cpbh = key;
      }else{
         this.questionmcData.zfdx = value;
         this.questionData.zfdx = key;
      }
      this.actionSheetShow = false;
   },

   // 转发提交
   handleCommit(){
     if(!this.validDate()) return;
     this.$post(this.API.saveForward,{
        wid:this.$route.query.wid,
        bh: this.questionData.zfdx,
        nr: this.questionData.sm,
        cpbh: this.questionData.zfdx == 11 ? this.questionData.cpbh : "",
        qwjjrq: this.questionData.qwjjrq
     }).then(res=>{
       if(res.state == 'success'){
         this.$toast.clear();
         this.$toast({message:'提交成功~',duration:1500});
         this.$router.go(-1);
       }else{
         this.$toast.clear();
         this.$toast(!res.msg?'系统超时，请稍后再试~':res.msg);
       }
     })
   },
   
   // 转发对象
   forwardLabel(){
      this.$get(this.API.forwardLabel,{
          wid:this.$route.query.wid
      }).then(res=>{
          if(res.state == 'success'){
              this.zfdxList = res.data;
              sessionStorage.setItem('zfdx',JSON.stringify(res.data));
          }else{
              this.$toast(!res.msg?'系统超时，请稍后再试~':res.msg);
          }
      })
   },
   // 获取枚举
   getDictEnum(){
    if(!getSession('kycp')){
      getMenu('kycp',true).then(data=>{
          this.cpList = data;
        });
      }else{
        this.cpList = getSession('kycp');
    } 
    
    if(!getSession('zfdx')){
       this.forwardLabel();
    }else{
       this.zfdxList = getSession('zfdx'); 
    }
   },
  
   // 提交校验
   validDate(){
     if(!this.questionData.zfdx){
       this.$toast('请选择转发对象');
       return false;
     }
     if(this.questionData.zfdx == 11 && !this.questionData.cpbh){
       this.$toast('请选择产品');
       return false;
     }
     if(!this.questionData.qwjjrq){
       this.$toast('请选择期望解决日期');
       return false;
     }
     //  非空
     if(/^[\s]*$/.test(this.questionData.sm)){
       this.$toast('请填写转发说明');
       return false;
     }
     return true;
   }
  },
  mounted(){
    this.getDictEnum();
  },
  components: {datePicker}
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
