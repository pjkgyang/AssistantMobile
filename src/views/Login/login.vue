<template>
  <div class="assisant-login">
    <div class="assisant-login-input">
      <div class="userInput">
        <mu-text-field @input="handleInputNam" v-model="userInfo.username" label="账号" :error-text="errNamShow?'请输入账号':''" label-float icon="account_circle"></mu-text-field>
        <mu-text-field @input="handleInputPsw" v-model="userInfo.password" label="密码" :error-text="errPswShow?'请输入密码':''" label-float icon="locked" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field>
        <p v-if="failtureMsg">{{failtureMsg}}</p>
      </div>
      <div class="assisant-login-jump">
        <span @click="handleTysfLogin">统一身份认证登录</span>
      </div>
      <div>
        <mu-button round full-width color="primary" @click="handleLogin">登陆</mu-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visibility: false,
      errPswShow: false,
      errNamShow: false,
      userInfo: {
        username: "",
        password: ""
      },
      failtureMsg: "",
      openId: ""
    };
  },
  methods: {
    onItemClick() {},
    handleInputNam(val) {
      if (!!val) {
        this.errNamShow = false;
      }
    },
    handleInputPsw(val) {
      if (!!val) {
        this.errPswShow = false;
      }
    },
    handleLogin() {
      if (!this.userInfo.username || !this.userInfo.password) {
        if (!this.userInfo.username) {
          this.errNamShow = true;
        }
        if (!this.userInfo.password) {
          this.errPswShow = true;
        }
        return;
      }
      this.$toast.loading({
        mask: true,
        message: "登陆中...",
        duration: 0
      });
      this.$post(this.API.wxLogin, {
        openId: this.openId,
        username: this.userInfo.username,
        password: this.userInfo.password
      }).then(res => {
        if (res.state == "success") {
          this.$toast.clear();
          this.$router.push({ path: "/" });
        } else {
          this.failtureMsg = res.msg;
        }
      });
    },
    handleTysfLogin() {
      console.log(this.openId);
      window.open(
        "http://careful.wisedu.com/emap/sys/etender/auth/idsWxLogin.do?openId=" +
          this.openId
      );
    }
  },
  activated() {
    if (sessionStorage.getItem("openId")) {
      this.openId = sessionStorage.getItem("openId");
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
@import "../../index.less";
.assisant-login {
  padding: 10px 0;
  height: 100vh;
  position: relative;
  background-image: url("../../../static/img/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  .assisant-login-input {
    padding: 10px 20px;
    position: absolute;
    top: 26vh;
    .userInput {
      .mu-input {
        width: 95%;
      }
      p {
        width: 90%;
        color: #f00;
        margin: 0 auto;
        font-size: @fontSize12;
      }
    }
    .assisant-login-jump {
      text-align: right;
      font-size: 0.8rem;
      margin: 10px 0;
      span {
        color: rgb(113, 189, 199);
      }
    }
  }
}
</style>
