import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthUser from '../modules/auth/AuthUser.vue'
import LayoutUser from '../layouts/LayoutUser.vue'
import LandingPage from '../modules/landing/LandingUser.vue'
import RegisterUser from '../modules/register/RegisterUser.vue'
import AccountProfileVue from '@/modules/profile/AccountProfile.vue'
import NotFount from '../modules/404/NotFount.vue'
import VehiclesSearch from '@/modules/vehiches_search/VehiclesSearch.vue';
import DetailsCar from '@/modules/details-cars/DetailsCar.vue';
import store from '../utils/store';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login',
        name: '',
        component: LayoutUser,
        children: [
            {
                path: '/login',
                name: 'login',
                component: AuthUser,
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: '/register',
                name: 'register',
                component: RegisterUser,
                meta: {
                    requiresAuth: false,
                }
            },
            {
                path: '/home',
                name: 'home',
                component: LandingPage,
                meta: {
                    requiresAuth: true,
                    roles: ['ClientUserGroup']
                }
            },
            {
                path: '/profile',
                name: 'profile',
                component: AccountProfileVue,
                meta: {
                    requiresAuth: true,
                    roles: ['ClientUserGroup']
                }
            },
            {
                path: '/vehicles_search',
                name: 'vehicles_search',
                component: VehiclesSearch,
                meta: {
                    requiresAuth: true,
                    roles: ['ClientUserGroup']
                }
            },
            {
                path: '/details_car/:id',
                name: 'details_car',
                component: DetailsCar,
                meta: {
                    requiresAuth: true,
                    roles: ['ClientUserGroup']
                }
            }
        ]
    },
    {
        path: '/*',
        name: '404',
        component: NotFount,
        meta: {
            title: 'not fount page'
        }
    }
]

const router = new VueRouter({
    mode: 'history', routes
})
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    const userRole = store.getters.userRole;
    console.log(userRole);

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login');
    } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        next('/404');
    } else if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
        if(userRole == ['ClientUserGroup']) {
            next('/home');
        }
        if(userRole == ['AdminUserGroup']) {
            next('/dasboard');
        }
    } else {
        next();
    }
    const isTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if (isTitle) {
        document.title = isTitle.meta.title;
    }
})


export default router