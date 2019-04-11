
export default {
    chnageLoing(state, n) {
        state.loadingShow = n;
    },
    chnageBtn(state, n) {
        state.queryBtn = n;
    },
    chnageMark(state, n) {
        state.mark = n;
    },
    changeBtnshow(state, n) {
        state.btnShow = n;
    },
    addUser(state, n) {
        state.userInfo = n;
    },
    changeState(state, n) {
        state.stateComplete = n;
    },
    changeIosVersion(state, n) {
        state.ios = n;
    },
    
    

    saveMonthValue(state, n) {
        state.weekMonthvalue = n;
    },
    saveWeekNum(state,n) {
        state.weekNum = n;
    },
    saveStartDate(state, n) {
        state.weekStartDate = n;
    },
    saveEndDate(state,n) {
        state.weekEndDate = n;
    }
};

// export const SET_NAME = (state, name) => {
//     state.name = name;
// }
// export const SET_AGE = (state, age) => {
//     state.age = age;
// }