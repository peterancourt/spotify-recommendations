<template>
    <div>
        <button @click="spotifyLogin" class="o-button">Login</button>
    </div>
</template>

<script>
import { loginSpotify } from '../services/api.js';
export default {
    methods: {
        spotifyLogin() {
            loginSpotify();
        }
    }
};
</script>

<style lang="scss">

</style>