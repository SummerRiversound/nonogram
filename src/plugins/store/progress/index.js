import Achievements from '@/assets/achievements'
import Stages from '@/assets/stages'

function fillAchievements() {
    return new Array(Achievements.length).fill(false)
}
function fillStages() {
    return Object.keys(Stages).map(type => {
        console.log(type)
        return new Array(Stages[type].length).fill(false)
    })
}


const progress = {
    state: {
        achievements: fillAchievements(),
        stages: fillStages()
    },
    actions: {
        setAchievementClear({commit}, index) {
            return commit('setAchievementClear', index)
        },
        setStageClear({ commit }, {type, index}) {
            return commit('setStageClear', {type, index})
        }
    },
    getters: {
        achievements(state) {
            return state.achievements
        },
        stages(state) {
            return state.stage
        },
    },
    mutations: {
        setAchievementClear(state, index) {
            state.achievements[index] = true
        },
        setStageClear(state, { type, index }) {
            state.stage[type][index] = true
        }
    }
}

export default progress;