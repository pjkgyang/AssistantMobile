<template>
    <div>
        <swipeout v-for="(list,index) in Datalist" :key="index" :disabled="!list.editable">
        <swipeout-item :threshold=".5" underlay-color="#ccc">
            <div slot="right-menu" >
            <swipeout-button @click.native="onButtonClick('edit&'+JSON.stringify(list))" background-color="#336DD6">编辑</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete&'+JSON.stringify(list))" background-color="#D23934">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-tb" @click="handleSeeDetails(list)">
              <card :class="{'assiant-tasklog-list':true}">
                  <section slot="avatar">
                      <div class="assiant-tasklog_avatar">
                         <img  src="../../../static/img/user.png" :onerror="errorImg">
                      </div>
                  </section>
                  <section slot="info">
                      <p class="assiant-tasklog_info">
                        <span class="tasklog_username">{{list.cjrxm}}</span>
                        <span>日期：{{list.gcrq}}</span>
                      </p>
                      <p class="tasklog_date">填写日期：{{list.cjsj}}</p>
                  </section>
                  <section slot="mark">
                      <van-tag round :type="list.ydzt==0?'danger':list.ydzt==1?'success':''" :color="list.ydzt!=1 && list.ydzt!=0?'#f2826a':''">
                        {{list.ydzt==0?'未批阅':list.ydzt==1?'已批阅':'我自己'}}
                      </van-tag>
                  </section>
                  <section slot="icon">
                        <van-icon name="arrow" />
                  </section>
              </card>
              <!-- <card  :class="{'assiant-tasklog-list':true,'log-state-bg-wy':list.ydzt==0}" >
                <div slot="title" class="Tasklog-list-title">
                    <strong><span class="Tasklog-list-name">{{list.cjrxm}} </span>的日报</strong>
                    <span :class="{'log-state':true,'log-state-wy':list.ydzt==0,'log-state-yy':list.ydzt==1,'log-state-wd':list.ydzt==2}" >
                        {{list.ydzt==0?'未阅':list.ydzt==1?'已阅':'我'}}
                    </span>&#x3000;
                    <span v-if="list.ydzt==2" :class="{'log-state':true,'log-state-yy':true}">
                        {{list.ydzt_display}}
                    </span>
                    <span :class="{'Tasklog-btn-operate':true}" v-if="list.ydzt == 0">
                        <span class="Tasklog-btn-yy" @click="handleSetyy(list,$event)">设为已阅</span>
                    </span>
                </div>
                <div slot="content"  class="Tasklog-list-content">
                    <p>{{list.gs}}工时 / 日报日期 : {{list.gcrq}}</p>
                    <p>填写时间 : {{list.cjsj}}</p>
                    <span :class="{'log-state':true,'log-state-fxm':!list.xmmc}">{{!list.xmmc?'非项目任务':'所属项目:'}}
                    <span class="Tasklog-list-content--font" v-if="!!list.xmmc">{{'['+list.xmbh+']'+list.xmmc}}</span></span><br>
                    <span>内容 : <span class="Tasklog-list-content--font">{{list.gcms.length>55?list.gcms.slice(0,55)+'...':list.gcms}}</span></span>
                </div>
             </card> -->
            </div>
        </swipeout-item>
      </swipeout>
    </div>
</template>

<script>
import card from "@/components/public/Card.vue";
export default {
  data() {
    return {
       errorImg: 'this.src="' + require("../../../static/img/user.png") + '"',
    };
  },
  props: {
    Datalist: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    onButtonClick(type) {
      this.$emit("handleOnButtonClick", type);
    },
    handleSeeDetails(data) {
      //查看详情
      this.$emit("handleSeeDetails", data);
    },
    handleSetyy(param, e) {
      //设置为已阅
      e.stopPropagation();
      //   this.$vux.toast.text('设置成功~', 'default')
      if (param.ydzt == 0) {
        this.$post(this.API.readLog, {
          wid: param.wid
        }).then(res => {
          if (res.state == "success") {
            param.ydzt = 1;
          } else {
            this.$toast.fail(res.msg);
          }
        });
      }
    }
  },
  components: { card }
};
</script>
<style scoped lang="less">
@import "../../index.less";

.assiant-tasklog-list {
  border-bottom: @border;
  padding: 0.5rem;
  .assiant-tasklog_info,.tasklog_date{
    color: #8d8b8b;
    .tasklog_username{
      display: inline-block;
      width: 30%;
      font-size:0.9rem;
      color: #333;
    }
  }
  .assiant-tasklog_avatar{
    width: 8vw;
    height: 8vw;
    border-radius:0.6rem;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.log-state-fxm {
  background: rgba(182, 57, 63, 0.5);
  color: #fff;
  padding: 0 2px;
  border-radius: 3px;
}
</style>
