// Function to fetch album cover from Last.fm API
function fetchAlbumCover() {
    
    let artistName = document.getElementById('artist-search').value.trim();
    let genre = document.getElementById('genre-search').value.trim();

    
    let baseUrl = 'https://ws.audioscrobbler.com/2.0/';

    let apiKey = '1b4d9e26585afee61aea001c3df2919b';

    
    let apiUrl = `${baseUrl}?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`;

    
    if (artistName === '' && genre !== 'No Selection') {
        apiUrl = `${baseUrl}?method=tag.gettopalbums&tag=${genre}&api_key=${apiKey}&format=json`;
    }

    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            
            let albumCoverUrl = '';

            if (artistName !== '') {
                
                albumCoverUrl = data.artist.image[2]['#text'] 
            } else {
                
                albumCoverUrl = data.albums.album[0].image[2]['#text']; 
            }



            document.getElementById('artist-art').src = albumCoverUrl;
        })
        .catch(error => {
            console.error('Error fetching album cover:', error);
        });
}
