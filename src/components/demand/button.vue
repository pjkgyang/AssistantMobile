<template>
  <div>
    <div class="question-reply-btngroup">
      <van-button
        v-for="(btn,index) in btngroupArr"
        v-if="btn.btnid !=6&&btn.btnid!=10&&btn.btnid!=9&&btn.btnid!=15&&btn.btnid!=5&&btn.btnid!=7"
        :key="index"
        :type="btn.type"
        @click="handleClick(btn.btnid)"
        :class="{'btnClasshf':btn.btnname=='回复','btnClassqt': btn.btnname!='回复'}"
      >{{btn.btnname}}</van-button>
      <van-button type="warning" v-if="btngroup.length > 2" @click.stop="handleCheckMore">更多</van-button>
    </div>
    <mu-expand-transition>
      <div class="reply-btngroup-more" v-if="show">
        <ul>
          <li v-for="(btn,index) in btngroup" v-if="btn.btnid !=6&&btn.btnid!=10&&btn.btnid!=9&&btn.btnid!=15&&btn.btnid!=5&&btn.btnid!=7">
            <van-button
              :key="index"
              :type="btn.type"
              @click="handleClick(btn.btnid)"
              :class="{'btnClasshf':btn.btnname=='回复','btnClassqt': btn.btnname!='回复'}"
            >{{btn.btnname}}</van-button>
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
      btngroup: [], //记录btn
      btngroupArr: []
    };
  },
  props: {
    wid: {
      type: String,
      default: ""
    },
    update: {
      type: Boolean,
      default: false
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
    },
    update(n, o) {
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
      this.$get(this.API.demandBtns, {
        zbwid: this.wid
      }).then(res => {
        if (res.state == "success") {
            this.btngroup = res.data;
            if (this.btngroup.length > 2) {
              this.btngroupArr = this.btngroup.splice(0, 2);
            } else {
              this.btngroupArr = this.btngroup;
            }
            if(!res.data || !res.data.length){
              this.$emit("BtnAuthFalse", false);
            }else{
              this.$emit("BtnAuthFalse", true);
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
