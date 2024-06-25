import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthUser from '../modules/auth/AuthUser.vue'
import publicRouter from './public_router'
import userRouter from './user_router'
import adminRouter from './admin_router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login',
        component : {
            render(h) {
                return h("router-view")
            },
        },
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
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history', routes
})

export default router