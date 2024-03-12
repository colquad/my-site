$(function(){
    $("#nav-placeholder").load("/src/nav5.html");
});

document.addEventListener('DOMContentLoaded', () => {
    const clientId = '3991fe2ccdf24b9a9ac14902e7d9e31e';
    const redirectUri = 'https://cjquade.com/myspotify/';
    const scopes = 'user-read-recently-played playlist-modify-public';

    const loginButton = document.getElementById('loginBtn');
    const playlistNameContainer = document.getElementById('playlistNameContainer');
    const playlistNameInput = document.getElementById('playlistName');
    const playlistDescInput = document.getElementById('playlistDesc');
    const createPlaylistButton = document.getElementById('createPlaylistBtn');
    const tracksContainer = document.getElementById('tracks');

    loginButton.addEventListener('click', () => {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;
    });

    // Check if the user has a Spotify access token
    const accessToken = window.location.hash.split('&')[0].substring(14);

    if (accessToken) {
        // Hide login button and show playlist name input and create playlist button
        loginButton.style.display = 'none';
        playlistNameContainer.style.display = 'block';
        createPlaylistButton.style.display = 'inline';

        // Fetch recently played tracks
        fetch('https://api.spotify.com/v1/me/player/recently-played?limit=25', {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
        .then(response => response.json())
        .then(data => {
            const trackList = data.items;
            tracksContainer.innerHTML = '<div class="img_container"><br><br><br>' +
                trackList.map(track => {
                    const artists = track.track.artists.map(artist => artist.name).join(', ');
                    const imageUrl = track.track.album.images[1].url; // Change index if you want a different size

                    return `<img src="${imageUrl}" alt="${track.track.name}"><br>
                            <strong>${track.track.name}</strong>
                            | ${artists}<br><br><br>`;
                }).join('') +
                '</div>';

            // Event listener for creating playlist button
            createPlaylistButton.addEventListener('click', () => {
                const customPlaylistName = playlistNameInput.value.trim();
                const customPlaylistDesc = playlistDescInput.value.trim();

                if (customPlaylistName !== '') {
                    // Create a playlist with the recently played tracks and custom name (simplified example)
                    fetch('https://api.spotify.com/v1/me/playlists', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: customPlaylistName,
                            description: customPlaylistDesc,
                            public: true,
                        }),
                    })
                    .then(response => response.json())
                    .then(playlist => {
                        const playlistId = playlist.id;
                        const trackUris = trackList.map(item => item.track.uri);

                        // Add tracks to the playlist
                        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + accessToken,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                uris: trackUris,
                            }),
                        });

                        // Display a message indicating that the playlist is created
                        alert('Playlist Successfully Created! Enjoy Listening!')
                    });
                } else {
                    alert('Please enter a valid playlist name.');
                }
            });
        });
    }
});