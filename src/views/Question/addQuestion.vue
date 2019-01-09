<template>
    <div>
      <div>
        <van-cell-group>
            <van-field required v-model="questionData.xmmc" type="textarea" label="项目名称" placeholder="请选择" is-link rows="1" autosize @click="onClick('xm')" />
            <van-field required v-model="questionmcData.wtlx" type="textarea" label="问题类型" placeholder="请选择" is-link rows="1" autosize @click="onClick('wtlx')" />
            <van-field required v-model="questionmcData.wtjb" type="textarea" label="问题级别" placeholder="请选择" is-link rows="1" autosize @click="onClick('wtjb')" />
            <van-field required v-model="questionmcData.sfjj" type="textarea" label="是否紧急" placeholder="请选择" is-link rows="1" autosize @click="onClick('sfjj')" />
            <van-field required v-model="questionmcData.cpmc" type="textarea" label="产品" placeholder="请选择" is-link rows="1" autosize @click="onClick('cp')" />
            <van-field required v-model="questionmcData.yxfw" type="textarea" label="影响范围" placeholder="请选择" is-link rows="1" autosize @click="onClick('yxfw')" />
            <van-field required v-model="questionData.cnjsrq" type="textarea" label="承诺结束日期" placeholder="请选择" is-link rows="1" autosize @click="onClick('cnjsrq')" />
            <van-field required v-model="questionData.bbh" type="textarea"  label="版本号" placeholder="请输入"  rows="1" autosize  />
            <van-field required v-model="questionData.bt" type="textarea" label="标题" placeholder="请输入" rows="2" autosize />
            <van-field required v-model="questionData.nr" type="textarea" label="标题" placeholder="请输入" rows="5" clearable />
        </van-cell-group>

        <div class="addquestion-detail">
          <div class="detail-label">
             <span>上传图片</span>
          </div>
          <div class="detail-content">
              <uploadImg></uploadImg>
          </div>
        </div>
       </div> 

        <footer>
            <van-button size="normal" type="default" @click="handleClose">取消</van-button>
            <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
        </footer>

        <!-- 选择项目 -->
        <van-popup v-model="projectlistShow" position="right" >
          <projectList @handleClose="handleCloseXMPop" @handleChooseItem="handleChooseItem"></projectList>
        </van-popup>

        <div class="datePop">
          <van-popup v-model="pickerKsrqShow">
            <datePicker @handleChangeDatePicker="handleChangeDate"></datePicker>
          </van-popup>
        </div>

        <!-- <van-actionsheet v-model="wtlxShow" :actions="actions" @select="onSelect"/> -->
        <van-actionsheet v-model="wtlxShow" :title="'选择'+actionSheetTitle" >
           <ul :class="{'actionsheet_list':true,'height40':type=='wtlx'||type=='cp','height20':type!='wtlx'&&type!='cp'}" > 
                <li v-for="(value,key) in optionList" @click="handleOnSelect(key,value)">{{value}}</li>
           </ul>
        </van-actionsheet>
    </div>
</template>

<script>
 import projectList from '@/components/question/projectList.vue';
 import datePicker from '@/components/public/DatePicker.vue';
 import { getMenu,getSession,getMyDate} from '@/utils/util.js';
 import uploadImg from '@/components/public/uploadImg';


export default {
  data() {
    return {
      projectlistShow:false,
      pickerKsrqShow:false,
      wtlxShow:false,
      actionSheetTitle:'',
      actions: [
        {
          name: '选项'
        },
        {
          name: '选项',
          subname: '描述信息'
        },
        
      ],
      questionData: {
        xmmc:'',
        xmbh:'',
        wtlx:'',//问题类型
        sfjj:'',//是否紧急
        wtjb:'',//问题级别
        cpbh:'',
        yxfw:'',
        bbh:'',
        cnjsrq:'',
        nr:'',
        bt:'',
      },
      questionmcData:{
        wtlx:'',
        wtjb:'',
        sfjj:'',
        yxfw:'',
      },

      type:'',//记录选择cell
      optionList:{},//列表数据
      cpList:{},//产品
      wtlxList:{},//问题类型
      wtjbList:{0:'不严重',1:'一般',2:'严重'},//问题级别
      sfjjList:{0:'否',1:'是'},//是否紧急
      yxfwList:{0:'影响局部',1:'影响整体'},//影响范围
      sgbugList:{0:'否',1:'是'},//是否bug
    };
  },
  methods:{
   onClick(params,e){
     document.activeElement.blur();
     if(params=='xm'){
       this.projectlistShow = true;
     }else if(params=='cnjsrq'){
       this.pickerKsrqShow = true;
     }else{
       this.wtlxShow = true;    
       this.type = params;
     }
   },
  //  关闭项目弹出层
   handleCloseXMPop(){
     this.projectlistShow = false;
   },
  //  选择项目
   handleChooseItem(data){
     console.log(data);
     this.questionData.xmmc = data.xmmc;
     this.questionData.xmbh = data.xmbh;
     this.projectlistShow = false;
   },
   handleClose(){
     this.$router.go(-1);
   },
   // 选择
   handleOnSelect(key,value){
     this.questionmcData.wtlx = value;
     this.wtlxShow = false;
   },
   //  选择日期
   handleChangeDate(data){
     this.questionData.cnjsrq = getMyDate(data);
     this.pickerKsrqShow = false;
   },
   handleCommit(){

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

      if(!getSession('ProblemType')){
      getMenu('ProblemType','').then(data=>{
        this.wtlxList = data;
        });
      }else{
        this.wtlxList = getSession('ProblemType');
      } 
   }
  },
  mounted(){
    this.getDictEnum();
  },
  watch:{
    type(n,o){
      console.log(n)
      switch (n) {
        case 'wtlx':
          this.actionSheetTitle = '问题类型';
          this.optionList = this.wtlxList;
          break;
        case 'wtjb':
          this.actionSheetTitle = '问题级别';
          this.optionList = this.wtjbList;
          break;
        case 'sfjj':
          this.actionSheetTitle = '是否紧急';
          this.optionList = this.sfjjList;
          break;
        case 'yxfw':
          this.actionSheetTitle = '影响范围';
          this.optionList = this.yxfwList;
          break;
        case 'cp':
          this.actionSheetTitle = '产品';
          this.optionList = this.cpList;
          break;
        default:
          break;
      }
    }
  },
  components: {projectList,getMenu,datePicker,uploadImg}
};
</script>

<style lang="less" scoped>
  .actionsheet_list{
      overflow-y: auto;
      li{
        color: #575656;
        text-align: center;
        padding: 0.45555rem 0;
        font-size: 0.85rem;
      }
  } 
 .addquestion-detail{
   display:flex;
   background:#fff;
   padding: 10px 15px;
   .detail-label{
    width:90px ;
    color:#333;
    font-size:14px;
    font-weight:700;
   }
 }

.height40{
  height: 35vh;
}
.height20{
  height: 20vh;
}
.datePop{
  z-index: 5000;
}
</style>
