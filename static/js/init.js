


let baseUrl = 'http://careful.wisedu.com/emap/sys/etender/api/';


if (!sessionStorage.getItem('sign')) {
    localStorage.setItem('lx', '');

    window.openId = getQueryStringByName("openId");

    if (localStorage.getItem('lx') === '' || localStorage.getItem('lx') === null || localStorage.getItem('lx') === undefined) {
        let tempLx = getQueryStringByName("lx");
        if (tempLx === '') {
            window.lx = '3';
        } else {
            window.lx = tempLx;
        }
    } else {
        window.lx = localStorage.getItem('lx');
    }


    window.gh = getQueryStringByName("gh");


    if (window.openId) {
        sessionStorage.setItem('openId', window.openId);
    } else {
        window.openId = sessionStorage.getItem('openId');
    }

    if (window.lx || window.lx == '0') {
        localStorage.setItem('lx', window.lx);
    } else {
        window.lx = localStorage.getItem('lx');
    }

    if (window.gh) {
        sessionStorage.setItem('gh', window.gh);
    } else {
        window.gh = sessionStorage.getItem('gh');
    }

    if (window.lx == 3) { //web登录
        getLoginUser();
    } else {
        wxLogin(window.openId, window.lx, window.gh);
    }
}


//获取用户
function wxLogin(openId, lx, gh) {
    $.ajax({
        type: "POST",
        url: baseUrl + "wx/wxLogin.do",
        async: false,
        data: {
            openId: openId,
            lx: lx,
            gh: gh
        },
        success: function (data) {
            if (data.state == "success") {
                if (window.lx != 3 && !sessionStorage.getItem('sign')) { //非Web登录
                    getLoginUser();
                }
            } else {
                sessionStorage.setItem('sign', 1);
                window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html#/login';
            }
        }
    });
}

// 获取用户信息
function getLoginUser() {
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

                if (!getQueryStringByName("ym")) {
                    window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html'
                } else {
                    window.location.href = 'http://careful.wisedu.com/emap/sys/etender/wx/index.html#/' + getQueryStringByName("ym") + '?wid=' + getQueryStringByName("wid")+'&frommsg=1'
                }
            } else {
                if (window.lx == 3) {  //web登录
                    wxLogin();
                } else {
                    alert(data.msg);
                }
            }
        },
        error: function (error) {
            if (error.status == 401 && window.lx == 3) {
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