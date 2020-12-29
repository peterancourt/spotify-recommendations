import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        accessToken: '',
        user: {}
    },
    getters: {
        getAccessToken: (state) => {
            return state.accessToken;
        },
        getUserInfo: (state) => {
            return state.user;
        }
    }
})