<template>
    <div class="assisant-login">
        <div>
            <tab>
                <tab-item selected @on-item-click="onItemClick">登录</tab-item>
                <!-- <tab-item @on-item-click="onItemClick">注册</tab-item> -->
            </tab>
        </div>
        <div class="assisant-login-input">
            <x-input title="账号" placeholder="请输入账号" v-model="userInfo.username" required></x-input>
            <x-input title="密码" placeholder="请输入密码" type="password" v-model="userInfo.password" required></x-input>
            <p v-if="failtureMsg">{{failtureMsg}}</p>
            
            <div class="assisant-login-jump">
                <span @click="handleTysfLogin">统一身份认证登录</span>
            </div>
            <div>
                <Cbutton :width="'100%'" :showLoading="showLoading" :text="'登录'" :height="'40px'" :color="'#fff'" :background="'#409EFF'" @handleClick="handleLogin"></Cbutton>
            </div>
        </div>
    </div>
</template>
<script>
import Cbutton from '@/components/public/Button.vue'
export default {
    data(){
        return{
            userInfo:{
                username:'',
                password:''
            },
            failtureMsg:"",
            openId:"",
            showLoading:false
        }
    },
    methods:{
        onItemClick(){
        
        },
        handleLogin(){
            if(!this.userInfo.username||!this.userInfo.password)  return;
            this.showLoading = true;
            this.$post(this.API.wxLogin,{
                openId:this.openId,
                username:this.userInfo.username,
                password:this.userInfo.password
            }).then((res)=>{
                if(res.state == 'success'){
                    this.$router.push({path:'/'});
                }else{
                    this.showLoading = false
                    this.failtureMsg = res.msg
                }
            })

        },
        handleTysfLogin(){
            // window.location.href = 'http://careful.wisedu.com/emap/sys/etender/auth/idsWxLogin.do?openId='+this.openId
            console.log(this.openId);

            window.open('http://careful.wisedu.com/emap/sys/etender/auth/idsWxLogin.do?openId='+this.openId)
        }
    },
    activated(){
        if(sessionStorage.getItem('openId')){
           this.openId = sessionStorage.getItem('openId');
        }            
        document.title = '用户登录'
    },
    components:{Cbutton}
}
</script>
<style scoped lang="less">
@import '../../index.less';
.assisant-login{
    padding: 10px 0;
    height: 100vh;
    background:linear-gradient(to bottom right, #F7F7F7 , #F0F0F0);
    .assisant-login-input{
        padding: 10px 20px;
        .vux-x-input{
            border: 1px solid #ccc;
            border-radius: 5px;
            margin:10px 0;
        }
        .vux-x-input:hover{
            border: 1px solid #9AC0CD;
            box-shadow: 0 0 3px rgb(139, 169, 177);
            transition:all 0.3s;
        }
        p{
            color: #f00;
            font-size:@fontSize;
            padding: 10px 0;
        }
        .assisant-login-jump{
            text-align: right;
            font-size: 0.8rem;
            margin:10px 0;
            span{
             color: rgb(51, 85, 238)
            }
        }
    }
}

</style>
