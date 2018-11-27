<template>
    <div>
        <swipeout v-for="(list,index) in Datalist" :key="index" :disabled="!list.editable">
        <swipeout-item :threshold=".5" underlay-color="#ccc">
            <div slot="right-menu" >
            <swipeout-button @click.native="onButtonClick('edit&'+JSON.stringify(list))" background-color="#336DD6">编辑</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete&'+JSON.stringify(list))" background-color="#D23934">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-tb" @click="handleSeeDetails(list)">
              <card :class="{'assiant-weekreport-list':true}">
                  <section slot="avatar">
                      <div class="assiant-weekreport_avatar">
                         <img  src="../../../static/img/user.png" :onerror="errorImg">
                      </div>
                  </section>
                  <section slot="info">
                      <p class="assiant-weekreport_info">
                        <span class="weekreport_username">{{list.cjrxm}}</span>
                        <span>日期：{{list.gcrq}} 第一周</span>
                      </p>
                      <p class="weekreport_date">填写日期：{{list.cjsj}}</p>
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
     
    }
  },
  components: { card }
};

</script>
<style scoped lang="less">
@import "../../index.less";

.assiant-weekreport-list {
  border-bottom: @border;
  padding: 0.5rem;
  .assiant-weekreport_info,.weekreport_date{
    color: #8d8b8b;
    .weekreport_username{
      display: inline-block;
      width: 25%;
      font-size:0.9rem;
      color: #333;
    }
  }
  .assiant-weekreport_avatar{
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
</style>
