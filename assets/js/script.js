
const userFormEl = document.querySelector(".user-form");
const searchButtonEl = document.querySelector(".pure-button-primary");
const artistInputEl = document.querySelector("#artist-search");
const genreInputEl = document.querySelector("#genre-search");
const infoContainerEl = document.querySelector("#info-container");
const playContainerEl = document.querySelector("#play-container");

const artistUpdate = document.querySelector("#artist-name");
const trackUpdate = document.querySelector("#track-name");
const imageUpdate = document.querySelector("#artist-art");
const genreUpdate = document.querySelector("#genre");



//const returnDataFromStorage = function() {};

const formSubmitHandler = function (event) {
    event.preventDefault();
  
    const artist = artistInputEl.value.trim();
    const genre = genreInputEl.value.trim();
  
    console.log(artist);

    if (artist || genre) {
      getMusicPlaylistHandler();
    } 
    if (!artist && !genre)
        {
      alert("Please enter an artist, genre");   
    };

    //Clears the form after hitting search
    artistInputEl.value = "";
    genreInputEl.value = "";
    //infoContainerEl.textContent = "";
    //playContainerEl.textContent = "";
};

const getMusicPlaylistHandler = function() {
    const artist = artistInputEl.value.trim();
    const genre = genreInputEl.value.trim();
   
    if (artist) {
        getMusicPlaylistbyArtist();
        return;
    }

    if (genre) {
        getMusicPlaylistbyGenre();
        return;
    }
    //else {
    //    getChartToppers();
    //}
};

const getMusicPlaylistbyGenre = function () {
    const genre = genreInputEl.value.trim();
    console.log(genre);
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${genre}&api_key=a44d846982283933b1ebb0aacdef6e3b&format=json`;
   
  //  fetch request
    function jsonp(apiURL, callback) {
      const script = document.createElement('script');
      const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
      window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
      };
      script.src = apiUrl + (apiUrl.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
      document.body.appendChild(script);
    }
    
    jsonp('https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=a44d846982283933b1ebb0aacdef6e3b&format=json', function(data) {
      const trackArray = data.tracks.track;
      function pickRandomTrack(arr) {
        let randomIndex = Math.floor(Math.random() * trackArray.length);
        return trackArray[randomIndex];
      }
      const randomTrack = pickRandomTrack(trackArray)
      console.log(randomTrack);      
      console.log(randomTrack.name);    
      console.log(randomTrack.artist.name);       
      const mbid = randomTrack.artist.mbid;
      const imageUrl = `https://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`;
      console.log(mbid);
      console.log(imageUrl);
      // https://github.com/hugovk/now-playing-radiator/commit/e6de980db9da6846edc5aa2d2f7057b8f3b21bc8
      fetch(imageUrl)
      .then(res => res.json())
      .then((out) => {
          const relations = out.relations;
          // console.table(relations);
          // Find image relation
          for (let i = 0; i < relations.length; i++) {
              if (relations[i].type === 'image') {
                let image_url = relations[i].url.resource;
                if (image_url.startsWith('https://commons.wikimedia.org/wiki/File:')) {
                    const filename = image_url.substring(image_url.lastIndexOf('/') + 1);
                    image_url = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + filename;
                }
                console.log(image_url);
                imageUpdate.src = image_url
              }
              artistUpdate.textContent = randomTrack.artist.name
              genreUpdate.textContent = genre
              trackUpdate.textContent = randomTrack.name
            }
      })
      
    })

}


const pikcMusicbyGenre = function(data) {

  const trackArray = data.tracks.track;

  function pickRandomTrack(arr) {
    let randomIndex = Math.floor(Math.random() * trackArray.length);
    return trackArray[randomIndex];
  }

  const randomTrack = pickRandomTrack(trackArray)

  console.log(randomTrack);
//const displayMusicDetails = function() {};

//const saveDataToStorage = function() {};








const getMusicDatabyArtist = function(data) {

  const trackArray = data.toptracks.track;

  function pickRandomTrack(arr) {
    let randomIndex = Math.floor(Math.random() * trackArray.length);
    return trackArray[randomIndex];
  }

  const randomTrack = pickRandomTrack(trackArray)

  console.log(randomTrack);

  //for (let i = 0; i < trackArray.length; i++) {
    //console.log(trackArray[i]);
    //const track = trackArray[i];
    
    const title = randomTrack.name;
    const artist = randomTrack.artist.name;
    const imgUrl = randomTrack.image[1]["#text"];

    console.log(artist);
    console.log(title);
    console.log(imgUrl);

    const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=a44d846982283933b1ebb0aacdef6e3b&artist=${artist}&track=${title}&format=json`;
   
    fetch(apiUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        console.log(data);
        //displayMusicDetails();
      });
    }
  });
  };



  //for (let i = 0; i < trackArray.length; i++) {
    //console.log(trackArray[i]);
    //const track = trackArray[i];
    
    const title = randomTrack.name;
    const artist = randomTrack.artist.name;
    const imgUrl = randomTrack.image[1]["#text"];

    console.log(artist);
    console.log(title);
    console.log(imgUrl);



  const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=a44d846982283933b1ebb0aacdef6e3b&artist=${artist}&track=${title}&format=json`;
 
  fetch(apiUrl).then(function (response) {
  if (response.ok) {
    return response.json().then(function (data) {
      console.log(data);
      //displayMusicDetails();
    });
  }
});
};




const getMusicPlaylistbyArtist = function () {
  const artist = artistInputEl.value.trim();
  console.log(artist);
  const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&tag=${artist}&api_key=a44d846982283933b1ebb0aacdef6e3b&format=json`;
 
  //fetch request
  function jsonp(apiURL, callback) {
    const script = document.createElement('script');
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };
    script.src = apiUrl + (apiUrl.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }
  
  jsonp('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=a44d846982283933b1ebb0aacdef6e3b&format=json', function(data) {
    console.log(data);
    console.log(data.tracks.track[3].name);
    console.log(data.tracks.track[3].artist.name)
    console.log(data.tracks.track[3].image[3]["#text"])
    const mbid = data.tracks.track[3].artist.mbid;
    const imageUrl = `https://musicbrainz.org/ws/2/artist/${mbid}?inc=url-rels&fmt=json`;
    console.log(mbid);
    console.log(imageUrl);
    // https://github.com/hugovk/now-playing-radiator/commit/e6de980db9da6846edc5aa2d2f7057b8f3b21bc8
    fetch(imageUrl)
    .then(res => res.json())
    .then((out) => {
        const relations = out.relations;
        console.table(relations);
        console.log(relations[4])
        // Find image relation
        for (let i = 0; i < relations.length; i++) {
            if (relations[i].type === 'image') {
                let image_url = relations[i].url.resource;
                if (image_url.startsWith('https://commons.wikimedia.org/wiki/File:')) {
                    const filename = image_url.substring(image_url.lastIndexOf('/') + 1);
                    image_url = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + filename;
                }
                console.log(image_url);
            }
        }
    })
    
})
}




userFormEl.addEventListener("submit", formSubmitHandler);
