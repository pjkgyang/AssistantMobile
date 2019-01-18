


let baseUrl = 'http://careful.wisedu.com/emap/sys/etender/api/';

window.openId =  getQueryStringByName("openId");
window.lx =  getQueryStringByName("lx")=='undefined'||getQueryStringByName("lx")=='null'?3:getQueryStringByName("lx");
window.gh =  getQueryStringByName("gh");

if(window.openId){
    sessionStorage.setItem('openId',window.openId);
}else{
    window.openId = sessionStorage.getItem('openId');
}

if(window.lx || window.lx=='0'){
    sessionStorage.setItem('lx',window.lx);
}else{
    window.lx = sessionStorage.getItem('lx');
}

if(window.gh){
    sessionStorage.setItem('gh',window.gh);
}else{
    window.gh = sessionStorage.getItem('gh');
}

if(!sessionStorage.getItem('sign')){
    if(window.lx != 3 || window.lx == '0'){ //非web登录
        wxLogin(window.openId,window.lx,window.gh);
    }else{
        getLoginUser(); //web登录
    }
}


//获取用户
function wxLogin(openId,lx,gh) {
    $.ajax({
        type: "POST",
        url: baseUrl + "wx/wxLogin.do",
        async: false,
        data: {
            openId: openId,
            lx:lx,
            gh:gh
        },
        success: function (data) {
            if (data.state == "success") {
                if(window.lx != 3 && !sessionStorage.getItem('sign')){   //非Web登录
                    getLoginUser();  
                }
            }else{
                window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html#/login' 
            }
        }
    });
}
// 获取用户信息
function getLoginUser(){
    $.ajax({
        type: "GET",
        url: baseUrl + "sys/getLoginUser.do",
        async: false,
        data: {},
        success: function (data) {
            if (data.state == "success") {
              window.userName = data.data.nickName;
              window.userId = data.data.uid;
              localStorage.setItem("userInfo", JSON.stringify(data.data));
              sessionStorage.setItem("sign", 1);
              window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html'
            }else{
                if(window.lx == 3){  //web登录
                    wxLogin();
                }else{
                    alert(data.msg);
                }
            }
        },
        error:function(error){
            if(error.status == 401 && window.lx == 3){
                wxLogin();
            }
        }
    });
}

//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}