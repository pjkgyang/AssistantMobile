import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js';
import * as getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';
// 修改state时在console打印，便于调试
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    getters,
    mutations ,
    actions,
    // 严格模式，非法修改state时报错
    strict: debug,
    plugins: debug ? [createLogger()] : []
})