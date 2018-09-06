
window.openId =  getQueryStringByName("openId")

if(window.openId){
    sessionStorage.setItem('openId',window.openId)
}else{
    window.openId = sessionStorage.getItem('openId')
}

wxLogin(window.openId);

//根据QueryString参数名称获取值
  function getQueryStringByName(name) {
            var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        }


//获取用户
function wxLogin(openId) {
    $.ajax({
        type: "POST",
        url: WINDOW_CONFIG__BASEURL + "wx/wxLogin.do",
        async: false,
        data: {
            openId: openId,
        },
        success: function (data) {
            if (data.state == "success") {
                if(!!data.data){
                    window.userId = data.data.userId;
                    window.userName = data.data.userName;   
                    if(sessionStorage.getItem('sign') == null){
                        window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html'  
                    }
                }
            }else{
                  window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html#/login' 
            }
        }
    });
}