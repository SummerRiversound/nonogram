import { store as $store } from '@/plugins/store'
import Auth from '@/services/auth'

export default async (to, from, next) => {
    try {
        const resp = await Auth.check()
        if (resp.status == 200 && resp.data.success == "ok") {
            const user = resp.data
            $store.commit('setUser', user)
            if (from.path != to.path) next()

            return
        }
        new Exception()

    } catch (err) {
        await $store.dispatch('clearSession')
        if (from.path != to.path) next('/login')
    }
}
