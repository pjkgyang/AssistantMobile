<template>
    <div>
      <lazy-component>
        <!-- <swipeout v-for="(list,index) in Datalist" :key="index" :disabled="!list.editable">
        <swipeout-item :threshold=".5" underlay-color="#ccc">
            <div slot="right-menu" >
            <swipeout-button @click.native="onButtonClick('edit&'+JSON.stringify(list))" background-color="#336DD6">编辑</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete&'+JSON.stringify(list))" background-color="#D23934">删除</swipeout-button>
            </div> -->
            <div v-for="(list,index) in Datalist" :key="index" :disabled="!list.editable" @click="handleSeeDetails(list)">
              <card :class="{'assiant-weekreport-list':true}">
                  <section slot="avatar">
                      <div class="assiant-weekreport_avatar">
                         <!-- <img  src="../../../static/img/user.png" :onerror="errorImg"> -->
                         <span v-if="list.headimg">
                          <img :src="list.headimg" alt="" v-lazy="img">
                        </span>
                         <span v-else class="no-headImg">
                           {{list.yhxm.length==2?list.yhxm:list.yhxm.length == 3?list.yhxm.slice(1,3):list.yhxm.slice(2,4)}}
                         </span>
                      </div>
                  </section>
                  <section slot="info">
                      <p class="assiant-weekreport_info">
                        <span class="weekreport_username">{{list.yhxm}}</span>
                        <span>日期：{{list.zxh_display}}</span>
                      </p>
                      <p class="weekreport_date">填写日期：{{list.txrq}}</p>
                  </section>
                  <section slot="mark">
                      <van-tag round :type="list.zt==0?'danger':'success'" >
                        {{list.zt_display}}
                      </van-tag>
                  </section>
                  <section slot="icon">
                        <van-icon name="arrow" />
                  </section>
              </card>
            </div>
        <!-- </swipeout-item>
      </swipeout> -->
      </lazy-component>
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
  padding:0.5rem  0.5rem 0.5rem 0;
  height: 4rem;
  background: #fff;
  
  .assiant-weekreport_info,.weekreport_date{
    color: #8d8b8b;
    .weekreport_username{
      display: inline-block;
      width: 31%;
      font-size:0.9rem;
      color: #333333;
      font-weight: 700;
    }
  }
  .assiant-weekreport_avatar{
    width: 2.6rem;
    height: 2.6rem;
    span{
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    img{
      width: 100%;
      height: 100%;
      border-radius:50%;
    }
    .no-headImg{
      border-radius:50%;
      overflow: hidden;
      background: @baseColor;
      color: #fff;
      font-weight: 700;
      line-height: 2.6rem;
      font-size: @fontSize14;
    }
  }
}
</style>
