import Vue from 'vue'
import VueRouter from 'vue-router'

// import AuthCheck from './auth-check'

import Landing from '@/pages/landing'
import NotFound from '@/pages/error/error404'

import Dashboard from '@/pages/dashboard'

import Login from '@/pages/login'

import Nonogram from '@/pages/nonogram'
import Stages from '@/pages/menu/stages'
import Achievements from '@/pages/menu/achievements'
import Options from '@/pages/menu/options'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/not-found',
            name: 'NotFound',
            component: NotFound,
        },
        {
            path: '/',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
        },
        {
            path: '/nonogram/:stage_id',
            name: 'Nonogram',
            component: Nonogram,
        },
        {
            path: '/stages',
            name: 'Stages',
            component: Stages
        },
        {
            path: '/options',
            name: 'Options',
            component: Options
        },
        {
            path: '/achievements',
            name: 'Achievements',
            component: Achievements
        },

    ]
})

router.beforeEach(async (to, from, next) => {
    if( from == to ) return
    let found = router.options.routes.some(r => {
        return r.name === to.name
    })

    if (!found) {
        next('/not-found')
        return
    }

    next()
})

export default router
