
export default {
    // nameAsync({commit}, {age, name}) {
    //     commit(types.SET_NAME, name);
    //     commit(types.SET_AGE, age);
    // }
    // setname(context){ //可以理解为代表了整个的context
    //     context.commit('changename',{a:10}) 
    // },
    
    chnageLoing({commit},n){
        commit('chnageLoing',n);
    },
    chnageBtn({commit},n){
        commit('chnageBtn',n);
    },
    chnageMark({commit},n){
        commit('chnageMark',n);
    },
    changeBtnshow({commit},n){
        commit('changeBtnshow',n);
    },
    adduser({commit},n){
        commit('addUser',n);
    },
    changeState({commit},n){
        commit('changeState',n);
    },
    changeIosVersion({commit},n){
        commit('changeIosVersion',n);
    },

    // saveMonthValue({commit},n){
    //     commit('saveMonthValue',n);
    // },
    // saveWeekNum({commit},n){
    //     commit('saveWeekNum',n);
    // },
    // saveStartDate({commit},n){
    //     commit('saveStartDate',n);
    // },
    // saveEndDate({commit},n){
    //     commit('saveEndDate',n);
    // }
}