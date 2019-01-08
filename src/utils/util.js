import Vue from "vue";
let _this = new Vue();

 // 枚举;
 export  function getMenu(type,isInterface){
     var objData = new Promise(function(resolve, reject){
            _this.$get(WINDOW_CONFIG__BASEURL +'dict/getDictEnum.do',{
                name:type,
                isInterface:isInterface||''   
            }).then(res=>{
                    if (res.state == "success") {     
                        if(!!res.data){
                            resolve(res.data);
                            sessionStorage.setItem(type,JSON.stringify(res.data));  
                        }
                    }
            });
    });
    return objData; 
    // return _this.$get(WINDOW_CONFIG__BASEURL +'dict/getDictEnum.do',{
    //     name:type,
    //     isInterface:isInterface||''   
    // }).then(res=>{
    //         if (res.state == "success") {     
    //             if(!!res.data){
    //                 sessionStorage.setItem(type,JSON.stringify(res.data));  
    //             }
    //         }
    // });
    // getResponsibleTaskList({
    //     name:type,
    //     isInterface:isInterface||''
    // }).then(({data})=>{
    //   if (!!data && data.state == "success") {     
    //           let map = data.data;
    //           let Arr = Object.keys(map);
    //           let McArr = Object.values(map)
    //           for(var i = 0;i< Arr.length;i++){
    //               Arrlist.push({
    //                 label:Arr[i],
    //                 mc:McArr[i]
    //               })
    //             }
    //         sessionStorage.setItem(type,JSON.stringify(Arrlist));
    //         delCookie(type);
    //       }
    //  })
 }


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


//获取DayCount天后的日期 
export function GetNextDate(newDate,DayCount){ 
    var dd = new Date(newDate); 
    dd.setDate( dd.getDate() + DayCount);
    var y = dd.getFullYear(); 
    var m = dd.getMonth()+1;
    var d = dd.getDate(); 
    var s = y+"-"+(m<10?('0'+m):m)+"-"+(d<10?('0'+d):d);
    return  s;
}

// 格式化日期
export function getMyDate(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oMonth = oMonth < 10 ? ('0' + oMonth) : oMonth
    oDay = oDay < 10 ? ('0' + oDay) : oDay
    oMin = oMin < 10 ? ('0' + oMin) : oMin
    oHour = oHour < 10 ? ('0' + oHour) : oHour
    oSen = oSen < 10 ? ('0' + oSen) : oSen
    let oTime = oYear + '-' + oMonth + '-' + oDay ;
    return oTime;
}


function getOffsetDays(time1, time2) {
    return Math.ceil(Math.abs(time1 - time2) / (3600 * 24 * 1e3 * 7));
}
// 获取周数
export function  getWeeks(year, month){ 
    var d = new Date();
    let lastMonth = month-1;
    let lastYear = year;
    let firstWeek;
    let lastWeek;
    if(lastMonth == 0)
    {
        lastMonth = 12;
        lastYear = year-1;
    }
    if (lastMonth < 10) {
        lastMonth = "0" + lastMonth;
    }
    
    let myDate = new Date(year, month, 0); 
    let myDay = year + "/" + month + "/" + myDate.getDate();////本月的最后一天
    let firstWeekDay = new Date(myDay).getDay();
    if(firstWeekDay<4){
        firstWeek =  addDate(myDay,-(firstWeekDay));
    }else{
        firstWeek = addDate(myDay,(7-firstWeekDay));
    } 

    let lastDate = new Date(lastYear, lastMonth, 0); 
    let lastDay = lastYear + "/" + lastMonth + "/" + lastDate.getDate();//上月的最后一天
    let lastWeekDay = new Date(lastDay).getDay();
    if(lastWeekDay<4){
        lastWeek =  addDate(lastDay,-(lastWeekDay-1));
    }else{
        lastWeek = getMondayTime(year,month<10?'0'+month:month,1);
    }
    let week_count = getOffsetDays(new Date(firstWeek).getTime(),new Date(lastWeek).getTime());
    // let week_count = (myDay % 7)>2?Math.ceil(myDay / 7):Math.floor(myDay / 7);

    return week_count;
}
// 获取 （days 前后日期）
function addDate(date,days){ 
    var d=new Date(date); 
    d.setDate(d.getDate()+days); 
    var m=d.getMonth()+1; 
    var tmpDate = d.getFullYear()+ "/" + m + "/" + d.getDate(); 
    var resultDate = new Date(tmpDate); 
    var y = resultDate.getFullYear(); 
    var m = resultDate.getMonth()+1;
    var d = resultDate.getDate(); 
    var s = y+"-"+(m<10?('0'+m):m)+"-"+(d<10?('0'+d):d);
    return  s;
} 

