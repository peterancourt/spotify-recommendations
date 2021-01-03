<template>
    <div>
        <form>
            <div v-show="isSearchError" class="has-error">
                {{searchError}}
            </div>
            <div class="form-container">
                <label for="artists" class="c-artist-label">Artists</label>
                <input id="artists" type="text" v-model.lazy="searchString" class="c-artist-input">
                <button @click.prevent="searchSubmit" class="c-artist-button o-button">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { getArtistId } from '../services/api'
    export default {
        data() {
            return {
                searchString: '',
                artistsArray: [],
                searchError: 'An error occurred on search - please adjust search and try again'
            }
        },
        methods: {
            searchSubmit() {
                if (this.$store.getters.getSearchComplete) {
                    this.$store.commit('resetSearchComplete');
                    this.$store.commit('resetRecommendations');
                    this.$store.commit('resetError', 'search');
                    this.$store.commit('resetError', 'recommendations');
                }
                getArtistId(this.separateArtists, this.$store.getters.getAccessToken);
            }
        },
        computed: {
            separateArtists() {
                return this.searchString.split(',');
            },
            isSearchError() {
                const errors = this.$store.getters.getErrorState;
                return errors.search;
            }
        }
    }
</script>

<style lang="scss">
    .form-container {
        display: grid;
        grid-template-rows: 0.5fr 1fr 1fr;
        grid-template-areas:
            "label"
            "input"
            "button";
    }
    .c-artist-label {
        grid-area: label;
    }
    .c-artist-input {
        grid-area: input;
        padding: 10px 10px;
        margin-bottom: 10px;
    }
    .c-artist-button {
        grid-area: button;
    }

</style>
