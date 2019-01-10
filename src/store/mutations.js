
export default {
    chnageLoing(state, n) {
        state.loadingShow = n;
    },
    chnageBtnloing(state, n) {
        state.btnloading = n;
    },
    chnageMark(state, n) {
        state.mark = n;
    },
    addUser(state, n) {
        state.userInfo = n;
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