// 获取每月第几周的周一的日期
function getMondayTime(year, month,weekday) {
    var d = new Date();
    // 该月第一天
    d.setFullYear(year, month-1, 1);
    var w1 = d.getDay();
    if (w1 == 0) w1 = 7;
    // 该月天数
    d.setFullYear(year, month, 0);
    var dd = d.getDate();
    // 第一个周一
    let d1;
    if (w1 != 1) d1 = 7 - w1 + 2;
    else d1 = 1;
    var monday = d1+(weekday-1)*7;
    monday = monday<10?'0'+monday:monday
    return year+'-'+month+'-'+monday;
}

//  获取当月第一周周一日期
export function getLastMonth(year,month){
    var nowdays = new Date();
    let nowMonth;
    if(month==0)
    {
        month=12;
        year=year-1;
    }
    if (month < 10) {
        nowMonth = '0' + (month+1);
        month = "0" + month;
    }else{
        nowMonth = month+1 
    }
    var firstDay = year + "-" + month + "-" + "01";//上个月的第一天
    var myDate = new Date(year, month, 0);
    var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
    let lastWeekDay = new Date(lastDay).getDay();
    if(lastWeekDay<4){
        return addDate(lastDay,-(lastWeekDay-1));
    }else{
        return getMondayTime(year,nowMonth,1);
    } 
}

// 获取月份最后一天
export function getLastMonthDay(year,month){
    let myDate = new Date(year, month, 0);
    let lastDay = year + "-" + (month>=10?month:'0'+month) + "-" + myDate.getDate();
    return lastDay;
}

// 获取下一个月
export function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 
    return t2;
}

// 获取上一个月
export function  getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2;
    return t2;
}

export function weekIndexInMonth(str){
    let date = new Date();
    let dateStart = new Date((new Date(str))); // 本月初
    let firstWeek = 1;
    if (dateStart.getDay() === 1) {
        firstWeek = 1;
    } else if (dateStart.getDay() === 0) {
        firstWeek = 8 - 7 + 1;
    } else {
        firstWeek = 8 - dateStart.getDay() + 1;
    }
    let weekIndex = 1;
    let c = Math.ceil(Math.abs(Date.now() - (new Date(str)).getTime())/(24*3600*1000));
    // let c = date.getDate();
    if (date.getDay() === 1 && date.getDate() < 7) {
        weekIndex = 1;
    } else if (c < firstWeek ) {
        weekIndex = -1;
    } else {
        if (c < 7) {
            weekIndex = Math.ceil(c/7);
        } else {
            c =  c - firstWeek + 1;
            if (c%7 === 0) {
                if (dateStart.getDay() !== 6) {
                    weekIndex = c/7;
                } else {
                    weekIndex = c/7 + 1;
                }
            } else {
                weekIndex = Math.ceil(c/7);
            }
        }
    }
    return weekIndex;
}


export function getCookie(name){ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
        else 
        return null; 
} 
// 获取sesstion
export function getSession(name) {
    return JSON.parse(sessionStorage.getItem(name));
}