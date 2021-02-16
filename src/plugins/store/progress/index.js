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
            return state.stages
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