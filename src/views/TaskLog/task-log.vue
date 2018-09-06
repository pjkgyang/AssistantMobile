<template>
    <div class="assiant-taskLog">
        <div class="taskLog-top-filter">
          <div class="taskLog-filter--input">
             <Cinput :width="'100%'"  :placeholder="'搜索姓名/项目编号/项目名称/填写人姓名'" @handleSearchKeyword="handleSearchKeyword"></Cinput>
           </div>
           <div class="taskLog-filter--tabs">
                 <span @click="hanldeSearchTXSJ" class="taskLog-filter-first"><span :class="{'text-active':txsjText!='填写时间'}">{{txsjText}}</span>&nbsp;
                     <x-icon type="ios-arrow-up" size="15" v-if="!DataPopshow&&txsjText=='填写时间'"></x-icon>
                     <x-icon type="ios-arrow-down" size="15" v-if="DataPopshow&&txsjText=='填写时间'"></x-icon>
                 </span>
                 丨
                  <span @click="hanldeSearchYDZT" class="taskLog-filter-second"><span :class="{'text-active':ydztText!='阅读状态'}">{{ydztText}}</span>&nbsp;
                    <x-icon type="ios-arrow-up" size="15" v-if="!statePopshow&&ydztText=='阅读状态'"></x-icon>
                    <x-icon type="ios-arrow-down" size="15" v-if="statePopshow&&ydztText=='阅读状态'"></x-icon>
                  </span>
                 丨
                  <span @click="hanldeSearchFW" class="taskLog-filter-third"><span :class="{'text-active':fwText!='范围'}">{{fwText}}</span>&nbsp;
                    <x-icon type="ios-arrow-up" size="15" v-if="!fwPopshow&&fwText=='范围'"></x-icon>
                    <x-icon type="ios-arrow-down" size="15" v-if="fwPopshow&&fwText=='范围'"></x-icon>
                  </span>
           </div>
        </div>
      <!-- load more -->
      <div class="taskLog-center-content">
       <scroller use-pullup  lock-x height="100%"  ref="scrollerBottom"  :pullup-config="pullupDefaultConfig"
       @on-pullup-loading="onPullupLoading" @on-scroll="onScroll">
          <div class="taskLog-center-filter">
              <TaskLogList :Datalist="ProcessList"  @handleOnButtonClick="handleOnButtonClick" @handleSeeDetails="handleSeeDetails"></TaskLogList>
          </div>
        </scroller>
         <div v-if="ProcessList.length == 0">
              <emptyContent></emptyContent>
         </div>
      </div>
        <div class="taskLog-center-addtasklog">
           <Cbutton :fontSize="'1'" :width="'100%'" :height="'8vh'" :text="'㊉ 添加日报'" :background="'#4376FF'" :color="'#fff'" @handleClick="handleAddLog"></Cbutton>
        </div>

      <popup v-model="DataPopshow" position='top' class="pop">
        <div class="taskLog-search-pop">
          <div class="taskLog-search-pop-start">
            <group title="开始日期">
              <datetime  v-model="ksrqDate" style="text-decoration:none;font-size:1.3rem"></datetime>
            </group>
          </div>
          <div style="color:#999">至</div>
          <div class="taskLog-search-pop-end">
              <group title="结束日期">
              <datetime  v-model="jsrqDate" style="text-decoration:none;font-size:1.3rem"></datetime>
            </group>
          </div> 
        </div>
        <div class="taskLog-search-pop-btn"> 
          <div>
              <Cbutton :width="'100%'" :height="'36px'" :text="'重置'" @handleClick="handleClickReset"></Cbutton>
          </div>
           <div>
             <Cbutton :width="'100%'" :height="'36px'" :text="'确定'" :background="'#4376FF'" :color="'#fff'" @handleClick="handleClickQuery"></Cbutton>
          </div>
        </div>
      </popup>

      <popup v-model="statePopshow" position='top' class="pop">
        <div class="taskLog-state-pop">
             <ul v-if="fwOrstate == '阅读状态'">
               <li v-for="(ydzt,i) in ydztList" :key="i" @click="handeChooseYdzt(ydzt.value,ydzt.label)">{{ydzt.label}}</li>                  
            </ul>  
        </div>
      </popup>

      <popup v-model="fwPopshow" position='top' class="pop">
        <div class="taskLog-state-pop">
             <ul v-if="fwOrstate == '范围'">
               <li v-for="(fw,i) in fwList" :key="i" @click="handeChooseFw(fw.value,fw.label)">{{fw.label}}</li>         
            </ul>  
        </div>
      </popup>
    </div>
