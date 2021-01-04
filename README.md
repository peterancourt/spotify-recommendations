# Spotify Song Recommendations
This project is designed to give Spotify users song recommendations based on user input of up to 5 artists. The following technologies were used to create this app:
* VueJS - JS Framework
* Vuex - State management
* Webpack - Module Bundling
* Axios - Client side API calls

The following endpoints are used to get data from Spotify:
* GET https://api.spotify.com/v1/me - gets profile info for display name
* GET https://api.spotify.com/v1/search - used to get artist ids from text entered by user
* GET https://api.spotify.com/v1/recommendations - returns song recommendations based on artist ids from `/search`
### Prerequisites
To run this app, you will need Node and NPM installed.

### Installation and Building
**Installation Commands**
```
git clone https://github.com/peterancourt/spotify-recommendations.git
cd spotify-recommendations
npm install
```

**Running the app:**
`npm run dev`
Open http://localhost:8080/

### Takeaways
This was a lot of fun to put together, I learned a lot about Vue and Vuex along the way (and possibly went overboard with it). In the future there's definitely some improvements I would like to make and things I would like to add. Spotify's recommendation api has a ton of possibilities beyond just artists as an input, including (but not limited to) other songs, genres, energy level, popularity, tempo, etc. It would be cool to implement more inputs.

Server side rendering would be helpful to be able to implement an auth flow that allows the user's access token to be refreshed on expiration (not to mention the other performance/SEO benefits).

Adding unit tests would be great as well to help catch error states and issues that were missed.
