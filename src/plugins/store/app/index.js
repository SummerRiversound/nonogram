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
        }
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
            return commit('setToast', { show: false })
        }
    },
    getters: {
        loading(state) {
            return state.loading
        },
        toast(state) {
            return state.toast
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
            if (!payload) {
                state.toast = resetToast
                return
            }
            if (payload.type !== undefined) state.toast.type = payload.type
            if (payload.message !== undefined) state.toast.message = payload.message
            if (payload.show !== undefined) state.toast.show = payload.show
            if (payload.color !== undefined) state.toast.color = payload.color
        },
    }
}

export default app;