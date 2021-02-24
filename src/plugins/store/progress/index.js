import Achievements from '@/assets/achievements'
import Stages from '@/assets/stages'

function fillAchievements() {
    return new Array(Achievements.length).fill(false)
}
function fillStages() {
    let map = {}
    Object.keys(Stages).forEach(type => {
        map[type] = new Array(Stages[type].length).fill(false)
    })
    return map
}


const progress = {
    state: {
        achievements: fillAchievements(),
        stages: fillStages(),
        tutorial: false
    },
    actions: {
        setAchievementClear({commit}, index) {
            return commit('setAchievementClear', index)
        },
        setStageClear({ commit }, {type, index}) {
            return commit('setStageClear', {type, index})
        },
        resetUserPlayHistory({ commit }) {
            return commit("resetUserPlayHistory")
        },
        setTutorial({ commit }) {
            return commit('toggleTutorial')
        }
    },
    getters: {
        achievements(state) {
            return state.achievements
        },
        stages(state) {
            return state.stages
        },
        tutorial(state) {
            return state.tutorial
        }
    },
    mutations: {
        setAchievementClear(state, index) {
            state.achievements[index] = true
        },
        setStageClear(state, { type, index }) {
            state.stages[type][index] = true
        },
        resetUserPlayHistory(state) {
            state.achievements = fillAchievements()
            state.stages = fillStages()
            state.tutorial = false
        },
        toggleTutorial(state) {
            state.tutorial = true
        }
    }
}

export default progress;