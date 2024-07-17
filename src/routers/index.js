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
import VehiclesList from '@/modules/vehicles/VehiclesList.vue';
import UserList from '@/modules/users/UserList.vue';
import BlookRate from '../modules/rates-block/BlockRate.vue';

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
                    requiresAuth: false,
                    title: 'Login'
                }
            },
            {
                path: '/register',
                name: 'register',
                component: RegisterUser,
                meta: {
                    requiresAuth: false,
                    title: 'Sign up'
                }
            },
            {
                path: '/home',
                name: 'home',
                component: LandingPage,
                meta: {
                    requiresAuth: true,
                    roles: ['ClientUserGroup'],
                    title: 'Home'
                }
            },
            {
                path: '/profile',
                name: 'profile',
                component: AccountProfileVue,
                meta: {
                    requiresAuth: true,
                    roles: ['ClientUserGroup','AdminUserGroup'],
                    title: 'Perfil'
                }
            },
            {
                path: '/vehicles_search',
                name: 'vehicles_search',
                component: VehiclesSearch,
                meta: {
                    requiresAuth: true,
                    roles: ['ClientUserGroup'],
                    title: 'Buscar Autos'
                }
            },
            {
                path: '/details_car/:id',
                name: 'details_car',
                component: DetailsCar,
                meta: {
                    requiresAuth: true,
                    roles: ['ClientUserGroup'],
                    title: 'Detalles del Auto'
                }
            },
            {
                path: '/list_vehicles',
                name: 'vehicles',
                component: VehiclesList,
                meta: {
                    requiresAuth: true,
                    roles: ['AdminUserGroup'],
                    title: 'Autos'
                }
            },
            {
                path: '/list_users',
                name: 'users',
                component: UserList,
                meta: {
                    requiresAuth: true,
                    roles: ['AdminUserGroup'],
                    title: 'Usuarios'
                }
            },
            {
                path: '/rates_vehicles',
                name: 'ratesVehicles',
                component: BlookRate,
                meta: {
                    requiresAuth: true,
                    roles: ['AdminUserGroup'],
                    title: 'Reseñas'
                }
            }
        ]
    },
    {
        path: '/*',
        name: '404',
        component: NotFount,
        meta: {
            title: 'Not Fount Page'
        }
    }
]

const router = new VueRouter({
    mode: 'history', routes
})
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    const userRole = store.getters.userRole;

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login');
    } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        next('/404');
    } else if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
        if(userRole == ['ClientUserGroup']) {
            next('/home');
        }
        if(userRole == ['AdminUserGroup']) {
            next('/list_vehicles');
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