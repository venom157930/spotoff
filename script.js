const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-pause');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "Pause";
        updateMetadata(); // Pour l'affichage Android
    } else {
        audio.pause();
        playBtn.innerText = "Play";
    }
});

function updateMetadata() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'Ma Super Chanson',
            artist: 'Mon Artiste',
            album: 'Mon Album',
            artwork: [{ src: 'cover.jpg', sizes: '512x512', type: 'image/jpeg' }]
        });
    }
}
function switchTheme(themeName) {
    // Applique le thème à l'attribut data-theme du document
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Sauvegarde le choix pour la prochaine ouverture
    localStorage.setItem('user-theme', themeName);
}

// Charger le thème sauvegardé au démarrage
const savedTheme = localStorage.getItem('user-theme') || 'light';
switchTheme(savedTheme);
const folderInput = document.getElementById('folder-input');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('main-audio');

folderInput.addEventListener('change', (e) => {
    const files = e.target.files;
    playlist.innerHTML = ''; // Vide la liste actuelle

    for (let file of files) {
        if (file.type.includes('audio') || file.name.endsWith('.mp3')) {
            const item = document.createElement('div');
            item.innerText = file.name;
            item.classList.add('track-item');
            
            item.onclick = () => {
                const blob = URL.createObjectURL(file);
                audioPlayer.src = blob;
                audioPlayer.play();
            };
            
            playlist.appendChild(item);
        }
    }
}, false);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker enregistré !'))
      .catch(err => console.log('Erreur SW:', err));
  });
}