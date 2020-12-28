<template>
    <div>
        <button @click="spotifyLogin">Login</button>
    </div>
</template>

<script>
    import { loginSpotify } from '../services/api.js';
    export default {
        data() {
            return {
                
            };
        },
        methods: {
            spotifyLogin() {
                loginSpotify();
                console.log(window.location.hash);
            }
        }
    };
</script>

<style lang="scss">

</style>