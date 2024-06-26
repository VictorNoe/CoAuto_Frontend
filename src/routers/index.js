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
                meta: {
                    title:"Inicio de sesion"
                }
            },
            {
                path: '/recovery_account',
                name: 'recovery_account',
                component: AuthUser,
                meta: {
                    title:"Recuperar cuenta"
                }
            },
            {
                path: '/profile',
                name: 'profile',
                component: AccountProfileVue,
                meta: {
                    title:"Perfil"
                }
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