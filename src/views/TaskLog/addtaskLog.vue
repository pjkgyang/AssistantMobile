<template>
   <div>
    <div class="assisant-tasklog-addtaskLog">
        <!-- <span style="color:#f00;font-size:0.8rem;padding-left:15px;">(注：非项目任务无需关联任务)</span>                     -->
       <group class="tasklog-addtaskLog-group">  
           <cell title="日报日期">
              <datetime v-model="gcrq" style="text-decoration:none;margin:0"></datetime>
           </cell>
            <cell  title="工时" style="padding:5px 15px;">
                <input type="number" v-model="gs" placeholder="请填写工时(小时)" class="addtaskLog-gs">
            </cell>
            <cell  title="关联任务" :value="taskName" is-link  @click.native="onClick"></cell>
            <cell  title="内容" class="addtaskLog-content-cell">
                    <x-textarea  v-model="content" :rows="10" placeholder="请填写内容" class="addtaskLog-content" :show-counter="true" :max="500"></x-textarea>
            </cell>
        </group>
        <div class="tasklog-addtaskLog-btn">
            <div>
               <Cbutton :width="'100%'" :height="'36px'" :text="'取消'" :background="'#eee'"  @handleClick="handleCancel"></Cbutton>
            </div>
            <div>
               <Cbutton :width="'100%'" :showLoading="showLoading"  :height="'36px'" :text="commitText" :background="'#4376FF'" :color="'#fff'" @handleClick="handleCommit"></Cbutton>
            </div>
        </div>
    </div>

      <popup v-model="itemPopShow" position="right">
         <div style="width:100vw;" class="addtaskLog-pop-itemlist">
             <tab >
                <tab-item v-for="(tab,i) in btnList" :key="i" :selected="tab.value === ''"  @click.native="queryItem(tab.value)">{{tab.label}}</tab-item>
             </tab>
             <div style="text-align:center;background:#fff;padding:5px 0;">
               <Cinput :width="'95%'" :placeholder="'请输入项目名称'" @handleSearchKeyword="handleSearchKeyword"></Cinput>
             </div>
             <div  class="itemlist-group">
                <scroller use-pullup  lock-x  height="100%" :scrollbarY="true" ref="scrollerBottom"  :pullup-config="pullupDefaultConfig"
                    @on-pullup-loading="onPullupLoading">
                <group>
                    <cell v-for="(item,i) in allItems" :key="i" :title="item.xmmc"  is-link  @click.native="handleItemClick(item.xmbh,item.xmmc)"></cell> 
                </group>                            
                </scroller>
                 <emptyContent v-if="allItems.length == 0"></emptyContent>    
            </div>
            <div style="margin-top:5px;">
                  <Cbutton :text="'返回'"  :width="'98%'"  :height="'36px'" @handleClick="handleClosePop"></Cbutton>
            </div>
        </div>
      </popup>

      <popup v-model="cpPopShow" position="right">
         <div style="width:100vw;" class="addtaskLog-pop-itemlist">
             <div  class="itemlist-cpgroup">
                <group class="itemlist-group-cp">
                    <cell v-for="(item,i) in cpItems" :key="i" :title="item.cp"  is-link @click.native="handleCpClick(item.cp,item.cpbh)"></cell> 
                </group>
                <emptyContent v-if="cpItems.length == 0"></emptyContent> 
            </div>
            <div style="margin-top:5px;" class="itemlist-back">
                  <Cbutton :text="'返回上一级'"  :width="'98%'"  :height="'36px'" @handleClick="handleClosePopCP"></Cbutton>
            </div>
        </div>
      </popup>

      <popup v-model="taskPopShow" position="right">
         <div style="width:100vw;" class="addtaskLog-pop-itemlist">
             <div  class="itemlist-cpgroup">
                <group class="itemlist-group-cp">
                     <p  v-for="(task,i) in taskItems">
                      <span>{{task.catalog}}</span>
                      <cell v-for="(item,i) in task.tasks.rows" :key="i" :title="item.rwmc"  is-link  @click.native="handletaskClick(item.rwmc,item.rwbh)"></cell> 
                    </p>
                    <emptyContent v-if="taskItems.length == 0"></emptyContent> 
                </group>
            </div>
            <div style="margin-top:5px;" class="itemlist-back">
                  <Cbutton :text="'返回上一级'"  :width="'98%'"  :height="'36px'" @handleClick="handleClosePopTask"></Cbutton>
            </div>
        </div>
      </popup>
    </div>
