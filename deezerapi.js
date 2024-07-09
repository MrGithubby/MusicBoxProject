document.addEventListener("DOMContentLoaded", function () {
    const playerContainer = document.getElementById('player');

    // Deezer Track ID for "Never Gonna Give You Up"
    const trackId = 139470659;

    // Create the Deezer player
    const deezerPlayer = document.createElement('iframe');
    deezerPlayer.src = `https://widget.deezer.com/widget/dark/track/${trackId}`;
    deezerPlayer.width = "50%";
    deezerPlayer.height = "200px";
    deezerPlayer.frameBorder = "0";
    deezerPlayer.allow = "encrypted-media";
    
    playerContainer.appendChild(deezerPlayer);
});
