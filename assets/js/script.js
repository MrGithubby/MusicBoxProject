
const userFormEl = document.querySelector(".user-form");
const searchButtonEl = document.querySelector(".pure-button-primary");
const artistInputEl = document.querySelector("#artist-search");
const genreInputEl = document.querySelector("#genre-search");
const decadeInputEl = document.querySelector("#decade-search");
const infoContainerEl = document.querySelector("#info-container");
const playContainerEl = document.querySelector("#play-container");


//const returnDataFromStorage = function() {};

const formSubmitHandler = function (event) {
    event.preventDefault();
  
    const artist = artistInputEl.value.trim();
    const genre = genreInputEl.value.trim();
    //const decade = decadeInputEl.value.trim();
  
    console.log(artist);



    if (artist || genre || decade) {
      getMusicPlaylistHandler();
      
    } 
    if (!artist && !genre && !decade)
        {
      alert("Please enter an artist, genre, or decade");
      
    };

    //Clears the form after hitting search

    artistInputEl.value = "";
    genreInputEl.value = "";
    decadeInputEl.value = "";
    //infoContainerEl.textContent = "";
    //playContainerEl.textContent = "";
};

const getMusicPlaylistHandler = function() {


    const artist = artistInputEl.value.trim();
    const genre = genreInputEl.value.trim();
    //const decade = decadeInputEl.value.trim();

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


const getMusicPlaylistbyArtist = function () {
    const artist = artistInputEl.value.trim();
    //const genre = genreInputEl.value.trim();
    //const decade = decadeInputEl.value.trim();

    //create a loop to go through each year and pull back data for each year in the decade?


    const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=a44d846982283933b1ebb0aacdef6e3b&format=json`;

    //fetch request
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          return response.json().then(function (data) {
             console.log(data);
            getMusicDatabyArtist(data);
          });
        }
      });



}  

const getMusicPlaylistbyGenre = function () {
    //const artist = artistInputEl.value.trim();
    const genre = genreInputEl.value.trim();
    //const decade = decadeInputEl.value.trim();

    console.log(genre);

    const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${genre}&api_key=a44d846982283933b1ebb0aacdef6e3b&format=json`;
    //fetch request
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          return response.json().then(function (data) {
             console.log(data);
             getMusicDatabyGenre(data);
          });
        }
      });



}

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

const getMusicDatabyGenre = function(data) {

  const trackArray = data.tracks.track;

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


userFormEl.addEventListener("submit", formSubmitHandler);
