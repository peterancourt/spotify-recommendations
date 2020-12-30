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
                searchString: ''
            }
        },
        methods: {
            searchSubmit(event) {
                console.log('SEARCHING');
                this.separateArtists.forEach((element) => {
                    const artistId = getArtistId(element, this.$store.getters.getAccessToken);
                    artistId.then((res) => {
                        console.log(res.data.artists.items[0]);
                        this.$store.commit('addArtist', res.data.artists.items[0]);
                    });
                })
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
