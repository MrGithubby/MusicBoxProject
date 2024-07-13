document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    ;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const artistSearch = document.getElementById('artist-search').value;
        const genreSearch = document.getElementById('genre-search').value;
        const decadeSearch = document.getElementById('decade-search').value;

        // Retrieve the array from localStorage, or initialize it if it doesn't exist
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        // Add the new form data to the array
        const newEntry = {
            artist: artistSearch,
            genre: genreSearch,
            decade: decadeSearch
        };
        searchHistory.push(newEntry);

        // Saves the updated array back to localStorage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        // Clear form fields after submission
        form.reset();
    });
});
