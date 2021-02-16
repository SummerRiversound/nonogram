import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import AppState from './app'
import Progress from './progress'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        AppState,
        Progress
    },
    plugins: [createPersistedState(
        {paths:["Progress"]}
    )],
})