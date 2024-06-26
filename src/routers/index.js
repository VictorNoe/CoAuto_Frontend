import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthUser from '../modules/auth/AuthUser.vue'
import LayoutUser from '../layouts/LayoutUser.vue'
import AccountProfileVue from '@/modules/profile/AccountProfile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login',
        name: '',
        component : LayoutUser,
        children: [
            {
                path: '/login',
                name: 'login',
                component: AuthUser,
                meta: {}
            },
            {
                path: '/recovery_account',
                name: 'recovery_account',
                component: AuthUser,
                meta: {}
            },
            {
                path: '/profile',
                name: 'profile',
                component: AccountProfileVue,
                meta: {}
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history', routes
})

export default router