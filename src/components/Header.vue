<template>
    <div>
        <h1>Song Recommendations</h1>
        <p v-if="accessToken">{{welcomeMessage}}</p>
        <p v-else>{{loginMessage}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginMessage: 'Please click login below to login to a spotify account',
        };
    },
    computed: {
        userName() {
            return this.$store.getters.getUserName;
        },
        accessToken() {
            return this.$store.getters.getAccessToken;
        },
        welcomeMessage() {
            return `Welcome, ${this.userName}! To get started with Spotify recommendations, enter up to 5 artists separated by a comma below`
        }
    }
};
</script>

<style lang="scss">

</style>