jdkInit();

//获取jsapi sign
function getTicketInfo(){
    var result;
    $.ajax({
        type: "GET",
        url: WINDOW_CONFIG__BASEURL+ "wx/getSign.do?url=" + location.href.replace(/&/g,"__"),
        async: false,
        success: function (data) {
            if ("success" == data.state) {
                result = data.data;
            } 
        }
    });
    return result;
}

function jdkInit(){
    var sign = getTicketInfo();
    if(!!sign){
        wx.config({  
            debug: false,  
            appId: sign.appId,  
            timestamp: sign.timestamp,  
            nonceStr: sign.nonceStr,  
            signature: sign.signature,  
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone','chooseImage','getLocalImgData','uploadImage','downloadImage','previewImage'] // 功能列表，我们要使用JS-SDK的什么功能  

        });  
    }
}

// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。  
wx.ready(function(){
	
	var title = '金智服务台';
	var desc = '服务台是金智教育为学校信息化建设提供的新服务。在这里你可以在第一时间掌握项目建设进展、查看建设成果，方便快捷地对信息化建设的内容、进度进行跟踪评价，让您的工作更轻松。';
	var link = 'http://careful.wisedu.com/emap/sys/etender/api/wx/share.do';
	var imgUrl = 'http://careful.wisedu.com/emap/sys/etender/wx/static/img/share.JPG';
	
	
    // 获取"分享到朋友圈"按钮点击状态及自定义分享内容接口  
    wx.onMenuShareTimeline({  
        title: title, // 分享标题  
        desc: desc, // 分享描述  
        link: link,  
        imgUrl: imgUrl, // 分享图标  
        type: 'link' // 分享类型,music、video或link，不填默认为link  
    });  
      
      
    // 获取"分享给朋友"按钮点击状态及自定义分享内容接口  
    wx.onMenuShareAppMessage({  
        title: title, // 分享标题  
        desc: desc, // 分享描述  
        link: link,  
        imgUrl: imgUrl, // 分享图标  
        type: 'link' // 分享类型,music、video或link，不填默认为link  
    });  
      
      
    //获取"分享到QQ"按钮点击状态及自定义分享内容接口  
    wx.onMenuShareQQ({  
        title: title, // 分享标题  
        desc: desc, // 分享描述  
        link: link,  
        imgUrl: imgUrl, // 分享图标  
        type: 'link' // 分享类型,music、video或link，不填默认为link  
    });  
      
      
    //获取"分享到腾讯微博"按钮点击状态及自定义分享内容接口  
    wx.onMenuShareWeibo({  
        title: title, // 分享标题  
        desc: desc, // 分享描述  
        link: link,  
        imgUrl: imgUrl, // 分享图标  
        type: 'link' // 分享类型,music、video或link，不填默认为link  
    });  
      
      
    //获取"分享到QQ空间"按钮点击状态及自定义分享内容接口  
    wx.onMenuShareQZone({  
        title: title, // 分享标题  
        desc: desc, // 分享描述  
        link: link,  
        imgUrl: imgUrl, // 分享图标  
        type: 'link' // 分享类型,music、video或link，不填默认为link  
    });  
      
}); 