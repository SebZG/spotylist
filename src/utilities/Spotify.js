const clientID = "711d5f90fbdb45eea80cbe96b980c05a";
const redirectUri = "http://localhost:3000/";
let accessToken;

const Spotify = {
   getAccessToken() {
      // First check for the access token
      if (accessToken) {
         return accessToken;
      }

      const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
      const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

      // Second check for the access token
      if (tokenInURL && expiryTime) {
         // Setting access token and expiry time variables
         accessToken = tokenInURL[1];
         const expiresIn = Number(expiryTime[1]);
         // Setting the access token to expire at the value for expiration time
         window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
         // Clearing the URL after the access token expires
         window.history.pushState("Access Token", null, "/");
         return accessToken;
      } else {
         // Third check for the access token if first and second time are false
         const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
         window.location = redirect;
      }
   },

   async search(term) {
      const accessToken = Spotify.getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
         method: "GET",
         headers: { Authorization: `Bearer ${accessToken}` }
      });
      const jsonResponse = await response.json();
      if (!jsonResponse) {
         console.log("Response error");
         return [];
      } else {
         const tracks = jsonResponse.tracks.items.map(async (track) => {
            const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${track.id}`, {
               method: "GET",
               headers: { Authorization: `Bearer ${accessToken}` }
            });
            const trackJsonResponse = await trackResponse.json();
            return {
               id: track.id,
               name: track.name,
               artist: track.artists[0].name,
               album: track.album.name,
               uri: track.uri,
               preview_url: trackJsonResponse.preview_url
            };
         });
         return await Promise.all(tracks);
      }
   },

   savePlaylist(name, trackUris) {
      if (!name || !trackUris || !trackUris.length) {
         return
      }

      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userID;

      return fetch("https://api.spotify.com/v1/me", { headers: headers }
      ).then(response => response.json()
      ).then(jsonResponse => {
         userID = jsonResponse.id;
         return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ name: name })
         }).then(response => response.json()
         ).then(jsonResponse => {
            const playlistID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
               method: "POST",
               headers: headers,
               body: JSON.stringify({ uris: trackUris })
            });
         });
      });
   },

   async getUserPlaylists() {
      const accessToken = Spotify.getAccessToken();
      // const headers = { Authorization: `Bearer ${accessToken}` };

      const response = await fetch("https://api.spotify.com/v1/me/playlists", { headers: { Authorization: `Bearer ${accessToken}` } });
      const playlists = await response.json();
      console.log(playlists.items);
      return playlists.items;
   }
}

export default Spotify;