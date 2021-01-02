<template>
    <div>
        <h3>
            Results
        </h3>
    </div>
</template>

<script>
    import { getRecommendations } from '../services/api';
    export default {
        mounted() {
            console.log(`Artists ${this.$store.getters.getArtists}`);
            const ids = (this.$store.getters.getArtists).map(a => a.id);
            const idString = encodeURIComponent(ids.join());
            const token = this.$store.getters.accessToken;

            const recommendations = getRecommendations(ids, token);
            recommendations.then((res) => {
                this.$store.commit('addRecommendations', res.data.tracks);
            });
        }
    }
</script>

<style lang="scss">

</style>