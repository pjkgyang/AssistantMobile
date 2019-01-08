<template>
 <div class="questionDetail" >
   <div class="questionDetail-top">
     <section class="questionDetail-desc">
          <div class="questionDetail-detail">
           <h4>消息中心配置前置代理时发现</h4>
            <div class="questionDetail-desc-info">
              <div class="questionDetail-desc-tag">
                  <van-tag round  color="#F0871E">已申请关闭</van-tag>
                  <van-tag round  color="#29BE1E">总部工程专家受理</van-tag>
                </div>
                <p>问题编号：<span>jz181100997</span></p>
                <p>提问时间：<span>2018.04.08 12:00:00</span></p>
                <p>发布人：<span>李俊</span></p>
                <p>所属单位：<span>江苏金智教育信息股份有限公司</span></p>
                <p>所属项目：<span>华东理工大学OA系统</span></p>
                <p>问题类型：<span>使用操作</span></p>
                <p>产品：<span>消息中心</span></p>
                <p>期望解决日期：<span>2018-11-14</span></p>
                <p>承诺结束日期：<span>无</span></p>
            </div> 
          </div>
          <div class="questionDetail-desc-nr">
             <h4>问题</h4>
             <div class="question-content">内容</div>
          </div>
      </section >
      <section class="questionDetail-reply">
        <replyList></replyList>
      </section>
    </div>

    <!-- 操作按钮 -->
    <div class="questionDetail-bottom">
      <btnGroup @handleClick="handleClick"></btnGroup>
    </div>

    <van-actionsheet v-model="operateShow" :title="operateTitle">
      <div class="questionDetail-operate">
        <div>
            <van-field v-if="curOperate=='cnsj'||curOperate=='sl'" required v-model="formData.cnjsrq" type="textarea" label="承诺结束日期" placeholder="请选择" is-link rows="1" autosize @click="onClick('cnjsrq')" />
            <van-field v-if="curOperate=='sl'" required v-model="formData.qwjjrq" type="textarea" label="期望解决日期" placeholder="请选择" is-link rows="1" autosize @click="onClick('qwjjrq')" />
            <van-field v-if="curOperate=='cb'" required v-model="formData.rymc" type="textarea" label="催办人员" placeholder="请选择" is-link rows="1" autosize @click="onClick('cbry')" />
            <van-field v-if="curOperate!='sl'" required v-model="formData.sm" type="textarea" label="说明" placeholder="请输入" rows="5"  clearable/>
        </div>

        <footer>
            <van-button class="cancelButton" size="normal" type="default" @click="operateShow = !operateShow">取消</van-button>
            <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
        </footer> 
      </div>  
    </van-actionsheet>    
    <div class="datePop">
        <van-popup v-model="pickerKsrqShow">
          <datePicker @handleChangeDatePicker="handleChangeDate"></datePicker>
        </van-popup>
    </div>

    <div class="datePop">
        <van-popup v-model="cbryShow" position="right" >
          <cbrylist :show="cbryShow" @handleClose="handleClose" @handleChooseCbry="handleChooseCbry"></cbrylist>
        </van-popup>
    </div>
 </div>
</template>

<script>
 import replyList from '@/components/question/replyList';
 import btnGroup from '@/components/question/btnGroup';
 import datePicker from '@/components/public/DatePicker';
 import { getMyDate} from '@/utils/util.js';
 import cbrylist from '@/components/question/cbryList';

 export default {
   data () {
     return {
        operateShow:false,
        pickerKsrqShow:false,//承诺日期
        cbryShow:false,//催办人员
        curOperate:'', //当前按钮
        dateType:'',
        operateTitle:'',

        // 修改（承诺结束日期,受理）
        formData:{
            cnjsrq:'',
            qwjjrq:'',
            sm:'',
            rymc:'',
            rybh:''
        },
     }
   },
   methods:{
     handleClick(data){
        console.log(data);
        if(data=='cnsj'||data=='cb'){
          this.curOperate = data;
          this.operateShow = !this.operateShow;
          if(data=='cnsj'){
            this.operateTitle = '修改承诺结束日期'
          }else{
            this.operateTitle = '催办'
          }
        }else if(data=='hf'){
          this.$router.push({path:'/reply'});
        }else if(data=='gb'){
          this.$router.push({path:'/closequestion'});
        }else if(data=='sl'){
          this.curOperate = data;
          this.operateTitle = '受理';
          this.operateShow = !this.operateShow; 
          // this.$router.push({name:'addQuestion',query:{sl:1}});
        }else if(data=='sqjs'){
          this.$router.push({name:'applyClose'});
        }
     },
     //弹出选择日期，催办人员  
     onClick(data){
        document.activeElement.blur();
        this.dateType = data;
        switch (data){
          case 'cnjsrq':
               this.pickerKsrqShow = !this.pickerKsrqShow;
          break;
          case 'qwjjrq':
               this.pickerKsrqShow = !this.pickerKsrqShow;
          break;
          case 'cbry':
               this.cbryShow = !this.cbryShow;
          break;
          default:
          break;
        }
     },
     //  选择日期
     handleChangeDate(data){
       if(this.dateType == 'cnjsrq'){
          this.formData.cnjsrq = getMyDate(data);
       }else if(this.dateType == 'qwjjrq'){
          this.formData.qwjjrq = getMyDate(data);
       }
       this.pickerKsrqShow = !this.pickerKsrqShow
     },

     // 关闭选择人员pop
     handleClose(){
       this.cbryShow = false;
     },
     //  选择催办人员
     handleChooseCbry(data){
       const nameArr = [],
             bhArr = [];
       data.forEach(ele=>{
        nameArr.push(ele.name);
        bhArr.push(ele.tel);
       })
       this.formData.rymc = nameArr.join(',');
       this.formData.rybh = bhArr.join(',');
       console.log(this.formData);
       this.cbryShow = false;
     }
   },
   watch:{
      // 
      operateShow(n,o){
        this.formData.rymc = this.formData.rybh = this.formData.sm = this.formData.cnjsrq = this.formData.qwjjrq = '';
      }
   },
   components: {replyList,btnGroup,datePicker,cbrylist}
 }
</script>

<style lang="less" scoped>
@import '../../index.less';
.questionDetail-top{
  height:calc(100vh - 46px);
  overflow-y: auto;
  .questionDetail-desc{
  background: #fff;
  .questionDetail-detail{
    padding:1rem  1.25rem ;
    border-bottom:1px solid #E8E8E8;
    .questionDetail-desc-info{
      font-size: @fontSize12;
      .questionDetail-desc-tag{
        margin: 0.5rem 0;
      }
    }
    p{
      color: #999999;
      span{
        color: #333;
      }
    }
  }

  // 问题内容
    .questionDetail-desc-nr{
      padding:1rem  1.25rem ;
      h4{
        color: #E93546;
      }
      .question-content{
        font-size:@fontSize14;
      }
    }
  }
}
// 修改承诺结束日期
.questionDetail-operate{
   height: 40vh;
  footer{
    width: 100vw;
    position: absolute;
    bottom: 0;
  }
}



.questionDetail-bottom{
  position: absolute;
  bottom:0;
}
.questionDetail-reply{
  // background: #fff; 
  // padding:0.5rem  1.25rem ;
  margin: 0.5rem 0 0 0;
}
</style>
