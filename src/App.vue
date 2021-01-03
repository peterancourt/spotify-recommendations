<template>
    <div id="app" class="container">
        <div class="app-grid">
            <Header></Header>
            <Login v-if="!checkAccessToken"></Login>
            <Search v-else></Search>
            <Results v-if="isSearchComplete"></Results>
        </div>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Search from './components/Search.vue';
import Results from './components/Results.vue';
import Login from './components/Login.vue';
import { getProfileInfo } from './services/api';

export default {
    components: {
        Header,
        Search,
        Results,
        Login
    },
    data() {
        return {
            message: 'Hello World',
        };
    },
    computed: {
        checkAccessToken() {
            return this.$store.getters.getAccessToken;
        },
        isSearchComplete() {
            return this.$store.getters.getSearchComplete;
        }
    },
    mounted() {
        const authInfo = window.location.hash.substr(1).split('&');
        const token = authInfo[0].substring(13);
        if (token) {
            this.$store.state.accessToken = token;
            getProfileInfo(token);
        }
    }
};
</script>

<style lang="scss">
    #app {
        font-family: 'Roboto', sans-serif;
    }
    .container {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: auto;
        grid-template-areas: "leftMargin mainArea rightMargin";

    }
    .app-grid {
        grid-area: mainArea;
    }
    .has-error {
        background-color: red;
        color: white;
        padding: 10px;
        margin-bottom: 10px;
        max-width: 500px;
    }
    .o-button {
        background-color: black;
        color: white;
        padding: 10px 20px
    }
</style>