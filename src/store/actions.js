
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
    saveMonthValue({commit},n){
        commit('saveMonthValue',n);
    },
    saveWeekNum({commit},n){
        commit('saveWeekNum',n);
    },
    saveStartDate({commit},n){
        commit('saveStartDate',n);
    },
    saveEndDate({commit},n){
        commit('saveEndDate',n);
    }
}