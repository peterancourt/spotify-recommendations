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
        }
    },
    mutations: {
        addArtists(state, artists) {
            state.artists = artists;
            state.searchComplete = true;
        },
        addRecommendations(state, recs) {
            state.recommendations = recs;
        },
        setSearchComplete(state) {
            state.searchComplete = true;
        }
    }
})