</template>
<script>
import { GetDateStr } from '../../utils/util.js'; 
import Cinput from '@/components/public/SearchInput.vue'
import Cbutton from '@/components/public/Button.vue'
import emptyContent from '@/components/public/empty-content.vue'
export default {
    data(){
        return{
            btnList:[{
                label:'全部',
                value:''
            },{
                label:'我收藏的',
                value:'1'
            },{
                label:'我参与的',
                value:'4'
            },{
                label:'我拥有的',
                value:'3'
            },{
                label:'关闭的',
                value:'5'
            },{
                label:'其他',
                value:'6'
            },],
            tabValue:'',
            itemPopShow:false,
            cpPopShow:false,
            taskPopShow:false,
            curPage:1,
            allCurPage:1,
            allItems:[],   //项目
            loadMore:false,
            keyword:"",
            gs:"",
            content:'',       
            gcrq:GetDateStr(0),     
            xmInfo:{},
            backupsInfo:{},
            cpItems:[],   //产品
            taskItems:[], //任务
            taskName:"请选择",
            taskLogDetail:{},
            pullupDefaultConfig:{
                 pullUpHeight:100,
                 height:40,
                 autoRefresh: true,
                 upContent: '上拉加载更多...',
                 downContent: '释放后加载',
                 loadingContent: '加载中...',
            },
            hfrxm:"",
            hfrbh:"",
            commitText:'提交',
            showLoading:false

        }
    },
    activated(){
        this.showLoading = false
        this.commitText = '提交'
        if(this.$route.params.data){
            this.taskLogDetail = JSON.parse(this.$route.params.data)
            this.xmInfo.xmbh = this.taskLogDetail.xmbh;
            this.xmInfo.xmmc = this.taskLogDetail.xmmc;
            this.xmInfo.rwbh = this.taskLogDetail.rwbh;
            this.xmInfo.rwmc = this.taskLogDetail.rwmc;
            this.xmInfo.cp = this.taskLogDetail.cpmc;
            this.xmInfo.cpbh = this.taskLogDetail.cpdm;
            this.xmInfo.wid = this.taskLogDetail.wid;
            this.hfrxm = this.taskLogDetail.cjrxm;
            this.hfrbh = this.taskLogDetail.cjrbh;
            this.gs = this.taskLogDetail.gs
            this.gcrq = this.taskLogDetail.gcrq
            this.content = this.taskLogDetail.gcms
            this.taskName = this.taskLogDetail.xmmc == ''?'请选择':this.taskLogDetail.xmmc+'--'+this.taskLogDetail.cpmc+'--'+this.taskLogDetail.rwmc
            document.title = '编辑日报'
    }else{
           this.gs = this.content = '' 
           this.gcrq = GetDateStr(0)
           this.taskName = '请选择'
           this.xmInfo = {};
           this.hfrxm = window.userName
           this.hfrbh = window.userId
           document.title = '添加日报'
        }
    },
    methods:{
        handleSearchKeyword(val){  //关键字查询
          this.keyword = val
   
          if(!this.tabValue){
               this.allCurPage = 1
               this.queryAllitems();
            }else{
                 this.curPage = 1
                 this.queryXMofType(this.tabValue); 
            }
        },
        onClick(){
            this.itemPopShow = true;
            if(!this.tabValue){
              this.queryAllitems();
            }else{
                if(this.allItems.length > 15){
                  this.$refs.scrollerBottom.enablePullup();   
                }
            }
        },
        handleCancel(){
           this.$router.go(-1);
        },
        handleClosePop(){
           this.itemPopShow = false;     
        },
        handleClosePopCP(){
           this.cpPopShow = false;      
        },
        handleClosePopTask(){
           this.taskPopShow = false; 
        },
        handleCommit(){   // 日报提交(新增 编辑)
          if(!/^\d+(\.\d+)?$/.test(this.gs)){
              this.$vux.toast.text('请填写正确工时~')
              return;
          }else if(!this.content){
              this.$vux.toast.text('请填写内容~')
              return;
          }else if(this.taskName == '请选择'){
              this.$vux.toast.text('请选择关联任务~')
              return;
          }
          this.showLoading = true
          this.commitText = '提交中...'
          this.$post(this.API.addOrUpdateTaskProcess,{
            xmbh:!this.xmInfo.xmbh?'':this.xmInfo.xmbh,
			rwbh:!this.xmInfo.rwbh?'':this.xmInfo.rwbh,
			gclx:2,
			gcms:this.content,
			gcrq:this.gcrq,
			gs:this.gs,
			hfrbh:this.hfrbh,
			hfrxm:this.hfrxm,
			wid:!this.xmInfo.wid?'':this.xmInfo.wid
          }).then((res)=>{
              if(res.state == 'success'){
                this.$vux.toast.show({
                 text:!this.xmInfo.wid?'添加成功':'修改成功',
                 type:'success'
                })
                this.$router.push({name:'TaskLog',params:{bid:'1'}});
              }else{
                this.$vux.toast.show({text:res.msg,type:'warn'});
                this.showLoading = false
                this.commitText = '提交'
              }
          })
        },
        queryItem(param){ // 切换tab
          this.tabValue = param;
          this.curPage = 1;
          this.allCurPage = 1;
          this.allItems = [];
          this.$refs.scrollerBottom.reset({top: 0});
          this.$refs.scrollerBottom.disablePullup();
          if(!param){
            this.queryAllitems();
          }else{
            this.queryXMofType(param);  
          }
        },

        handleItemClick(bh,mc){  // 获取项目 所属产品
           this.backupsInfo.xmmc = mc;
           this.backupsInfo.xmbh = bh;
           this.$get(this.API.getProjectCatalog,{
               xmbh:bh
           }).then((res)=>{
             if(res.state == 'success'){
                 this.cpItems = res.data
             }
           })      
           this.cpPopShow = true;
        },
        handleCpClick(cp,cpbh){  // 获取 里程碑任务
           this.backupsInfo.cp = cp;
           this.backupsInfo.cpbh = cpbh;
           this.$get(this.API.getMilestoneCatalog,{
                xmbh:this.backupsInfo.xmbh,
                cpbh:this.backupsInfo.cpbh,
                cpmc:this.backupsInfo.cp,
                curPage:1,
                pageSize:9999,
                taskType:'',
                rwzt:'',
                keyword:''
           }).then((res)=>{
             if(res.state == 'success'){
                 this.taskItems = res.data
             }
           })
         this.taskPopShow = true
        },
        handletaskClick(rwmc,rwbh){   // 获取 里程碑任务(选中任务)
            this.xmInfo.rwmc = rwmc;
            this.xmInfo.rwbh = rwbh;
            this.xmInfo.xmmc = this.backupsInfo.xmmc;
            this.xmInfo.xmbh = this.backupsInfo.xmbh;
            this.xmInfo.cp = this.backupsInfo.cp;
            this.xmInfo.cpbh = this.backupsInfo.cpbh;
            this.itemPopShow = this.cpPopShow = this.taskPopShow = false;
            this.taskName = this.xmInfo.xmmc+'--'+this.xmInfo.cp+'--'+this.xmInfo.rwmc
        },

        onPullupLoading(){ //上拉加载(item)
            if(!this.tabValue){
               this.allCurPage += 1
               this.queryAllitems();
            }else{
                 this.curPage += 1
                 this.queryXMofType(this.tabValue);
            }
        },
        onPullupLoadingCP(){ //上拉加载(cp)
            
        },
        queryAllitems(){  //查询全部项目
           this.$get(this.API.getProjects,{
                curPage:this.allCurPage,
                pageSize:14,
                keyword:this.keyword,
                xmzt:'',
                xmlb:'',
                sfgx:'',
                pl:'',
            }).then((res)=>{
               if(res.state == 'success'){
                     if(this.allCurPage == 1){
                        this.allItems = res.data.rows;
                        if(res.data.total==1||res.data.total==0){
                            this.$refs.scrollerBottom.disablePullup()
                        }else{
                            this.$refs.scrollerBottom.enablePullup(); 
                        }
                    }else{
                        this.allItems =  this.allItems.concat(res.data.rows);
                        this.$refs.scrollerBottom.donePullup();
                        if (this.allCurPage >= res.data.total) {
                            this.$refs.scrollerBottom.disablePullup()
                        }
                     }
               }
            })
       },
        queryXMofType(pl){ //获取项目
           this.$vux.loading.show({
                text: '加载中···'
            })
            this.$get(this.API.getMyProjects,{
                curPage:this.curPage,
                pageSize:14,
                keyword:this.keyword,
                xmzt:'',
                xmlb:'',
                sfgx:'',
                pl:pl,
            }).then((res)=>{
               if(res.state == 'success'){
                       if(this.curPage == 1){
                            this.allItems = res.data[pl].rows;
                            if(res.data[pl].total==1||res.data[pl].total==0){
                             this.$refs.scrollerBottom.disablePullup()
                            }else{
                             this.$refs.scrollerBottom.enablePullup(); 
                            }
                        }else{
                        this.allItems =  this.allItems.concat(res.data[pl].rows);
                        this.$refs.scrollerBottom.donePullup();
                        if (this.curPage >= res.data[pl].total) {
                            this.$refs.scrollerBottom.disablePullup()
                        }
                     } 
                 this.$vux.loading.hide()                   
               }else{
                  this.$vux.loading.hide();   
                  this.$vux.alert.show({
                        title: '错误',
                        content: res.msg,
                        onShow(){},
                    })
               }
            })
        }
    },
    components:{
        Cinput,
        Cbutton,
        emptyContent
    },

}
</script>
<style scoped lang="less">
@import '../../index.less';
 .assisant-tasklog-addtaskLog{
      padding: 10px 0;
  .addtaskLog-gs{
      width:65vw;
      height: 40px;
      border: none;
      outline: none;
      color: #999;
      font-size: 1rem;
  }
  .addtaskLog-gs::placeholder{
      font-size: 1rem;
      color: #999;
  }
  .addtaskLog-content{
     padding: 0;
     color: #999;
  }

  .tasklog-addtaskLog-btn{
       display: @flex;
       justify-content: space-around;
       padding-left:10px; 
       margin-top:20px;
       div{
           width: 100%;
           margin-right:10px;
       }
    }
 }

 .addtaskLog-pop-itemlist{
     .itemlist-group{
         height:79vh;
         margin-top: 5px;
     }
    .itemlist-cpgroup{
        max-height:92vh;
        margin-top: 5px;
        overflow-y: auto;
     .itemlist-group-cp{
             height: 100%;
             span{
                 display: inline-block;
                 font-size:0.95rem;
                 font-weight: 700;
                 color: rgb(82, 97, 136);
                 padding: 8px 3px;
             }
             p{
               border-top:1px solid #ccc;
             }
         }
    } 
      
 }

</style>
