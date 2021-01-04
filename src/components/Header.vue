<template>
    <div>
        <h1>Song Recommendations</h1>
        <p v-if="getAccessToken">{{welcomeMessage}}</p>
        <p v-else>{{loginMessage}}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            loginMessage: 'Please click login below to login to a spotify account',
        };
    },
    computed: {
        ...mapGetters([
            'getUserName',
            'getAccessToken'
        ]),
        welcomeMessage() {
            return `Welcome, ${this.getUserName}! To get started with song recommendations from Spotify, enter up to 5 artists separated by a comma below`;
        }
    }
};
</script>

<style lang="scss">

</style>