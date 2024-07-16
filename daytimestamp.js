// JavaScript for handling the "Save this Song" button
document.getElementById('save-song-button').addEventListener('click', function() {
    // Save the current date
    let currentDate = new Date();
    let savedDate = currentDate.toLocaleDateString(); // Format: MM/DD/YYYY

    // Log the saved date to the console
    console.log(`Song saved on: ${savedDate}`);


});