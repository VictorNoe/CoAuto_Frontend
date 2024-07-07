import Vue from 'vue';
import Vuex from 'vuex';
import {jwtDecode} from 'jwt-decode';

Vue.use(Vuex);

const token = localStorage.getItem("token");
let initialUser = {
    role: null,
    email: null,
    token: token || null,
};

if (token) {
    try {
        const decodedToken = jwtDecode(token);
        initialUser = {
            email: decodedToken.email,
            role: decodedToken["cognito:groups"] ? decodedToken["cognito:groups"][0] : null,
            token: token
        };
    } catch (error) {
        console.error("Invalid token on initialization", error);
        localStorage.removeItem("token");
    }
}

export default new Vuex.Store({
    state: {
        user: initialUser
    },
    mutations: {
        SET_USER(state, payload) {
            state.user.email = payload.email;
            state.user.role = payload.role;
        },
        SET_TOKEN(state, token) {
            state.user.token = token;
            localStorage.setItem("token", token);
        },
        LOGOUT(state) {
            state.user.user = null;
            state.user.role = null;
            state.user.token = null;
            localStorage.removeItem("token");
        }
    },
    actions: {
        login({ commit }, token) {
            try {
                const decodedToken = jwtDecode(token);
                const user = {
                    email: decodedToken.email,
                    role: decodedToken["cognito:groups"] ? decodedToken["cognito:groups"][0] : null,
                };
                commit('SET_USER', user);
                commit('SET_TOKEN', token);
            } catch (error) {
                console.error("Invalid token on login", error);
            }
        },
        logout({ commit }) {
            commit('LOGOUT');
        }
    },
    getters: {
        isAuthenticated: state => !!state.user.token,
        userRole: state => state.user.role,
        emailUser: state => state.user.email,
    }
});
