import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthUser from '../modules/auth/AuthUser.vue'
import AccountProfileVue from '@/modules/profile/AccountProfile.vue'
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
router.beforeEach((to, from, next)=> {
    const isTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
    if (isTitle) {
      document.title = isTitle.meta.title
    }
    next()
})
export default router