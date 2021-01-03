import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        accessToken: '',
        userName: '',
        artists: [],
        searchComplete: false,
        recommendations: [],
        errors: {
            login: false,
            profileInfo: false,
            search: false,
            recommendations: false
        }
    },
    getters: {
        getAccessToken: (state) => {
            return state.accessToken;
        },
        getUserName: (state) => {
            return state.userName;
        },
        getArtists: (state) => {
            return state.artists;
        }, 
        getSearchComplete: (state) => {
            return state.searchComplete;
        },
        getRecommendations: (state) => {
            return state.recommendations;
        },
        getErrorState: (state) => {
            return state.errors;
        }
    },
    mutations: {
        setUserName(state, name) {
            state.userName = name;
        },
        addArtists(state, artists) {
            state.artists = artists;
        },
        addRecommendations(state, recs) {
            state.recommendations = recs;
        },
        setSearchCompleteValue(state, value) {
            state.searchComplete = value;
        },
        setError(state, error) {
            state.errors[error] = true;
        },
        resetError(state, error) {
            state.errors[error] = false;
        }
    },
    actions: {
        setError({ commit }, error) {
            commit('setError', error);
        },
        resetError({ commit }, error) {
            commit('resetError', error);
        }
    }
});
