import axios from 'axios';
const client_id = '4b12ffafaa604b868ba3dab6d2b5b151'; // Your client id
const redirect_uri = 'http://localhost:8080/'; // Your redirect uri
const state = generateRandomString(16);
const scope = 'user-read-private user-read-email';

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export function loginSpotify() {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
    
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
}

export async function getProfileInfo(token) {
    try {
        let res = axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res;
    } catch(error) {
        console.log(error);
    }
}

export async function getArtistId(artist, token) {
    const encodedArtist = encodeURIComponent(artist);
    try {
        let res = axios({
            method: 'get',
            url: `https://api.spotify.com/v1/search?q=${encodedArtist}&type=artist`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res;
    } catch(error) {
        console.log(error);
    }
}
