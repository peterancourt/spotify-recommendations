<template>
    <div>
        <div v-if="trackRecommendations.length">
            <div v-for="track in trackRecommendations" :key="track.id" class="c-result-element">
                <h2>
                    Title: {{ track.name }}
                </h2>
                <h3>
                    Artist: {{ mapArtistNames(track.artists) }}
                </h3>
                <a target="_blank" rel="noopener noreferrer" :href="track.external_urls.spotify">
                    Listen on Spotify
                </a>
            </div>
        </div>
        <div v-else>
            Sorry, no results based on your search. Please try again
        </div>
    </div>
</template>

<script>
    import { getRecommendations } from '../services/api';
    export default {
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

            const recommendations = getRecommendations(ids, token);
            recommendations.then((res) => {
                this.$store.commit('addRecommendations', res.data.tracks);
            });
        },
        computed: {
            trackRecommendations() {
                return this.$store.getters.getRecommendations;
            }
        }
    }
</script>

<style lang="scss">
    .c-result-element {
        border: 1px solid black;
    }
</style>