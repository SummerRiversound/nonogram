import Vue from 'vue'
import VueRouter from 'vue-router'

// import AuthCheck from './auth-check'

import Landing from '@/pages/landing'
import NotFound from '@/pages/error/error404'

import Dashboard from '@/pages/dashboard'

import Nonogram from '@/pages/nonogram'
import Stages from '@/pages/menu/stages'
import Achievements from '@/pages/menu/achievements'
import Settings from '@/pages/menu/settings'
import Tutorial from '@/pages/menu/tutorial'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/not-found',
            name: 'NotFound',
            component: NotFound,
        },
        {
            path: '',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
        },
        {
            path: '/nonogram/:celltype/:stage_id',
            name: 'Nonogram',
            component: Nonogram,
        },
        {
            path: '/stages/:celltype',
            name: 'Stages',
            component: Stages,
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings
        },
        {
            path: '/achievements',
            name: 'Achievements',
            component: Achievements
        },
                {
            path: '/tutorial',
            name: 'Tutorial',
            component: Tutorial
        },
    ]
})

// router.beforeEach(async (to, from, next) => {
//     if( from == to ) return
//     let found = router.options.routes.some(r => {
//         return r.name === to.name
//     })

//     if (!found) {
//         next('/not-found')
//         return
//     }

//     next()
// })

export default router
