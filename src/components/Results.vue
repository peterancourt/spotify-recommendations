<template>
    <div>
        <div v-if="trackRecommendations.length">
            <div v-for="track in trackRecommendations" :key="track.id" class="c-result-element">
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
    import { getRecommendations } from '../services/api';
    export default {
        data() {
            return {
                errorMessage: 'An error ocurred while getting recommendations. Please try again.',
                noResultsMessage: 'Sorry, no results based on your search. Please try again',
            }
        },
        methods: {
            mapArtistNames(artistArray) {
                const artistNames = artistArray.map((artist) => {
                    return artist.name;
                })
                return artistNames.join(', ');
            }
        },
        mounted() {
            const ids = (this.$store.getters.getArtists).map(a => a.id);
            const idString = encodeURIComponent(ids.join());
            const token = this.$store.getters.getAccessToken;
            
            if(ids.length) {
                getRecommendations(ids, token);
            } 
        },
        computed: {
            trackRecommendations() {
                return this.$store.getters.getRecommendations;
            },
            isRecommendationError() {
                const errors = this.$store.getters.getErrorState;
                return errors.recommendations;
            }
        }
    }
</script>

<style lang="scss">
    .c-result-element {
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
    }
</style>