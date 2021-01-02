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
                this.separateArtists.forEach((element) => {
                    const artistId = getArtistId(element, this.$store.getters.getAccessToken);
                    artistId.then((res) => {
                        if(res.data.artists.items.length) {
                            this.artistsArray.push({
                                artistName: res.data.artists.items[0].name,
                                id: res.data.artists.items[0].id
                            });
                        }
                    });
                })
                this.$store.state.artists = this.artistsArray;
                this.$store.state.searchComplete = true;
                //this.$store.commit('addArtists', this.artistsArray);
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