</template>
<script>
import Cinput from "@/components/public/SearchInput.vue";
import Cbutton from "@/components/public/Button.vue";
import TaskLogList from "@/components/taskLog/TaskLog-card.vue";
import emptyContent from "@/components/public/empty-content.vue";
import { GetDateStr, getQueryStringByName } from "../../utils/util.js";

export default {
  data() {
    return {
      ydztList:[{ label:'全部', value:''},
                { label:'未阅', value:'0'},
                { label:'已阅', value:'1'}],
      fwList:[{ label:'全部', value:''},
               { label:'战队(组织结构)', value:'0'},
               { label:'学校成员', value:'2'},
               { label:'合作伙伴', value:'3'},
               { label:'项目', value:'1'}],
      DataPopshow: false,
      statePopshow: false,
      fwPopshow:false,
      startDate: "",
      endDate: "",
      ksrqDate: "",
      jsrqDate: "",
      keyword: "",
      curPage: 1,
      ydztText: "阅读状态",
      fwText:'范围',
      txsjText: "填写时间",
      ProcessList: [],
      contactList: [],
      isRead: "",
      fwValue:'',
      fwOrstate:'',
      pullupDefaultConfig: {
        content: " ",
        pullUpHeight: 100,
        height: 40,
        autoRefresh: false,
        upContent: "上拉加载更多",
        downContent: "释放后加载",
        loadingContent: "加载中...",
        clsPrefix: "xs-plugin-pullup-"
      },
    };
  },
  methods: {
    hanldeSearchTXSJ() {
      //填写时间
      this.statePopshow = this.fwPopshow =false;
      this.ksrqDate = this.startDate;
      this.jsrqDate = this.endDate;
      this.DataPopshow = !this.DataPopshow;
    },
    hanldeSearchYDZT() { //阅读状态
      this.fwOrstate = '阅读状态'
      this.DataPopshow = this.fwPopshow =  false;
      this.statePopshow = !this.statePopshow;
    },
    hanldeSearchFW(){  //范围
      this.fwOrstate = '范围'
      this.DataPopshow = this.statePopshow =  false;
      this.fwPopshow = !this.fwPopshow;
    },
    handeChooseYdzt(value,label) {    // 查看阅读状态
      this.curPage = 1;
      this.isRead = value;
      this.ydztText = label;
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.queryTaskProcess(this.startDate, this.endDate);
      this.statePopshow = false;
    },
    handeChooseFw(value,label){     //查看范围
       this.curPage = 1;
       this.fwValue = value;
       this.fwText = label;
       this.$refs.scrollerBottom.reset({ top: 0 });
       this.queryTaskProcess(this.startDate, this.endDate);
       this.fwPopshow = false;
    },
    handleClickQuery() {
      //日期筛选
      this.curPage = 1;
      this.startDate = this.ksrqDate;
      this.endDate = this.jsrqDate;
      // this.$refs.scrollerBottom.disablePullup()
      this.queryTaskProcess(this.ksrqDate, this.jsrqDate);
      this.txsjText = this.ksrqDate + " - " + this.jsrqDate;
    },

    handleClickReset() {
      //重置日期
      this.ksrqDate = GetDateStr(-7);
      this.jsrqDate = GetDateStr(0);
    },

    handleSearchKeyword(val) {
      //关键字筛选
      this.curPage = 1;
      this.keyword = val;
      this.$refs.scrollerBottom.reset({ top: 0 });
      this.queryTaskProcess(this.startDate, this.endDate);
    },

    onPullupLoading() {
      //上拉加载
      this.curPage += 1;
      this.queryTaskProcess(this.startDate, this.endDate);
    },
    onScroll(pos) {
      // console.log(pos)
    },
    handleOnButtonClick(data) {
      //删除 编辑
      if (data.split("&")[0] == "delete") {
        let _this = this;
        this.$vux.confirm.show({
          title: "提示",
          content: "是否删除该条日报?",
          onConfirm() {
            _this.$post(_this.API.deleteTaskProcess, {
                wid: JSON.parse(data.split("&")[1]).wid
              })
              .then(res => {
                if (res.state == "success") {
                  _this.ProcessList.splice(data.split("&")[1], 1);
                  _this.$vux.toast.show({
                    text: "删除成功"
                  });
                }
              });
          }
        });
      } else {
        this.$router.push({
          name: "AddTaskLog",
          params: { data: data.split("&")[1] }
        });
      }
    },
    handleSeeDetails(data) {
      //查看详情
      if (data.ydzt == 0) {
        this.$post(this.API.readLog, {
          wid: data.wid
        }).then(res => {
          if (res.state == "success") {
            data.ydzt = 1;
          }
        });
      }
      this.$router.push({ name: "TaskLogDetail", params: { data: data } });
    },
    handleAddLog() {
      // 添加日报
      this.$router.push({ name: "AddTaskLog" });
    },
    // 获取日志列表
    queryTaskProcess(start, end) {
      this.$vux.loading.show({ text: "加载中" });
      this.$get(this.API.queryLogTaskProcess, {
        curPage: this.curPage,
        pageSize: 10,
        startDay: start,
        endDay: end,
        isRead: this.isRead,
        keyword: this.keyword,
        fw:this.fwValue
      }).then(res => {
        if (res.state == "success") {
          this.$vux.loading.hide();
          this.DataPopshow = false;
          this.statePopshow = false;
          if (this.curPage == 1) {
            this.ProcessList = res.data.rows;
            if (res.data.total == 1 || res.data.total == 0) {
              this.$refs.scrollerBottom.disablePullup();
            } else {
              this.$refs.scrollerBottom.enablePullup();
            }
          } else {
            this.ProcessList = this.ProcessList.concat(res.data.rows);
            this.$refs.scrollerBottom.donePullup();
            if (this.curPage >= res.data.total) {
              this.$refs.scrollerBottom.disablePullup();
            }
          }
        } else {
          this.$vux.loading.hide();
          this.$refs.scrollerBottom.disablePullup();
        }
      }).catch((res)=>{
          this.$vux.loading.hide();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({ top: 0 });    
    });
    this.startDate = GetDateStr(-7);
    this.endDate = GetDateStr(0);
    this.txsjText = this.startDate + " - " + this.endDate;
    this.queryTaskProcess(this.startDate, this.endDate);
  },
  activated() {
    document.title = "日报";
  },
  watch: {
    $route: function(from, to) {
      if (from.name == "TaskLog" && to.name == "AddTaskLog") {
        if (from.params.bid == 1) {
          this.curPage = 1;
          this.queryTaskProcess(this.startDate, this.endDate);
        }
      }
    }
  },
  beforeCreate() {
    window.openId = getQueryStringByName("openId");
    if (window.openId) {
      sessionStorage.setItem("openId", window.openId);
    } else {
      window.openId = sessionStorage.getItem("openId");
    } 
    this.$post(this.API.wxLogin, {
      openId: window.openId
    }).then(res => {
      if (res.state == "success") {
        if (!!res.data) {
          this.$get(this.API.getLoginUser, {}).then(res => {
            if (res.state == "success") {
              window.userName = res.data.nickName;
              window.userId = res.data.uid;
              sessionStorage.setItem("jzUser", res.data.unitType);
            } else {
              alert(res.msg);
            }
          });
        }
      } else {
        this.$router.push({ path: "/login" });
        // window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html#/login'
      }
    });
  },
  components: {
    Cinput,
    TaskLogList,
    Cbutton,
    emptyContent
  }
};
</script>

<style lang="less">
@import "../../index.less";
.taskLog-top-filter {
  background: #fff;
  box-shadow: 0 2px 5px #eee;
  position: relative;
  z-index: 2000;
}
.taskLog-filter--input {
  padding: 0.5rem;
}
.taskLog-filter--tabs {
  padding: 8px 0;
  display: @flex;
  .taskLog-filter-first{
    width: 48%;
  }
  .taskLog-filter-second,.taskLog-filter-third{
      width: 26%;
  }
}
.taskLog-filter--tabs > span {
  display: inline-block;
  text-align: center;
  font-size: @fontSize;
  display: @flex;
  align-items: center;
  justify-content: center;
}
.taskLog-filter--tabs big {
  color: #909090;
}

.taskLog-center-filter {
  height: 100%;
  overflow-y: auto;
  margin-top: 10px;
}
.taskLog-center-addtasklog {
  position: fixed;
  bottom: 0;
  width: 100%;
  .weui-btn {
    font-size: 20px;
    border-radius: 0;
  }
}
.text-active {
  color: @text-color;
}
//  pop
.pop {
  margin-top: 86px;
  z-index: 200;
  background: #fff !important;
}
.taskLog-search-pop {
  display: @flex;
  align-items: center;
  justify-content: space-between;
  .taskLog-search-pop-start,
  .taskLog-search-pop-end {
    margin-top: 8px;
  }
  .weui-cell {
    padding: 5px 15px;
  }
}
.taskLog-search-pop-btn {
  display: @flex;
  justify-content: space-around;
  padding: 15px 0;
}
.taskLog-search-pop-btn > div {
  width: 45%;
}
.taskLog-state-pop ul li {
  padding: 8px 0;
  border-bottom: 1px solid #efefef;
  color: #000;
  text-align: center;
}
.taskLog-center-content {
  height: 77vh;
  overflow-y: auto;
  margin-top: 5px;
}
</style>