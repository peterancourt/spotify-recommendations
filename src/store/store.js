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
    },
    getters: {
        getAccessToken: (state) => {
            return state.accessToken;
        },
        getUserInfo: (state) => {
            return state.user;
        },
        getArtists: (state) => {
            return state.artists;
        }, 
        getSearchComplete: (state) => {
            return state.searchComplete
        },
        getRecommendations: (state) => {
            return state.recommendations;
        }
    },
    mutations: {
        addArtists(state, artists) {
            state.artists = artists;
        },
        addRecommendations(state, recs) {
            state.recommendations = recs;
        },
        setSearchComplete(state) {
            state.searchComplete = true;
        }
    }
})