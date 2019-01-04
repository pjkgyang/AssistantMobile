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
            <van-field required v-model="questionmcData.bbh" type="textarea" label="版本号" placeholder="请选择" is-link rows="1" autosize @click="onClick('bbh')" />
            <van-field required v-model="questionData.cnjsrq" type="textarea" label="承诺结束日期" placeholder="请选择" is-link rows="1" autosize @click="onClick('bbh')" />
           <van-field required v-model="questionData.bt" type="textarea" label="标题" placeholder="请选择" is-link rows="3" autosize />
        </van-cell-group>
         <van-cell-group>
            <van-field required v-model="questionData.nr" type="textarea" label="详情" placeholder="请选择" is-link rows="3" autosize  />
         </van-cell-group>
       </div> 
        <footer>
            <van-button size="normal" type="default" @click="handleClose">取消</van-button>
            <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
        </footer>

        <!-- 选择项目 -->
        <van-popup v-model="projectlistShow" position="right" >
          <projectList @handleClose="handleCloseXMPop" @handleChooseItem="handleChooseItem"></projectList>
        </van-popup>

        <!-- <van-actionsheet v-model="wtlxShow" :actions="actions" @select="onSelect"/> -->
        <van-actionsheet v-model="wtlxShow" title="选择问题类型" >
           <section class="actionsheet_list"> 
              <p v-for="item in actions" @click="handleOnSelect(item)">{{item.name}}</p>
           </section>
        </van-actionsheet>
    </div>
</template>

<script>
 import projectList from '@/components/question/projectList.vue'

export default {
  data() {
    return {
      projectlistShow:false,
      wtlxShow:false,
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
        cpmc:''
      },

      type:''//记录选择cell
    };
  },
  methods:{
   onClick(params){
     if(params=='xm'){
       this.projectlistShow = true;
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
   handleOnSelect(item){
     console.log(item);
     this.questionmcData.wtlx = item.name;
     this.wtlxShow = false;
   },

   handleCommit(){

   }
  },
  components: {projectList}
};
</script>

<style lang="less" scoped>

  footer{
      text-align: center;
      button{
          width: 48%;
          border: none;
          margin: 5vw 0;
      }
  }
  .actionsheet_list{
      min-height: 20vh;
      max-height: 35vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p{
        color: #999999;
        text-align: center;
        padding: 0.25555rem 0;
      }
  } 
</style>
