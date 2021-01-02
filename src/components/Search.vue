<template>
    <div>
        <form>
            <div class="c-artist-input">
                <label for="artists">Artists</label>
                <input id="artists" type="text" v-model.lazy="searchString">
            </div>
            <button @click.prevent="searchSubmit">Submit</button>
        </form>
    </div>
</template>

<script>
    import { getArtistId } from '../services/api'
    export default {
        data() {
            return {
                searchString: '',
                artistsArray: []
            }
        },
        methods: {
            searchSubmit(event) {
                getArtistId(this.separateArtists, this.$store.getters.getAccessToken);
            }
        },
        computed: {
            separateArtists() {
                return this.searchString.split(',');
            },
        }
    }
</script>

<style lang="scss">

</style>
