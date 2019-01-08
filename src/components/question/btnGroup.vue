<template>
    <div>
        <div class="question-reply-btngroup">
            <van-button v-for="(btn,index) in btngroupArr" :key="index" :type="btn.type" @click="handleClick(btn.en)"
            :class="{'btnClasshf':!btn.type && btn.name=='回复','btnClassqt':!btn.type && btn.name!='回复'}">{{btn.name}}</van-button>


            <van-button type="warning" v-if="btnArrs.length > 2" @click="handleCheckMore">更多</van-button>
        </div>
        <mu-expand-transition>
        <div class="reply-btngroup-more" v-show="show">
            <ul>
                <li v-for="(btn,index) in btngroup">
                   <van-button  :key="index" :type="btn.type" @click="handleClick(btn.en)"
                    :class="{'btnClasshf':!btn.type && btn.name=='回复','btnClassqt':!btn.type && btn.name!='回复'}">{{btn.name}}</van-button>  
                </li>
            </ul>
        </div>
        </mu-expand-transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
        show:false,
        btnArr:[
            {name:'回复',type:'',en:'hf'},
            {name:'关闭问题',type:'danger',en:'gb'},
            {name:'受理',type:'',en:'sl'},
            {name:'催办',type:'',en:'cb'},
            {name:'申请关闭',type:'',en:'sqjs'},
            {name:'转发问题',type:'',en:'zf'},
            {name:'修改承诺时间',type:'',en:'cnsj'},
        ],
        btngroup:[],//记录btn
        btngroupArr:[],
        btnArrs:[],//可现实按钮
        btnAuth:{}
    };
  },
  mounted(){
      this.btnAuth = {
            cb: true,
            cnsj: true,
            fsxx: false,
            gb: true,
            hf: true,
            qwjjrq: "2019-01-08",
            sl: true,
            sqdyz: false,
            sqjs: true,
            xgcrowId: false,
            yyjl: false,
            yyzf: false,
            zdr: false,
            zf: false
        }
      this.btnArr.forEach(ele=>{
         ele.show = this.btnAuth[ele.en]
      })  
      this.btnArr.forEach((value, index, array)=> {
            if(value.show){
                  this.btngroup.push(value);
                  this.btnArrs.push(value);
            }
      });
      if(this.btngroup.length > 2){
          this.btngroupArr = this.btngroup.splice(0,2);
      }else{
          this.btngroupArr = this.btngroup;
      }
  },
  methods:{
      handleCheckMore(){
         this.show = !this.show;   
      },
      handleClick(data){
          this.$emit('handleClick',data);
          this.show = false; 
      }
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import '../../index.less';
.question-reply-btngroup{
    width: 100vw;
    .flex(space-between);
    button{
        width: 100%;
    }
}
.reply-btngroup-more{
    position: fixed;
    bottom:44px;
    ul{
        li{
          width: 100vw;
          text-align: right;
          button{
              width: 33.33333%;
              margin-bottom: 0.12222rem;
          }
        }
      .flex(@column:column);    
    }
}

.btnClasshf{
    background:#007AFF;
    color:#fff;
    border:none
}
.btnClassqt{
    background:#00c1de;
    color:#fff;
    border:none
}
</style>
