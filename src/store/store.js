import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        accessToken: '',
        user: {},
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
            return state.user.display_name;
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
        addArtists(state, artists) {
            state.artists = artists;
        },
        addRecommendations(state, recs) {
            state.recommendations = recs;
        },
        resetRecommendations(state) {
            state.recommendations = [];
        }, 
        setSearchComplete(state) {
            state.searchComplete = true;
        },
        resetSearchComplete(state) {
            state.searchComplete = false;
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
