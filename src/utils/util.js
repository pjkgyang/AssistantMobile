import Vue from "vue";
let _this = new Vue();
import CryptoJS from 'crypto-js';


// Unix 时间戳 转换当前时间
export function formatTime(time) {
	let unixtime = time
	let unixTimestamp = new Date(unixtime * 1000)
	let Y = unixTimestamp.getFullYear()
	let M = (unixTimestamp.getMonth() + 1) < 10 ? ('0' + (unixTimestamp.getMonth() + 1)) : unixTimestamp.getMonth() + 1
	let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
	let H = (unixTimestamp.getHours() > 10 ? unixTimestamp.getHours() : '0' + unixTimestamp.getHours())
	let MM = (unixTimestamp.getMinutes() > 10 ? unixTimestamp.getMinutes() : '0' + unixTimestamp.getMinutes()); //分
	let S = (unixTimestamp.getSeconds() > 10 ? unixTimestamp.getSeconds() : '0' + unixTimestamp.getSeconds());
	let toDay = Y + '-' + M + '-' + D + ' ' + H + ':' + MM + ':' + S
	return toDay
}

// 枚举;
export function getMenu(type, isInterface) {
	var objData = new Promise(function(resolve, reject) {
		_this.$get(WINDOW_CONFIG__BASEURL + 'dict/getDictEnum.do', {
			name: type,
			isInterface: isInterface || ''
		}).then(res => {
			if (res.state == "success") {
				if (!!res.data) {
					resolve(res.data);
					sessionStorage.setItem(type, JSON.stringify(res.data));
				}
			}
		});
	});
	return objData;
}
// 通过code获取名称
export function getMenuByCode(type, code, isInterface) {
	var codeData = new Promise(function(resolve, reject) {
		_this.$get(WINDOW_CONFIG__BASEURL + 'dict/getDictEnum.do', {
			name: type,
			code: code,
			isInterface: isInterface || ''
		}).then(res => {
			if (res.state == "success") {
				if (!!res.data) {
					resolve(res.data);
				}
			}
		});
	});
	return codeData;
}

// // DES 加密
export function encryptByDES(message, key){
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
     });
    return encrypted.toString();
}

export function GetDateStr(DayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + DayCount); //获取DayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;
	var d = dd.getDate();
	var s = y + "-" + (m < 10 ? ('0' + m) : m) + "-" + (d < 10 ? ('0' + d) : d);
	return s;
}

export function getQueryStringByName(name) { // 获取QueryString
	var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
}

// 获取最后一天周几
function getLastMonthWeekDay(year,month) {
	let myDate = new Date(year, month, 0);
	let lastDay = year + "-" + (month>=10?month:'0'+month) + "-" + myDate.getDate();
	let week  = new Date(lastDay).getDay()==0?7:new Date(lastDay).getDay();
	return week;
}

//获取DayCount天后的日期
export function GetNextDate(newDate, DayCount) {
	var dd = new Date(newDate);
	dd.setDate(dd.getDate() + DayCount);
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;
	var d = dd.getDate();
	var s = y + "-" + (m < 10 ? ('0' + m) : m) + "-" + (d < 10 ? ('0' + d) : d);
	return s;
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
	let oTime = oYear + '-' + oMonth + '-' + oDay;
	return oTime;
}


