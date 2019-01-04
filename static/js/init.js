


let baseUrl = 'http://careful.wisedu.com:8887/emap/sys/etender/api/';

window.openId =  getQueryStringByName("openId");
window.lx =  !getQueryStringByName("lx")?0:getQueryStringByName("lx");
window.gh =  getQueryStringByName("gh");

if(window.openId){
    sessionStorage.setItem('openId',window.openId);
}else{
    window.openId = sessionStorage.getItem('openId');
}

if(window.lx){
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
    wxLogin(window.openId,window.lx,window.gh);
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
                if(!sessionStorage.getItem('sign')){
                    getLoginUser();  
                }
            }else{
                window.location.href = 'http://careful.wisedu.com:8887/emap/sys/etender/wx/cpdaily.html#/login' 
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
              sessionStorage.setItem("userInfo", JSON.stringify(data.data));
              sessionStorage.setItem("sign", 1);
              window.location.href = 'http://careful.wisedu.com:8887/emap/sys/etender/wx/cpdaily.html'
            }else{
              alert(data.msg);
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