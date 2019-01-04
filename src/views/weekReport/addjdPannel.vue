<template>
    <div class="addweekprocess">
        <div>
            <van-cell-group style="height:44px;padding:10px 7px;display:flex;align-items:center" 
            v-if="$route.params.weekActive != 1">
                <span class="switch_title">是否完成</span>
                <van-switch v-model="form.sfwc" size="20px" />
            </van-cell-group>

            <van-cell-group>
                <van-field required v-model="form.gznr" label="工作内容" type="textarea" placeholder="请输入工作内容" rows="3" autosize />
            </van-cell-group>
            <div v-if="!form.sfwc && $route.params.weekActive != 1">
                <van-cell-group>
                    <van-field required v-model="form.wwcyy" label="未完成原因" type="textarea" placeholder="请输入未完成原因" rows="3" autosize />
                </van-cell-group>
                <van-cell-group>
                    <van-field required v-model="form.hxcs" label="后续措施" type="textarea" placeholder="请输入后续措施" rows="3" autosize />
                </van-cell-group>
            </div>
            <van-cell-group>
                <van-field required v-model="taskName" type="textarea" label="关联任务" is-link rows="1" autosize @click="onClick" />
            </van-cell-group>

            <choose-task :parentShow="show" @handleClosePop="handleClosePop" @handletaskClick="handletaskClick"></choose-task>
        </div>
        <footer>
            <van-button size="normal" type="default" @click="handleClose">取消</van-button>
            <van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
        </footer>
    </div>
</template>

<script>
import chooseTask from "../../components/public/chooseTask";
export default {
  data() {
    return {
      show: false,
      form: {
        sfwc: false,
        gznr: "",
        wwcyy: "",
        hxcs: ""
      },
      xmInfo:{},
      taskName: "",
      uid:'',
      queryData:{}
    };
  },
  methods: {
    onClick() {
      this.show = !this.show;
    },
    handleClosePop() {
      this.show = !this.show;
    },
    // 确定(选择任务)
    handletaskClick(name,data){
        this.xmInfo = data;
        this.taskName = name;
    },
    handleCommit(){
        if(!this.validata()) return;
        this.$post(this.API.saveWeeklyReport,{
            wid:JSON.stringify(this.$route.params) !== '{}'?this.$route.params.wid:'',
            yhbh: this.uid,
            yf: this.queryData.month,
            zxh: this.queryData.week,
            xmbh:  this.xmInfo.xmbh,
            lcbbh:  this.xmInfo.lcbbh,
            rwbh:  this.xmInfo.rwbh,
            gzms: this.form.gznr,
            zt:!this.form.sfwc?0:1,
            wwcyy:this.form.sfwc?'':this.form.wwcyy,
            hxcs:this.form.sfwc?'':this.form.hxcs
        }).then(res=>{
            if(res.state == 'success'){
                this.$toast.success({message:'保存成功~',duration:2000});
                this.$router.go(-1);
            }else{
                this.$toast.success({message:res.msg,duration:2000}); 
            }
        })
    },
    handleClose(){
        this.$router.go(-1);
    },
    validata(){
        if( /^[\s]*$/.test(this.form.gznr)){
           this.$toast('请填写工作内容~'); 
           return false;
        }
        if(!this.show && /^[\s]*$/.test(this.form.wwcyy) && ((this.$route.params.weekActive==0 || JSON.stringify(this.$route.query) !== '{}') && !this.form.sfwc)){
           this.$toast('请填写未完成原因~'); 
           return false;
        }
        if(!this.show && /^[\s]*$/.test(this.form.hxcs) && ((this.$route.params.weekActive==0 || JSON.stringify(this.$route.query) !== '{}') && !this.form.sfwc)){
           this.$toast('请填写后续措施~'); 
           return false;
        }
        if(!this.taskName){
           this.$toast('请选择关联任务~'); 
           return false;
        }
        return true;
    }
  },
  mounted(){},
  activated() {
    this.uid = window.userId;
    document.title = '添加任务进度';
    if(JSON.stringify(this.$route.params) !== '{}'){
        console.log(this.$route.params)
        if(!this.$route.params.weekActive){   //本周
           this.form.wwcyy = this.$route.params.wwcyy;
           this.form.hxcs = this.$route.params.hxcs; 
           this.form.sfwc = this.$route.params.zt==0?false:true;
        }else{                                //下周                  
           this.form.wwcyy = this.form.hxcs = ''
        }

        this.form.gznr = this.$route.params.gzms;
        this.queryData.month = this.$route.params.yf;
        this.queryData.week = this.$route.params.zxh;
        this.xmInfo.xmbh = this.$route.params.xmbh;
        this.xmInfo.rwbh = this.$route.params.rwbh;
        this.xmInfo.lcbbh = this.$route.params.lcbbh;
        this.taskName = this.$route.params.xmmc + " — " + this.$route.params.cpmc_display + " — " + this.$route.params.rwmc_display
    }
    if(JSON.stringify(this.$route.query) !== '{}'){
      this.queryData = this.$route.query;  
      this.form.sfwc = false;
      this.taskName = this.form.gznr = this.form.wwcyy = this.form.hxcs = ''
    }
  },
  components: { chooseTask }
};
</script>

<style lang="less" scoped>
.addweekprocess {
  .switch_title {
    font-size: 14px;
    color: #333;
    width: 95px;
    &::before {
      content: "*";
      color: #f00;
      padding: 0 1px;
    }
  }
  footer{
      text-align: center;
      button{
          width: 48%;
          border: none;
          margin: 5vw 0;
      }
  }
}
</style>