function getOffsetDays(time1, time2) {
	return Math.ceil(Math.abs(time1 - time2) / (3600 * 24 * 1e3 * 7));
}
// 获取周数
export function getWeeks(year, month) {
	var d = new Date();
	let lastMonth = month - 1;
	let lastYear = year;
	let firstWeek;
	let lastWeek;
	if (lastMonth == 0) {
		lastMonth = 12;
		lastYear = year - 1;
	}
	if (lastMonth < 10) {
		lastMonth = "0" + lastMonth;
	}

	let myDate = new Date(year, month, 0);
	let myDay = year + "/" + month + "/" + myDate.getDate(); ////本月的最后一天
	let firstWeekDay = new Date(myDay).getDay();
	if (firstWeekDay < 4) {
		firstWeek = addDate(myDay, -(firstWeekDay));
	} else {
		firstWeek = addDate(myDay, (7 - firstWeekDay));
	}

	let lastDate = new Date(lastYear, lastMonth, 0);
	let lastDay = lastYear + "/" + lastMonth + "/" + lastDate.getDate(); //上月的最后一天
	let lastWeekDay = new Date(lastDay).getDay();
	if (lastWeekDay < 4) {
		lastWeek = addDate(lastDay, -(lastWeekDay - 1));
	} else {
		lastWeek = getMondayTime(year, month < 10 ? '0' + month : month, 1);
	}
	let week_count = getOffsetDays(new Date(firstWeek).getTime(), new Date(lastWeek).getTime());
	// let week_count = (myDay % 7)>2?Math.ceil(myDay / 7):Math.floor(myDay / 7);

	return week_count;
}
// 获取 （days 前后日期）
function addDate(date, days) {
	var d = new Date(date);
	d.setDate(d.getDate() + days);
	var m = d.getMonth() + 1;
	var tmpDate = d.getFullYear() + "/" + m + "/" + d.getDate();
	var resultDate = new Date(tmpDate);
	var y = resultDate.getFullYear();
	var m = resultDate.getMonth() + 1;
	var d = resultDate.getDate();
	var s = y + "-" + (m < 10 ? ('0' + m) : m) + "-" + (d < 10 ? ('0' + d) : d);
	return s;
}

// 获取每月第几周的周一的日期
function getMondayTime(year, month, weekday) {
	var d = new Date();
	// 该月第一天
	d.setFullYear(year, month - 1, 1);
	var w1 = d.getDay();
	if (w1 == 0) w1 = 7;
	// 该月天数
	d.setFullYear(year, month, 0);
	var dd = d.getDate();
	// 第一个周一
	let d1;
	if (w1 != 1) d1 = 7 - w1 + 2;
	else d1 = 1;
	var monday = d1 + (weekday - 1) * 7;
	monday = monday < 10 ? '0' + monday : monday
	return year + '-' + month + '-' + monday;
}

//  获取当月第一周周一日期
export function getLastMonth(year, month) {
	var nowdays = new Date();
	let nowMonth;
	if (month == 0) {
		month = 12;
		year = year - 1;
	}
	if (month < 10) {
		nowMonth = '0' + (month + 1);
		month = "0" + month;
	} else {
		nowMonth = month + 1
	}
	var firstDay = year + "/" + month + "/" + "01"; //上个月的第一天
	var myDate = new Date(year, month, 0);
	var lastDay = year + "/" + month + "/" + myDate.getDate(); //上个月的最后一天
	let lastWeekDay = new Date(lastDay).getDay();
	if (lastWeekDay < 4) {
		return addDate(lastDay, -(lastWeekDay - 1));
	} else {
		return getMondayTime(year, nowMonth, 1);
	}
}

// 获取月份最后一天
export function getLastMonthDay(year, month) {
	let myDate = new Date(year, month, 0);
	let lastDay = year + "-" + (month >= 10 ? month : '0' + month) + "-" + myDate.getDate();
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
export function getPreMonth(date) {
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

export function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

export function weekNumInMonth(str){
    let date = new Date();
    let year = str.split('/')[0];
    let month = str.split('/')[1];
    let firstDay = year + '/'+month+'/'+'01'; //获取当月第一天
    let firstDayWeek = new Date(firstDay).getDay()==0?7:new Date(firstDay).getDay();//获取第一天周几
    let lastDay = getLastMonthDay(year,Number(month));//获取当月最后一天
    let lastDayWeek = getLastMonthWeekDay(year,month);//获取第一天周几
    let startDate = '',endDate = '';

    if(firstDayWeek <= 4){
        startDate =  addDate(firstDay,-(firstDayWeek-1));
    }else{
        startDate =  addDate(firstDay,7-firstDayWeek);
    }

    if(lastDayWeek <= 4){
        endDate =  addDate(lastDay,-(lastDayWeek-1));
    }else{
        endDate =  addDate(lastDay,7-lastDayWeek);
    }

    let c = (new Date(endDate).getTime() - new Date(startDate).getTime())/(24*3600*1000);
    let num = Math.ceil(Math.abs(Date.now() - (new Date(startDate)).getTime()) / (24*3600*1000));
    return Math.ceil(num/7);

}

export function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
// 获取sesstion
export function getSession(name) {
	return JSON.parse(sessionStorage.getItem(name));
}
