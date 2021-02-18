const resetToast = {
    message: null,
    type: null,
    color: null,
    show: false,
}

const app = {
    state: {
        loading: false,
        toast: {
            message: null,
            type: null,
            color: null,
            show: false
        },
        sound: true,
        vibrate: true,
        tutorial: false

    },
    actions: {
        setLoading({ commit }, payload) {
            return commit('setLoading', payload)
        },
        setToast({ commit }, payload) {
            payload.show = true
            return commit('setToast', payload)
        },
        removeToast({ commit }) {
            return commit('removeToast')
        },
        toggleSoundSetting({ commit }) {
            return commit('toggleSoundSetting')
        },
        toggleVibrateSetting({ commit }) {
            return commit('toggleVibrateSetting')
        },
        resetAppSetting({ commit }) {
            return commit('resetAppSetting')
        },
        setTutorial({ commit }) {
            return commit('toggleTutorial')
        }
    },
    getters: {
        loading(state) {
            return state.loading
        },
        toast(state) {
            return state.toast
        },
        sound(state) {
            return state.sound
        },
        vibrate(state) {
            return state.vibrate
        },
        tutorial(state) {
            return state.tutorial
        }
    },
    mutations: {
        setLoading(state, payload) {
            if (payload === undefined) {
                return
            }
            state.loading = payload;
        },
        setToast(state, payload) {
            state.toast = {
                message: null,
                type: null,
                color: null,
                show: false,
            }
            if (!payload) return
            if (payload.type !== undefined) state.toast.type = payload.type
            if (payload.message !== undefined) state.toast.message = payload.message
            if (payload.show !== undefined) state.toast.show = payload.show
            if (payload.color !== undefined) state.toast.color = payload.color
        },
        removeToast(state) {
            state.toast = {
                message: null,
                type: null,
                color: null,
                show: false,
            }
        },
        toggleSoundSetting(state) {
            state.sound = !state.sound
        },
        toggleVibrateSetting(state) {
            state.vibrate = !state.vibrate
        },
        resetAppSetting(state) {
            state.sound = true
            state.vibrate = true
            state.loading = false
            state.toast = resetToast
            state.tutorial = false
        },
        toggleTutorial(state) {
            state.tutorial = true
        }
    }
}

export default app;