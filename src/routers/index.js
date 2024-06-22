import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthUser from '../modules/auth/AuthUser.vue'

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
                component: AuthUser
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history', routes
})

export default router