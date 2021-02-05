import Vue from 'vue'
import Vuex from 'vuex'

import AppState from './app'
import Progress from './progress'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        AppState,
        Progress
    }
})