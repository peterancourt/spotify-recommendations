<template>
    <div id="app">
        <Header></Header>
        <Login v-if="!checkAccessToken"></Login>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Search from './components/Search.vue';
import Results from './components/Results.vue';
import Login from './components/Login.vue';

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
            return this.$store.state.accessToken;
        },
        hashExists() {
            return Boolean(window.location.hash)
        }
    },
    methods: {
        
    }
};
</script>

<style lang="scss">
    #app {
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        color: blue;
    }
</style>