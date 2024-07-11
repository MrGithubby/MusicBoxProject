
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
    //const genre = genreInputEl.value.trim();
    //const decade = decadeInputEl.value.trim();
  
    console.log(artist);



    if (artist || genre || decade) {
      getMusicPlaylistHandler();
      
    } else if (!artist && !genre && !decade)
        {
      alert("Please enter an artist, genre, or decade");
    };

    /*infoContainerElContainerEl.textContent = "";
    playContainerElContainerEl.textContent = "";
    artistInputElInputEl.value = "";
    genreInputElInputEl.value = "";
    decadeInputElInputEl.value = "";
   */
};

const getMusicPlaylistHandler = function() {


    const artist = artistInputEl.value.trim();
    const genre = genreInputEl.value.trim();
    //const decade = decadeInputEl.value.trim();

    if (artist) {
        getMusicPlaylistbyArtist();
    }

    if (genre) {
        getMusicPlaylistbyGenre();
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
            getMusicData(data);
          });
        }
      });



}  

const getMusicPlaylistbyGenre = function () {
    //const artist = artistInputEl.value.trim();
    const genre = genreInputEl.value.trim();
    //const decade = decadeInputEl.value.trim();



    const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${genre}&api_key=a44d846982283933b1ebb0aacdef6e3b&format=json`;
    //fetch request
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          return response.json().then(function (data) {
             //console.log(data);
            //displayMusicDetials(data);
          });
        }
      });



}

const displayMusicDetials = function() {

};

const saveDataToStorage = function() {

};
  


const getMusicData = function(data) {
    
    //const artist = artistInputEl.value.trim();
    //const title = 'Superstar';
    //const artist = 'Usher';
    const title = data.toptracks.track[1].name;
    const artist = data.toptracks["@attr"].artist;

    console.log(artist);
    console.log(title);

    const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=a44d846982283933b1ebb0aacdef6e3b&artist=${artist}&track=${title}&format=json`;
   
    fetch(apiUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        console.log(data);
        //displayMusicData(data);
      });
    }
  });

};


userFormEl.addEventListener("submit", formSubmitHandler);
