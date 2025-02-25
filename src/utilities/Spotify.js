const clientID = "711d5f90fbdb45eea80cbe96b980c05a";
// const redirectURL = "http://localhost:3000/";
const redirectURL = "https://spotylist.netlify.app/";
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
         const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
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

   async savePlaylist(name, trackUris) {
      if (!name || !trackUris || !trackUris.length) {
         return;
      }

      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userID;

      const response = await fetch("https://api.spotify.com/v1/me", { headers: headers }
      );
      const jsonResponse_1 = await response.json();
      userID = jsonResponse_1.id;
      const response_1 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
         method: "POST",
         headers: headers,
         body: JSON.stringify({ name: name })
      });
      const jsonResponse_2 = await response_1.json();
      const playlistID = jsonResponse_2.id;
      return await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
         method: "POST",
         headers: headers,
         body: JSON.stringify({ uris: trackUris })
      });
   },

   async getUserPlaylists() {
      const accessToken = Spotify.getAccessToken();
      const response = await fetch("https://api.spotify.com/v1/me/playlists", { headers: { Authorization: `Bearer ${accessToken}` } });
      const playlists = await response.json();

      return playlists.items;
   }
}

export default Spotify;