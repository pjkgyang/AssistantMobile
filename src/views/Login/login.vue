<template>
  <div class="assisant-login">
    <div class="assisant-login-content">
      <section class="assisant-login-logo">
         <img src="../../../static/img/logo-mini.png" alt="">
      </section>
      <section class="assisant-login-info">
        <div v-if="loginActive == 1">
          <div class="userInput">
            <mu-text-field @input="handleInputNam" v-model="userInfo.username" label="手机号码" :error-text="errNamShow?'请输入工号/手机号':''" label-float icon="account_circle"></mu-text-field>
            <mu-text-field @input="handleInputPsw" v-model="userInfo.password" label="密码" :error-text="errPswShow?'请输入密码':''" label-float icon="locked" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field>
          </div>
          <div class="assisant-login-jump">
            <span @click="handleTysfLogin">统一身份认证登录</span>
          </div>
        </div>
        <div v-else>
          <div class="userInput">
              <mu-text-field v-model="phoneNum" type="number" placeholder="手机号码(仅支持非金智员工)" icon="phone"></mu-text-field><br/>
              <div class="assisant-login-code">  
                <mu-text-field v-model="code" placeholder="验证码" icon="code"></mu-text-field>
                <!-- <button>获取验证码</button> -->
                <mu-button color="#00c1de" :disabled="isCoding" @click="handleGetCode">获取验证码{{isCoding?'('+count+')':''}}</mu-button>
              </div>
          </div>
        </div>
          <p class="error-msg" v-if="failtureMsg">{{failtureMsg}}</p>
        <div>
          <mu-button  round  full-width  color="#00c1de" @click="handleLogin">登录</mu-button><br><br>
          <p class="login_tip" v-if="loginActive==1">注：金智教育员工请使用工号登录</p>
        </div>
      </section>
      <section class="assisant-login-footer">
          <mu-button :color="loginActive==1?'#00c1de':''" @click="handleChooseLogintype(1)">密码登录</mu-button>
          <mu-button :color="loginActive==2?'#00c1de':''" @click="handleChooseLogintype(2)">验证码登录</mu-button>
      </section>
    </div>
  </div>
</template>
<script>
import { getCookie } from "@/utils/util.js";
export default {
  data() {
    return {
      visibility: false,
      errPswShow: false,
      errNamShow: false,
      loading:true,
      userInfo: {
        username: "",
        password: ""
      },
      failtureMsg: "",
      phoneNum:"", //手机号码
      code:"",//验证码

      loginActive:2, //是否登录
      count:60,
      isCoding:false,

    };
  },
  methods: {
    // 选择登陆方式
    handleChooseLogintype(params) {
      if(this.loginActive != params){
         this.loginActive = params;
         this.failtureMsg = ''
      }
    },
    // 手记号
    handleInputNam(val) {
      if (!!val) {
        this.errNamShow = false;
      }
    },
    // 密码
    handleInputPsw(val) {
      if (!!val) {
        this.errPswShow = false;
      }
    },
    // 获取验证码
    handleGetCode(){
      if(!(/^1[345789]\d{9}$/.test(this.phoneNum))){
         this.$toast('请输入正确手机号~'); 
         return;
      }
      this.$post(this.API.sendCode,{
        way:'sms',
        contact:this.phoneNum,
        vtype:1
      }).then(res=>{
        if(res.state == 'success'){
           this.$toast({message:'验证码发送成功~',duration:1500,position:'top'});
           this.isCoding = true; 
           const timer = setInterval(()=>{
            this.count -- ; 
            if(this.count==0){
                clearInterval(timer);
                this.isCoding = false;
                this.count = 60;
            }
          },1000)
         }else{
           this.$toast(!res.msg?'请求超时,请稍后再试~':res.msg); 
         }
      })
    },
    // 用户登陆
    handleLogin() {
      if(this.loginActive == 1){
        if (!this.userInfo.username || !this.userInfo.password) {
          if (!this.userInfo.username) {
            this.errNamShow = true;
          }
          if (!this.userInfo.password) {
            this.errPswShow = true;
          }
          return;
        }
      }else{
        if(!this.code){
          this.$toast('请输入验证码~');
          return;
        }
      }
      this.$toast.loading({
        mask: true,
        message: "登陆中...",
        duration: 0
      });
      this.$post(this.API.wxLogin, {
        openId: window.openId,
        username:this.loginActive==1?this.userInfo.username:'',
        password:this.loginActive==1?this.userInfo.password:'',
        lx:window.lx,
        gh:window.gh,
        way:this.loginActive==2?'sms':'',
        contact:this.loginActive==2?this.phoneNum:'',
        code:this.loginActive==2?this.code:''
      }).then(res => {
        if (res.state == "success") {
          this.$get(this.API.getLoginUser,{}).then(res=>{
            if (res.state == "success") {
              window.userName = res.data.nickName;
              window.userId = res.data.uid;
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              this.$toast.clear();
              
              // 临时增加权限
              if(res.data.userGroupTag.includes('JYGL')){
                  this.$router.push({ path: "/" });
              }else{
                  this.$router.push({ path: "/taskLog" });
              }
            }else{
              this.$toast.clear();
              this.$toast(res.msg);
            }
          })
          // more
        } else {
          this.$toast.clear();
          this.failtureMsg = res.msg;
        }
      });
    },
    // 统一身份认证
    handleTysfLogin() {
      window.open(
        "http://careful.wisedu.com/emap/sys/etender/auth/idsWxLogin.do?openId=" +window.openId +'&lx='+window.lx
      );
    },
  },
  activated() {
    if (!window.openId || !window.lx || !window.gh) {
       window.openId = sessionStorage.getItem("openId");
      window.lx = sessionStorage.getItem("lx"); 
      window.gh = sessionStorage.getItem("gh"); 
    }
    if(window.lx != '0'){
      this.loginActive = 1
    }
     this.$toast.clear();
  },
  components: {}
};
</script>
<style scoped lang="less">
@import "../../index.less";
.assisant-login {
  height: 100vh;
  position: relative;
  background-image: url("../../../static/img/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  &:after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(6px);
    z-index: 2;
}
  .assisant-login-content {
    padding: 0 20px;
    position: absolute;
    z-index:11;
    height: 100%;
    width: 100%;
    .userInput {
      .mu-input {
        width: 100%;
      }
    }

    .assisant-login-jump {
      text-align: right;
      font-size: 0.8rem;
      margin: 10px 0;
      span {
        color: rgb(25, 159, 221);
      }
    }
    // logo
    .assisant-login-logo{
      height: 20%;
      .flex(center,center);
      img{
        width:50vw;
      }
    }
    // 登录
    .assisant-login-info{
      height: 50%;
      padding-top:1.555555rem; 
        .error-msg{
          margin-bottom:0.8888rem !important;
          color: #f00;
          margin: 0 auto;
          font-size: @fontSize14;
        }
        .login_tip{
          color: rgb(240, 22, 22);
          font-size: @fontSize12;
          text-align: right;
        }
    }
    .assisant-login-footer{
      text-align: center;
      margin-top:30vw;
    }
    .assisant-login-code{
        .mu-input{
          width: 55%;
        }
        button{
          width: 40%;
          font-size:@fontSize12;
        }
        .flex(@row:space-between);
    }
  }
  .bbh{
    text-align: center;
  }
}
</style>
