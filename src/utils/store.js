import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            role: null,
            user: null,
            token: localStorage.getItem("token") || null,
        }
    },
    mutations: {
    },
    getters: {
        userRole: state => state.user.role
    }
});