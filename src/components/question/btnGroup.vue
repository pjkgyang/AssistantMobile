<template>
  <div>
    <div class="question-reply-btngroup">
      <van-button v-for="(btn,index) in btngroupArr" :key="index" :type="btn.type" @click="handleClick(btn.en)" :class="{'btnClasshf':!btn.type && btn.name=='回复','btnClassqt':!btn.type && btn.name!='回复'}">{{btn.name}}</van-button>
      <van-button type="warning" v-if="btnArrs.length > 2" @click.stop="handleCheckMore">更多</van-button>
    </div>
    <mu-expand-transition>
      <div class="reply-btngroup-more" v-if="show">
        <ul>
          <li v-for="(btn,index) in btngroup">
            <van-button :key="index" :type="btn.type" @click="handleClick(btn.en)" :class="{'btnClasshf':!btn.type && btn.name=='回复','btnClassqt':!btn.type && btn.name!='回复'}">{{btn.name}}</van-button>
          </li>
        </ul>
      </div>
    </mu-expand-transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
      btnArr: [
        { name: "回复", type: "", en: "hf" },
        { name: "关闭问题", type: "danger", en: "gb" },
        { name: "受理", type: "", en: "sl" },
        { name: "催办", type: "", en: "cb" },
        { name: "申请关闭", type: "", en: "sqjs" },
        { name: "转发问题", type: "", en: "zf" },
        { name: "修改承诺时间", type: "", en: "cnsj" },
        { name: "关联开发任务", type: "", en: "xgcrowId" }
      ],
      btngroup: [], //记录btn
      btngroupArr: [],
      btnArrs: [] //可现实按钮
    };
  },
  props: {
    wid: {
      type: String,
      default: ""
    }
  },
  activated() {
    if (!this.$store.state.mark) {
      this.queryBtnAuth();
    }
    this.show = false;
  },
  mounted() {},
  computed: {
    ...mapGetters(["btnShow", "queryBtn"])
  },
  watch: {
    btnShow(n, o) {
      if (!n) {
        this.show = false;
      }
    },
    queryBtn(n, o) {
      this.queryBtnAuth();
    }
  },
  methods: {
    handleCheckMore() {
      this.$store.dispatch("changeBtnshow", !this.show);
      this.show = !this.show;
    },
    handleClick(data) {
      this.$emit("handleClick", data);
      this.show = false;
    },
    // 获取按钮权限
    queryBtnAuth() {
      this.btngroup = [];
      this.btngroupArr = [];
      this.btnArrs = [];
      this.$get(this.API.queryBtnAuth, {
        wid: this.wid
      }).then(res => {
        if (res.state == "success") {
          if (
            !res.data["hf"] &&
            !res.data["zf"] &&
            !res.data["sl"] &&
            !res.data["gb"] &&
            !res.data["cb"] &&
            !res.data["cnsj"] &&
            !res.data["xgcrowId"] &&
            !res.data["sqjs"]
          ) {
            this.$emit("BtnAuthFalse", res.data.qwjjrq, false);
          } else {
            this.btnArr.forEach(ele => {
              ele.show = res.data[ele.en];
            });
            this.btnArr.forEach((value, index, array) => {
              if (value.show) {
                this.btngroup.push(value);
                this.btnArrs.push(value);
              }
            });
            if (this.btngroup.length > 2) {
              this.btngroupArr = this.btngroup.splice(0, 2);
            } else {
              this.btngroupArr = this.btngroup;
            }
            this.$emit("BtnAuthFalse", res.data.qwjjrq, true);
          }
        } else {
          this.$toast(!res.msg ? "系统超时，请稍后再试~" : res.msg);
        }
      });
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.question-reply-btngroup {
  width: 100vw;
  .flex(space-between);
  button {
    width: 100%;
  }
}
.reply-btngroup-more {
  position: fixed;
  bottom: 44px;
  width: 100vw;
  z-index: 11100;
  ul {
    width: 33.33333%;
    float: right;
    box-shadow: 0 0 5px rgb(211, 203, 203);
    background: #fff;
    li {
      width: 100%;
      button {
        width: 100%;
        margin-bottom: 0.12222rem;
      }
    }
    .flex(@column:column);
  }
}

.btnClasshf {
  background: #007aff;
  color: #fff;
  border: none;
}
.btnClassqt {
  background: #00c1de;
  color: #fff;
  border: none;
}
</style>
