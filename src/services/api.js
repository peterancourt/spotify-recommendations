import axios from 'axios';
import { store } from '../store/store';
const client_id = '4b12ffafaa604b868ba3dab6d2b5b151'; // Your client id
const redirect_uri = 'http://localhost:8080/'; // Your redirect uri
const state = generateRandomString(16);
const scope = 'user-read-private user-read-email';

// From Spotify - generates a random string to use as the 'state' param on navigating to /authorize
function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Authenticates user with Spotify's implicit grant method, which allows for authentication without
// server side code.
// Navigates to Spotify Auth page - allows user to login and redirects back to http://localhost:8080
// with an auth token in the url
export function loginSpotify() {
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location.replace(url);
}

// Makes a request to /me endpoint to get the user's profile info - stores user's display name in store
export async function getProfileInfo(token) {
    try {
        let res = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        store.commit('setUserName', res.data.display_name);
    } catch(error) {
        console.log(error);
    }
}

// Calls /search endpoint to get Spotify ids for all artists entered by user (call to recommendations
// requires ids as a parameter)
// Stores artist name and id in an array in store
// Sets an error value in store if axios returns an error
export async function getArtistId(artists, token) {
    const artistIds = [];

    for (let index = 0; index < artists.length; index++) {
        const encodedArtist = encodeURIComponent(artists[index]);
        try {
            let res = await axios({
                method: 'get',
                url: `https://api.spotify.com/v1/search?q=${encodedArtist}&type=artist`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            artistIds.push({
                artistName: res.data.artists.items[0].name,
                id: res.data.artists.items[0].id
            });
        }
        catch(error) {
            store.dispatch('setError', 'search');
        }
    }
    store.commit('addArtists', artistIds);
    store.commit('setSearchCompleteValue', true);
}

// Calls /recommendations endpoint based on artist ids
// Stores recommendations data in an array in store
// Sets an error value in store if axios returns an error
export async function getRecommendations(ids, token) {
    const encodedIds = encodeURIComponent(ids.join());
    try {
        let res = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/recommendations?seed_artists=${encodedIds}&limit=10`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        store.commit('addRecommendations', res.data.tracks);
        
    } catch(error) {
        store.dispatch('setError', 'recommendations');
    }
}