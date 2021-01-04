<template>
    <div>
        <div v-if="getRecommendations.length">
            <div v-for="track in getRecommendations" :key="track.id" class="c-result-element">
                <h2>Title: {{ track.name }}</h2>
                <h3>Artist: {{ mapArtistNames(track.artists) }}</h3>
                <a target="_blank" rel="noopener noreferrer" :href="track.external_urls.spotify">
                    Listen on Spotify
                </a>
            </div>
        </div>
        <div v-else>
            <div v-show="isRecommendationError" class="has-error">
                {{errorMessage}}
            </div>
            <div v-show="!isRecommendationError">
                {{noResultsMessage}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getRecommendations } from '../services/api';
export default {
    data() {
        return {
            errorMessage: 'An error ocurred while getting recommendations. Please try again.',
            noResultsMessage: 'Sorry, no results based on your search. Please try again.',
        };
    },
    methods: {
        mapArtistNames(artistArray) {
            const artistNames = artistArray.map((artist) => {
                return artist.name;
            });
            return artistNames.join(', ');
        }
    },
    mounted() {
        const ids = (this.getArtists).map(a => a.id);
        const token = this.getAccessToken;

        if(ids.length) {
            getRecommendations(ids, token);
        }
    },
    computed: {
        ...mapGetters([
            'getArtists',
            'getAccessToken',
            'getRecommendations',
            'getErrorState'
        ]),
        isRecommendationError() {
            const errors = this.getErrorState;
            return errors.recommendations;
        }
    }
};
</script>

<style lang="scss">
    .c-result-element {
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
    }
</style>