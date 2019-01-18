const state = {
    // weekMonthvalue:'',
    // weekNum:'',
    // weekStartDate:'',
    // weekEndDate:'',
    loadingShow:false,
    btnloading:false,
    mark:false,
    btnShow:false,
    stateComplete:true,
    userInfo:!localStorage.getItem("userInfo")?{}:JSON.parse(localStorage.getItem("userInfo")),
    clienHeight:document.documentElement?document.documentElement.clientHeight:document.body.clientHeight
};

export default state;