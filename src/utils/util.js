

export function  GetDateStr(DayCount) { 
    var dd = new Date(); 
    dd.setDate( dd.getDate() + DayCount);//获取DayCount天后的日期 
    var y = dd.getFullYear(); 
    var m = dd.getMonth()+1;
    var d = dd.getDate(); 
    var s = y+"-"+(m<10?('0'+m):m)+"-"+(d<10?('0'+d):d);
    return  s;
}

export function  getQueryStringByName(name) {  // 获取QueryString
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}